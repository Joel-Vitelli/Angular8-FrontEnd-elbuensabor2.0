import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  username: string;
  password: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    if (this.username === "cliente" && this.password === "cliente") {
      this.router.navigate(["menu"]);
    } else {
      alert("Invalid credentials");
    }
  }
  registrar(): void {
    this.router.navigate(['crearusuario']);
  }

}
