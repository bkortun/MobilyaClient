import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListObject } from 'app/contracts/common/list_object';
import { UserDetail } from 'app/contracts/user/userDetails';
import { UserService } from 'app/services/common/modals/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService:UserService) { }

  displayedColumns: string[] = ['firstName','lastName','email','gender','dateOfBirth','phoneNumber'];
  dataSource: MatTableDataSource<UserDetail>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  async ngOnInit() {
    await this.listUsers()
    //this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async changePage() {
    await this.listUsers();
  }

  async listUsers() {
    const allUsers: ListObject = await this.userService.listUserDetails(this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 300);

    //console.log(allProducts.items)
    this.dataSource = new MatTableDataSource(allUsers.items);
    this.paginator.length = allUsers.count;
    this.paginator.pageIndex = allUsers.index;
    this.paginator.pageSize = allUsers.size;
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
