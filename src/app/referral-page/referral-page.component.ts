import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnlytmntService } from '../service/enlytmnt.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-referral-page',
  templateUrl: './referral-page.component.html',
  styleUrls: ['./referral-page.component.css']
})
export class ReferralPageComponent implements OnInit {
  referralForm: FormGroup;
  submitted: boolean;
  loginData: any;
  counsellor_id: any;
  isInserting: boolean;
  refferalCode: any;
  sentlist: any;
  acceptedlist: any;

  constructor(private toastr: ToastrService,private fb:FormBuilder, private enlytmntservice:EnlytmntService) {
    this.loginData = this.enlytmntservice.getLoginData();
    this.counsellor_id = this.loginData.id;
    this.refferalCode = this.loginData.referral_code;
   }

  ngOnInit(): void {
    this.referralForm=this.fb.group({
      name:['',Validators.required],
      email:[''],
      phoneno:['',Validators.required]
    });
    this.sentRefferalList();
    this.acceptedRefferalList();
  }
  get f(){ return this.referralForm.controls; }
  sendRefferal(){
    this.submitted=true;
    if(this.referralForm.invalid){
      return false;
    }
    this.isInserting=true;
    const formvalue=this.referralForm.value;
    const formdata= new FormData();
    formdata.append('counsellor_id',this.counsellor_id);
    formdata.append('name',formvalue.name);
    formdata.append('email',formvalue.email);
    formdata.append('mobile',formvalue.phoneno);
    this.enlytmntservice.referrFriend(formdata).subscribe(res=>{
      if(res.succ){
        this.sentRefferalList();
        this.submitted=false;
        this.referralForm.reset();
        alert(res.message);
        this.isInserting=false;
       
      }else{
        alert(res.message);
        this.isInserting = false;
      }
    },(error) => {
      console.error('Error in fetching home offer : ' + error);
      this.isInserting = false;
    });
  }
  copyInputMessage(inputElement){
      
    inputElement.select();
     document.execCommand('copy');
     inputElement.setSelectionRange(10,10);
     if(document.execCommand('copy')){
       this.toastr.success('Copied To Clipboard!');
     }else{
       this.toastr.error('Not Copied');
     }
     
   }
   sentRefferalList(){
  
    this.isInserting=true;
    const formdata= new FormData();
    formdata.append('counsellor_id','467');
    this.enlytmntservice.sentreferrFriendList(formdata).subscribe(res=>{
      if(res.succ){
        this.sentlist = res.data;
        // alert(res.message);
        this.isInserting=false;
       
      }else{
        alert(res.message);
        this.isInserting = false;
      }
    },(error) => {
      console.error('Error in fetching home offer : ' + error);
      this.isInserting = false;
    });
  }
  acceptedRefferalList(){
  
    this.isInserting=true;
    const formdata= new FormData();
    formdata.append('counsellor_id','467');
    this.enlytmntservice.acceptedreferrFriendList(formdata).subscribe(res=>{
      if(res.succ){
        this.acceptedlist = res.data;
        // alert(res.message);
        this.isInserting=false;
       
      }else{
        alert(res.message);
        this.isInserting = false;
      }
    },(error) => {
      console.error('Error in fetching home offer : ' + error);
      this.isInserting = false;
    });
  }
}
