import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../auth.service";
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public deviceInfo = null;
  public isMobilevar = false;
  public isTabletvar = false;
  public isDesktopvar = false;

  constructor(public authService: AuthService, private deviceService: DeviceDetectorService) {
    this.detectDevice();
    this.isMobile();
    this.isTablet();
    this.isDesktop();
  }

  ngOnInit() {

  }
  public detectDevice() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }
 
  public isMobile() {
    this.isMobilevar = this.deviceService.isMobile();
  }
 
  public isTablet() {
    this.isTabletvar = this.deviceService.isTablet();
  }
 
  public isDesktop() {
    this.isDesktopvar = this.deviceService.isDesktop();
  }

}
