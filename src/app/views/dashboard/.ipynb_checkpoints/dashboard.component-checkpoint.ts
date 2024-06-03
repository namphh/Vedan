import { Component, OnInit } from '@angular/core';
import { PlateRecognitonService } from '@services/plate-recognition.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private plateRecognitonService: PlateRecognitonService
  ) {}

  public showResultImage: boolean = false; // Set to false initially
  public isShowRecogButton = true;
  public isLoading: boolean = false;
  public isShowUpload: boolean = true;
  public imageLocalUrl: any
  public plateText: string = ''
  public accuracyText: string = ''
  public accuracyTextPadding: string = 'Độ chính xác: '
  public currentFile: any
  public imgResult = ''
  public numberBags: string = ''
  public score: number = 0

  ngOnInit(): void {}

  upload(target: any){
    var files = target.files;
    if (files.length === 0) return;
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        // this.message = "Only images are supported.";
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
        this.imageLocalUrl = reader.result;
    }
    this.currentFile = files[0]
    this.isShowUpload = false
    this.showResultImage = true
  }

  reset(){
    this.isShowUpload = true
    this.imageLocalUrl = ''
    this.plateText = ''
    this.accuracyText = ''
    this.isLoading = false
    this.currentFile = undefined
    this.isShowRecogButton = true
    this.showResultImage = false
    
  }

  recognition(){
    this.isLoading = true
    if (this.currentFile != undefined) {
      var data = new FormData()
      data.append('image', this.currentFile)
      this.plateRecognitonService.recognition(data).subscribe(res => {
        this.isLoading = false;
        this.showResultImage = true;
        this.imgResult = 'data:image/jpeg;base64,' + res.data.base64_r;
        this.numberBags = res.data.result.number_bags;
        this.score = res.data.result.score;
        this.isShowRecogButton = false;
      },
      (error) => {
        if (error.status == 200) {
          this.isLoading = false
          this.isShowRecogButton = false
          console.log(error.body)
          this.imgResult = "http://" + window.location.hostname + ":8080/runs/segment/predict/image0.jpg"
        }
      })
    }
  }
}
