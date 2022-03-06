import { Injectable } from '@angular/core';
import { cadenaconexion} from './config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpDownloadProgressEvent, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
import { Router } from '@angular/router';
import { userSchema } from './models.service';
import { InterceptorService} from './interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private cadenaSignup:any;
  private cadenaLogin:any;
  private cadenaUsuarios:any;
  datos:userSchema;
  private currentUserSubject: BehaviorSubject<userSchema>;
  public currentUser: Observable<userSchema>;
  constructor(private http: HttpClient,private router: Router) { 
    this.cadenaLogin= cadenaconexion.server+'auth/login';
    this.cadenaSignup=cadenaconexion.server+'auth/signup';
    this.cadenaUsuarios=cadenaconexion.server+'usuarios';
    //this.currentUserSubject = new BehaviorSubject<userSchema>(JSON.parse(localStorage.getItem('currentUser')));
    //this.currentUser = this.currentUserSubject.asObservable();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getAuthMongo(data):Observable<any>{
    return this.http.post<any>(this.cadenaLogin,data).pipe(
      map(response=>{
        if(response!=null){
         //console.log(response);
         localStorage.setItem('token', JSON.stringify(response.token));
         //this.currentUserSubject.next(response);
         return true;
        } 
      })
    )
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

   
 

  inicializardatos(){
    let datos: userSchema;
    datos={
      _id:'',
      nombres:'',
      apellidos:'',
      tipo:'',
      email:'',
      celular:0,
      password:'',
      picture:''
    }
    return datos;
  }

  mostrarDatos(){
    this.datos=this.inicializardatos();
    let hoy=new Date();
    let yyy=hoy.getFullYear();
    const jwtHelper:JwtHelperService= new JwtHelperService();
    var token= localStorage.getItem('token');
    if(token!==null){
      var decode= jwtHelper.decodeToken(token);
      //console.log(decode);
      this.datos.nombres=decode.nombre;
      this.datos.apellidos=decode.apellido;
      this.datos.tipo=decode.tipo;
      this.datos._id=decode.sub;  
      this.datos.email= decode.email;
      return this.datos;   
    }
  }

  getAllUsers(){
    return this.http.get(this.cadenaUsuarios);
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }


}
