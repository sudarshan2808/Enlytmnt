import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { EnlytmntService } from '../service/enlytmnt.service';
import { StaticDropdownService } from '../service/static-dropdown.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-counsellor-application-form',
  templateUrl: './counsellor-application-form.component.html',
  styleUrls: ['./counsellor-application-form.component.css'],
})
export class CounsellorApplicationFormComponent implements OnInit {
  LanguagesSettings: any;
  productData: any;
  spokenLanguage: any;
  ApplicationForm: any;
  area_of_expertise = [];
  submitted: boolean = false;
  expertise_area: FormArray;
  notworking: boolean = true;
  universityData:boolean=false;
  ExpertiseAreaArray: Array<any> = [
    { name: 'Career Counselling', value: 'Career Counselling' },
    { name: 'Personal Problems', value: 'Personal Problems' },
    { name: 'Stress Management', value: 'Stress Management' },
    { name: 'Anxiety', value: 'Anxiety' },
    { name: 'Anger', value: 'Anger' },
    { name: 'Depression', value: 'Depression' },
    { name: 'Loss of Interest ', value: 'Loss of Interest ' },
    { name: 'Relationship', value: 'Relationship' },
    { name: 'De-Addiction', value: 'De-Addiction' },
  ];
  Education: any[] = [
    {
      id: 1,
    },
  ];
  Experience: any[] = [
    {
      id: 1,
    },
  ];

 
  countryData: any;
 
  stateData: any;

  CityData: any;
  stateDataExper: any;
  CityDataExper: any;
  stateDataExpr: any;
  SpokenData: any;
  DegreeData: any;
  fieldData: any;
  
  arrExtracted: any;
  otherPrefix: boolean;
  otherprefix: boolean;
  job_state: any;
  Imagename: any;
  images: any;
  applicationdata: any;
  Experience_more_array: FormArray;
  Education_more_array: FormArray;
  isInserting:boolean=false
  config = {
    displayFn: (item: any) => {
      return item.country_name;
    }, //to support flexible text displaying for each item
    displayKey: 'country_name', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: '300px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select Country', // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search', // label thats displayed in search input,
    searchOnKey: 'country_name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr', // the direction of the search input can be rtl or ltr(default)
    
  };
  config_job_state = {
    displayFn: (item: any) => {
      return item.state_name;
    }, 
    displayKey: 'state_name', 
    search: true, 
    height: '300px', 
    placeholder: 'Select State',
    customComparator: () => {},
    limitTo: 0,
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    searchOnKey: 'state_name', 
  };
  config_city = {
    displayFn: (item: any) => {
      return item.city_name;
    }, 
    displayKey: 'city_name', 
    search: true, 
    height: '300px', 
    placeholder: 'Select City',
    customComparator: () => {},
    limitTo: 0,
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    searchOnKey: 'city_name', 
  };
  config_degree={
    displayFn: (item: any) => {
      return item.name;
    }, 
    displayKey: 'name', 
    search: true, 
    height: '300px', 
    placeholder: 'Select Degree',
    customComparator: () => {},
    limitTo: 0,
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    searchOnKey: 'name', 
  }
  StudySuggestionData: any;
  UniversitySuggestionData: any;
  companySuggestionData: any;
  jobTitleSuggestionData: any;
  otherPrefixSuggestionData: any;
  loginData: any;
  counsellor_login_id: any;
  auth_token: any;
  socailLoginData: any;
  ImgSize: any;
  ImgType: any;
  finddots: any;
  findSpace: any;
  findComas: any;
  signupVal: any;
  myDateValue = new Date();
  constructor(
    private formbuilder: FormBuilder,
    private enlytmntService: EnlytmntService,
    private staticDDService: StaticDropdownService,
    private router:Router, public datepipe: DatePipe
  ) { 
    this.loginData = this.enlytmntService.getLoginData();
    this.counsellor_login_id=this.loginData.id;
    this.enlytmntService.AccessTokenLocation().subscribe(res=>{
              
this.auth_token = res.auth_token;
this.getCountries();
    },error => {
      console.error('Error in fetching home offer : ' + error);
      this.isInserting = false;
      
    });
  }

