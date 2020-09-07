import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url='https://cors-anywhere.herokuapp.com/https://api.sciener.com/'
  // url="https://crossorigin.me/https://api.sciener.com/";

  constructor( private http: HttpClient) { }  
user_token;
  loginUser(body){
    console.log(body);
    let options = {
      headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded'), 
  };
    return this.http.post(this.url + 'oauth2/token/',body,options
    ).pipe(
      tap((res)=>{
        console.log(res);
   this.user_token=localStorage.setItem('user_token', res[0].access_token);
   console.log(this.user_token);
    }))
  }
}
