import {HttpClient} from '@angular/common/http';
import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GetApiService} from '../../services/shared/get-api.service';
import {PostApiService} from '../../services/shared/post-api.service';
import {TokenStorageService} from '../../services/auth/token-storage.service';
import {NavbarComponent} from '../../navigation/navbar/navbar.component';
import {User} from '../../model/user';
import {UserCustomDetails} from '../../model/UserCustomDetails';

@Component({
  selector: "app-user",
  templateUrl: "user.component.html",
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private userId: number = Number(this.tokenStorage.getUserId());

  public userCustomDetails: UserCustomDetails = new UserCustomDetails();
  public firstAndLastName: string;
  public job: string;
  private tempJob: string;
  public photoDescriptions: string;
  private tempPhotoDesc: string;
  public userPhotoImgUrl: string = '';

  //Photo
  public selectedFile: File;
  imgURL: any;
  requiredImageFile: boolean = false;
  photoExtensions: string[] = ["png", "jfif", "pjpeg", "jpeg", "pjp", "jpg"];

  constructor(private tokenStorage: TokenStorageService, private getApiService: GetApiService,
              private postApiService: PostApiService, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.getUserCustomDetails();
    this.getUserPhoto();
  }

  getUserCustomDetails () {
    this.getApiService.getUserCustomDetailsByUserId(this.userId).subscribe(
      (details: UserCustomDetails) => {
        this.userCustomDetails = details;
        this.checkAllPhotoDetails(this.userCustomDetails);
      },
      () => {
        alert("An error is occurred in getUserCustomDetailsByUserId()");
      }
    );
  }

  getUserPhoto() {
    this.getApiService.getUserPhotoByUserId(this.userId).subscribe(
      photo => {
        this.userPhotoImgUrl = 'data:image/png;base64,'+photo.pic;
      }
    );
  }

  checkAllPhotoDetails(userCustomDetails: UserCustomDetails) {
    let firstNameEmpty = checkIfValueIsEmpty(userCustomDetails.firstName);
    let lastNameEmpty = checkIfValueIsEmpty(userCustomDetails.lastName);
    let jobEmpty = checkIfValueIsEmpty(userCustomDetails.job);
    let photoDescriptions = checkIfValueIsEmpty(userCustomDetails.photoDescriptions);

    firstNameEmpty && lastNameEmpty ? this.firstAndLastName = "First and last name" :
      this.firstAndLastName = userCustomDetails.firstName+" "+userCustomDetails.lastName;

    jobEmpty ? this.job="Add current job..." : this.job=userCustomDetails.job;

    photoDescriptions ? this.photoDescriptions = "Descriptions about your photo or some quotation" :
      this.photoDescriptions = userCustomDetails.photoDescriptions;

    function checkIfValueIsEmpty(value): boolean {
      return value === '';
    }
  }

  onSubmitUserCustomDetails() {
    this.postApiService.postUserCustomDetails(this.userCustomDetails).subscribe(
      () => {
        this.checkAllPhotoDetails(this.userCustomDetails);
      },
      () => {alert("An error is occurred in onSubmitUserCustomDetails()")}
      );
  }

  modalAllPhotoDetails(content: TemplateRef<any>) {
    this.tempJob = this.job;
    this.tempPhotoDesc = this.photoDescriptions;

    this.modalService.open(content, {backdrop: "static"}).result.then(
      () => {
        if (this.selectedFile != null) {
          this.onUpload(this.selectedFile, this.userId);
          this.userPhotoImgUrl = this.imgURL;
          let navbar: HTMLElement = document.getElementsByTagName("nav")[0];
          let mainPhoto: Element = navbar.getElementsByClassName("avatar")[0];
          console.log(mainPhoto.setAttribute("src", this.imgURL));
        }
        this.userCustomDetails.job = this.tempJob;
        this.userCustomDetails.photoDescriptions = this.tempPhotoDesc;

        this.onSubmitUserCustomDetails();

        this.deleteLoadedImageData();
      },
      () => {

        this.deleteLoadedImageData();
      }
    );
    this.requiredImageFile = false;
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];

    let idxDot = this.selectedFile.name.lastIndexOf(".") +1;
    let extFile = this.selectedFile.name.substr(idxDot, this.selectedFile.name.length).toLowerCase();

    if(this.photoExtensions.includes(extFile)) {
      // Below part is used to display the selected image
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.imgURL = reader.result;
      };
    } else {
      this.requiredImageFile = true;
      this.deleteLoadedImageData();
    }

  }

  onUpload(file: File, userId: number) {
    let uploadData: FormData = new FormData();

    uploadData.append('myFile', file, file.name);
    uploadData.append('properties', new Blob([JSON.stringify({
      "userId": userId
    })], {
      type: "application/json"
    }));

    this.postApiService.postUserPhoto(uploadData).subscribe();
  }

  deleteLoadedImageData () {
    delete this.imgURL;
    delete this.selectedFile;
  }
}
