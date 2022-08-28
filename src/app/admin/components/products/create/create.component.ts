import { Component, OnInit } from '@angular/core';
import { CreateProduct } from 'app/contracts/product/create-product';
import { HttpClientService } from 'app/services/common/http-client.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }



}
