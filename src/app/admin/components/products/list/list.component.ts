import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { ListProduct } from 'app/contracts/product/list_product';
import { Product } from 'app/contracts/product/product';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'app/services/admin/alertify.service';
import { ProductService } from 'app/services/common/modals/product.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price', 'stock', 'createdDate'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(spinner:NgxSpinnerService,private productService:ProductService){
    super(spinner);
  }


  async ngOnInit() {
    await this.listProducts()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async changePage(){
 await this.listProducts();
  }

  async listProducts(){
    const allProducts:ListProduct=await this.productService.list(this.paginator? this.paginator.pageIndex:0,
      this.paginator? this.paginator.pageSize:5);

    console.log(allProducts.items)
    this.dataSource=new MatTableDataSource(allProducts.items);
    this.paginator.length=allProducts.count;
    this.paginator.pageIndex=allProducts.index;
    this.paginator.pageSize=allProducts.size;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
