import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnlytmntService } from '../service/enlytmnt.service';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
submitted:boolean=false;
isInserting:boolean=false;
timeLeft: number = 300;
interval;
show = false;
password: string;
intervalOTP: any;
timeLeftOTp: number= 60;
  disable: boolean=true;
  resendotpData: any;
  emailNo: any;
  constructor(private router:Router,private fb:FormBuilder, private enlytmntService:EnlytmntService) { }

  ngOnInit(): void {
    this.forgotForm=this.fb.group({
      emailPhone:['',Validators.required]
    });
  }
  get f(){ return this.forgotForm.controls;}
  sendEmail(){
     
    this.submitted=true;
    if(this.forgotForm.invalid){
      return false;
    }
    this.isInserting=true;
    const formvalue =this.forgotForm.value;
    const formdata =  new FormData();
    formdata.append('email',formvalue.emailPhone);
     
    this.enlytmntService.forgotPassword(formdata).subscribe(res=>{
       
      if(res.succ){
        this.emailNo=formvalue.emailPhone
        this.isInserting=false;
        alert(res.public_msg);
        this.showModal();
        this.startTimerOtp();
this.startTimerResendOtp();
      }
      else{
        this.isInserting=false;
      }
    });
  }
  startTimerOtp() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 300;
      }
    },1000)
  }

  startTimerResendOtp() {
    this.intervalOTP = setInterval(() => {
      if(this.timeLeftOTp > 0) {
        this.timeLeftOTp--;
      } else {
        // this.resendOtp();
        this.disable=false;
        // this.timeLeftOTp = 60;
      }
    },1000)
  }

  resendOtp(){
    this.isInserting=true
    const formdata = new FormData();
    const formvalue = this.forgotForm.value;
    formdata.append('email',formvalue.emailPhone)
    this.enlytmntService.forgotPassword(formdata).subscribe(res=>{
        
      if(res.succ){
        this.isInserting=false
        this.disable=true;
        this.timeLeftOTp=60;
        this.resendotpData = res;
      }else{
        this.isInserting=false;
      }
    });
  }
  showModal(){
    $("#OtpModal").modal('show');
  }
closeModal()
{
  $("#OtpModal").modal('hide');
}
verifyOtp(){
  const otp = $("#otp_code").val();

  if(otp == "" || otp == null){
    $("#otp_error").text("Otp is required");
    return false;
  }
  else{ 
    $("#otp_error").text("");
  }
  
    this.isInserting=true;
    const formdata =  new FormData();
     
    formdata.append('reset_password_token',otp);
    formdata.append('username',this.emailNo);
     
    this.enlytmntService.verifyForgotPassowrdOtp(formdata).subscribe(res=>{
       
      if(res.succ){
        this.isInserting=false;
        alert(res.public_msg);
        localStorage.setItem('forgotOtp',otp);
        this.closeModal();
        this.router.navigate(['/reset_password']);
      }
      else{
        alert(res.public_msg);
        this.isInserting=false;
      }
    });
      
} 
}
