import { Injectable } from '@angular/core';
import { tareaSchema} from './models.service';
import { HttpClient, HttpDownloadProgressEvent, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { cadenaconexion} from './config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorksService {
  tarea: Observable<tareaSchema>;
  cadena=cadenaconexion.server;
  constructor(private http: HttpClient) { }
  
  getAll():Observable<any>{
    return this.http.get<any>(this.cadena+'tareas'); 
  }

  postTarea(tarea){
    return this.http.post(this.cadena+'tarea',tarea);
  }

  putTarea(tarea){
    return this.http.put(this.cadena+'tarea/'+tarea._id,tarea);
  }

  deleteTrea(tarea){
    return this.http.delete(this.cadena+'tarea/'+tarea._id);
  }

  getTEnProceso():Observable<any>{
    return this.http.get<any>(this.cadena+'tenproceso'); 
  }

  getTConcluido():Observable<any>{
    return this.http.get<any>(this.cadena+'tconcluidos'); 
  }

  getTPendiente():Observable<any>{
    return this.http.get<any>(this.cadena+'tpendientes'); 
  }

  getTUsuario(user):Observable<any>{
     return this.http.get<any>(this.cadena+'tareasuser/'+user);
  }

  getTUserEstado(user,estado):Observable<any>{
    return this.http.get<any>(this.cadena+'tareasestado/'+user+'/'+estado);
  }

}
