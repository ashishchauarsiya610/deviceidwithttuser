import { BLE } from '@ionic-native/ble/ngx';
import { Component, NgZone } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  devices: any[] = [];
  statusMessage: string;
  deviceMode = true;
  fcmtoken:any="";
  constructor(
    private toastCtrl: ToastController,
    private ble: BLE,
    private ngZone: NgZone,
    private uniqueDeviceID: UniqueDeviceID,
    private uid: Uid,
    private androidPermissions: AndroidPermissions
  ) {
    this.getPermission();
    this.getUniqueDeviceID();
    this.fcmtoken= localStorage.getItem('token');
    console.log(this.fcmtoken);
    alert( "Ashish:"+ this.fcmtoken);
    
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.scan();
  }

    scan() {
      this.setStatus("Scanning for Bluetooth LE Devices");
      this.devices = []; // clear list
  
      this.ble.scan([], 5).subscribe(
        device => this.onDeviceDiscovered(device),
        
        error => this.scanError(error)

      );
  
      setTimeout(this.setStatus.bind(this), 5000, "Scan complete");
    }
  
    onDeviceDiscovered(device) {
      console.log("Discovered " + JSON.stringify(device, null, 2));
      this.ngZone.run(() => {
        this.devices.push(device);

      });
    }
  
    // If location permission is denied, you'll end up here
    async scanError(error) {
      this.setStatus("Error " + error);
      let toast = await this.toastCtrl.create({
        // message: "Error scanning for Bluetooth low energy devices",
        message: error,
        position: "middle",
        duration: 5000
      });
      toast.present();
    }
  
    setStatus(message) {
      console.log(message);
      this.ngZone.run(() => {
        this.statusMessage = message;
      });
    }
    data(d){
      this.scanError(JSON.stringify(d));
    }
    UniqueDeviceID;
    getUniqueDeviceID() {
      this.uniqueDeviceID.get()
        .then((uuid: any) => {
          console.log(uuid);
          this.UniqueDeviceID = uuid;
          alert(this.UniqueDeviceID);
        })
        .catch((error: any) => {
          console.log(error);
          this.UniqueDeviceID = "Error! ${error}";
        });

        this.emei=this.uid.IMEI;
        this.iccid=this.uid.ICCID;
        this.imsi=this.uid.IMSI;
        this.mac=this.uid.MAC;
        this.uuid=this.uid.UUID;
        return this.uid.IMEI,this.uid.ICCID,this.uid.IMSI,this.uid.MAC,this.uid.UUID;
    }
  emei;iccid;imsi;mac;uuid;
    getID_UID(type){
      if(type == "IMEI"){
        // this.emei=this.uid.IMEI;
        return this.uid.IMEI;
      }else if(type == "ICCID"){
        return this.uid.ICCID;
      }else if(type == "IMSI"){
        return this.uid.IMSI;
      }else if(type == "MAC"){
        return this.uid.MAC;
      }else if(type == "UUID"){
        return this.uid.UUID;
      }
    }

    getPermission(){
      this.androidPermissions.checkPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      ).then(res => {
        if(res.hasPermission){
          
        }else{
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(res => {
            alert("Persmission Granted Please Restart App!");
          }).catch(error => {
            alert("Error! "+error);
          });
        }
      }).catch(error => {
        alert("Error! "+error);
      });
    }

}
