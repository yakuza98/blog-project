import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { User } from '../shared/interfaces';
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  imageAdmin = 'https://img.icons8.com/ios/512/angularjs.png'
  form: FormGroup | any
  // Для блокування кнопки входу псля першого натискання
  submitted = false
  message: string = ''

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    // взаємодія з квері параметрами з auth guard для відображення алерту.
    this.route.queryParams.subscribe((params:Params) => {
      if (params['loginAgain']) {
       this.message = 'Please, enter your data'
      }else if(params['authFailed']) {
        this.message = 'Session is over. Enter data again'
      }
    })

    this.form = new FormGroup<any>({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    // Для блокування кнопки входу псля першого натискання
    this.submitted = true
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    // form.reset() - перезагрузити форму(очистити інпути)
    this.auth.login(user).subscribe(()=> {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
      // Для блокування кнопки входу псля першого натискання
      this.submitted = false
    }, ()=> {
      // якщо матиму помилку, тоді button розблоковую.
      this.submitted  = false
    })
  }
}
