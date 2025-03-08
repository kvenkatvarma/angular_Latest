import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate{

  constructor(private loginService: LoginService, private router:Router,private jwthelperService:JwtHelperService) { }
  canActivate(route:ActivatedRouteSnapshot): boolean{
    var token = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser")).token: null;
    if(this.loginService.isAuthenticated() && this.jwthelperService.decodeToken(token).role == route.data.expectedRole){
      return true;
    }
    else
    {
      this.router.navigate(["login"])
      return false;
    }
  }

}
