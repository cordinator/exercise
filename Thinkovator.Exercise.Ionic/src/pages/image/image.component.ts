import { Component, OnInit } from '@angular/core';
import { IonicPage, Platform, ActionSheetController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { LoadingService } from '../../app/loading/loading.service';
import { Message, MessageType } from '../../app/shared/message-banner/message'

import { ImageService } from './image.service';
import { Image } from './image';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-image',
  templateUrl: 'image.component.html',
  providers: [ImageService]
})
export class ImagePage implements OnInit {
  messages: Message[] = [];
  lastImage: string = null;

  constructor(private service: ImageService,
    private loadingService: LoadingService,
    private actionSheet: ActionSheetController,
    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public platform: Platform) {
  }

  ngOnInit(): void {
  }

  presentActionSheet() {
    let actionSheet = this.actionSheet.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  uploadImage(): void {
    // Destination URL
    var url = "http://yoururl/upload.php";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loadingService.showLoading();
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loadingService.dismiss();
      this.setMessage(MessageType.success, 'Image succesful uploaded.');
    }, err => {
      this.loadingService.dismissAll();
      this.setMessage(MessageType.error, 'Error while uploading file.');
    });
  }

  pathForImage(img: string): string {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  private takePicture(sourceType): void {
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.setMessage(MessageType.error, 'Error while selecting image.');
    });
  }

  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.setMessage(MessageType.error, 'Error while storing file.');
    });
  }

  private setMessage(type: MessageType, message: string): void {
    this.loadingService.dismiss();

    this.messages.push({ type: type, message: message });
  }
}