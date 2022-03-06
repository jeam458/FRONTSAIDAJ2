import {ParteSchema} from './parte';
export interface ExpedienteSchema{
    _id:string;
    Expediente:string;
    NroExpediente:number;
    AnioExpediente:number;
    Materia:string;
    Motivo:string;
    Partes:Array<ParteSchema>;
    Juzgado:string;
    UCreador:string;
    fecha: Date;
  }
