import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryResponse } from 'app/contracts/category/category_response';
import { AuthService } from 'app/services/common/modals/auth.service';
import { CategoryService } from 'app/services/common/modals/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth:boolean;

  constructor(public authService: AuthService, private categoryService: CategoryService,private router:Router) {
    router.events.subscribe(()=>{
      if(this.router.navigated){
        this.authService.checkToken();
        this.isAuth=this.authService.isAuthenticated;
      }

    })
  }

  categories: CategoryResponse[] = [];
  userId: string

  ngOnInit(): void {
    this.getUserId();
    this.listCategories()
  }

  logOut() {
    localStorage.removeItem("token");
  }

  async listCategories() {
    let list = await this.categoryService.list();
    this.categories = list.items
  }

  getUserId() {
    if(this.isAuth)
      this.userId = this.authService.decodeToken().nameIdentifier;
  }

}
