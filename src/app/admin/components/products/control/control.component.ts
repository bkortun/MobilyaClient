import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from './dialogs/add-dialog/add-dialog.component';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  //Todo ekleme yapıldıktan sonra listProduct yapılacak
  openDialog() {
    const dialogRef=this.dialog.open(AddDialogComponent, {
      width: "50%",
      height: "75%"
    });
  }

}
