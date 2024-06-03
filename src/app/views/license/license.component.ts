import { Component, OnInit } from "@angular/core";
import { LicenseService } from "@services/license.service";


@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
})
export class LicenseComponent implements OnInit {
  constructor (
    private licenseService: LicenseService
  ){}
  public infoLicense: any = {}
  ngOnInit(): void {
    this.infoLicense = this.licenseService.getLicenseStatus().subscribe(res => {
      this.infoLicense = res
    })
  }
}
