import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EnlytmntService } from '../service/enlytmnt.service';

@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.css']
})
export class NotesDetailsComponent implements OnInit {
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
  
  
  constructor(private fb:FormBuilder,private enlytmntservice :EnlytmntService,private activateRoute:ActivatedRoute) { 
    this.loginData = this.enlytmntservice.getLoginData();
    this.counsellor_id = this.loginData.id;
    this.studentId1 = this.activateRoute.snapshot.queryParamMap.get('student_id');
    this.studentId = decodeURI(atob(this.studentId1));
  }

  ngOnInit(): void {
    // this.allNotesList();
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

ShowNotes(){
  this.ShowList=false;
  this.SendNotes=true;
}
backToList(){
  this.ShowList=true;
  this.SendNotes=false;
}

submitExternalNotes(){

this.isInserting=true;
const formdata = new FormData();
formdata.append('counsellor_id','12');
formdata.append('student_id','2');
formdata.append('subject',this.Subject);
formdata.append('notes',this.external_notes);
formdata.append('status','1');
this.enlytmntservice.addNotes(formdata).subscribe(res =>{
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
formdata.append('counsellor_id','12');
formdata.append('subject',this.Subject);
formdata.append('notes',this.internal_notes);
formdata.append('status','0');
this.enlytmntservice.addNotes(formdata).subscribe(res =>{
if(res.succ){
  this.isInserting=false;
  alert("Internal Notes  saved");
  this.submitted1=false;
  this.SendNotes=false
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
allNotesList(){
  this.isInserting=true;
  const formdata = new FormData();
formdata.append('counsellor_id','12');
  this.enlytmntservice.NotesList(formdata).subscribe(res =>{
    if(res.succ){
      this.isInserting=false;
       this.notesData= res.data;
    }
    else{
      this.isInserting=false;
    }
    });
}
listDetails(notes){
   
localStorage.setItem('notes',JSON.stringify(notes));
this.notesDetails =  JSON.parse(localStorage.getItem('notes'));
}
}


