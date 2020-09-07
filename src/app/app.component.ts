import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FCM } from '@ionic-native/fcm/ngx';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.fcm.getToken().then((token)=>{
        alert("hhh"+ JSON.stringify(token))
       localStorage.setItem('token', token);
      },err=>{
    alert("tokennot found"+ JSON.stringify(err));
      })
      this.fcm.onNotification().subscribe(data=>{
        if(data.wasTapped){

        }
        else{
          var msg=data.message;
          alert(data.message);
        }
      })

      this.fcm.onTokenRefresh().subscribe(token=>{
        localStorage.setItem('token',token);
      })
      this.fcm.hasPermission().then(hasPermission => {
        if (hasPermission) {
          console.log("Has permission!");
        }
      })
    });
  }
}
