import { Component, OnInit } from '@angular/core';
import { EnlytmntService } from '../service/enlytmnt.service';
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  control_status: any;
  Status_msg: string;
  applied:any=false;
  approve:boolean=false;
  counsellor_login_id: any;
  loginData: any;
  crossbtn:boolean=false;
  isInserting:boolean=false;
  constructor(private enlytmntservice:EnlytmntService) { 
    this.loginData = this.enlytmntservice.getLoginData();
    this.counsellor_login_id=this.loginData.id;
    this.AppliactionformStatus();         
   this.control_status =  this.enlytmntservice.getControlStatus();
   
  }

  ngOnInit(): void {

    $("#DashPopup").modal('show');
  }
  closemodal(){
    $("#DashPopup").modal('hide');
  }
AppliactionformStatus(){
  this.isInserting=true;
  const formdata = new FormData();
  formdata.append('counsellor_id',this.counsellor_login_id);
  this.enlytmntservice.formStatus(formdata).subscribe(res=>{
    if(res.succ){
           
this.control_status=res.control_status;
if(this.control_status == 'Applied'){
  this.applied=true;
  this.Status_msg="Your Profile is under review";
  this.isInserting=false;
}
else if(this.control_status == 'Under Review' || this.control_status == 'Mark for Later'){
  this.applied=false;
  this.Status_msg="Your Profile is under review";
  this.isInserting=false;
}
else if(this.control_status == "Approved"){
  this.approve=true;
  this.Status_msg="Hurray! Your profile has been approved.";
  this.isInserting=false;
}
else if(this.control_status == "Rejected"){
  this.Status_msg="Your profile has not been approved at this time. We encourage you to try again after 3 months";
  this.isInserting=false;
}
else if(this.control_status == "Listed Counsellor"){
  this.crossbtn=true;
  this.Status_msg="Your profile has not been Short Listed.";
  this.isInserting=false;
}
else{
  this.isInserting=false;
  this.crossbtn=false;
}
this.isInserting=false;
    }
    else{
      this.isInserting=false;
    }
  });
}

}

