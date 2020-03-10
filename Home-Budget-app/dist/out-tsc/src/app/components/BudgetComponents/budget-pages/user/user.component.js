import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetApiService } from '../../../services/shared/get-api.service';
import { PostApiService } from '../../../services/shared/post-api.service';
import { TokenStorageService } from '../../../services/auth/token-storage.service';
import { UserCustomDetails } from '../../model/UserCustomDetails';
let UserComponent = class UserComponent {
    constructor(tokenStorage, getApiService, postApiService, modalService) {
        this.tokenStorage = tokenStorage;
        this.getApiService = getApiService;
        this.postApiService = postApiService;
        this.modalService = modalService;
        this.userId = Number(this.tokenStorage.getUserId());
        this.userCustomDetails = new UserCustomDetails();
        this.userPhotoImgUrl = '';
        this.requiredImageFile = false;
        this.photoExtensions = ["png", "jfif", "pjpeg", "jpeg", "pjp", "jpg"];
    }
    ngOnInit() {
        this.getUserCustomDetails();
        this.getUserPhoto();
    }
    getUserCustomDetails() {
        this.getApiService.getUserCustomDetailsByUserId(this.userId).subscribe((details) => {
            this.userCustomDetails = details;
            this.checkAllPhotoDetails(this.userCustomDetails);
        }, () => {
            alert("An error is occurred in getUserCustomDetailsByUserId()");
        });
    }
    getUserPhoto() {
        this.getApiService.getUserPhotoByUserId(this.userId).subscribe(photo => {
            this.userPhotoImgUrl = 'data:image/png;base64,' + photo.pic;
        });
    }
    checkAllPhotoDetails(userCustomDetails) {
        let firstNameEmpty = checkIfValueIsEmpty(userCustomDetails.firstName);
        let lastNameEmpty = checkIfValueIsEmpty(userCustomDetails.lastName);
        let jobEmpty = checkIfValueIsEmpty(userCustomDetails.job);
        let photoDescriptions = checkIfValueIsEmpty(userCustomDetails.photoDescriptions);
        firstNameEmpty && lastNameEmpty ? this.firstAndLastName = "First and last name" :
            this.firstAndLastName = userCustomDetails.firstName + " " + userCustomDetails.lastName;
        jobEmpty ? this.job = "Add current job..." : this.job = userCustomDetails.job;
        photoDescriptions ? this.photoDescriptions = "Descriptions about your photo or some quotation" :
            this.photoDescriptions = userCustomDetails.photoDescriptions;
        function checkIfValueIsEmpty(value) {
            return value === '';
        }
    }
    onSubmitUserCustomDetails() {
        this.postApiService.postUserCustomDetails(this.userCustomDetails).subscribe(() => {
            this.checkAllPhotoDetails(this.userCustomDetails);
        }, () => { alert("An error is occurred in onSubmitUserCustomDetails()"); });
    }
    modalAllPhotoDetails(content) {
        this.tempJob = this.job;
        this.tempPhotoDesc = this.photoDescriptions;
        this.modalService.open(content, { backdrop: "static" }).result.then(() => {
            if (this.selectedFile != null) {
                this.onUpload(this.selectedFile, this.userId);
                this.userPhotoImgUrl = this.imgURL;
                let navbar = document.getElementsByTagName("nav")[0];
                let mainPhoto = navbar.getElementsByClassName("avatar")[0];
                console.log(mainPhoto.setAttribute("src", this.imgURL));
            }
            this.userCustomDetails.job = this.tempJob;
            this.userCustomDetails.photoDescriptions = this.tempPhotoDesc;
            this.onSubmitUserCustomDetails();
            this.deleteLoadedImageData();
        }, () => {
            this.deleteLoadedImageData();
        });
        this.requiredImageFile = false;
    }
    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
        let idxDot = this.selectedFile.name.lastIndexOf(".") + 1;
        let extFile = this.selectedFile.name.substr(idxDot, this.selectedFile.name.length).toLowerCase();
        if (this.photoExtensions.includes(extFile)) {
            // Below part is used to display the selected image
            let reader = new FileReader();
            reader.readAsDataURL(this.selectedFile);
            reader.onload = () => {
                this.imgURL = reader.result;
            };
        }
        else {
            this.requiredImageFile = true;
            this.deleteLoadedImageData();
        }
    }
    onUpload(file, userId) {
        let uploadData = new FormData();
        uploadData.append('myFile', file, file.name);
        uploadData.append('properties', new Blob([JSON.stringify({
                "userId": userId
            })], {
            type: "application/json"
        }));
        this.postApiService.postUserPhoto(uploadData).subscribe();
    }
    deleteLoadedImageData() {
        delete this.imgURL;
        delete this.selectedFile;
    }
};
UserComponent = __decorate([
    Component({
        selector: "app-user",
        templateUrl: "user.component.html",
        styleUrls: ['./user.component.scss']
    }),
    __metadata("design:paramtypes", [TokenStorageService, GetApiService,
        PostApiService, NgbModal])
], UserComponent);
export { UserComponent };
//# sourceMappingURL=user.component.js.map