import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FileservicesService {
  cadena= 'http://127.0.0.1:4000/file/';
  constructor(private http: Http) { }

  dowloadPDF(filename):any {
    return this.http.get(this.cadena+filename, {responseType:ResponseContentType.Blob})
  }

  showFileNames(){
    return this.http.get(this.cadena+'files')
  }
  deleteFile(id){
    return this.http.delete(this.cadena+id)
  }
}
