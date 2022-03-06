export class User {
    _id:string;
    name:string;
    ruc:string;
    phone:string;
    email:string;
    contacts:Array<any>;
    password:string;
    date:Date;
    validated:boolean;
    validateEmailToken:string;
    resetPasswordToken:string;
    resetPasswordExpires:string;
}