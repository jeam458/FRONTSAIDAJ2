import { ChangeDetectionStrategy, Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { LegajoService } from '../services/legajo.service';
import { ExpedienteService} from '../services/expediente.service';
import { ExpedienteSchema } from '../services/models/Expediente';
import { LegajoSchema, SerieNumerica,SeriePeriodica,Tomo} from '../services/models/legajo';
import { personaSchema} from '../services/models/parte';
import { ExpLeg} from '../services/models/expedienteleg';
import { legArchivo} from '../services/models/legarchivo';
import { DependenciaService } from '../services/dependencia.service';
import { DependenciaSchema } from '../services/models/dependencia';
import { ParteService } from '../services/parte.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInUp400ms } from '../../@vex/animations/fade-in-up.animation';
import { stagger60ms } from '../../@vex/animations/stagger.animation';
import { AuthService} from '../services/auth.service';
import icVerticalSplit from '@iconify/icons-ic/twotone-vertical-split';
import icVisiblity from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import icDoneAll from '@iconify/icons-ic/twotone-done-all';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icDescription from '@iconify/icons-ic/twotone-description';
import fiber_new from '@iconify/icons-ic/fiber-new';
import plus_one from '@iconify/icons-ic/plus-one';
import { stagger80ms } from '../../@vex/animations/stagger.animation';
import { scaleIn400ms } from '../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../@vex/animations/fade-in-right.animation';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource} from '@angular/material/table';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'vex-legajo',
  templateUrl: './legajo.component.html',
  styleUrls: ['./legajo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    stagger80ms,
    fadeInUp400ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class LegajoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  @ViewChild(MatSort) sort1: MatSort;
  dataSource: MatTableDataSource<ExpedienteSchema>;
  dataSource1: MatTableDataSource<ExpedienteSchema>;
  dataSourceFile: MatTableDataSource<any>;
  displayedColums1:string[]=[
    'Expediente','Tipo','Fecha','Eliminar'
  ]
  displayedColums:string[]=[
    'Expediente','Tipo','Fecha','Agregar'
  ]

  displayColumsFiles:string[]=[
    'Nombre', 'Tamaño', 'Proceso', 'Estado','Acciones'
  ]

  tiposlegajo=[
    {id:'1', name:'JURISDICCIONAL'},
    {id:'2', name:'ADMINISTRATIVO'}
  ]

  tipos=[
    {id:'1', name:'JURISIDICCIONAL'},
    {id:'2', name: 'ADMINISTRATIVO'}
  ]
  tipo:boolean=true;
  legajo: LegajoSchema;
  expediente: ExpedienteSchema;
  expedientes: ExpedienteSchema[]=[];
  expedientesInput: ExpedienteSchema[]=[];
  depsJuris:DependenciaSchema[]=[];

  legarchivo:legArchivo;
  expleg:ExpLeg;

  serieNum:SerieNumerica;
  seriePerio:SeriePeriodica;
  tomo:Tomo;

  form:FormGroup;
  form1:FormGroup;
  expedientesForm:FormGroup;
  Numform:FormGroup;
  Periodoform:FormGroup;
  tomoform:FormGroup;
  filesForm:FormGroup;

  icDoneAll = icDoneAll;
  icDescription = icDescription;
  icVerticalSplit = icVerticalSplit;
  icVisibility = icVisiblity;
  icVisibilityOff = icVisibilityOff;
  icMoreVert = icMoreVert;
  icNew= fiber_new;
  oneNew= plus_one;

  url='http://localhost:4000/upload';
  uploader:FileUploader;
  files=[];
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  
  constructor(
    private snackbar: MatSnackBar, 
    private expService:ExpedienteService,
    private depservice:DependenciaService,
    private parteservice:ParteService,
    private fb: FormBuilder, 
    private userdatos:AuthService) { }

  ngOnInit(): void {
    this.uploader = new FileUploader({
      url: this.url,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async item => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }});
      this.hasBaseDropZoneOver = false;
      this.hasAnotherDropZoneOver = false;
  
      this.response = '';
      this.uploader.response.subscribe(res => this.response = res );
    this.legajo = this.inicializarLegajo();
    this.serieNum = this.incializarSerieNumerica();
    this.seriePerio = this.incializarSeriePeriodica();
    this.tomo = this.inicializarTomo();
    this.inicializarForm();
    this.inicializarFilesForm();
    this.inicializarFormExpedientes();
    this.inicializarForm1();
    this.incializarNumForm();
    this.inicializarPeriodoForm();
    this.inicializarTomoForm();
    this.getDepsJuris();
    this.getExpedientes();
    this.OnChanges();
    this.uploader = new FileUploader({url: this.url});
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  OnChanges(){
    this.form.get('Tipo').valueChanges.subscribe(val => {
      console.log(val);
      if(val!=2){
        this.tipo=false;
      } else {
        this.tipo=true;
      }
    })

    this.form.valueChanges.subscribe(val =>{
      console.log(val);
    })
  }


  modificarFiles(){
    const id= "idPrueba";
    const autor = "Jean"
    let originalname = '';
    for(let i=0; i<this.uploader.queue.length;i++){
      originalname = this.uploader.queue[i].file.name
      this.uploader.queue[i].url=this.url+'/'+id+'/'+autor + '/'+ originalname
    }
    this.dataSourceFile= new MatTableDataSource(this.uploader.queue);
    console.log(this.dataSourceFile)
    console.log(this.uploader.queue)   
  }

  getDepsJuris(){
    this.depservice.getAllTipo("1").subscribe(res => {
      this.depsJuris=[];
      this.depsJuris = res;
    })
  }

  applyFilter(filterValue:string){
    filterValue=filterValue.trim();
    filterValue=filterValue.toLowerCase();
    this.dataSource.filter=filterValue;
  }

  addExpediente(data){
    if(this.expedientesInput.length===0){
      this.expedientesInput.push(data);
      this.dataSource1= new MatTableDataSource(this.expedientesInput);
      this.snackbar.open('Bien hecho!', 'Expediente Agregado', {
        duration: 10000
      });
    } else if(this.expedientesInput.length !==0){
      var i= this.expedientesInput.indexOf(data);
      console.log(i)
      if(i === -1){
        this.expedientesInput.push(data);
        this.dataSource1= new MatTableDataSource(this.expedientesInput);
        this.snackbar.open('Bien hecho!', 'Expediente Agregado', {
          duration: 10000
        });
      } else if(i !== -1){
        if(this.expedientesInput[i]=== data){
          this.snackbar.open('Alerta!', 'Ya existe ese expediente en el legajo', {
            duration: 10000
          });
      }
      }
    }
  }

  eliminarExp(data){
    var i= this.expedientesInput.indexOf(data);
        this.snackbar.open('Bien hecho!', 'Expediente Eliminado', {
          duration: 10000
        });
        this.expedientesInput.splice(i,1);
        this.dataSource1= new MatTableDataSource(this.expedientesInput);
    
        //this.dataSource1.sort=this.sort;
        //this.dataSource1.paginator= this.paginator;
  }

  getExpedientes(){
    this.expService.getAll().subscribe(res =>{
      this.expedientes=[];
      this.expedientes= res;
      this.dataSource= new MatTableDataSource(this.expedientes);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator= this.paginator;
      this.expedientesInput=[];
      this.dataSource1= new MatTableDataSource(this.expedientesInput);
      this.dataSource1.sort=this.sort1;
      //this.dataSource1.paginator= this.paginator;
      console.log(this.expedientes)
    })
  }

  inicializarLegajo(){
    var leg: LegajoSchema;
    leg={
      _id:'',
      Tipo:'',
      NroLegajo:'',
      Codigo:'',
      Descripcion:'',
      Documento:'',
      UAdministrativa:'',
      Juzgado:'',
      UDireccion:'',
      UOrganica:'',
      Documentos:[],
      Entidad:'',
      Remitente:'',
      Autor:'',
      NroDocumentos:0,
      SNumerica:null,
      SPeriodica:null,
      TVida:'',
      Tomos:null,
      UCreador:this.userdatos.mostrarDatos()._id,
      fecha:new Date()
    }
    return leg;
  }

  incializarSerieNumerica(){
    var serie : SerieNumerica;
    serie = {
      Desde:'',
      Hasta:''
    }
    return serie;
  }

  incializarSeriePeriodica(){
   var periodo:SeriePeriodica;
   periodo = {
     FechaInicio : new Date(),
     FechaFin : new Date()
   }
   return periodo;
  }

  inicializarTomo(){
    var tomo : Tomo;
    tomo = {
      Tomo:0,
      De:0
    }
    return tomo;
  }

  inicializarForm(){
    this.form = this.fb.group({
       Tipo:['', Validators.required],
       NroLegajo:['' , Validators.required],
       Codigo:['', Validators.required],
       Descripcion:['', Validators.required],
       Documento:['', Validators.required],
       Juzgado:[''],
       UAdministrativa:[''],
       UDireccion:[''],
       UOrganica:[''],
       Entidad:['C.S.J. CUSCO'],
       Autor:['', Validators.required],
       Remitente:['', Validators.required],
       NroDocumentos:['', Validators.required]
    })
  }

  inicializarFilesForm(){
    this.filesForm = this.fb.group({
      File:['',Validators.required]
    })
  }

  inicializarFormExpedientes(){
    this.expedientesForm =this.fb.group({
      Expedientes:['',Validators.required]
    })
  }

  inicializarForm1(){
    this.form1 = this.fb.group({
      NroDocumentos: [''],
      SNumerica:['', Validators.required],
      SPeriodica:['', Validators.required],
      TVida:['', Validators.required],
      Tomos:['', Validators.required],
    })
  }

  incializarNumForm(){
    this.Numform = this.fb.group({
      Desde: ['', Validators.required],
      Hasta: ['', Validators.required]
    })
  }

  inicializarPeriodoForm(){
    this.Periodoform = this.fb.group({
      FechaInicio:['', Validators.required],
      FechaFin:['']
    })
  }

  inicializarTomoForm(){
    this.tomoform = this.fb.group({
      Tomo:[''],
      De:['']
    })
  }



}
