import { Component, OnInit } from '@angular/core';
import { EnlytmntService } from '../service/enlytmnt.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  counsellor_id: any;
  loginData: any;
  transactionData: any;
  isInserting: boolean;
  excelReport=[];
  SingleCheckArray=[];
  searchDDFilter:any='this week';
  fromDate:any;
  toDate:any;
  customdate: boolean;
  arrayCheck=[];
  p: number = 1;
  searchKey:any;
  statusCount: any;
  sortBy: any='1';
  rating: any='1';
  feedbackData: any;
  constructor(
    private enlytmntservice: EnlytmntService,
    private router: Router,
    private fb: FormBuilder,
    public datepipe: DatePipe
  ) {
    this.loginData = this.enlytmntservice.getLoginData();
    this.counsellor_id = this.loginData.id;
  }

  ngOnInit(): void {
    this.feedbackList();
  }
  feedbackList(){
    this.isInserting = true;
    const formData= new FormData();
    formData.append('counsellor_id','352');
    formData.append('min-date','');
    formData.append('max-date','');
    formData.append('rating','');
    formData.append('sort','');

    this.enlytmntservice.allFeedbackList(formData).subscribe(res=>{
       
      if(res.succ){
        this.isInserting=false;
        this.feedbackData = res.data;
      }else{
        this.feedbackData = res.data;
        this.isInserting = false;
      }
    },(error) => {
      console.error('Error in fetching home offer : ' + error);
      this.isInserting = false;
    });
  }

}
