import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterAsMentorComponent } from './register-as-mentor/register-as-mentor.component';
import { StartMentoringComponent } from './start-mentoring/start-mentoring.component';
import { DefaultLayoutComponent } from './container/default-layout/default-layout.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CounsellorApplicationFormComponent } from './counsellor-application-form/counsellor-application-form.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'

import { NgSelectModule } from '@ng-select/ng-select';
import { LoginComponent } from './login/login.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FAQsComponent } from './faqs/faqs.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { CounsellorProfileComponent } from './counsellor-profile/counsellor-profile.component';
import { EditCounsellorApplicationFormComponent } from './edit-counsellor-application-form/edit-counsellor-application-form.component';
import { NotesComponent } from './notes/notes.component';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { StudentAppointmentListComponent } from './student-appointment-list/student-appointment-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { FindInfluencersComponent } from './find-influencers/find-influencers.component';
import { AppointmentCalendarComponent } from './appointment-calendar/appointment-calendar.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ReviewApplicationComponent } from './review-application/review-application.component';
import { EditReviewApplicationComponent } from './edit-review-application/edit-review-application.component';
import {NgxImageCompressService} from 'ngx-image-compress';
import { AppleSigninModule } from 'ngx-apple-signin';
import { ReferralPageComponent } from './referral-page/referral-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DatePipe } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NotesDetailsComponent } from './notes-details/notes-details.component';
import { PastAppointmentNotesComponent } from './past-appointment-notes/past-appointment-notes.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LoginAsCounsellorComponent } from './login-as-counsellor/login-as-counsellor.component';
import { LoginAsStudentComponent } from './login-as-student/login-as-student.component';
import { SetAvalabilityComponent } from './set-avalability/set-avalability.component';
 
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';

import { ClientpastAppointmentComponent } from './clientpast-appointment/clientpast-appointment.component';

 
const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};


@NgModule({
  declarations: [
    AppComponent,
    RegisterAsMentorComponent,
    StartMentoringComponent,
    DefaultLayoutComponent,
    CounsellorApplicationFormComponent,
    HomeComponent,
    LoginComponent,
   
    FeedbackComponent,
    FAQsComponent,
    FeedbackListComponent,
    CounsellorProfileComponent,
    EditCounsellorApplicationFormComponent,
    NotesComponent,
    AddProfileComponent,
    StudentAppointmentListComponent,
    TransactionListComponent,
    FindInfluencersComponent,
    AppointmentCalendarComponent,
    ReviewApplicationComponent,
    EditReviewApplicationComponent,
    ReferralPageComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NotesDetailsComponent,
    PastAppointmentNotesComponent,
    LoginAsCounsellorComponent,
    LoginAsStudentComponent,
    SetAvalabilityComponent,
    
    ClientpastAppointmentComponent,
    
    
    
   

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    NgMultiSelectDropDownModule,
    DropDownListModule,
    ButtonModule,
    HttpClientModule,
    SelectDropDownModule,
    NgSelectModule,
    PasswordStrengthMeterModule,
    ImageCropperModule,
    AppleSigninModule,
    NgxPaginationModule,
    NgWizardModule.forRoot(ngWizardConfig),
    Ng2SearchPipeModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot() 
   

  ],
  providers: [{ 
    provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '935108269210-6tckreql31avvhu7n0d9gq0nt116tkgj.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('525158328644817')
          }
        ]
      } as SocialAuthServiceConfig,
  },
  NgxImageCompressService,
  DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
