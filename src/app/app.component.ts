import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { OrdersService } from './shared/services/orders.service';
import { mergeMapTo } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Inventory';
  constructor(public authService: AuthService, private afMessaging: AngularFireMessaging, private os: OrdersService,
    private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.listen();
  }
  requestPermission() {
    this.afMessaging.requestPermission
      .subscribe(
        () => { console.log('Permission granted!'); },
        (error) => { console.error(error); },
      );

    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => {
          console.log(  this.createDocumentID() + 'Permission granted! Save to the server!', token);
          this.os.updateNotificationToken({
            tokens: token,
            uid: this.authService.userData.uid
          }, this.createDocumentID());
        },
        (error) => { console.error(error); },
      );
  }
  listen() {
    this.afMessaging.messages
      .subscribe((message) => { console.log(message); });
  }

  createDocumentID() {
    const sufix = '_' + this.deviceService.getDeviceInfo().os_version + '_' + this.deviceService.getDeviceInfo().browser
      + '_' + this.deviceService.getDeviceInfo().browser_version;
    return this.authService.userData.uid + sufix;
  }
  logCheck() {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  }
}
