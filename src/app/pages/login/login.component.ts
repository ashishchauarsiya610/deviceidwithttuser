import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {}
  formData: FormData = new FormData(); 
  onSubmit(data){
    console.log(data);
    let username=data.user;
    let pass=data.password;
    console.log(username);
    console.log(pass);
    
    this.formData.append('client_id', '7a614fea8d6f427caa982e9a1aa6afc1');
    this.formData.append('client_secret',"5c5f94e120022ac4288c648c1e89eb51");
    this.formData.append('grant_type', "password ");
    this.formData.append('username','dyfo_'+username);
    this.formData.append('password', pass);
    this.formData.append('redirect_url',"https://dyfolabs.com/");
    console.log(this.formData);

    // let userbody={
    //   client_id: '7a614fea8d6f427caa982e9a1aa6afc1',
    //   client_secret: "5c5f94e120022ac4288c648c1e89eb51",
    //   grant_type:"password",
    //   username : 'dyfo_'+username,
    //   password: pass,
    //   redirect_url :'https://dyfolabs.com/'
    // }
    
     this.auth.loginUser(this.formData).subscribe(res=>{
       console.log(JSON.stringify(res));
     },error=>{
       console.log((error.error));
       console.log('error');
     })
    console.log(this.formData);
  }
}
