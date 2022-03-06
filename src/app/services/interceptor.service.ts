import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Route} from '@angular/router';
import { catchError, filter, take, switchMap } from "rxjs/operators";
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
 private token:any='';
 constructor(private snackbar: MatSnackBar){}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Interception In Progress"); //SECTION 1
    this.token= localStorage.getItem('token');
    //console.log(this.token.token)
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token) });
    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
 
    return next.handle(req)
        .pipe(
           catchError((error: HttpErrorResponse) => {
                //401 UNAUTHORIZED - SECTION 2
                if (error && error.status === 401 ) {
                    console.log("ERROR 401 UNAUTHORIZED")
                    this.snackbar.open('Ups!', 'Tenemos problemas con tu usuario', {
                      duration: 10000
                    });
                }
                const err = error.error.message || error.statusText;
                return throwError(error);                    
           })
        );
  } 

}
