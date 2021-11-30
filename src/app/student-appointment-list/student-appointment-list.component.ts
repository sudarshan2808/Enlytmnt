import { Component, OnInit } from '@angular/core';
import { EnlytmntService } from '../service/enlytmnt.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-student-appointment-list',
  templateUrl: './student-appointment-list.component.html',
  styleUrls: ['./student-appointment-list.component.css']
})
export class StudentAppointmentListComponent implements OnInit {

   service:boolean = true;
  first_name: any;
  last_name:any;
  appointment_id: number;
  service_type: any;
  counsellor_id: any;
  loginData: any;
  fromDate: any = '';
  totalClients = 0;
  clientList = [];
  clientData =  '';
  toDate: any = '';
  customdate: boolean;
  searchDDFilter: any = '';
  show: boolean = false;
  config: any;
  collection = { count: 60, data: [] };
  past: boolean = true;
  hidelist: boolean = true;
  p: number;
  dob: any;
  age: number;
  date_var: number;
  showage: number;
 

  constructor( private enlytmentservice: EnlytmntService,
    public datepipe: DatePipe ) {



  }

   /*
  pageChanged(event) {
    this.config.currentPage = event;
    
    for (var i = 0; i < this.collection.count; i++) {
      this.collection.data.push(
        {
          id: i + 1,
          value: "items number " + (i + 1)
        }
      );
    }
    this.config = {
      itemsPerPage: 5,
      currentPage: 4,
      totalItems: this.collection.count
    };
  }
  */
  ngOnInit(): void {
    this.getUserClient();
  }

  Service(){
    this.past = this.past;
    this.hidelist  = !this.hidelist;
  }

  toggle() {
    this.show = !this.show;
  }
  getservice(){
    this.service = this.service;
  }
  // dateData(){

  //   const formData= new FormData();
  //   let formDate =this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
  //   let toDate =this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
  //    formData.append('counsellor_id','511');
  //   formData.append('min-date',formDate);
  //   formData.append('max-date',toDate);
      
  //   this.enlytmentservice.getUserClients(formData).subscribe(res=>{
  //     if(res.succ){
        
  //       this.clientList = res.data;
      
  //     }else{
  //       this.clientList = [];
  //      ;
  //     }
  //   },(error) => {
  //     console.error('Error in fetching home offer : ' + error);
   
  //   });
  // }

  getUserClient(){                
    this.loginData = this.enlytmentservice.getLoginData();
    this.counsellor_id = this.loginData.id;
    this.enlytmentservice.getUserClients({counsellor_id:this.counsellor_id}).subscribe(res =>  {
    console.log(res.data);
      if(res.succ) {
           this.totalClients = res.data.total_clients;
           this.clientList = res.data;
           console.log('userClientList' + this.clientList);

           this.clientList.forEach(element => {
            if (element.dob) {
             const bdate = element.dob.split("-");
              let createdDate = new Date(bdate[2], bdate[1] - 1, bdate[0]);
            const timeDiff = (Math.abs(110 - Math.round(((new Date()).getTime() - createdDate.getTime())/ ( 1000 * 3600 * 24) / 365)));
              console.log( timeDiff)
              this.showage = timeDiff;
               
            }
          });
           
          } else{
             this.totalClients = 0;
             this.clientList = [];
         }
        
        } , err => {
             this.totalClients = 0;
             this.clientList = [];
        }
      )

  }

  filterSearch(event) {
    if (event.target.value == 'Custom range') {
      this.customdate = true;
    } else {
      this.fromDate = '';
      this.toDate = '';
      this.customdate = false;
    }
  }

}
