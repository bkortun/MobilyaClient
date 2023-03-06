import { Component, OnInit } from '@angular/core';
import { CategoryResponse } from 'app/contracts/category/category_response';
import { AuthService } from 'app/services/common/modals/auth.service';
import { CategoryService } from 'app/services/common/modals/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(public authService:AuthService, private categoryService:CategoryService) {
    authService.checkToken()
  }

  categories:CategoryResponse[]=[];

  ngOnInit(): void {
    this.listCategories()
  }

  logOut(){
    localStorage.removeItem("token")
    this.authService.checkToken()
  }

  async listCategories(){
    let list =await this.categoryService.list();
    this.categories=list.items
  }

}