  ngOnInit(): void {
    this.ApplicationForm = this.formbuilder.group({
      name_prefix: ['', Validators.required],
      others: [''],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneno: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      loc_country: ['', Validators.required],
      loc_state: ['', Validators.required],
      loc_city: ['', Validators.required],
      spoken_Language: ['', Validators.required],
      expertise_area: this.formbuilder.array([], [Validators.required]),
      uplaod_resume: ['', Validators.required],
      referral_code: [''],
      Experience_more_array: this.formbuilder.array([ this.createExperience()],[Validators.required]),
      Education_more_array:this.formbuilder.array([ this.createEducation()],[Validators.required]),
    });

    this.LanguagesSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
    //  selectAllText: 'Select All',
    //   unSelectAllText: 'Unselect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    // english Spoken
    this.SpokenData = this.staticDDService.SpokenData;
      
    this.DegreeData = this.staticDDService.DegreeData;

   this.socailLoginData = this.enlytmntService.getSocialLoginData();
   const socaillogin = localStorage.getItem('socialLogin');
         if(socaillogin == 'true'){
   if(this.socailLoginData != '' || this.socailLoginData != null || this.socailLoginData.length != 0){
           
     this.ApplicationForm.controls['fname'].setValue(this.socailLoginData.firstName);
     this.ApplicationForm.controls['lname'].setValue(this.socailLoginData.lastName);

     this.ApplicationForm.controls['email'].setValue(this.socailLoginData.email);

   }
  }
 this.signupVal = localStorage.getItem('loginSignupValue');
 if(socaillogin == 'false'){
  if (isNaN(this.signupVal)) {
    this.ApplicationForm.controls['email'].setValue(this.signupVal);
    // It is not a number
  }
  else{
    this.ApplicationForm.controls['phoneno'].setValue(this.signupVal);

  }
  }
}
  get f() {
    return this.ApplicationForm.controls;
  }
  

  

