package com.software.qualip;

import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.material.snackbar.Snackbar;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ServerValue;
import com.google.mlkit.common.model.LocalModel;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.label.ImageLabel;
import com.google.mlkit.vision.label.ImageLabeler;
import com.google.mlkit.vision.label.ImageLabeling;
import com.google.mlkit.vision.label.custom.CustomImageLabelerOptions;

import java.io.IOException;
import java.util.List;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;

public class MainActivity extends AppCompatActivity {

    private TextView txtMessage;
    private Button btnTakePhoto, btnSave;
    private ImageView img;

    private Uri filePath;
    // request code
    private final int PICK_IMAGE_REQUEST = 22;
    private boolean isNewOne = false;

    private ConstraintLayout layout;
    private boolean modelLoadFailed = false;
    private LocalModel localModel;
    private ImageLabeler labeler;

    private DatabaseReference mDatabase;

    private String type = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.layout = findViewById(R.id.layout_main);
        this.txtMessage = findViewById(R.id.txt_message);
        this.btnTakePhoto = findViewById(R.id.btn_takePhoto);
        this.btnSave = findViewById(R.id.btn_save);
        this.img = findViewById(R.id.imageView);

        // FirebaseApp.initializeApp();
        mDatabase = FirebaseDatabase.getInstance().getReference("data");

        localModel =
                new LocalModel.Builder()
                        .setAssetFilePath("model.tflite")
                        .build();

        CustomImageLabelerOptions customImageLabelerOptions =
                new CustomImageLabelerOptions.Builder(localModel)
                        .setConfidenceThreshold(0.7f)
                        .setMaxResultCount(2)
                        .build();

        labeler = ImageLabeling.getClient(customImageLabelerOptions);


        this.btnTakePhoto.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                selectImage();
            }
        });

        this.btnSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(isNewOne) {
                    if(type == null) {
                        Snackbar.make(layout,"Please take a photo of product!",Snackbar.LENGTH_LONG).show();
                    } else {
                        updateDB(type);
                    }
                } else {
                    Snackbar.make(layout,"Already saved!",Snackbar.LENGTH_LONG).show();
                }
            }
        });

    }

    // upload profile image
    // Select Image method
    void selectImage()
    {
        // Defining Implicit Intent to mobile gallery
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        startActivityForResult(
                Intent.createChooser(
                        intent,
                        "Select Image from here..."),
                PICK_IMAGE_REQUEST);
    }

    // Override onActivityResult method
    @Override
    protected void onActivityResult(int requestCode,int resultCode,Intent data)
    {
        super.onActivityResult(requestCode,resultCode, data);
        // checking request code and result code
        // if request code is PICK_IMAGE_REQUEST and
        // resultCode is RESULT_OK
        // then set image in the image view
        if (requestCode == PICK_IMAGE_REQUEST
                && resultCode == RESULT_OK
                && data != null
                && data.getData() != null) {

            // Get the Uri of data
            filePath = data.getData();
            try {

                // Setting image on image view using Bitmap
                Bitmap bitmap = MediaStore
                        .Images
                        .Media
                        .getBitmap(
                                getContentResolver(),
                                filePath);
                img.setImageBitmap(bitmap);
                isNewOne = true;
                onPrediction();
            }

            catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void onPrediction() {
        try {

            InputImage image = InputImage.fromFilePath(this,filePath);

            labeler.process(image)
                    .addOnSuccessListener(new OnSuccessListener<List<ImageLabel>>() {
                        @Override
                        public void onSuccess(List<ImageLabel> labels) {
                            for (ImageLabel label : labels) {
                                String text = label.getText();
                                float confidence = label.getConfidence();
                                String message = "Good";
                                if(text.equals("not_damaged")) {
                                    if(confidence < 0.80 && confidence >= 0.50) {
                                        // to be repaired
                                        message = "to be repaired";
                                        type = "to_be_repaired";

                                    } else if(confidence < 0.50) {
                                        // to be recycle
                                        message = "to be recycled";
                                        type = "to_be_recycle";
                                    } else {
                                        type = "manufactured";
                                    }
                                } else {
                                    if(confidence >= 0.75) {
                                        // to be repaired
                                        message = "to be repaired";
                                        type = "to_be_repaired";
                                    } else {
                                        // to be recycle
                                        message = "to be recycled";
                                        type = "to_be_recycle";
                                    }
                                }
                                txtMessage.setText(message);
                                break;
                            }
                        }
                    })
                    .addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(@NonNull Exception e) {
                            Snackbar.make(layout,"Failed to predict",Snackbar.LENGTH_LONG).show();
                        }
                    });

        } catch (IOException e) {
            e.printStackTrace();
            Snackbar.make(layout,"Failed to predict",Snackbar.LENGTH_LONG).show();
        }
    }

    private void updateDB(String _child) {
        mDatabase.child(_child).setValue(ServerValue.increment(1));
        if(_child.equals("to_be_recycle") || _child.equals("to_be_repaired")) {
            mDatabase.child("defected").setValue(ServerValue.increment(1));
        }

        Snackbar.make(layout,"Saved!",Snackbar.LENGTH_LONG).show();
        isNewOne = false;
    }
}