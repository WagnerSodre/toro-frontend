import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userPosition;

  constructor(public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    if(!document.cookie)
      this.router.navigate(['/login']);
    this.dataService.getUserPosition(this.getCookie('token')).subscribe((data) => {
      this.userPosition = data;
      this.userPosition.positions.forEach(position => {
        position.color = this.randomColor();
      });
    })
  }

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  randomColor() {
    switch (Math.floor(Math.random() * 4)) {
      case 0: return "bg-c-blue";
      case 1: return "bg-c-green";
      case 2: return "bg-c-yellow";
      case 3: return "bg-c-pink";
    }
  }

}
