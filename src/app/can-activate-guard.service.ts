import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate{

  constructor(private loginService: LoginService, private router:Router) { }
  canActivate(): boolean{
    if(this.loginService.isAuthenticated()){
      return true;
    }
    else
    {
      this.router.navigate(["login"])
      return false;
    }
  }

}
