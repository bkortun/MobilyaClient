import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Campaign } from 'app/contracts/campaign/campaign';
import { ListObject } from 'app/contracts/common/list_object';
import { CampaignService } from 'app/services/common/modals/campaign.service';
import { DeleteDialogComponent } from '../control/dialogs/delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from '../control/dialogs/update-dialog/update-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private campaignService:CampaignService,public dialog: MatDialog) { }

  displayedColumns: string[] = ['name','description','createdDate', 'action'];
  dataSource: MatTableDataSource<Campaign>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  async ngOnInit() {
    await this.listCampaigns();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async changePage() {
    await this.listCampaigns();
  }

  async listCampaigns() {
    const allCampaigns: ListObject = await this.campaignService.list(this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 300);

    //console.log(allProducts.items)
    this.dataSource = new MatTableDataSource(allCampaigns.items);
    this.paginator.length = allCampaigns.count;
    this.paginator.pageIndex = allCampaigns.index;
    this.paginator.pageSize = allCampaigns.size;
    this.dataSource.sort = this.sort;
  }

  async updateCampaign(row: any) {
    this.dialog.open(UpdateDialogComponent, {
      width: "50%",
      height: "35%",
      data: row
    }).afterClosed().subscribe(() => { this.listCampaigns() })
  }

  async deleteCampaign(row:any) {
    this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data:row
    }).afterClosed().subscribe(() => { this.listCampaigns() });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
