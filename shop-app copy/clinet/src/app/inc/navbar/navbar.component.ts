import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user;
  constructor(
    private auth:AuthService,
    private route:Router
    ) { }

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile() {
    this.auth.getProfile()
        .subscribe((res) => {
          if(res.success) {
            this.user = res.data;
          }
        })
  }

  logout() {
    localStorage.clear();
    this.user = null;
    this.route.navigate(['/login']);
  }

}
