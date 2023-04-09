import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'app/contracts/category/category';
import { ListObject } from 'app/contracts/common/list_object';
import { CategoryService } from 'app/services/common/modals/category.service';
import { DeleteDialogComponent } from '../control/dialogs/delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from '../control/dialogs/update-dialog/update-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'app/base/base.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(private categoryService:CategoryService,public dialog: MatDialog,spinner:NgxSpinnerService) {
    super(spinner)
    this.showSpinner(SpinnerType.BallPulse)
   }

  displayedColumns: string[] = ['name','createdDate', 'action'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  async ngOnInit() {
    await this.listCategories();
    this.dataSource.paginator = this.paginator;
    this.hideSpinner(SpinnerType.BallPulse)
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

  async changePage() {
    await this.listCategories();
  }

  async listCategories() {
    const allProducts: ListObject = await this.categoryService.list(this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 300);

    //console.log(allProducts.items)
    this.dataSource = new MatTableDataSource(allProducts.items);
    this.paginator.length = allProducts.count;
    this.paginator.pageIndex = allProducts.index;
    this.paginator.pageSize = allProducts.size;
    this.dataSource.sort = this.sort;
  }

  async updateCategory(row: any) {
    this.dialog.open(UpdateDialogComponent, {
      width: "50%",
      height: "35%",
      data: row
    }).afterClosed().subscribe(() => { this.listCategories() })
  }

  async deleteCategory(row:any) {
    this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data:row
    }).afterClosed().subscribe(() => { this.listCategories() });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
