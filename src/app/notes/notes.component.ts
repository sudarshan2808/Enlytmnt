import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnlytmntService } from '../service/enlytmnt.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  externalForm: FormGroup;
  internalForm: FormGroup;
submitted:boolean=false
submitted1:boolean=false;
  loginData: any;
  counsellor_id: any;
  studentId: string;
  studentId1: string;
  notesData: any;
  notesDetails: string;
  isInserting:boolean=false;
  ShowList:boolean=true;
  SendNotes:boolean=false;
  Subject:any;
  internal_notes:any;
  external_notes:any;
  clientList: [];
  dob: any;
  constructor(private fb:FormBuilder,private enlytmntservice :EnlytmntService,private activateRoute:ActivatedRoute) { 
    this.studentId1 = this.activateRoute.snapshot.queryParamMap.get('student_id');
  this.studentId = decodeURI(atob(this.studentId1));
  }

  ngOnInit(): void {
        this.getUserClient();
    //this.submitExternalNotes();
    //this.saveInternalNotes();
    
    //  this.allNotesList();
    // this.externalForm =this.fb.group({
    //   ex_subject:['',Validators.required],
    //   ex_notes:['',Validators.required],
    // });

    // this.internalForm =this.fb.group({
    //   in_subject:['',Validators.required],
    //   in_notes:['',Validators.required],
    // });
  }
get f(){ return this.externalForm.controls};
get f1() { return this.internalForm.controls};


getUserClient(){                
  this.loginData = this.enlytmntservice.getLoginData();
  this.counsellor_id = this.loginData.id;
  
  this.enlytmntservice.getUserClients({counsellor_id:this.counsellor_id}).subscribe(res =>  {
  console.log(res.data);
    if(res.succ) {
      
         this.clientList = res.data;
         
        //  this.clientList.forEach(element => {
        //   if (element.dob) {
        //    const bdate = element.dob.split("-");
        //     let createdDate = new Date(bdate[2], bdate[1] - 1, bdate[0]);
        //   const timeDiff = (Math.abs(110 - Math.round(((new Date()).getTime() - createdDate.getTime()) / ( 1000 * 3600 * 24) / 365)));
        //     console.log( timeDiff)
        //     this.showage = timeDiff;
             
        //   }
        // });
         
        } else{
          
           this.clientList = [];
       }
      
      } , err => {
          
           this.clientList = [];
      }
    )

}




backToList(){
  this.ShowList=true;
  this.SendNotes=false;
}

submitExternalNotes(){

this.isInserting=true;
const formdata = new FormData();
formdata.append('counsellor_id','473');
formdata.append('student_id','4');
formdata.append('subject',this.Subject);
formdata.append('notes',this.external_notes);
formdata.append('status','1');
this.enlytmntservice.addNotes(formdata).subscribe(res =>{
  console.log(res);
if(res.succ){
  this.isInserting=false;
  alert("Exernal Notes Sent");
  this.SendNotes=false
  this.ShowList=true;
  // this.submitted=false;
  // this.externalForm.reset();
  // this.allNotesList();
}else{
  this.isInserting=false;
}
});
}
saveInternalNotes(){
  
  this.isInserting=true;
const formdata = new FormData();
formdata.append('counsellor_id','473');
formdata.append('subject',this.Subject);
formdata.append('notes',this.internal_notes);
formdata.append('status','0');
this.enlytmntservice.addNotes(formdata).subscribe(res =>{
  console.log(res);
if(res.succ){
  this.isInserting=false;
  alert("Internal Notes  saved");
  this.submitted1=false;
  this.SendNotes=false;
  this.ShowList=true;
  
  // this.internalForm.reset();
  // this.allNotesList();
}else{
  this.isInserting=false;
}
});
}
SaveNotes(){
   
if(this.internal_notes == "" || this.internal_notes == undefined || this.internal_notes == null ){
  if(this.external_notes == "" || this.external_notes == undefined || this.external_notes == null ){
    alert("Please fill Input fields");
    return;
  }else{
    this.submitExternalNotes();
  }
}
else if(this.external_notes == "" || this.external_notes == undefined || this.external_notes == null ){
  if(this.internal_notes == "" || this.internal_notes == undefined || this.internal_notes == null ){
  alert("Please fill Input fields");
  return;
}else{
  this.saveInternalNotes();
}
}
else{
  this.saveInternalNotes();
  this.submitExternalNotes();
 
}

}
// // allNotesList(){
// //   this.isInserting=true;
// //   const formdata = new FormData();
// // formdata.append('counsellor_id','473');
// //   this.enlytmntservice.NotesList(formdata).subscribe(res =>{
// //     console.log(res)
// //     if(res.succ){
      
// //       this.isInserting=false;
// //        this.notesData= res.data;
// //     }
// //     else{
// //       this.isInserting=false;
// //     }
// //     });
// }
listDetails(notes){
   
localStorage.setItem('notes',JSON.stringify(notes));
this.notesDetails =  JSON.parse(localStorage.getItem('notes'));
}
}
