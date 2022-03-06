import { Injectable } from '@angular/core';
import { ActoSchema} from './models/actoprocesal';
import { HttpClient, HttpDownloadProgressEvent, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { cadenaconexion} from './config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActoprocesalService {
  acto: Observable<ActoSchema>;
  cadena=cadenaconexion.server;
  constructor(private http: HttpClient) { }

  getAll():Observable<any>{
    return this.http.get<any>(this.cadena+'actos'); 
  }

  postActo(acto){
    return this.http.post(this.cadena+'acto',acto);
  }

  putActo(acto){
    return this.http.put(this.cadena+'acto/'+acto._id,acto);
  }

  deleteActo(acto){
    return this.http.delete(this.cadena+'acto/'+acto._id);
  }
}
