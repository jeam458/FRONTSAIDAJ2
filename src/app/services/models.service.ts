import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  constructor() { }
}

export interface userSchema{
  _id:string,
  email:string;
  password:string;
  nombres:string;
  apellidos:string;
  tipo:string;
  celular:number;
  picture:string;
}

export interface tareaSchema{
  _id:string;
  nombre:string;
  descripcion:string;
  principal:string,
  tipo:Array<any>,
  prioridad:number;
  estado:number;
  fecha:Date;
  fechafin:Date;
  responsable:string;
}