  submitApplication() {
     this.submitted = true;
     if (this.ApplicationForm.invalid || this.validation()) {
       alert("Please fill all the required Fields");
      return false;
    }
    this.isInserting=true;
    const formvalue = this.ApplicationForm.value;
    const formdata = new FormData();
    //education Array
    let educationDetails = [];
    formvalue.Education_more_array.forEach((element) => {
      let data = {};
      data['university'] = element.university_name;
      data['degree'] = element.degree.name;
      data['study'] = element.study_field;
      let yearDate =this.datepipe.transform(element.year_completion, 'yyyy-MM-dd');
     data['year_completion'] = yearDate;
      educationDetails.push(data);
    });
    //experience Array
    let experienceDetails = [];
    formvalue.Experience_more_array.forEach((element) => {
      let data = {};
     

      data['job_title'] = element.job_title;
      data['company'] = element.company_name;
      data['job_country'] = element.job_country.country_name;
      data['job_state'] = element.job_state.state_name;
      data['job_city'] = element.job_city.city_name;
      const currntworkng = element.currently_working;
      
      let fromDate =this.datepipe.transform(element.experience_from, 'yyyy-MM-dd');
      let toDate =this.datepipe.transform(element.experience_to, 'yyyy-MM-dd');
 
      const experience_from = fromDate;
      const experience_to = toDate;
      // if (currntworkng == true) {
      //   data['experince_date'] = experience_from + '-' + 'Current';
      // } else {
      //   data['experince_date'] = experience_from + '-' + experience_to;
      // }
      data['currently_working'] = currntworkng;
      data['experience_from'] = experience_from;
      data['experience_to'] = experience_to;

      experienceDetails.push(data);
    });

    formdata.append('name_prefix', formvalue.name_prefix);
    if(formvalue.others == "" || formvalue.others == undefined){
      formdata.append('other_prefix', '');
    }else{
      formdata.append('other_prefix', formvalue.others);
    }
   
    formdata.append('counsellor_id', this.counsellor_login_id);
    formdata.append('first_name', formvalue.fname);
    formdata.append('last_name', formvalue.lname);
    formdata.append('email', formvalue.email);
    formdata.append('phone', formvalue.phoneno);
    formdata.append('gender', formvalue.gender);
    
    formdata.append('dob',this.datepipe.transform(formvalue.dob, 'yyyy-MM-dd'));
    formdata.append('country', formvalue.loc_country.country_name);
    formdata.append('state', formvalue.loc_state.state_name);
    formdata.append('city', formvalue.loc_city.city_name);
    const spoken_Language = Array.prototype.map
      .call(formvalue.spoken_Language, function (item) {
        return item.id;
      })
      .join(',');
      formdata.append('spoken_language', spoken_Language);
      //edu
    formdata.append('education', JSON.stringify(educationDetails));
    //exp
    formdata.append('experience', JSON.stringify(experienceDetails));
    const expertise_area = Array.prototype.map
      .call(formvalue.expertise_area, function (item) {
        return item;
      })
      .join(',');
      formdata.append('expertise_area', expertise_area);
    formdata.append('referral_code', formvalue.referral_code);
    this.enlytmntService.CounsellorApplicationApi(formdata).subscribe((res) => {
      if (res.succ) {
        this.isInserting=false;
        this.applicationdata = res.data;
        alert('succesfully Inserted');
        this.isInserting=true;
        const resumedata = new FormData();
         
        resumedata.append('newfile', this.images[0].base64);
        resumedata.append('extnsn', this.ImgType[1]);
        resumedata.append('counsellor_id', this.counsellor_login_id);
        this.enlytmntService.uploadResume(resumedata).subscribe((resu) => {
             
          if (resu.succ) {
            this.isInserting=false;
            alert(resu.message);
            this.router.navigate(['/home']);
            this.enlytmntService.setApplicationData(res);
          }
          else{
            this.isInserting=false;
            alert(resu.message);
          }
        },error => {
          console.error('Error in fetching home offer : ' + error);
          this.isInserting = false;
          
        });
      }
      else{
        alert(res.message);
      }
    },error => {
      console.error('Error in fetching home offer : ' + error);
      this.isInserting = false;
      
    });
  }
  currentlyWorking(id) {
    const currValue = $('#currently_working' + id);
    if (currValue[0].checked == true) {
      $('#notworking' + id).hide();
    this.ApplicationForm.controls.Experience_more_array.controls[id].controls['experience_to'].setValue('');

    } else {
      $('#notworking' + id).show();
    }
  }

  validation() {
    if (this.ApplicationForm.value.currently_working == false) {
      if (
        this.ApplicationForm.value.experience_to == '' ||
        this.ApplicationForm.value.experience_to == null
      ) {
        $('#experience_to_error').text('Experience To is required');
        return true;
      }
    } else {
      return false;
    }
  }

  datechangeValidation(event,field,i){
       
    const formvalue = this.ApplicationForm.value;
    var a = new Date();
    var b = event;

    // var b = new Date(this.datepipe.transform(event, 'dd/MM/yyyy'));
    const currentDate: any = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
const Passdate: any = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
if(Passdate > currentDate){
  alert("Date should not be more that current date");
  if(field == 'dob'){
    this.ApplicationForm.controls['dob'].setValue('');
    return;
  }
  else{
    this.ApplicationForm.controls.Education_more_array.controls[i].controls['year_completion'].setValue('');
    return;
  }
  return;
}
  }

  FromTodateValidation(event,field,i){
       
    const formvalue = this.ApplicationForm.value;
    var a = new Date();
    var from_date = formvalue.Experience_more_array[i].experience_from;
    var to_date = formvalue.Experience_more_array[i].experience_to;
    const currentDate: any = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    if(from_date){
var fromDate: any = Date.UTC(from_date.getFullYear(), from_date.getMonth(), from_date.getDate());

    }
    if(to_date){
var toDate: any = Date.UTC(to_date.getFullYear(), to_date.getMonth(), to_date.getDate());

    }

if(fromDate > currentDate || toDate > currentDate){
  alert("Date should not be more that current date");
  if(field == 'from'){
    formvalue.Experience_more_array[i].experience_from="";
    this.ApplicationForm.controls.Experience_more_array.controls[i].controls['experience_from'].setValue('');
    return;
  }
  else{
    formvalue.Experience_more_array[i].experience_to="";
    this.ApplicationForm.controls.Experience_more_array.controls[i].controls['experience_to'].setValue('');
    return;
  }
  // return false;
}if(to_date){
 if(fromDate > to_date){
  alert("from Date should not be more that to date");
  if(field == 'from'){
    formvalue.Experience_more_array[i].experience_from="";
    this.ApplicationForm.controls.Experience_more_array.controls[i].controls['experience_from'].setValue('');
    return;
  }
  else{
    formvalue.Experience_more_array[i].experience_to="";
    this.ApplicationForm.controls.Experience_more_array.controls[i].controls['experience_to'].setValue('');
    return;
  }
}
return;
}
  }

