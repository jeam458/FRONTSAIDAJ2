import {ExpedienteSchema} from './expediente';
export interface LegajoSchema{
    _id:string;
    Tipo:string;
    NroLegajo:string;
    NroDocumentos:number;
    Documentos:Array<any>;
    Codigo:string;
    Entidad:string;
    UDireccion:string;
    UOrganica:string;
    UAdministrativa:string;
    Juzgado:string;
    Remitente:string;
    Autor:string;
    Documento:string;
    Descripcion:string;
    SNumerica:SerieNumerica,
    SPeriodica:SeriePeriodica,
    Tomos:Array<Tomo>;
    TVida:String;
    UCreador:string;
    fecha: Date;
  }

  export interface SerieNumerica{
    Desde:string;
    Hasta:string;
  }
  export interface SeriePeriodica{
    FechaInicio:Date;
    FechaFin:Date;
  }
  
  export interface Tomo{
    Tomo:Number;
    De:Number;
  }