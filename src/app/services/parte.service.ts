import { Injectable } from '@angular/core';
import { ParteSchema , personaSchema} from './models/parte';
import { TipoParteSchema} from './models/tipoparte';
import { HttpClient, HttpDownloadProgressEvent, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { cadenaconexion} from './config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParteService {
  parte: Observable<ParteSchema>;
  persona: Observable<personaSchema>
  tipoParte: Observable<TipoParteSchema>
  cadena=cadenaconexion.server;
  constructor(private http: HttpClient) { }
  

  getAll():Observable<any>{
    return this.http.get<any>(this.cadena+'parte/personas'); 
  }

  postParte(parte){
      return this.http.post(this.cadena+'parte/persona',parte);
  }

  putParte(parte){
    return this.http.put(this.cadena+'parte/persona/'+parte._id,parte);
  }

  deleteParte(parte){
    return this.http.delete(this.cadena+'parte/persona/'+parte._id);
  }

  getTipoPartes():Observable<any>{
    return this.http.get<any>(this.cadena+'parte/tipopartes'); 
  }

  postTipoParte(parte){
    return this.http.post(this.cadena+'parte/tipoparte',parte);
  }

  putTipoParte(tipoparte){
    return this.http.put(this.cadena+'parte/tipoparte/'+tipoparte._id,tipoparte);
  }

  deleteTipoParte(tipoparte){
    return this.http.delete(this.cadena+'parte/tipoparte/'+tipoparte._id);
  }

  getdni(dni){
    this.persona = this.http.get<any>(this.cadena+'Dni/'+dni);
    return this.persona;
  }

}
