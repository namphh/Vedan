import { Component, OnInit } from '@angular/core';

import { LicenseService } from '@services/license.service';
import { LICENSE_STATUS } from '@constants/license-status';
import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  constructor(
    private licenseService: LicenseService
  ) { }
  public navItems = navItems;
  public licenseToken: string = ""
  public message: string = ""
  public isShowMessage: boolean = false
  public isLoading: boolean = false
  public isActivated: boolean = true
  public activationStatus: string = ""
  public messageStatusLicense: string = ""

  ngOnInit(): void {
    this.licenseService.getLicenseStatus().subscribe(res => {
      this.activationStatus = res?.activation_status
      console.log(this.activationStatus)
      if (this.activationStatus == LICENSE_STATUS.ACTIVATED) {
        this.isActivated = true
      }
      else if (this.activationStatus == LICENSE_STATUS.OUT_DATE) {
        this.messageStatusLicense = "License đã hết hạn, vui lòng kích hoạt license mới"
        this.isActivated = false
      }
      else if (this.activationStatus == LICENSE_STATUS.INVALID) {
        this.messageStatusLicense = "Hãy nhập license để kích hoạt"
        this.isActivated = false
      }
      else {
        this.messageStatusLicense = "Hãy nhập license để kích hoạt"
        this.isActivated = false
      }
    })
  }

  activate(): void {
    this.isShowMessage = false
    this.isLoading = true
    this.message = "* "
    this.licenseService.activateLicense(this.licenseToken).subscribe(
      (res) => {
        if (res?.status == "SUCCESS") {
          this.isLoading = false
          this.isActivated = true
          this.licenseToken = ""
        }
        else {
          this.isShowMessage = true
          this.isLoading = false
          this.message += "Kích hoạt license thất bại"
        }
      },
      (err) => {
        this.isShowMessage = true
        this.isLoading = false
        this.message += "System error"
      }
    )
  }
}
