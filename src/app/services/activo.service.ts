import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { JwtHelperService} from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivoService implements CanActivate {
  token:any;
  constructor(private router:Router) { }
  canActivate(
    next:ActivatedRouteSnapshot,
    state:RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.token = localStorage.getItem('token');
    //console.log(this.token);
    if(this.token==null){
      this.router.navigate(['/login'],  {
        queryParams: {
          return: state.url
        }
      });
    } else if(this.token!=null) {
      var jwtHelper:JwtHelperService=new JwtHelperService();
      //console.log(jwtHelper.isTokenExpired(this.token));
    if (jwtHelper.isTokenExpired(this.token) === false) {
      
      //console.log(jwtHelper.decodeToken(token))
      //console.log('verificando ingreso');
      //this.router.navigate(['/home']);
      //console.log(currentUser);
      return true;
    } else {
      //console.log('verificando valor')
      //this.redirectUrl = state.url;
      this.router.navigate(['/login'],  {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
    }
    
  }
}
