import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  constructor(
    private router: Router,
    public auth: AuthService
  ) {}

  logout(event: Event) {
    // відміна поведінки посилання.
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/admin', 'login'])

  }
}
