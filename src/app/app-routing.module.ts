import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterAsMentorComponent } from './register-as-mentor/register-as-mentor.component';
import { StartMentoringComponent } from './start-mentoring/start-mentoring.component';
import { CounsellorApplicationFormComponent } from './counsellor-application-form/counsellor-application-form.component';
import { HomeComponent } from './home/home.component';
import { DefaultLayoutComponent } from './container/default-layout/default-layout.component';
import { LoginComponent } from './login/login.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FAQsComponent } from './faqs/faqs.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { CounsellorProfileComponent } from './counsellor-profile/counsellor-profile.component';
import { EditCounsellorApplicationFormComponent } from './edit-counsellor-application-form/edit-counsellor-application-form.component';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { NotesComponent } from './notes/notes.component';
import { StudentAppointmentListComponent } from './student-appointment-list/student-appointment-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { AppointmentCalendarComponent } from './appointment-calendar/appointment-calendar.component';
import { ReviewApplicationComponent } from './review-application/review-application.component';
import { EditReviewApplicationComponent } from './edit-review-application/edit-review-application.component';
import { ReferralPageComponent } from './referral-page/referral-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NotesDetailsComponent } from './notes-details/notes-details.component';
import { PastAppointmentNotesComponent } from './past-appointment-notes/past-appointment-notes.component';
import { LoginAsStudentComponent } from './login-as-student/login-as-student.component';
import { SetAvalabilityComponent } from './set-avalability/set-avalability.component';
import { LoginAsCounsellorComponent } from './login-as-counsellor/login-as-counsellor.component';
import { ClientpastAppointmentComponent } from './clientpast-appointment/clientpast-appointment.component';



const routes: Routes = [
  {
    path:'register_as_mentor',component:RegisterAsMentorComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'login_student',component:LoginAsStudentComponent
  },
  {
    path:'login_counsellor',component:LoginAsCounsellorComponent
  },
  {
    path:'forgot_password',component:ForgotPasswordComponent
  },
  {
    path:'reset_password',component:ResetPasswordComponent
  },
  {
    path:'start_mentoring',component:StartMentoringComponent
  },
  {
    path:'counsellor_Application',component:CounsellorApplicationFormComponent
  },
  {
    path:'review_application',component:ReviewApplicationComponent
  },
  {
    path:'edit_review_application',component:EditReviewApplicationComponent
  },
  {
    path:'',pathMatch:'full',redirectTo:'login'
  },
  {
    path:'',component:DefaultLayoutComponent,children:[
      {path:'home',component:HomeComponent},
      {path:'feedback',component:FeedbackComponent},
      {path:'FAQs',component:FAQsComponent},
      {path:'feedback_list',component:FeedbackListComponent},
      {path:'profile',component:CounsellorProfileComponent},
      {path:'addprofile',component:AddProfileComponent},
      {path:'edit_application',component:EditCounsellorApplicationFormComponent},
      {path:'notes',component:NotesComponent},
      {path:'clients',component:StudentAppointmentListComponent},
      {path:'transaction_list',component:TransactionListComponent},
      {path:'appointment_calendar',component:AppointmentCalendarComponent},
      {path:'referral_page',component:ReferralPageComponent},
      {path:'notes_details',component:NotesDetailsComponent},
      {path:'past_appointment_notes',component:PastAppointmentNotesComponent},
      {path:'set_avalability',component:SetAvalabilityComponent},
      {path:  'clientpastAppointment', component:ClientpastAppointmentComponent}
      
      
    

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