  //checkbo=x validation
  onCheckboxChange(e) {
    this.expertise_area = this.ApplicationForm.get(
      'expertise_area'
    ) as FormArray;

    if (e.target.checked) {
      this.expertise_area.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.expertise_area.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          this.expertise_area.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  // Add more Education start
  
 createEducation(): FormGroup {
  return this.formbuilder.group({
    university_name: ['', [Validators.required]],
    degree: ['', [Validators.required]],
    study_field: ['', [Validators.required]],
    year_completion:['', [Validators.required]]
  });
}
  addMoreEducation() {
    this.Education_more_array = this.ApplicationForm.get('Education_more_array') as FormArray;
    this.Education_more_array.push(this.createEducation());
    
  }

  removeAddMoreEducation(i) {
    
    this.Education_more_array.removeAt(i);
  }

  get educationControls() {
    
    return this.ApplicationForm.get('Education_more_array')['controls'];
  }
 // education end

// Add more  experience
  createExperience(): FormGroup {
    return this.formbuilder.group({
      job_title: ['', [Validators.required]],
      company_name: ['', [Validators.required]],
      job_country: ['', [Validators.required]],
      job_state: ['', [Validators.required]],
      job_city:['', [Validators.required]],
      currently_working:[false],
      experience_from:['', [Validators.required]],
      experience_to:['']
    });
 }
  addMoreExperience() {
    this.Experience_more_array = this.ApplicationForm.get('Experience_more_array') as FormArray;
    this.Experience_more_array.push(this.createExperience());
    console.log(this.Experience);
  }

  get experinceControls() {
    return this.ApplicationForm.get('Experience_more_array')['controls'];
  }
 
  removeAddMoreExperience(i) {
    this.Experience_more_array.removeAt(i);
  }
// experinece End

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getCountries() {
    this.isInserting=true;
    this.enlytmntService.countryApi(this.auth_token).subscribe((res) => {
      console.log(res);
      this.isInserting=false;
      this.countryData = res;
    });
  }
  getState(event) {
    this.stateData=[];
    this.ApplicationForm.controls['loc_state'].setValue("");
    this.CityData=[];
    this.ApplicationForm.controls['loc_city'].setValue("");
    this.isInserting=true;
    const data = event.value.country_name;
    this.enlytmntService.StateApi(data,this.auth_token).subscribe((res) => {
      this.isInserting=false;
      console.log(res);
      this.stateData = res;
      
    });
  }
  getCity(event) {
    this.CityData=[];
    this.ApplicationForm.controls['loc_city'].setValue("");
    this.isInserting=true;
    const data = event.value.state_name;
    this.enlytmntService.CityApi(data,this.auth_token).subscribe((res) => {
      this.isInserting=false;
      console.log(res);
      this.CityData = res;
    });
  }

  getStateExper(event,i) {
    this.stateDataExper=[];
    this.ApplicationForm.controls.Experience_more_array.controls[i].controls['job_state'].setValue('');
    this.CityDataExper=[];
    this.ApplicationForm.controls.Experience_more_array.controls[i].controls['job_city'].setValue('');
    this.isInserting=true;
    const data = event.value.country_name;
    this.enlytmntService.StateApi(data,this.auth_token).subscribe((res) => {
      this.isInserting=false;
      console.log(res);
      this.stateDataExper = res;
    });
  }
  getCityExper(event,i) {
    this.CityDataExper=[];
    this.ApplicationForm.controls.Experience_more_array.controls[i].controls['job_city'].setValue('');
    this.isInserting=true;
    const data = event.value.state_name;
    this.enlytmntService.CityApi(data,this.auth_token).subscribe((res) => {
      this.isInserting=false;
      console.log(res);
      this.CityDataExper = res;
    });
  }
  othersPrefix(event) {
     const val = event.target.value;
    if (val == 'Others') {
      this.otherprefix = true;
    } else {
      this.otherprefix = false;
    }
  }
  uploadmulti(event: any) {
    this.images = [];
      
    if (event.target.files && event.target.files[0]) {
        
      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
       
        this.Imagename = event.target.files[i].name;
        const fileName = event.target.files[i];
         
        this.finddots = fileName.name.match(/\./gi).length;
          this.findSpace = fileName.name.match(/\s/gi);
          this.findComas = fileName.name.match(/\,/gi);
          this.ImgSize = fileName.size;
          this.ImgType = fileName.name.split(".");
        reader.onload = (event: any) => {
          

         
           
          if (this.ImgType[1] == "pdf" || this.ImgType[1] == "doc" || this.ImgType[1] == "docx") {
             
            if (this.ImgSize > 4000000) {
              alert("Resume File Size is not greater than 4MB");
              $("#resumeName").text("Choose File");
              this.ApplicationForm.controls['uplaod_resume'].setValue('');
              this.ApplicationForm.value.uplaod_resume = null;
              this.Imagename="";
              return false;
            }
            
            else if (this.findComas != null) {
               
              alert("Resume File Name Not valid (remove comma)");
              $("#resumeName").text("Choose File");
              this.ApplicationForm.controls['uplaod_resume'].setValue('');
              this.ApplicationForm.value.uplaod_resume = null;
              this.Imagename="";
              return false;
            }
            else if (this.finddots > 1) {
              alert("Resume File Name Not valid (include ony one dot)");
              $("#resumeName").text("Choose File");
              this.ApplicationForm.controls['uplaod_resume'].setValue('');
              this.ApplicationForm.value.uplaod_resume = null;
              this.Imagename="";
              return false;
            }
            else{
              const imagedata = {};
              imagedata['base64'] = event.target.result;
              this.images.push(imagedata);
            }
          }
          else{
            this.ApplicationForm.controls['uplaod_resume'].setValue('');
            $("#resumeName").text("Choose File");
            this.ApplicationForm.value.uplaod_resume = null;
            this.Imagename="";
            alert("Resume Type should be PDF, DOC, DOCX");
            return false;
          }
         

          // const base64 = event.target.result.split(',');
          // const extn = base64[0];
          //
          // this.baseImage = base64[1];
          // this.baseExtImg = (extn.split('/')[1]).split(';')[0];
             
          
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  //Api for Auto Suggestion
  StudySuggestion(event,i){
    
    for(var j=0 ; j <= this.educationControls.length;j++){
     
      $(('#StudySuggestionData'+j)).not('#StudySuggestionData'+i).hide();
    }
    if(event.target.value == "" || event.target.value == null){
      //this.StudySuggestionData=false;
      $("#StudySuggestionData"+i).hide();
    }else{ 
      
      this.enlytmntService.studyFieldSuggestion(event.target.value).subscribe(res=>{
        if(res.succ){
          this.StudySuggestionData = res.data;
          $("#StudySuggestionData"+i).show();
          for(var j=0 ; j <= this.educationControls.length;j++){
           
            $(('#StudySuggestionData'+j)).not('#StudySuggestionData'+i).hide();
          }
        }
        else{
         // this.StudySuggestionData=false;
          $("#StudySuggestionData"+i).hide();
        }
      });
    }
  }

  otherPrefixSuggestion(event){
   
    if(event.target.value == "" || event.target.value == null){
      this.otherPrefixSuggestionData=false;
    }else{ 
    this.enlytmntService.otherPrefixSuggestion(event.target.value).subscribe(res=>{
      if(res.succ){
        this.otherPrefixSuggestionData = res.data;
      }
      else{
        this.otherPrefixSuggestionData=false;
      }
    
    });
  }
  }
  UniversitySuggestion(event,i){
    
    for(var j=0 ; j <= this.educationControls.length+1;j++){
     
      $(('#UniversitySuggestionData'+j)).not('#UniversitySuggestionData'+i).hide();
    }
    
    if(event.target.value == "" || event.target.value == null){
     // this.UniversitySuggestionData=false;
      $("#UniversitySuggestionData"+i).hide();
    }else{ 
      this.enlytmntService.universitySuggestion(event.target.value).subscribe(res=>{
        if(res.succ){
          this.UniversitySuggestionData = res.data;
          $("#UniversitySuggestionData"+i).show();
          for(var j=0 ; j <= this.educationControls.length;j++){
           
            $(('#UniversitySuggestionData'+j)).not('#UniversitySuggestionData'+i).hide();
          }
        }
  else{
    //this.UniversitySuggestionData=false;
    $("#UniversitySuggestionData"+i).hide();
  }
      });
  }
   
  }
  companySuggestion(event,i){
    for(var j=0 ; j <= this.experinceControls.length+1;j++){
     
      $(('#companySuggestionData'+j)).not('#companySuggestionData'+i).hide();
    }
    if(event.target.value == "" || event.target.value == null){
      //this.companySuggestionData=false;
      $("#companySuggestionData"+i).hide();
    }else{ 
      this.enlytmntService.companyNameSuggestion(event.target.value).subscribe(res=>{
        if(res.succ){
          this.companySuggestionData = res.data;
          for(var j=0 ; j <= this.experinceControls.length;j++){
     
            $(('#companySuggestionData'+j)).not('#companySuggestionData'+i).hide();
          }
        }
        else{
         // this.companySuggestionData=false;
          $("#companySuggestionData"+i).hide();
        }
      });
  }
   
  }
  jobTitleSuggestion(event,i){
    for(var j=0 ; j <= this.experinceControls.length+1;j++){
     
      $(('#jobTitleSuggestionData'+j)).not('#jobTitleSuggestionData'+i).hide();
    }
    if(event.target.value == "" || event.target.value == null){
     // this.jobTitleSuggestionData=false;
      $("#jobTitleSuggestionData"+i).hide();
    }else{ 
      this.enlytmntService.jobTitleSuggestion(event.target.value).subscribe(res=>{
        if(res.succ){
          this.jobTitleSuggestionData = res.data;
          for(var j=0 ; j <= this.experinceControls.length;j++){
     
            $(('#jobTitleSuggestionData'+j)).not('#jobTitleSuggestionData'+i).hide();
          }
        }
        else{
         // this.jobTitleSuggestionData=false
          $("#jobTitleSuggestionData"+i).hide();
        }
      });
  }
    
  }
 
  //set suggestion value
  setSuggestionValue(value,field,i){
    if(field == 'others'){
      this.ApplicationForm.controls['others'].setValue(value);
      this.otherPrefixSuggestionData= false;
    }
    else if(field == 'university'){
      this.ApplicationForm.controls.Education_more_array.controls[i].controls['university_name'].setValue(value);
     // this.UniversitySuggestionData=false;
      $("#UniversitySuggestionData"+i).hide();
      this.UniversitySuggestionData.length = 0;
    }
    else if(field == 'study'){
      this.ApplicationForm.controls.Education_more_array.controls[i].controls['study_field'].setValue(value);
      $("#StudySuggestionData"+i).hide();
      this.StudySuggestionData.length = 0;
     // this.StudySuggestionData=false;
    }
    else if(field == 'company'){
      this.ApplicationForm.controls.Experience_more_array.controls[i].controls['company_name'].setValue(value);
      $("#companySuggestionData"+i).hide();
      this.companySuggestionData.length = 0;
    //  this.companySuggestionData=false;
    }
    else if(field == 'job'){
      this.ApplicationForm.controls.Experience_more_array.controls[i].controls['job_title'].setValue(value);
      $("#jobTitleSuggestionData"+i).hide();
      this.jobTitleSuggestionData.length = 0;
    //  this.jobTitleSuggestionData=false;
    }
  }
  closeAll(){
    this.UniversitySuggestionData=[];
    this.otherPrefixSuggestionData=[];
    this.StudySuggestionData=[];
    this.companySuggestionData=[];
    this.jobTitleSuggestionData=[];
  }
  removeResume(){
    this.ApplicationForm.controls['uplaod_resume'].setValue('');
    $("#resumeName").text("Choose File");
    this.ApplicationForm.value.uplaod_resume = null;
    this.Imagename="";
  }

  ReviewApplication(){
    this.submitted = true;
    if (this.ApplicationForm.invalid || this.validation()) {
      alert("Please fill all the required Fields");
     return false;
   }
   let reviewForm={};
   this.isInserting=true;
   const formvalue = this.ApplicationForm.value;
   //education Array
   let educationDetails = [];
   formvalue.Education_more_array.forEach((element) => {
     let data = {};
     data['university'] = element.university_name;
     data['degree'] = element.degree.name;
     data['study'] = element.study_field;
      
     let yearDate =this.datepipe.transform(element.year_completion, 'yyyy-MM-dd');
     data['year_completion'] = yearDate;
     educationDetails.push(data);
   });
   //experience Array
   let experienceDetails = [];
   formvalue.Experience_more_array.forEach((element) => {
     let data = {};
     data['job_title'] = element.job_title;
     data['company'] = element.company_name;
     data['job_country'] = element.job_country.country_name;
     data['job_state'] = element.job_state.state_name;
     data['job_city'] = element.job_city.city_name;
     const currntworkng = element.currently_working;
     let fromDate =this.datepipe.transform(element.experience_from, 'yyyy-MM-dd');
     let toDate =this.datepipe.transform(element.experience_to, 'yyyy-MM-dd');

     const experience_from = fromDate;
     const experience_to = toDate;
     // if (currntworkng == true) {
     //   data['experince_date'] = experience_from + '-' + 'Current';
     // } else {
     //   data['experince_date'] = experience_from + '-' + experience_to;
     // }
     data['currently_working'] = currntworkng;
     data['experience_from'] = experience_from;
     data['experience_to'] = experience_to;

     experienceDetails.push(data);
   });
   reviewForm['name_prefix']=formvalue.name_prefix;
   if(formvalue.others == "" || formvalue.others == undefined){
    reviewForm['other_prefix']='';
   }else{
    reviewForm['other_prefix']=formvalue.others;
   }
   reviewForm['counsellor_id']=this.counsellor_login_id;
   reviewForm['first_name']=formvalue.fname;
   reviewForm['last_name']=formvalue.lname;
   reviewForm['email']=formvalue.email;
   reviewForm['phone']=formvalue.phoneno;
   reviewForm['gender']=formvalue.gender;
  //  let fromDate =this.datepipe.transform(formvalue.dob, 'dd/MM/yyyy');

   reviewForm['dob']=this.datepipe.transform(formvalue.dob, 'yyyy-MM-dd');
   reviewForm['country']=formvalue.loc_country.country_name;
   reviewForm['state']=formvalue.loc_state.state_name;
   reviewForm['city']=formvalue.loc_city.city_name;
   const spoken_Language = Array.prototype.map
     .call(formvalue.spoken_Language, function (item) {
       return item.id;
     })
     .join(',');
     reviewForm['spoken_language']=spoken_Language;
     //edu
     reviewForm['education']=JSON.stringify(educationDetails);
   //exp
   reviewForm['experience']=JSON.stringify(experienceDetails);
   const expertise_area = Array.prototype.map
     .call(formvalue.expertise_area, function (item) {
       return item;
     })
     .join(',');
     reviewForm['expertise_area']=expertise_area;
     reviewForm['referral_code']=formvalue.referral_code;
     reviewForm['resume']=this.images[0].base64;
     reviewForm['resumename']=this.Imagename;
      
     reviewForm['resumeExtn']=this.ImgType[1];
     this.enlytmntService.setApplicationReviewData(reviewForm);
     this.router.navigate(['/review_application']);
  }
  SelectImage() {
    document.getElementById('pickResume').click();
  }
}
