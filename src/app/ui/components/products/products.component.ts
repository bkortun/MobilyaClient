import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent, SpinnerType } from 'app/base/base.component';
import { CreateBasketItem } from 'app/contracts/basketItem/create_basketItem';
import { Category } from 'app/contracts/category/category';
import { Dynamic, Filter, Sort } from 'app/contracts/common/dynamic_query';
import { ListObject } from 'app/contracts/common/list_object';
import { ListProductImage } from 'app/contracts/file/list_productImage';
import { Product } from 'app/contracts/product/product';
import { ProductImage } from 'app/contracts/product/productImage';
import { BaseStorageUrl } from 'app/contracts/setting/baseStorageUrl';
import { AuthService } from 'app/services/common/modals/auth.service';
import { BasketService } from 'app/services/common/modals/basket.service';
import { CategoryService } from 'app/services/common/modals/category.service';
import { ImageService } from 'app/services/common/modals/image.service';
import { ProductService } from 'app/services/common/modals/product.service';
import { SettingService } from 'app/services/common/modals/setting.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'app/services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(private productService: ProductService, private imageService: ImageService,
    private settingService: SettingService, private categoryService: CategoryService,
    private basketService: BasketService, private authService: AuthService,
    private activatedRoute: ActivatedRoute, private router: Router, spinner:NgxSpinnerService,
    private toastrService:CustomToastrService) {
      super(spinner)
      this.showSpinner(SpinnerType.BallClimbingDot)
    }

  productImages: ProductImage[] = []
  baseUrl: BaseStorageUrl
  page = 0
  size = 36

  dynamicBody = new Dynamic();
  sorts: Sort[] = new Array();
  sort: Sort = new Sort();
  filter: Filter = new Filter();

  isClicked: boolean = false
  categories: Category[];

  ngOnInit(): void {
    this.getBaseUrl();
    this.getCategories();
    var categoryId = this.activatedRoute.snapshot.paramMap.get("categoryId")
    if (categoryId)
      this.getByCategory(categoryId);
    else
      this.combineProductImages(this.page, this.size);
    console.log(this.productImages)
    this.hideSpinner(SpinnerType.BallClimbingDot)

  }

  //Todo refactor et
  async combineProductImages(page, size, isDynamic: boolean = false, categoryId: string = null) {
    let listProduct: ListObject;
    if (!isDynamic)
      listProduct = await this.productService.list(page, size);
    if (categoryId != null)
      listProduct = await this.productService.listByCategoryId(page, size, categoryId);
    else
      listProduct = await this.productService.listDynamic(this.dynamicBody, page, size);

    let products: Product[] = listProduct.items
    let list: ListObject = await this.imageService.listByShowcaseProductImage();
    let images: ListProductImage[] = new Array(list.count);
    images = list.items;


    for (let i = 0; i < products.length; i++) {
      let counter=0;
      let entity: ProductImage = new ProductImage();
      let img: ListProductImage[] = new Array(list.count);
      let isFirst = true
      entity.product = products[i];
      for (let j = 0; j < images.length; j++) {
        if (images[j].productId == products[i].id) {
          images[j].isFirst = isFirst
          img.push(images[j]);
          isFirst = false
          counter++;
        }
        else {
          img.push(null)
        }
      }

      const filter = array => array.flatMap(v => Array.isArray(v)
        ? filter(v) : v === null ? [] : v)

      let pureImg: ListProductImage[]=filter(img)

      entity.images = pureImg
      pureImg=[];
      this.productImages[i] = entity;
      console.log(this.productImages)
    }
    this.hideSpinner(SpinnerType.BallClimbingDot)
  }

  isContainsWithoutNull(array) {
    //console.log(array.some(el => el !== null))
    return array.some(el => el !== null)
  }

  async getBaseUrl() {
    this.baseUrl = await this.settingService.getBaseStorageUrl()
  }

  onScroll() {
    this.page = this.page + 1
    this.combineProductImages(this.page, this.size)
  }


  //   async listProducts(){
  //     let listProduct:ListObject = await this.productService.list(0,36);
  //     this.products=listProduct.items
  //   }

  //  async listShowcaseImages(){
  //     let list:ListObject = await this.imageService.listByShowcaseProductImage();
  //     this.images=list.items;
  //   }

  sortClick(field: string, dir: string) {
    //button'a basıldığında arkaplanı mavi olması ayarlanacak video18
    this.showSpinner(SpinnerType.BallClimbingDot)
    this.sort.field = field;
    this.sort.dir = dir;
    this.sorts.push(this.sort);
    this.dynamicBody.sort = this.sorts;
    this.combineProductImages(0, this.size, true);
  }

  async getCategories() {
    this.showSpinner(SpinnerType.BallClimbingDot)
    const list = await this.categoryService.list(0, 20);
    this.categories = list.items;
    this.hideSpinner(SpinnerType.BallClimbingDot)
  }

  //Todo category seçilmişken filtreler çalışmıyor
  async getByCategory(categoryId: string) {
    this.showSpinner(SpinnerType.BallClimbingDot)
    this.page = 0;
    this.size = 36;
    this.productImages = [];
    await this.combineProductImages(this.page, this.size, false, categoryId);
  }

  useFilter(min: string, max: string, fieldName: string) {
    this.showSpinner(SpinnerType.BallClimbingDot)
    if(max=="")
      return null;
    let secondFilter: Filter = new Filter();
    let secondFilters: Filter[] = new Array();
    this.filter.field = fieldName;
    this.filter.operator = "gte";
    this.filter.logic = "and"
    this.filter.value = min;
    secondFilter.field = fieldName;
    secondFilter.operator = "lte";
    secondFilter.value = max;
    secondFilters.push(secondFilter);
    this.filter.filters = secondFilters;
    this.dynamicBody.filter = this.filter;
    this.productImages = [];
    this.combineProductImages(0, this.size, true);
  }

  async addToBasket(productId: string) {
    this.showSpinner(SpinnerType.BallClimbingDot)
    try {
    let userId = this.authService.decodeToken().nameIdentifier;
    let basketId = await (await this.basketService.listBasket(userId)).id;
    let basketItem: CreateBasketItem = new CreateBasketItem();
    basketItem.basketId = basketId;
    basketItem.productId = productId;
    basketItem.quantity = 1;
    this.basketService.createBasketItem(basketItem,()=>{
      this.toastrService.message("Ürün sepete eklendi.",
      "Bilgilendirme",{messageType:ToastrMessageType.Success,position:ToastrPosition.BottomRight})
      this.hideSpinner(SpinnerType.BallClimbingDot)
    });
    } catch (error) {
      this.router.navigateByUrl("/login")
      this.toastrService.message("Sepete ürün eklemek için öncelikle giriş yapmalısınız.",
      "Uyarı",{messageType:ToastrMessageType.Warning,position:ToastrPosition.BottomRight})
      this.hideSpinner(SpinnerType.BallClimbingDot)
    }
  }


}
