import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { ListProduct } from 'app/contracts/product/list_product';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'app/services/admin/alertify.service';
import { ProductService } from 'app/services/common/modals/product.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertifyService: AlertifyService) {
    super(spinner)
  }

  displayedColumns: string[] = ['name', 'price', 'stock', 'createdDate', 'updatedDate'];
  dataSource: MatTableDataSource<ListProduct> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts(){
    this.showSpinner(SpinnerType.BallClimbingDot);
    const allProducts:{totalCount:number,items:ListProduct[]}=await this.productService.list(this.paginator ? this.paginator.pageIndex:0,
      this.paginator ? this.paginator.pageSize:5, () => {
      this.hideSpinner(SpinnerType.BallClimbingDot);
    },()=>{
      this.alertifyService.message("Hata",{
        messageType:AlertifyMessageType.Error,
        position:AlertifyPosition.BottomRight
      })
    })
    this.dataSource = new MatTableDataSource<ListProduct>(allProducts.items);
    this.paginator.length=allProducts.totalCount;
    console.log(allProducts.items);
  }

  async changePage(){
    await this.getProducts();
  }

  async ngOnInit() {
    await this.getProducts();
  }




}
