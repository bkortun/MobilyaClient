import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { CategoryResponse } from 'app/contracts/category/category_response';
import { AuthService } from 'app/services/common/modals/auth.service';
import { BasketService } from 'app/services/common/modals/basket.service';
import { CategoryService } from 'app/services/common/modals/category.service';
import { CustomToastrService } from 'app/services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {

  constructor(public authService: AuthService, private categoryService: CategoryService,private router:Router,
    private toastrService:CustomToastrService, spinner:NgxSpinnerService, private basketService:BasketService) {
      super(spinner)
      this.showSpinner(SpinnerType.BallClimbingDot)
    router.events.subscribe(()=>{
      if(this.router.navigated){
        this.authService.checkToken();
        this.isAuth=this.authService.isAuthenticated;
      }

    })
  }

  isAuth:boolean;
  itemCount:number;
  categories: CategoryResponse[] = [];
  userId: string

  ngOnInit(): void {
    this.getUserId();
    this.listCategories();
    this.getBasketItem();
    this.hideSpinner(SpinnerType.BallClimbingDot);
  }

  logOut() {
    this.showSpinner(SpinnerType.BallClimbingDot)
    localStorage.removeItem("token");
    window.location.reload();
    this.hideSpinner(SpinnerType.BallClimbingDot);
  }

  async listCategories() {
    let list = await this.categoryService.list();
    this.categories = list.items
  }

  getUserId() {
    if(this.isAuth)
      this.userId = this.authService.decodeToken().nameIdentifier;
  }

  async getBasketItem(){
    if(this.userId)
      this.itemCount=(await this.basketService.listBasket(this.userId)).totalProduct;
  }

}
