import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginViewModel } from './login-view-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient:HttpClient | null = null;
  constructor(private httpBackend:HttpBackend,private jwthelperService: JwtHelperService) { }
  currentUserName:any = null;

  public login(loginViewModel:LoginViewModel):Observable<any>{
    this.httpClient  = new HttpClient(this.httpBackend);

   return this.httpClient.post<any>("/authenticate",loginViewModel).pipe(map(user=>{
     if(user)
     {

      this.currentUserName = user.userName;
      sessionStorage.currentUser = JSON.stringify(user);
     }
     return user;
   }));
  }
  public logout(){
    sessionStorage.removeItem("currentUser");
    this.currentUserName = null;
  }
  public isAuthenticated():boolean{
    var token = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser")).token: null;
    if(this.jwthelperService.isTokenExpired())
    {
      return false;
    }
    else
    {
      return true;
    }
  }
}
