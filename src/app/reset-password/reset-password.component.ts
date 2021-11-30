import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MustMatch } from 'src/helper/must-match-validators';
import { EnlytmntService } from '../service/enlytmnt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  ResetForm: FormGroup;
  submitted:boolean=false;
  password: any ='password';
  conpassword: any ='password';
  show: boolean;
  isInserting:boolean=false;
  show1: boolean;
  pass_token: any;
  constructor(private router:Router,private fb:FormBuilder,private enlytmntService:EnlytmntService,private activatedRoute: ActivatedRoute) { 
    
    this.activatedRoute.queryParams.subscribe(params => {
      this.pass_token = params['reset_password_token'];
      console.log(params); // Print the parameter to the console. 
  });
  }

  ngOnInit(): void {
    this.ResetForm = this.fb.group({
      password:['',Validators.required],
      confirmPassword:['',Validators.required]
    },{
      validators:MustMatch('password','confirmPassword')
    });
  }
  get f(){ return this.ResetForm.controls;}
  resetPassword(){
this.submitted=true;
if(this.ResetForm.invalid){
  return false;
}
this.isInserting=true;
const formvalue =this.ResetForm.value;
const formdata =  new FormData();
 
formdata.append('reset_password_token',localStorage.getItem('forgotOtp'));
formdata.append('password',formvalue.password);
formdata.append('re_password',formvalue.confirmPassword);

 
this.enlytmntService.resetForgotPassword(formdata).subscribe(res=>{
   
  if(res.succ){
    this.isInserting=false;
    alert(res.public_msg);
    this.router.navigate(['/login']);
  }
  else{
    alert(res.public_msg);
    this.isInserting=false;
  }
});
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
  conpaswordClick(){
    if (this.conpassword === 'password') {
      this.conpassword = 'text';
      this.show1 = true;
    } else {
      this.conpassword = 'password';
      this.show1 = false;
    }
  }
}
