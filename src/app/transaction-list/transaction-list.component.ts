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
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
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
    this.transactionList();
  }

  transactionList(){
    this.isInserting = true;
    const formData= new FormData();
    formData.append('counsellor_id','352');
    formData.append('min-date','');
    formData.append('max-date','');
    this.enlytmntservice.allTransactionList(formData).subscribe(res=>{
      if(res.succ){
        this.isInserting=false;
        this.transactionData = res.data;
        this.statusCount=res.count;
      }else{
        this.transactionData = res.data;
        this.isInserting = false;
      }
    },(error) => {
      console.error('Error in fetching home offer : ' + error);
      this.isInserting = false;
    });
  }
  dateRangeData(){
    this.isInserting = true;
    const formData= new FormData();
    let formDate =this.datepipe.transform(this.fromDate, 'dd-MM-yyyy');
    let toDate =this.datepipe.transform(this.toDate, 'dd-MM-yyyy');

    formData.append('counsellor_id','352');
    formData.append('min-date',formDate);
    formData.append('max-date',toDate);
      
    this.enlytmntservice.allTransactionList(formData).subscribe(res=>{
      if(res.succ){
        this.isInserting=false;
        this.transactionData = res.data;
        this.statusCount=res.count;
      }else{
        this.transactionData = [];
        this.statusCount=[];
        this.isInserting = false;
      }
    },(error) => {
      console.error('Error in fetching home offer : ' + error);
      this.isInserting = false;
    });
  }
  exportAsXLSX(): void {
    this.excelReport = [];
    var excel = {};
    this.transactionData.forEach(element => {
      excel = {};
      excel['Transaction ID'] = element.id;
      excel['Student ID'] = element.student_id;
      excel['Transaction Name'] = element.student_name;
      excel['Transaction Status'] = element.status;
      excel['Transaction Date'] = element.date;
      excel['Transaction Amount'] = element.amount;
     
      this.excelReport.push(excel);
    });
    this.exportAsExcelFile(this.excelReport, 'Transaction_report');
    // this.excelService.exportChequeTxtFile(this.excelReport, 'cheq')
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  singleCheck(e,id,i){
     
if(e.target.checked){

  this.SingleCheckArray.push(+(id));
   
}else{
  // this.SingleCheckArray.splice(i, 1);
  this.SingleCheckArray = this.SingleCheckArray.filter(item => item != id);
   
}
console.log(JSON.stringify(this.SingleCheckArray))
const multi_prov_id =Array.prototype.map.call(this.SingleCheckArray, function(item) { return item; }).join(",");
this.arrayCheck=[];
this.arrayCheck.push(multi_prov_id);

  }
  deletetransactionList(){
    this.isInserting=true;
    const formData = new FormData();
    const data={};
     
    data['ids']=this.SingleCheckArray;
    console.log(data);
formData.append('ids',JSON.stringify(data));
 
this.enlytmntservice.deleteTransactionList(formData).subscribe(res =>{
  if(res.succ){
     this.isInserting=false;
    this.transactionList();
    
  }else{
    this.isInserting=false;
  }
})
  }
  filterSearch(event){
    if(event.target.value == 'Custom range'){
    this.customdate=true;
    }else{
      this.transactionList();
      this.customdate=false;
    }
  }
  checkAllList(e){
    if(e.target.checked){
    this.transactionData.forEach(element => {
    this.SingleCheckArray.push(+(element.id));
    });
  }else{
    this.SingleCheckArray=[];
  }
  }
}
