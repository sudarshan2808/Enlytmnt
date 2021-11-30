import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EnlytmntService } from '../service/enlytmnt.service';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const TEXT_TYPE = 'text/json;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const TEXT_EXTENSION = '.txt';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  counsellor_id: any;
  loginData: any;
  transactionData: any;
  isInserting: boolean;
  excelReport=[];
  SingleCheckArray=[];
  searchDDFilter:any='';
  fromDate:any='';
  toDate:any='';
  customdate: boolean;
  arrayCheck=[];
  p: number = 1;
  searchKey:any;
  statusCount: any;
  sortBy: any='';
  rating: any='';
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
    const formData = new FormData();
    formData.append('counsellor_id','352');
    formData.append('min-date', this.fromDate);
    formData.append('max-date', this.toDate);
    formData.append('rating', this.rating);
    formData.append('sort', this.sortBy);


    if (formData.get('min-date')) {
      formData.append('min-date', this.converDateIntoDDMMYYYY(this.fromDate));
    }
    if (formData.get('max-date')) {
      formData.append('max-date', this.converDateIntoDDMMYYYY(this.toDate));
    }
    this.enlytmntservice.allFeedbackList(formData).subscribe(res=> {
    console.log(res);
      if (res.succ) {
        this.isInserting = false;
        this.feedbackData = res.data;
        this.feedbackData.forEach(element => {
          if (element.created_at) {
            const date_var = element.created_at.split("-");
            let createdDate = new Date(date_var[2], date_var[1] - 1, date_var[0]);
            let daysDiff = Math.round(((new Date()).getTime() - createdDate.getTime()) / (1000 * 60 * 60 *24))
            
           

           if (daysDiff < 30) {
              element['days'] = daysDiff + ' days ago.'
            } else{
              element['createdDate'] = createdDate;
            }
          }
        });
      } else {
        this.feedbackData = res.data;
        this.isInserting = false;
      }
    }, (error) => {
      console.error('Error in fetching home offer : ' + error);
      this.isInserting = false;
    });
  }

  filterSearch(event){
    if (event.target.value == 'Custom range') {
      this.customdate = true;
      this.fromDate = '';
      this.toDate = '';
    } else if (event.target.value == 'this week') {
      this.toDate = new Date();
      this.fromDate = new Date();
      this.fromDate.setDate(this.fromDate.getDate() - 7);
      this.feedbackList();
      this.customdate = false;
    } else if (event.target.value == 'this month') {
      this.toDate = new Date();
      this.fromDate = new Date();
      this.fromDate.setDate(this.fromDate.getDate() - 30);
      this.feedbackList();
      this.customdate = false;
    } else {
      this.fromDate = '';
      this.toDate = '';
      this.feedbackList();
      this.customdate = false;
    }
  }

  converDateIntoDDMMYYYY(date: Date) {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = '' + date.getFullYear();
    if (day.length === 1) {
      day = '0' + day;
    }
    if (month.length === 1) {
      month = '0' + month;
    }
    return day + '-' + month + '-' + year;
  }
}
