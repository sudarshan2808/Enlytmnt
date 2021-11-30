import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EnlytmntService {

  loginSubject1 = new Subject<any>();
  loginTypeSubject1 = new Subject<any>();
  shopNameSubject1=  new Subject<any>();
  RouterSubject1= new Subject<any>();
  loginCartSubject1= new Subject<any>();
  constructor(private http: HttpClient) { }

    setLoginObservable(data:any){
    this.loginSubject1.next(data);
    }
    getLoginObservable(){
      return this.loginSubject1;
    }
    setLoginTypeObservable(data:any){
      this.loginTypeSubject1.next(data);
      }
    getLoginTypeObservable(){
      return this.loginTypeSubject1;
    }
    setLoginData(data){
      localStorage.setItem('loginData',JSON.stringify(data));
    }

   getLoginData(){
    if(localStorage.getItem('loginData')){
      return JSON.parse(localStorage.getItem('loginData'));
      }
      else{
        return [];
      }
    }

    setSocailLoginData(data){
      localStorage.setItem('socialloginData',JSON.stringify(data));
    }

   getSocialLoginData(){
    if(localStorage.getItem('socialloginData')){
      return JSON.parse(localStorage.getItem('socialloginData'));
      }
      else{
        return [];
      }
    }

    setApplicationReviewData(data){
      localStorage.setItem('reviewAppData',JSON.stringify(data));
    }

   getApplicationReviewData(){
    if(localStorage.getItem('reviewAppData')){
      return JSON.parse(localStorage.getItem('reviewAppData'));
      }
      else{
        return [];
      }
    }

    setApplicationData(data){
      localStorage.setItem('ApplicationData',JSON.stringify(data));
    }

   getApplicationData(){
    if(localStorage.getItem('ApplicationData')){
      return JSON.parse(localStorage.getItem('ApplicationData'));
      }
      else{
        return [];
      }
    }
    setControlStatus(data){
      localStorage.setItem('controlStatus',JSON.stringify(data));
    }
    getControlStatus(){
      if(localStorage.getItem('controlStatus')){
        return JSON.parse(localStorage.getItem('controlStatus'));
        }
        else{
          return [];
        }
      }
  counselorSocialSignup(data): Observable<any> {
     return this.http.post(environment.baseServiceUrl + 'user/socialRegister', data);
  }
  counselorSignup(data): Observable<any> {
    return this.http.post(environment.baseServiceUrl + 'user/userRegister', data);
 }
 counselorLogin(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'user/doLogin', data);
}
 verifyOtp(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'user/verify_otp', data);
}
resendOtp(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'user/resend_otp', data);
}
sendOtp(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'user/send_otp', data);
}

CounsellorApplicationApi(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'user/counsellorUpdates', data);
}
uploadResume(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'user/uploadResume', data);
}
studyFieldSuggestion(data): Observable<any> {
  return this.http.get(environment.baseServiceUrl + 'user/study/' +data);
}
universitySuggestion(data): Observable<any> {
  return this.http.get(environment.baseServiceUrl + 'user/university/' +data);
}
jobTitleSuggestion(data): Observable<any> {
  return this.http.get(environment.baseServiceUrl + 'user/jobTitle/' +data);
}
companyNameSuggestion(data): Observable<any> {
  return this.http.get(environment.baseServiceUrl + 'user/company/'+data);
}
otherPrefixSuggestion(data): Observable<any> {
  return this.http.get(environment.baseServiceUrl + 'user/otherPrefix/'+data);
}
formStatus(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'user/userStatus',data);
}
getCounsellor(data): Observable<any> {
  return this.http.get(environment.baseServiceUrl + 'user/getCounsellor/'+data);
}
 getUserClients(data): Observable<any> {
   return this.http.post(environment.baseServiceUrl + 'user/getClients', data);   //clients api
 }
addProfileData(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'counsellor/addProfile', data);
}
addNotes(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'counsellor/uploadNotes',data);  // upload notes
}
NotesList(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'counsellor/notesList',data);
}
CounsellorFullData(data): Observable<any> {
  return this.http.get(environment.baseServiceUrl + 'counsellor/get_Counsellor_Data/'+data);
}
allTransactionList(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'counsellor/transList',data);
}
deleteTransactionList(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'counsellor/deleteTrans',data);
}
forgotPassword(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'user/recover_account',data);
}
resetForgotPassword(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'user/reset_password_verify',data);
}
referrFriend(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'user/reffer',data);
}
allFeedbackList(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'counsellor/feedbackList',data);
}
sentreferrFriendList(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'user/getSendRefferralList',data);
}
acceptedreferrFriendList(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'user/getApprovedRefferralList',data);
}
verifyForgotPassowrdOtp(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'user/reset_verify',data);
}

getUserPhoto(data): Observable<any> {
  return this.http.post(environment.baseServiceUrl + 'user/getInfo', data);
}

AccessTokenLocation(): Observable<any> {
  let headers = new HttpHeaders({
    "Accept": "application/json",
    "api-token":"cJPhtp6EexcB23qp40XO_eqoEMUB8KkmGXmy9Qqk_nccd-v_f4Hk47RpB09ekYlkqPU",
    "user-email":"rahulkinger.appic@gmail.com"
  });

let options = { headers: headers };

  return this.http.get('https://www.universal-tutorial.com/api/getaccesstoken',options);
}
countryApi(auth_token): Observable<any> {

  let headers = new HttpHeaders({
    "Authorization": "Bearer "+auth_token,
    "Accept": "application/json"
  });
let options = { headers: headers };

  return this.http.get('https://www.universal-tutorial.com/api/countries/',options);
}
StateApi(data,auth_token): Observable<any> {
  let headers = new HttpHeaders({
    "Authorization": "Bearer "+auth_token,
    "Accept": "application/json"
  });
let options = { headers: headers };

  return this.http.get('https://www.universal-tutorial.com/api/states/'+data,options);
}
CityApi(data,auth_token): Observable<any> {
  let headers = new HttpHeaders({
    "Authorization": "Bearer "+auth_token,
    "Accept": "application/json"
  });
let options = { headers: headers };

  return this.http.get('https://www.universal-tutorial.com/api/cities/'+data,options);
}
}
