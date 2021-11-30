import { Component, OnInit } from '@angular/core';
import { EnlytmntService } from '../service/enlytmnt.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-counsellor-profile',
  templateUrl: './counsellor-profile.component.html',
  styleUrls: ['./counsellor-profile.component.css']
})
export class CounsellorProfileComponent implements OnInit {
  loginData: any;
  counsellor_id: any;
  isInserting: boolean;
  counsellor_data: any;
  educationLength: any;
  counsellor_name: string;
  expertiseArea: any;
  expertiseArray: any;
  ProfileSummary: any;
  age: number;
  educationArray: any;
  degree_certificate: any;
  degree_certificateArray: any;
  refferalCode: any;
  login_url: any;

  constructor( private enlytmntservice:EnlytmntService,private router:Router,private fb:FormBuilder) { 
    this.loginData = this.enlytmntservice.getLoginData();
    this.counsellor_id = this.loginData.id;
    this.refferalCode = this.loginData.referral_code;
   
    // this.getcounsellorByid();
    this.getcounsellorAllDataByid();
  }

  ngOnInit(): void {
  }
 

  getcounsellorAllDataByid(){
    this.isInserting = true;
    this.enlytmntservice.CounsellorFullData(this.counsellor_id).subscribe(res=>{
  if(res.succ){
            
    this.isInserting = false;   
   this.counsellor_data= res.data.res[0]; 
  
  //  this.educationLength = res.data.education.length;
    this.ProfileSummary = this.counsellor_data[0].summary;
    var timeDiff = Math.abs(Date.now() - new Date(this.counsellor_data[0].dob).getTime());
    this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  
   this.counsellor_name = this.counsellor_data[0].first_name +' '+  this.counsellor_data[0].last_name;

   this.educationArray = this.counsellor_data.education;
   this.degree_certificate = this.counsellor_data[0].degree_certificate;
   
   this.expertiseArea = this.counsellor_data[0].expertise_area;
   this.expertiseArray = this.expertiseArea.split(',');

  this.isInserting = false;
  }
  else{
    this.isInserting = false;
  }
    });
  }

  async downloadPDF(pdf) {
    //(click)="downloadPDF(word_document)"
      
    const win = window.open("http://65.2.9.193/assets/degree/"+pdf, "_blank");
    let html = '';
  
    html += '<html>';
    html += '<body style="margin:0!important">';
    html += '<embed width="100%" height="100%" src="' + pdf + '"/>';
    html += '</body>';
    html += '</html>';
  
    setTimeout(() => {
      win.document.write(html);
    }, 0);
  }
  fileDownoad(base64, filename) {
      
    const linkSource = base64;
    const downloadLink = document.createElement("a");
    const fileName = filename;
  
    downloadLink.href = linkSource;
    downloadLink.download =  fileName;
    downloadLink.click();
  }
}
