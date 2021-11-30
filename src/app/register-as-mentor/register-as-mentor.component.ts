import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $:any;
import {AppleLoginService} from '../service/apple-login.service';
import {EnlytmntService} from '../service/enlytmnt.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
declare const AppleID : any;
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-register-as-mentor',
  templateUrl: './register-as-mentor.component.html',
  styleUrls: ['./register-as-mentor.component.css']
})
export class RegisterAsMentorComponent implements OnInit {
  LoginForm: FormGroup;
  submitted:boolean=false;
  Registerdata: any;
  isInserting: boolean;
  signupdata: any;
  emailNo: any;
  verifyotpData: any;
  resendotpData: any;
  Logindata: any;
  SignupForm: FormGroup;
  counsellor_id: any;
  submitted1: boolean;
  timeLeft: number = 300;
  interval;
  show = false;
  password: string;
  intervalOTP: any;
  timeLeftOTp: number= 60;
  disable:boolean=true;
  popupChk:any;
  edit_emailPhone:any;
  showNo:boolean=true;
  showBox:boolean=false;
  edi_field: any;
  verifyData: any;
  constructor(private http:HttpClient,
    private router:Router,
    private enlytmntService:EnlytmntService,
    private appleLoginService:AppleLoginService,
    private authService: SocialAuthService,
    private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.password = 'password';

    this.SignupForm = this.formbuilder.group({
      emailPhone:['',Validators.required],
      password:['',Validators.required],
      chkbox:[false,Validators.requiredTrue]
    });
  }
  get f1(){ return this.SignupForm.controls;}
  get passwordValue() {
    return this.SignupForm.get('password');
  }


  SendOtp(){
    this.submitted1=true;
  if(this.SignupForm.invalid){
    return false;
  }
const formvalue = this.SignupForm.value;
this.edi_field = this.edit_emailPhone;

if(this.edi_field == undefined || this.edi_field == null  || this.edi_field == "" ){


}else{
  formvalue.emailPhone = this.edi_field;
}

this.isInserting=true;

const formdata = new FormData();
formdata.append('username',formvalue.emailPhone)
this.enlytmntService.sendOtp(formdata).subscribe(res =>{

  if(res.succ){

this.isInserting=false;
this.emailNo = formvalue.emailPhone;
this.showNo=true;
this.showBox=false;
this.timeLeftOTp = 60;
this.timeLeft= 300;
$("#otp_code").val('');
this.showModal();
this.startTimerOtp();
this.startTimerResendOtp();
  }else{
    this.isInserting=false;
  }
});
  }



