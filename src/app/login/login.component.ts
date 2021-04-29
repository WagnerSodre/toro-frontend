import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {user: '', pwd: ''};

  constructor(public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    if(document.cookie)
      this.router.navigate(['/home']);
  }

  login(): void {
    // Process checkout data here
    this.dataService.login(this.user).subscribe((res) => {
      var now = new Date();
      var time = now.getTime();
      time += 3600 * 1000;
      now.setTime(time);
      document.cookie = `token=${res.token}; expires=${now.toUTCString()};`;
      this.router.navigate(['/home'])
    });
    
  }

}
