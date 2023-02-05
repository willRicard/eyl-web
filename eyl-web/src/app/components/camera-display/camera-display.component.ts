import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-camera-display',
  templateUrl: './camera-display.component.html',
  styleUrls: ['./camera-display.component.css']
})

export class CameraDisplayComponent implements OnInit {
  videoOptions = {
    width: {min: 1024}, 
    height: {min: 576} 
  };

  videoUrl: SafeResourceUrl | undefined;

  pictureWidth: number = 480;
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

  takePicture() {
    let canvasElement = (this.canvas as HTMLCanvasElement)
    const context = canvasElement.getContext("2d");
    
    if (this.pictureWidth && this.pictureHeight) {
      canvasElement.width = this.pictureWidth;
      canvasElement.height = this.pictureHeight;
      if (this.video)
      context?.drawImage((this.video as HTMLVideoElement), 0, 0, this.pictureWidth, this.pictureHeight);
      const data = canvasElement.toDataURL("image/png");
      this.photo?.setAttribute("src", data);
      canvasElement.width = 0;
      canvasElement.height = 0;
    }
  }

}
