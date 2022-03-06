import { ChangeDetectionStrategy, ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { fadeInUp400ms } from '../../@vex/animations/fade-in-up.animation';
import { AuthService} from '../services/auth.service';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private auth: AuthService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  send() {
    this.router.navigate(['/']);
    this.snackbar.open('Lucky you! Looks like you didn\'t need a password or email address! For a real application we provide validators to prevent this. ;)', 'LOL THANKS', {
      duration: 10000
    });
  }

  login(){
    if(this.form.get('email').value!='' && this.form.get('password').value!=''){
      let body={'email':this.form.get('email').value, 'password':this.form.get('password').value};
      this.auth.getAuthMongo(body).subscribe(response =>{
        if(response ===true){
          this.router.navigate(['/pages/pendientes']);
          this.form.reset();
          this.snackbar.open('Hola denuevo', 'Bienvenido', {
            duration: 10000
          });
        }
      })
    } else if(this.form.get('email').value===''){
      this.snackbar.open('Ups!', 'Ingrese el correo porfavor', {
        duration: 10000
      });
    } else if(this.form.get('password').value===''){
      this.snackbar.open('Ups!', 'Ingrese la contraseña porfavor', {
        duration: 10000
      });
    }
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
