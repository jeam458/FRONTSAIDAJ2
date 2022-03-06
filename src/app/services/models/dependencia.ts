export interface DependenciaSchema{
    _id:string;
    Nombre:string;
    Tipo:string;      // oj-jurisdiccional, oa-administrativo
    Organo:string;
    Descripcion:string;
    Referencia:string;
    Autor:string;
    fecha: Date;
  }