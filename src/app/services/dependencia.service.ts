import { Injectable } from '@angular/core';
import { DependenciaSchema} from './models/dependencia';
import { HttpClient, HttpDownloadProgressEvent, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { cadenaconexion} from './config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DependenciaService {
  dep: Observable<DependenciaSchema>;
  tipoParte: Observable<DependenciaSchema>
  cadena=cadenaconexion.server;
  constructor(private http: HttpClient) { }
  getAll():Observable<any>{
    return this.http.get<any>(this.cadena+'dep/dependencias'); 
  }

  getAllTipo(Tipo){
    return this.http.get<any>(this.cadena+'dep/dependencias/'+Tipo); 
  }

  postDep(Dep){
    return this.http.post(this.cadena+'dep/dependencia',Dep);
  }

  putDep(Dep){
    return this.http.put(this.cadena+'dep/dependencia/'+Dep._id,Dep);
  }

  deleteDep(Dep){
    return this.http.delete(this.cadena+'dep/dependencia/'+Dep._id);
  }
}
