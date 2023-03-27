import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {UserServiceComponent} from "../user-service/user-service.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  user = new User(null, "", "", "");
  error = false;
  errorMessage = "";


  constructor(private userService: UserServiceComponent,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.userService.findById(param['id'])
        .subscribe(res => {
          this.user = res;
          this.error = false;
          this.errorMessage = "";
        }, error => {
          console.log(error);
          this.error = true;
          this.errorMessage = error.error;
        })
    })
  }

}
