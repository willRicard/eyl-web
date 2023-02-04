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

  constructor() { }

  ngOnInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("Devices: ", navigator.mediaDevices)
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.videoUrl = stream;
        console.log("videoUrl: ", this.videoUrl)
      }).catch(error => {
        console.log("Error: ", error)
      })
    }
  }

}
