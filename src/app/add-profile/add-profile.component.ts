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
import { MustMatch } from '../../helper/must-match-validators';
declare var $: any;
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxImageCompressService } from 'ngx-image-compress';
import { of } from 'rxjs';
import {
  NgWizardConfig,
  NgWizardService,
  StepChangedArgs,
  StepValidationArgs,
  STEP_STATE,
  THEME,
} from 'ng-wizard';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css'],
})
export class AddProfileComponent implements OnInit {
  profileForm: FormGroup;
  DocumentForm: FormGroup;
  BankForm: FormGroup;
  ServiceForm: FormGroup;

  submitted: boolean = false;

  loginData: any;
  counsellor_id: any;
  counsellor_data: any;
  counsellor_name: any;
  educationLength: any;
  submitted1: boolean = false;
  submitted2: boolean = false;
  expertiseArea: any;
  expertiseArray: any;
  expertiseForm: FormGroup;
  Expertise: FormArray;
  Education: FormArray;
  submitted3: boolean;
  profile: any[];
  Profilename: any;
  Pan_Doc: any[];
  Pan_name: any;
  Aadhar_img: any[];
  Aadhar_name: any;
  degree_img: any[];
  Degree_name: any;
  ProfileImageLocal: any;
  isInserting: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper: boolean;
  Cropimagedata: any;
  CropimagedataDiv: boolean;
  panImageName: any;
  AadharImageName: any;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  Aadhar_Back_img: any[];
  Aadhar_back_name: any;
  AadharBackImageName: any;
  finddots: any;
  findComas: any;
  findSpace: any;
  ImgSize: any;
  ImgType: any;
  ImgType_pan: any;
  ImgType_adhar: any;
  ImgType_degree: any;
  ImgType_adhar_back: any;
  ImgType_profile: any;
  UploaddegreeName: any;

  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
  };

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.circles,
    toolbarSettings: {
      showNextButton: false,
      showPreviousButton: false,
    },
  };

  constructor(
    private imageCompress: NgxImageCompressService,
    private enlytmntservice: EnlytmntService,
    private router: Router,
    private fb: FormBuilder,
    private ngWizardService: NgWizardService
  ) {
    this.loginData = this.enlytmntservice.getLoginData();
    this.counsellor_id = this.loginData.id;
    this.getcounsellorByid();
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      profile_img: ['', Validators.required],
      profile_summry: ['', Validators.required],
    });

    this.DocumentForm = this.fb.group({
      pan_num: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      pan_img: ['', Validators.required],
      adhar_num: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12),
        ],
      ],
      adhar_back_img: ['', Validators.required],
      adhar_front_img: ['', Validators.required],
      // Education: this.fb.array([this.createEducation()], [Validators.required]),
      degree_name: ['', Validators.required],
      degree_img: ['', Validators.required],
    });
    this.BankForm = this.fb.group(
      {
        bank_name: ['', Validators.required],
        acc_holder_name: ['', Validators.required],
        acc_number: ['', Validators.required],
        reEnter_Acc_num: ['', Validators.required],
        ifsc_code: ['', Validators.required],
      },
      {
        validators: MustMatch('acc_number', 'reEnter_Acc_num'),
      }
    );

    this.expertiseForm = this.fb.group({
      Expertise: this.fb.array([this.createExpertise()], [Validators.required]),
    });
  }
  createExpertise(): FormGroup {
    return this.fb.group({
      expertiseName: [''],
      expertisePrice: ['', Validators.required],
    });
  }
  createEducation(): FormGroup {
    return this.fb.group({
      degree_name: ['', Validators.required],
      degree_img: ['', Validators.required],
    });
  }
  get f() {
    return this.profileForm.controls;
  }
  get f1() {
    return this.DocumentForm.controls;
  }
  get f2() {
    return this.BankForm.controls;
  }
  get f3() {
    return this.expertiseForm.controls;
  }
  getcounsellorByid() {
    this.isInserting = true;
    this.enlytmntservice.getCounsellor(this.counsellor_id).subscribe((res) => {
      if (res.succ) {
        this.counsellor_data = res.data[0];

        this.educationLength = res.data.education;
        this.DocumentForm.controls['degree_name'].setValue(
          this.educationLength[0].degree
        );
        this.degree_img = new Array(this.educationLength.length);

        this.counsellor_name =
          this.counsellor_data.first_name +
          ' ' +
          this.counsellor_data.last_name;

        this.expertiseArea = this.counsellor_data.expertise_area;
        this.expertiseArray = this.expertiseArea.split(',');
        let arr = [];
        // for (var i = 0; i < this.educationLength.length - 1; i++) {
        //   this.Education = this.DocumentForm.get('Education') as FormArray;
        //   this.Education.push(this.createEducation());
        // }
        for (var i = 0; i < this.expertiseArray.length - 1; i++) {
          this.Expertise = this.expertiseForm.get('Expertise') as FormArray;
          this.Expertise.push(this.createExpertise());
        }
        this.isInserting = false;
      } else {
        this.isInserting = false;
      }
    });
  }

  get expertiseControls() {
    return this.expertiseForm.get('Expertise')['controls'];
  }
  get educationControls() {
    return this.DocumentForm.get('Education')['controls'];
  }

  Saveprofile() {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }

    this.showNextStep();
  }
  previousDocumen() {
    this.showPreviousStep();
  }
  SaveDocuments() {
    this.submitted1 = true;
    if (this.DocumentForm.invalid) {
      return;
    }

    this.showNextStep();
  }
  previousBank() {
    this.showPreviousStep();
  }
  SaveServices() {
    this.submitted3 = true;
    if (this.expertiseForm.invalid) {
      return;
    }

    this.showNextStep();
  }

  previousPayments() {
    //services

    this.showPreviousStep();
  }

  SubmitAllDetails() {
    this.submitted2 = true;
    if (this.BankForm.invalid) {
      return;
    }
    this.isInserting = true;
    const profile = this.profileForm.value;
    const document = this.DocumentForm.value;
    const bank = this.BankForm.value;
    const expertise = this.expertiseForm.value;

    const formdata = new FormData();
    formdata.append('counsellor_id', this.counsellor_id);
    formdata.append('summary', profile.profile_summry);
    formdata.append('image', this.Cropimagedata);
    formdata.append('extnsn_profile_img', this.ImgType_profile[1]);

    formdata.append('aadar_number', document.adhar_num);
    formdata.append('govt_id', this.Aadhar_img[0].base64);
    formdata.append('extnsn_adhar_front', this.ImgType_adhar[1]);

    formdata.append('govt_back_id', this.Aadhar_Back_img[0].base64);
    formdata.append('extnsn_adhar_back', this.ImgType_adhar_back[1]);

    formdata.append('pan', this.Pan_Doc[0].base64);
    formdata.append('pan_number', document.pan_num);
    formdata.append('extnsn_pan', this.ImgType_pan[1]);

    formdata.append('bank', bank.bank_name);
    formdata.append('account', bank.acc_number);
    formdata.append('holder', bank.acc_holder_name1);

    formdata.append('ifsc', bank.ifsc_code);
    let educationArray = [];
    let i = 0;
    // document.Education.forEach((element) => {
    //   const data = {};
    //   data['degree_name'] = element.degree_name;
    //   data['degree_img'] = this.degree_img[i][0].base64;

    //   data['extnsn_degree'] = this.ImgType_degree[1];
    //   i++;
    //   educationArray.push(data);
    // });

    // education start
    const data = {};
    data['degree_name'] = document.degree_name;
    data['degree_img'] = this.degree_img[0].base64;
    data['extnsn_degree'] = this.ImgType_degree[1];
    educationArray.push(data);
    // education end

    formdata.append('degree', JSON.stringify(educationArray));
    let expertiseFormArray = [];
    expertise.Expertise.forEach((element) => {
      const data = {};
      data['name'] = element.expertiseName;
      data['price'] = element.expertisePrice;
      expertiseFormArray.push(data);
    });

    formdata.append('price', JSON.stringify(expertiseFormArray));
    this.enlytmntservice.addProfileData(formdata).subscribe(
      (res) => {
        if (res.succ) {
          this.isInserting = false;
          alert('Profile Succesfully Added');
          this.submitted3 = false;
          this.expertiseForm.reset();
          this.router.navigate(['/profile']);
        } else {
          this.isInserting = false;
        }
      },
      (error) => {
        console.error('Error in fetching home offer : ' + error);
        this.isInserting = false;
      }
    );
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  SelectImage() {
    document.getElementById('hdnfile').click();
  }
  //not used
  uploadProfile(event: any) {
    this.profile = [];
    let file = event.target.files[0];
    this.profileForm.controls['profile_img'].setValue(file ? file.name : '');
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        this.Profilename = event.target.files;
        const fileName = event.target.files[i];
        this.ImgType_profile = fileName.name.split('.');
        reader.onload = (event: any) => {
          this.imageCompress.uploadFile().then(({ image, orientation }) => {
            this.imgResultBeforeCompress = image;
            console.warn(
              'Size in bytes was:',
              this.imageCompress.byteCount(image)
            );

            this.imageCompress
              .compressFile(image, orientation, 75, 50)
              .then((result) => {
                this.imgResultAfterCompress = result;
                console.warn(
                  'Size in bytes is now:',
                  this.imageCompress.byteCount(result)
                );
                const imagedata = {};
                imagedata['base64'] = event.target.result;

                // const base64 = event.target.result.split(',');
                // const extn = base64[0];
                //
                // this.baseImage = base64[1];
                // this.baseExtImg = (extn.split('/')[1]).split(';')[0];
                this.imageChangedEvent = event;
                this.profile.push(imagedata);
                this.ProfileImageLocal = this.profile[0].base64;
              });
          });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  setcropedImage() {
    this.CropimagedataDiv = false;
    // this.imageCompress.uploadFile().then(({image, orientation}) => {

    // this.imgResultBeforeCompress = image;
    // console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

    this.imageCompress
      .compressFile(this.croppedImage, 0, 75, 50)
      .then((result) => {
        this.imgResultAfterCompress = result;

        this.Cropimagedata = this.imgResultAfterCompress;
        console.warn(
          'Size in bytes is now:',
          this.imageCompress.byteCount(result)
        );
      });

    // });
    // this.profile.push(this.Cropimagedata);
  }

  uploadPan(event: any) {
    this.Pan_Doc = [];
    let file = event.target.files[0];
    this.DocumentForm.controls['pan_img'].setValue(file ? file.name : '');
    $('#panCardName').text(file.name);
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        this.Pan_name = event.target.files;
        const fileName = event.target.files[i];
        this.panImageName = fileName.name;
        this.finddots = fileName.name.match(/\./gi).length;
        this.findSpace = fileName.name.match(/\s/gi);
        this.findComas = fileName.name.match(/\,/gi);
        this.ImgSize = fileName.size;
        this.ImgType_pan = fileName.name.split('.');
        reader.onload = (event: any) => {
          if (
            this.ImgType_pan[1] == 'pdf' ||
            this.ImgType_pan[1] == 'jpeg' ||
            this.ImgType_pan[1] == 'jpg' ||
            this.ImgType_pan[1] == 'png'
          ) {
            if (this.ImgSize > 2000000) {
              alert('File Size is not greater than 2MB');
              this.DocumentForm.controls['pan_img'].setValue('');

              return false;
            } else if (this.findComas != null) {
              alert('File Name Not valid (remove comma)');
              this.DocumentForm.controls['pan_img'].setValue('');

              return false;
            } else if (this.finddots > 1) {
              alert('File Name Not valid (include ony one dot)');
              this.DocumentForm.controls['pan_img'].setValue('');

              return false;
            } else {
              if (
                this.ImgType_pan[1] == 'jpeg' ||
                this.ImgType_pan[1] == 'jpg' ||
                this.ImgType_pan[1] == 'png'
              ) {
                const imagedata = {};
                // imagedata['base64'] = event.target.result;
                this.imageCompress
                  .compressFile(event.target.result, 0, 75, 50)
                  .then((result) => {
                    imagedata['base64'] = result;
                    $('#panCardName').text(this.panImageName);
                    this.Pan_Doc.push(imagedata);
                    console.warn(
                      'Size in bytes is now:',
                      this.imageCompress.byteCount(result)
                    );
                  });
              } else {
                const imagedata = {};
                imagedata['base64'] = event.target.result;
                $('#panCardName').text(this.panImageName);
                this.Pan_Doc.push(imagedata);
              }
            }
          } else {
            alert('File Type should be PNG, PDF, JPG, JPEG');
            this.DocumentForm.controls['pan_img'].setValue('');

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
  uploadAadhar(event: any) {
    this.Aadhar_img = [];
    let file = event.target.files[0];
    this.DocumentForm.controls['adhar_front_img'].setValue(
      file ? file.name : ''
    );
    $('#AadharCardName').text(file.name);
    this.AadharImageName = file.name;
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        this.Aadhar_name = event.target.files;
        const fileName = event.target.files[i];
        this.finddots = fileName.name.match(/\./gi).length;
        this.findSpace = fileName.name.match(/\s/gi);
        this.findComas = fileName.name.match(/\,/gi);
        this.ImgSize = fileName.size;
        this.ImgType_adhar = fileName.name.split('.');
        reader.onload = (event: any) => {
          if (
            this.ImgType_adhar[1] == 'pdf' ||
            this.ImgType_adhar[1] == 'jpeg' ||
            this.ImgType_adhar[1] == 'jpg' ||
            this.ImgType_adhar[1] == 'png'
          ) {
            if (this.ImgSize > 2000000) {
              alert('File Size is not greater than 2MB');
              this.DocumentForm.controls['adhar_front_img'].setValue('');
              return false;
            } else if (this.findComas != null) {
              alert('File Name Not valid (remove comma)');
              this.DocumentForm.controls['adhar_front_img'].setValue('');

              return false;
            } else if (this.finddots > 1) {
              alert('File Name Not valid (include ony one dot)');
              this.DocumentForm.controls['adhar_front_img'].setValue('');

              return false;
            } else {
              if (
                this.ImgType_adhar[1] == 'jpeg' ||
                this.ImgType_adhar[1] == 'jpg' ||
                this.ImgType_adhar[1] == 'png'
              ) {
                const imagedata = {};
                // imagedata['base64'] = event.target.result;
                this.imageCompress
                  .compressFile(event.target.result, 0, 75, 50)
                  .then(
                    (result) => {
                      imagedata['base64'] = result;
                      this.Aadhar_img.push(imagedata);
                      console.warn(
                        'Size in bytes is now:',
                        this.imageCompress.byteCount(result)
                      );
                    },
                    (err) => {
                      imagedata['base64'] = event.target.result;
                      this.Aadhar_img.push(imagedata);
                    }
                  );
              } else {
                const imagedata = {};
                imagedata['base64'] = event.target.result;
                this.Aadhar_img.push(imagedata);
              }
            }
          } else {
            alert('File Type should be PNG, PDF, JPG, JPEG');
            this.DocumentForm.controls['adhar_front_img'].setValue('');

            return false;
          }
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  uploadBackAadhar(event: any) {
    this.Aadhar_Back_img = [];
    let file = event.target.files[0];
    this.DocumentForm.controls['adhar_back_img'].setValue(
      file ? file.name : ''
    );
    // $("#AadharCardName").text(file.name);
    this.AadharBackImageName = file.name;
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        this.Aadhar_back_name = event.target.files;
        const fileName = event.target.files[i];
        this.finddots = fileName.name.match(/\./gi).length;
        this.findSpace = fileName.name.match(/\s/gi);
        this.findComas = fileName.name.match(/\,/gi);
        this.ImgSize = fileName.size;
        this.ImgType_adhar_back = fileName.name.split('.');
        reader.onload = (event: any) => {
          if (
            this.ImgType_adhar_back[1] == 'pdf' ||
            this.ImgType_adhar_back[1] == 'jpeg' ||
            this.ImgType_adhar_back[1] == 'jpg' ||
            this.ImgType_adhar_back[1] == 'png'
          ) {
            if (this.ImgSize > 2000000) {
              alert('File Size is not greater than 2MB');
              this.DocumentForm.controls['adhar_back_img'].setValue('');
              return false;
            } else if (this.findComas != null) {
              alert('File Name Not valid (remove comma)');
              this.DocumentForm.controls['adhar_back_img'].setValue('');

              return false;
            } else if (this.finddots > 1) {
              alert('File Name Not valid (include ony one dot)');
              this.DocumentForm.controls['adhar_back_img'].setValue('');

              return false;
            } else {
              if (
                this.ImgType_pan[1] == 'jpeg' ||
                this.ImgType_pan[1] == 'jpg' ||
                this.ImgType_pan[1] == 'png'
              ) {
                const imagedata = {};
                // imagedata['base64'] = event.target.result;
                this.imageCompress
                  .compressFile(event.target.result, 0, 75, 50)
                  .then((result) => {
                    imagedata['base64'] = result;
                    this.Aadhar_Back_img.push(imagedata);
                    console.warn(
                      'Size in bytes is now:',
                      this.imageCompress.byteCount(result)
                    );
                  });
              } else {
                const imagedata = {};
                imagedata['base64'] = event.target.result;
                this.Aadhar_Back_img.push(imagedata);
              }
            }
          } else {
            alert('File Type should be PNG, PDF, JPG, JPEG');
            this.DocumentForm.controls['adhar_back_img'].setValue('');

            return false;
          }
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  uploadDegree(event: any) {
    this.degree_img = [];
    let file = event.target.files[0];
    this.DocumentForm.controls['degree_img'].setValue(file ? file.name : '');
    // (<any>this.DocumentForm.controls.Education).controls[index].controls[
    //   'degree_img'
    // ].setValue(file ? file.name : '');
    // $('#UploaddegreeName' + index).text(file.name);
    this.UploaddegreeName = file.name;
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        this.Degree_name = event.target.files;
        const fileName = event.target.files[i];

        this.finddots = fileName.name.match(/\./gi).length;
        this.findSpace = fileName.name.match(/\s/gi);
        this.findComas = fileName.name.match(/\,/gi);
        this.ImgSize = fileName.size;
        this.ImgType_degree = fileName.name.split('.');
        reader.onload = (event: any) => {
          if (
            this.ImgType_degree[1] == 'pdf' ||
            this.ImgType_degree[1] == 'jpeg' ||
            this.ImgType_degree[1] == 'jpg' ||
            this.ImgType_degree[1] == 'png'
          ) {
            if (this.ImgSize > 2000000) {
              alert('File Size is not greater than 2MB');
              this.DocumentForm.controls['degree_img'].setValue('');

              // (<any>this.DocumentForm.controls.Education).controls[
              //   index
              // ].controls['degree_img'].setValue('');

              return false;
            } else if (this.findComas != null) {
              alert('File Name Not valid (remove comma)');
              this.DocumentForm.controls['degree_img'].setValue('');

              // (<any>this.DocumentForm.controls.Education).controls[
              //   index
              // ].controls['degree_img'].setValue('');

              return false;
            } else if (this.finddots > 1) {
              alert('File Name Not valid (include ony one dot)');
              this.DocumentForm.controls['degree_img'].setValue('');

              // (<any>this.DocumentForm.controls.Education).controls[
              //   index
              // ].controls['degree_img'].setValue('');

              return false;
            } else {
              if (
                this.ImgType_pan[1] == 'jpeg' ||
                this.ImgType_pan[1] == 'jpg' ||
                this.ImgType_pan[1] == 'png'
              ) {
                const imagedata = {};
                // imagedata['base64'] = event.target.result;
                this.imageCompress
                  .compressFile(event.target.result, 0, 75, 50)
                  .then((result) => {
                    imagedata['base64'] = result;
                    this.degree_img.push(imagedata);
                    console.warn(
                      'Size in bytes is now:',
                      this.imageCompress.byteCount(result)
                    );
                  });
              } else {
                const imagedata = {};
                imagedata['base64'] = event.target.result;
                this.degree_img.push(imagedata);
              }
            }
          } else {
            alert('File Type should be PNG, PDF, JPG, JPEG');
            this.DocumentForm.controls['degree_img'].setValue('');

            // (<any>this.DocumentForm.controls.Education).controls[
            //   index
            // ].controls['degree_img'].setValue('');

            return false;
          }
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  fileChangeEvent(event: any): void {
    let file = event.target.files[0];
    this.profileForm.controls['profile_img'].setValue(file ? file.name : '');
    this.imageChangedEvent = event;
    this.CropimagedataDiv = true;
  }
  imageCropped(event: ImageCroppedEvent) {
    const splitval = event.base64.split(';');
    this.ImgType_profile = splitval[0].split('/');
    // this.ImgType_profile = event.target.files[i].name.split(".");
    this.croppedImage = event.base64;
    this.Cropimagedata = this.croppedImage;
  }
  SkipProfile() {
    this.isInserting = true;
    const profile = this.profileForm.value;
    const document = this.DocumentForm.value;
    const bank = this.BankForm.value;
    const expertise = this.expertiseForm.value;

    const formdata = new FormData();
    formdata.append('counsellor_id', this.counsellor_id);
    formdata.append('summary', profile.profile_summry);
    formdata.append('image', this.Cropimagedata);

    formdata.append('aadar_number', document.adhar_num);
    formdata.append('govt_id', this.Aadhar_img[0].base64);
    formdata.append('pan', this.Pan_Doc[0].base64);
    formdata.append('pan_number', document.pan_num);

    formdata.append('bank', bank.bank_name);
    formdata.append('account', bank.acc_number);
    formdata.append('holder', bank.acc_holder_name);
    formdata.append('ifsc', bank.ifsc_code);
    let educationArray = [];
    let i = 0;
    // document.Education.forEach((element) => {
    //   const data = {};
    //   data['degree_name'] = element.degree_name;
    //   data['degree_img'] = this.degree_img[0].base64;
    //   i++;
    //   educationArray.push(data);
    // });

    const data = {};
    data['degree_name'] = document.degree_name;
    data['degree_img'] = this.degree_img[0].base64;
    data['extnsn_degree'] = this.ImgType_degree[1];

    educationArray.push(data);

    formdata.append('degree', JSON.stringify(educationArray));
    let expertiseFormArray = [];
    expertise.Expertise.forEach((element) => {
      const data = {};
      data['name'] = element.expertiseName;
      data['price'] = element.expertisePrice;
      expertiseFormArray.push(data);
    });

    formdata.append('price', JSON.stringify(expertiseFormArray));
    this.enlytmntservice.addProfileData(formdata).subscribe(
      (res) => {
        if (res.succ) {
          this.isInserting = false;
          alert('Profile Succesfully Added');
          this.submitted3 = false;
          this.expertiseForm.reset();
          this.router.navigate(['/profile']);
        } else {
          this.isInserting = false;
        }
      },
      (error) => {
        console.error('Error in fetching home offer : ' + error);
        this.isInserting = false;
      }
    );
  }

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }

  isValidTypeBoolean: boolean = true;

  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    return true;
  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    return of(true);
  }
}
