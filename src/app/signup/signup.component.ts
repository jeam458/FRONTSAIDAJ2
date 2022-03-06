import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from '../../@vex/animations/fade-in-up.animation';
import { userSchema} from '../services/models.service';

@Component({
  selector: 'vex-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations:[
    fadeInUp400ms
  ]
})
export class SignupComponent implements OnInit {
  user:userSchema;
  form: FormGroup;
  inputType = 'password';
  visible = false;
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.user=this.inicializarUser();
    this.inicializarForm();
  }

  inicializarUser(){
    var user:userSchema;
    user={
      _id:'',
      email:'',
      password:'',
      nombres:'',
      apellidos:'',
      tipo:'',
      celular:0,
      picture:''
    }
    return user;
  }

  inicializarForm(){
   this.form=this.fb.group({
      name: ['', Validators.required],
      ruc:['',Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
   })
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }


}
