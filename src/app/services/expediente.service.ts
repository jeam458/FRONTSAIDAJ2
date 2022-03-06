import { Injectable } from '@angular/core';
import { ExpedienteSchema} from './models/expediente';
import { HttpClient, HttpDownloadProgressEvent, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { cadenaconexion} from './config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {
  parte: Observable<ExpedienteSchema>;
  tipoParte: Observable<ExpedienteSchema>
  cadena=cadenaconexion.server;
  constructor(private http: HttpClient) { }
  getAll():Observable<any>{
    return this.http.get<any>(this.cadena+'archivo/expedientes'); 
  }

  postExpediente(exp){
    return this.http.post(this.cadena+'archivo/expediente',exp);
  }

  putExpediente(exp){
    return this.http.put(this.cadena+'archivo/expediente/'+exp._id,exp);
  }

  deleteExpediente(exp){
    return this.http.delete(this.cadena+'archivo/expediente/'+exp._id);
  }

}
