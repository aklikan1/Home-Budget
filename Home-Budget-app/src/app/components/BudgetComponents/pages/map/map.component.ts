import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import {GetApiService} from '../../../shared/get-api.service';
import {TokenStorageService} from '../../../UIComponents/auth/token-storage.service';
import {User} from '../dashboard/model/user';

const moment = _rollupMoment || _moment;

@Component({
  selector: "app-map",
  templateUrl: "map.component.html"
})
export class MapComponent implements OnInit {

  public selectedFile: File;
  public event1;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;

  user: User;

  constructor(private httpClient: HttpClient, private getApiService: GetApiService, private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.getApiService.getUserByUserId(Number(this.tokenStorage.getUserId())).subscribe(
      value => {
        this.user = value;
      }
    );
  }

  public onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  // This part is for uploading
  onUpload() {

    let uploadData: FormData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    uploadData.append('properties', new Blob([JSON.stringify({
      "userId": this.user.id
    })], {
      type: "application/json"
    }));

    this.httpClient.post('http://localhost:8080/api/photo/upload', uploadData)
      .subscribe(
        res => {console.log(res);
          this.receivedImageData = res;
          this.base64Data = this.receivedImageData.pic;
          this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
        err => console.log('Error Occured duringng saving: ' + err)
      );
  }

}
