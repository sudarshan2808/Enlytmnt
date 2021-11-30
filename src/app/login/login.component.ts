import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $:any;
import {AppleLoginService} from '../service/apple-login.service';
import {EnlytmntService} from '../service/enlytmnt.service';
import { Router, ActivatedRoute } from '@angular/router';
declare const AppleID : any;
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
  intervalOTP: number;
  timeLeftOTp: number= 60;
  disable:boolean=true;
  login_url: any;
  counsellorImage: any;
  LoginType: string;
  SignupType: string;
  constructor(private activatedRoute:ActivatedRoute, private router:Router,
    private enlytmntService:EnlytmntService,
    private appleLoginService:AppleLoginService,
    private authService: SocialAuthService,
    private formbuilder:FormBuilder) {

      this.activatedRoute.queryParams.subscribe(params => {
      this.login_url = params['code'];
      console.log(params); // Print the parameter to the console.
  });

    if(this.login_url == "" || this.login_url == null || this.login_url == undefined){
      this.LoginType="Login";
      this.SignupType="Signup";
    } else {
      // this.LoginType="Login As Counsellor";
      // this.SignupType="Login As Student";
      this.router.navigate(['/login_student'], {queryParams:{ 'login_code':encodeURI(btoa(this.login_url)) }});
      this.gerUserImage();
    }
  }

  ngOnInit(): void {
    this.password = 'password';
    this.LoginForm = this.formbuilder.group({
      emailPhone:['',Validators.required],
      password:['',Validators.required],
      // chkbox:[false,Validators.requiredTrue]
    });
    this.SignupForm = this.formbuilder.group({
      emailPhone:['',Validators.required],
      password:['',Validators.required]
    });
  }
    get f(){ return this.LoginForm.controls;}
    get f1(){ return this.SignupForm.controls;}
    get passwordValue() {
      return this.SignupForm.get('password');
    }

    onPasswordStrengthChanged(strength) {
      console.log('====================================');
      console.log('onPasswordStrengthChanged', strength);
      console.log('====================================');
    }
    gerUserImage(){
      const formdata = new FormData();
      formdata.append('token',this.login_url);
      this.enlytmntService.getUserPhoto(formdata).subscribe(res =>{

        if(res.succ){
          this.counsellorImage= res.data[0].image;
        }
      });
    }


    login() {
      this.submitted=true;

      if(this.LoginForm.invalid) {
        return false;
      }
      this.isInserting=true
      const formvalue = this.LoginForm.value;
      const formdata = new FormData();
      if (isNaN(formvalue.emailPhone)) {
        formdata.append('username',formvalue.emailPhone);
      // It is not a number
      } else{
        formdata.append('username',formvalue.emailPhone);
      }
        // formdata.append('email',formvalue.emailPhone);
        formdata.append('password',formvalue.password);
        // formdata.append('mobile1','');
        formdata.append('company','admin512');

        this.enlytmntService.counselorLogin(formdata).subscribe(res =>{

      if(res.succ) {
        this.isInserting=false;
        alert(res.public_msg);

        this.Logindata= res.data.userData;
        this.enlytmntService.setLoginData(this.Logindata);
        localStorage.setItem('loginSignupValue',formvalue.emailPhone);
        this.enlytmntService.setLoginObservable(this.Logindata);
        this.enlytmntService.setControlStatus(this.Logindata.control_status);
        localStorage.setItem('socialLogin','false');

        if(this.Logindata.control_status == 0) {
          this.router.navigate(['/counsellor_Application']);
        } else {
          this.router.navigate(['/home']);
        }
      } else{
          this.isInserting=false;
          alert(res.public_msg);
        }
      });
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
        `client_id=${'com.enlytmnt.counsellor.in'}&` +
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

  paswordClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
}
