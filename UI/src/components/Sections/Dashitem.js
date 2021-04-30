import React ,{useEffect,useState} from 'react';

import '../Sections/Dash.css';
import firebase from "firebase";


function Dashitem() {

    const database = firebase.database();

    const [defected,setDefected] = useState(0);
    const [manufactured,setManufactured] = useState(0);
    const [toBeRepaired,setToBeRepaired] = useState(0);
    const [toBeRecycle,setToBeRecycle] = useState(0);

    useEffect(()=> {

        database.ref("data/defected").on('value', (snapshot) => {
            const data = snapshot.val();
            setDefected(data);
        });

        database.ref("data/manufactured").on('value', (snapshot) => {
            const data = snapshot.val();
            setManufactured(data);
        });

        database.ref("data/to_be_recycle").on('value', (snapshot) => {
            const data = snapshot.val();
            setToBeRecycle(data);
        });

        database.ref("data/to_be_repaired").on('value', (snapshot) => {
            const data = snapshot.val();
            setToBeRepaired(data);
        });

    },[])

  return (
    <div className='cards1'>
    <ul className='cards1__items'>
    <div class="row">
    <div class="col-lg-3 col-md-6">
        <div class="panel panel-green">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-xs-3">
                        <i class="fa fa-cogs fa-5x"></i>
                    </div>
                    <div class="col-xs-9 text-right">
                        <div class="huge">{manufactured}</div>
                        <div>Manufactured</div>
                    </div>
                </div>
            </div>
            
                <div class="panel-footer">
                    <span class="pull-left">Per Day</span>
                    <span class="pull-right"><i class="fa  fa-hand-o-right"></i></span>
                    <div class="clearfix"></div>
                </div>
            
        </div>
    </div>
    <div class="col-lg-3 col-md-6">
        <div class="panel panel-red">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-xs-3">
                        <i class="fa  fa-exclamation-triangle fa-5x"></i>
                    </div>
                    <div class="col-xs-9 text-right">
                        <div class="huge">{defected}</div>
                        <div>Defected</div>
                    </div>
                </div>
            </div>
           
                <div class="panel-footer">
                    <span class="pull-left">Per Day</span>
                    <span class="pull-right"><i class="fa  fa-hand-o-right"></i></span>
                    <div class="clearfix"></div>
                </div>
            
        </div>
    </div>
    <div class="col-lg-3 col-md-6">
        <div class="panel panel-yellow">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-xs-3">
                        <i class="fa fa-wrench fa-5x"></i>
                    </div>
                    <div class="col-xs-9 text-right">
                        <div class="huge">{toBeRepaired}</div>
                        <div>To be Repaired</div>
                    </div>
                </div>
            </div>
         
                <div class="panel-footer">
                    <span class="pull-left">Per Day</span>
                    <span class="pull-right"><i class="fa  fa-hand-o-right"></i></span>
                    <div class="clearfix"></div>
                </div>
     
        </div>
    </div>
    <div class="col-lg-3 col-md-6">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-xs-3">
                        <i class="fa fa-recycle fa-5x"></i>
                    </div>
                    <div class="col-xs-9 text-right">
                        <div class="huge">{toBeRecycle}</div>
                        <div>To be Recycle</div>
                    </div>
                </div>
            </div>
           
                  <div class="panel-footer">
                          <span class="pull-left">Per Day</span>
                          <span class="pull-right"><i class="fa  fa-hand-o-right"></i></span>
                          <div class="clearfix"></div>
                      </div>
               
              </div>
          </div>
      </div>

</ul>

</div>
      
      
  );
}

export default Dashitem;