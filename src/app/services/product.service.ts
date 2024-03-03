import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  Url_api: string = "https://fakestoreapi.com/products";
  Url_SingleProduct: string = "https://fakestoreapi.com/products/";
  Url_LimitProducts: string = "https://fakestoreapi.com/products?limit=";
  Url_OrderProductsAsc: string = "https://fakestoreapi.com/products?sort=asc";
  Url_OrderProductsDesc: string = "https://fakestoreapi.com/products?sort=desc";
  Url_FiltCategories: string = "https://fakestoreapi.com/products/categories/"
  Url_FiltCategory: string = "https://fakestoreapi.com/products/category/";


  constructor(private httpclient: HttpClient) { }

  GetProducts():Observable<any>{
    return this.httpclient.get(this.Url_api).pipe(res=> res)
  }

  GenOneProduct(id:number):Observable<any>{
    return this.httpclient.get(this.Url_SingleProduct+id).pipe(res=> res)
  }

  GetProductsLimit(cont:number):Observable<any>{
    return this.httpclient.get(this.Url_LimitProducts+cont).pipe(res=> res)
  }

  GetOrderProductsAsc(limit:string):Observable<any>{
    return this.httpclient.get(this.Url_OrderProductsAsc+limit).pipe(res=> res)
  }

  GetOrderProductsDesc(limit:string):Observable<any>{
    return this.httpclient.get(this.Url_OrderProductsDesc+limit).pipe(res=> res)
  }

  GetFiltCategories():Observable<any>{
    return this.httpclient.get(this.Url_FiltCategories).pipe(res=> res)
  }

  GetOrderCategory(selcateg:string):Observable<any>{
    return this.httpclient.get(this.Url_FiltCategory+selcateg).pipe(res=> res)
  }

}
