import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UsersService } from "../../services/users/users.service";
import { AuthService } from "../../../Shared/services/auth/auth.service";
import { SnackBarService } from "../../../Shared/services/snack-bar/snack-bar.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private userService: UsersService,
    private router: Router,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.auth.user.subscribe(u => {
      if (u) {
        this.userService.getPermissionsByUser(u.email).then(array => {
          if (!array.includes("admin")) {
            this.snackBarService.openSnackBar(
              "No tiene permiso para acceder a esta sector :(,"
            );
            this.auth.signOut();
            this.router.navigate(["/login"]);
          }
        });
      }
    });
  }
}
