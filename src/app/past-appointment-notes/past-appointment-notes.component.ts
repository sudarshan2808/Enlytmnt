import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-past-appointment-notes',
  templateUrl: './past-appointment-notes.component.html',
  styleUrls: ['./past-appointment-notes.component.css']
})
export class PastAppointmentNotesComponent implements OnInit {
  pastList:boolean=true;
  pastNotes:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  ShowNotes(){
    this.pastList=false;
    this.pastNotes=true;
  }
  backToList(){
    this.pastList=true;
    this.pastNotes=false;
  }
}
