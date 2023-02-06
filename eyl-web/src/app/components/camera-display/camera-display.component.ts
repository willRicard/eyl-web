import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-camera-display',
  templateUrl: './camera-display.component.html',
  styleUrls: ['./camera-display.component.css']
})

export class CameraDisplayComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();

  videoOptions = {
    width: {min: 1024}, 
    height: {min: 576} 
  };

  videoUrl: SafeResourceUrl | undefined;

  pictureWidth: number = 1080;
  pictureHeight: number = 0;

  video: HTMLVideoElement | null = null;
  canvas: HTMLCanvasElement | null = null;
  photo: HTMLImageElement | null = null;
  
  constructor() { }
  
  ngOnInit() {
    // If there is a camera in user devices, display the camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        let video = document.querySelector('video');
        if ( video) video.srcObject = stream;
      }).catch(error => {
      })
    }

    this.video = <HTMLVideoElement> document.getElementById('video');
    this.canvas = <HTMLCanvasElement> document.getElementById('canvas');
    this.photo = <HTMLImageElement> document.getElementById('photo');
    console.log(this.video);
    if (this.video)
      this.pictureHeight = (this.video.clientHeight / (this.video.clientWidth / this.pictureWidth));

    this.canvas?.setAttribute("width", this.pictureWidth.toString());
    this.canvas?.setAttribute("height", this.pictureHeight.toString());
  }

  dataURItoBlob(dataURI: string) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
  }

  takePicture() {
    let canvasElement = (this.canvas as HTMLCanvasElement)
    const context = canvasElement.getContext("2d");
    let facts: number[] = [];
    
    if (this.pictureWidth && this.pictureHeight) {
      canvasElement.width = this.pictureWidth;
      canvasElement.height = this.pictureHeight;
      if (this.video)
      context?.drawImage((this.video as HTMLVideoElement), 0, 0, this.pictureWidth, this.pictureHeight);
      const data = canvasElement.toDataURL("image/png");
      const multipart = new FormData();
      multipart.append('image', this.dataURItoBlob(data));
      fetch('http://141.145.213.73/nutritionExtract/', {
        method: 'POST',
        body: multipart
      }).then((response) => {
        (window as any).response = response;
        return response.json()
      })
      .then((json) => {
        (window as any).myJson = json;
        facts.push(json);
        this.newItemEvent.emit(JSON.stringify(facts[0]));
      });

      console.log("multipart: " , multipart)
      console.log(this.dataURItoBlob(data))
      
      this.photo?.setAttribute("src", data);
      canvasElement.width = 0;
      canvasElement.height = 0;
    }

    
  }

}