  Signup(){

  this.isInserting=true;
  const formvalue = this.SignupForm.value;
  const formdata = new FormData();
  if (isNaN(formvalue.emailPhone)) {

    formdata.append('email',formvalue.emailPhone);
    formdata.append('mobile1','');
    // It is not a number
  }
  else{
    formdata.append('mobile1',formvalue.emailPhone);
    formdata.append('email','');
  }
  // formdata.append('email',formvalue.emailPhone);
  formdata.append('password',formvalue.password);
  // formdata.append('mobile1','');
  formdata.append('first_name','');
  formdata.append('last_name','');
  formdata.append('branch_id','1');
  formdata.append('role_id','2049');
  formdata.append('verify',this.verifyData.verify);
  formdata.append('username',formvalue.emailPhone);
  this.enlytmntService.counselorSignup(formdata).subscribe(res =>{

    if(res.succ){
      this.isInserting=false;
      this.signupdata= res.data;
      this.counsellor_id = this.signupdata.id;
      this.emailNo = formvalue.emailPhone;

      this.showModal();
      this.startTimerOtp();
      this.startTimerResendOtp()
    }
    else{
      this.isInserting=false;
      alert(res.public_msg);
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


  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x =>{

      console.log(x);

        const formData = new FormData();
        formData.append('first_name',x.firstName);
        formData.append('last_name',x.lastName);
        formData.append('phone','');
        formData.append('email', x.email);
        formData.append('uniqid', x.id);
        formData.append('type', 'google');
        formData.append('role_id','2049');
        this.enlytmntService.counselorSocialSignup(formData).subscribe(res => {

          if (res.succ) {

            this.Registerdata = res.data;

            this.enlytmntService.setLoginData(this.Registerdata);
            this.enlytmntService.setLoginObservable(this.Registerdata);
            this.enlytmntService.setLoginTypeObservable('user');
            this.enlytmntService.setSocailLoginData(x);
            localStorage.setItem('currentUser','true');
            localStorage.setItem('socialLogin','true');
            this.enlytmntService.setControlStatus(this.Registerdata.control_status);
            if(this.Registerdata.control_status == 0){
              this.router.navigate(['/counsellor_Application']);
            }
            else{
              this.router.navigate(['/home']);
            }
            // this.openAlertBox(res.message).afterClosed().subscribe(res1 => {
            //   if (res1) {


            //     this.router.navigate(['/']);
            //   }
            // });
            // alert(res.message);

            this.isInserting = false;

            // this.router.navigate(['/']);
          }
          else {
            // this.openAlertBox(res.message).afterClosed().subscribe(res1 => {
            //   if (res1) {
            //     return;
            //    }
            // });

          }
        }, error => {
          console.error('Error in fetching home offer : ' + error);
          this.isInserting = false;

        });
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x =>{

      console.log(x);

      const formData = new FormData();
      formData.append('first_name','');
      formData.append('last_name','');
      formData.append('phone','');
      formData.append('email', x.email);
      formData.append('uniqid', x.id);
      formData.append('type', 'facebook');
      formData.append('role_id','2049');
      this.enlytmntService.counselorSocialSignup(formData).subscribe(res => {

        if (res.succ) {

          this.Registerdata = res.data;
          this.enlytmntService.setLoginData(this.Registerdata);
          this.enlytmntService.setLoginObservable(this.Registerdata);
          this.enlytmntService.setLoginTypeObservable('user');
          this.enlytmntService.setSocailLoginData(x);
          localStorage.setItem('currentUser','true');
          localStorage.setItem('socialLogin','true');
          this.enlytmntService.setControlStatus(this.Registerdata.control_status);
          if(this.Registerdata.control_status == 0){
            this.router.navigate(['/counsellor_Application']);
          }
          else{
            this.router.navigate(['/home']);
          }
          // this.openAlertBox(res.message).afterClosed().subscribe(res1 => {
          //   if (res1) {


          //     this.router.navigate(['/']);
          //   }
          // });
        }
        else {
          this.isInserting = false;
          alert(res.message);

        }
      }, error => {
        console.error('Error in fetching home offer : ' + error);
        this.isInserting = false;

      });
    });
  }
  signInWithApple1() {
    window.open(
      'https://appleid.apple.com/auth/authorize?' +
        `client_id=${'com.in.enlytmnt.counsellor'}&` +
        `redirect_uri=${encodeURIComponent('https://appicsoftwares.in/enlytmnt/')}&` +
        'response_type=code id_token&' +
        'scope=name email&' +
        'response_mode=form_post',
      '_blank',
    );

  }
  signInWithApple(){
     AppleID.auth.signIn().then(response=> {

      console.log("response", response);

      let tokenInfo = this.getDecodedAccessToken(response.authorization.id_token);
      console.log(tokenInfo);

      const formData = new FormData();
        formData.append('first_name','');
        formData.append('last_name','');
        formData.append('phone','');
        formData.append('email', tokenInfo.email);
        formData.append('uniqid', response.authorization.code);
        formData.append('type', 'apple');
        formData.append('role_id','2049');

        this.enlytmntService.counselorSocialSignup(formData).subscribe(res => {

          if (res.succ) {

            this.Registerdata = res.data;

            this.enlytmntService.setLoginData(this.Registerdata);
            this.enlytmntService.setLoginObservable(this.Registerdata);
            this.enlytmntService.setLoginTypeObservable('user');
            this.enlytmntService.setSocailLoginData(tokenInfo);
            localStorage.setItem('currentUser','true');
            localStorage.setItem('socialLogin','true');
            this.enlytmntService.setControlStatus(this.Registerdata.control_status);
            if(this.Registerdata.control_status == 0){
              this.router.navigate(['/counsellor_Application']);
            }
            else{
              this.router.navigate(['/home']);
            } this.isInserting = false;

            // this.router.navigate(['/']);
          }
          else {
            // this.openAlertBox(res.message).afterClosed().subscribe(res1 => {
            //   if (res1) {
            //     return;
            //    }
            // });

          }
        }, error => {
          console.error('Error in fetching home offer : ' + error);
          this.isInserting = false;

        });
    }, function(err) {
      console.error(err);
    });
  }
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
  ngAfterViewChecked(): void {
      AppleID.auth.init({
        clientId : 'com.in.enlytmnt.counsellor',
        scope : 'name email',
        redirectURI: 'https://appicsoftwares.in/enlytmnt/',
        usePopup : true
      });

  }
  signOut(): void {
    this.authService.signOut();
  }
  verifyOtp(){
    const otp = $("#otp_code").val();
    const chek =this.popupChk;

    if(otp == "" || otp == null){
      $("#otp_error").text("Otp is required");
      return false;
    }
    else{
      $("#otp_error").text("");
    }
    if(chek == undefined || chek == false){
      $("#chk_error").text("Checkbox is required");
      return false;
    }
    else{
      $("#chk_error").text("");
    }
    const formvalue = this.SignupForm.value;
    this.isInserting=true;
    const formdata = new FormData();
    formdata.append('username',formvalue.emailPhone)
    formdata.append('otp',otp)
    this.enlytmntService.verifyOtp(formdata).subscribe(res=>{

      if(res.succ){
        this.isInserting=true;
        this.verifyData = res.data;
        const formvalue = this.SignupForm.value;
const formdata = new FormData();
if (isNaN(formvalue.emailPhone)) {

  formdata.append('email',formvalue.emailPhone);
  formdata.append('mobile1','');
	// It is not a number
}
else{
  formdata.append('mobile1',formvalue.emailPhone);
  formdata.append('email','');
}
// formdata.append('email',formvalue.emailPhone);
formdata.append('password',formvalue.password);
// formdata.append('mobile1','');
formdata.append('first_name','');
formdata.append('last_name','');
formdata.append('branch_id','1');
formdata.append('role_id','2049');
formdata.append('verify',this.verifyData.verify);
formdata.append('username',formvalue.emailPhone);
this.enlytmntService.counselorSignup(formdata).subscribe(res =>{

  if(res.succ){
    this.isInserting=false;
    this.signupdata= res.data;
   this.counsellor_id = this.signupdata.id;
    this.emailNo = formvalue.emailPhone;
    this.closeModal();
        this.verifyotpData = res;
        this.enlytmntService.setControlStatus(this.signupdata.control_status);
        this.enlytmntService.setLoginData(this.signupdata);
        this.enlytmntService.setLoginObservable(this.signupdata);
        localStorage.setItem('loginSignupValue',formvalue.emailPhone);
        localStorage.setItem('socialLogin','false');
    if(this.signupdata.control_status == 0){
      this.router.navigate(['/counsellor_Application']);
    }
    else{
      this.router.navigate(['/home']);
    }
        this.router.navigate(['/counsellor_Application'])
    // this.showModal();
    // this.startTimerOtp();
    // this.startTimerResendOtp()
  }
  else{
    this.isInserting=false;
    alert(res.public_msg);
  }
});
}
      else{
        this.isInserting=false;
        alert(res.message);
      }
    });
  }
  resendOtp(){
    this.isInserting=true
    const formdata = new FormData();
    const formvalue = this.SignupForm.value;
    formdata.append('username',formvalue.emailPhone)
    this.enlytmntService.resendOtp(formdata).subscribe(res=>{

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
  paswordClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
  showEditInput(){
    this.edit_emailPhone="";
    this.timeLeftOTp=60;
    this.disable=true;
this.showBox=true;
this.showNo=false;
  }
}
