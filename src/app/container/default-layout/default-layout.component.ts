import { Component, OnInit } from '@angular/core';
import { EnlytmntService } from 'src/app/service/enlytmnt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  loginData: any;
  counsellor_name: any;
  application_data: any;
  counsellor_id: any;
  counsellor_data: any;
  isInserting: boolean;
  counsellor_data1: any;

  constructor(private enlytmntservice:EnlytmntService,private router:Router) { 
    this.loginData = this.enlytmntservice.getLoginData();
   
    this.counsellor_id = this.loginData.id;
  }

  ngOnInit(): void {
     this.getcounsellorByid();
     this.getcounsellorAllDataByid();
  }
 getcounsellorByid(){
   this.enlytmntservice.getCounsellor(this.counsellor_id).subscribe(res=>{
if(res.succ){
       
  this.counsellor_data= res.data[0]; 
  this.counsellor_name = this.counsellor_data.first_name;
}
   },error => {
    console.error('Error in fetching home offer : ' + error);
    this.isInserting = false;
    
  });
 }
 getcounsellorAllDataByid(){
  this.isInserting = true;
  this.enlytmntservice.CounsellorFullData(this.counsellor_id).subscribe(res=>{
if(res.succ){
          
  this.isInserting = false;   
 this.counsellor_data1= res.data.res[0]; 


this.isInserting = false;
}
else{
  this.isInserting = false;
}
  },error => {
    console.error('Error in fetching home offer : ' + error);
    this.isInserting = false;
    
  });
}

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
