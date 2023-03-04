import { ListProductImage } from "../file/list_productImage";
import { Product } from "./product";

export class ProductImage {
  id: string;
  product:Product;
  images:ListProductImage[];
}
