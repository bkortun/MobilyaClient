import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { CreateProduct } from 'app/contracts/product/create-product';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'app/services/admin/alertify.service';
import { ProductService } from 'app/services/common/modals/product.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertifyService: AlertifyService) {
    super(spinner)
  }

  ngOnInit(): void {

  }

  create(name: HTMLInputElement, price: HTMLInputElement, stock: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallPulse);
    const product: CreateProduct = new CreateProduct();
    product.name = name.value;
    product.price = parseFloat(price.value);
    product.stock = parseInt(stock.value);

    this.productService.create(product, () => {
      this.hideSpinner(SpinnerType.BallPulse);
      this.alertifyService.message("Ürün başarıyla eklendi.", {
        dismissOthers:true,
        messageType: AlertifyMessageType.Success,
        position: AlertifyPosition.BottomRight
      })
    });
  }


}
