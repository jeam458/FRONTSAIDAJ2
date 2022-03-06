
export interface ParteSchema{
    _id:string;
    Nombre: String;
    ApellidoM:String;
    ApellidoP:String;
    Documento:String;
    TipoDocumento:String;
    Autor:String;
    fecha: Date;
  }

  export interface personaSchema{
    check_character: string;
    check_digit: string;
    date_consultation: string;
    dni: string;
    last_update: string;
    maternal_surname: string;
    name: string;
    paternal_surname: string;
  }

