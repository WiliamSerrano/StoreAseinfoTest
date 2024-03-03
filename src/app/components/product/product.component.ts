import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DetailsComponent } from '../details/details.component';
import { ProductInterface } from '../../Interfaces/Product.Interface';
import { ProductService } from '../../services/product.service';
import { StringDecoder } from 'string_decoder';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [DetailsComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{

  Lista_Productos: ProductInterface [] = [];
  List_Categories: any [] = [];
  idProduct: number = 0;
  contLim: number = 5;
  orderasc: string = ""
  orderCateg: string = "" 

  constructor(private prodService:ProductService, private elementRef: ElementRef){}

  ngOnInit(): void {
    this.Get_ProductsLimit();
    this.Get_Categories();
  }

  setInfoProduct(id: number){
    this.idProduct = id;
    const modal = document.querySelector("#modalproduct");
    modal?.classList.add("modalOpen")
    modal?.classList.remove("modalClose")
  }

  closeModal(){
    this.idProduct = 0;
    const modal = document.querySelector("#modalproduct");
    modal?.classList.add("modalClose")
    modal?.classList.remove("modalOpen")
  }

  Get_Products(){

    this.prodService.GetProducts().subscribe({
      next: (result) => {

        this.Lista_Productos = result;

      },
      error: (err) => {

        console.log(err)

      }

    });
  }

  Get_ProductsLimit(){

    const inputLimit: HTMLInputElement = this.elementRef.nativeElement.querySelector("#filterlimit");
    const valu = inputLimit.value;
    this.contLim =+ valu;

    this.prodService.GetProductsLimit(this.contLim).subscribe({
      next: (result) => {
        this.Lista_Productos = result;
        const itemh6: HTMLHeadingElement = this.elementRef.nativeElement.querySelector("#contitem");
        itemh6.textContent = "Results: " + this.Lista_Productos.length;
      },
      error: (err) => {

        console.log(err)

      }

    })
  }

  Get_OrderPrice(event: any){

    const ordprice = event.target.value;
    console.log(ordprice);

  if(ordprice == 'up'){

    this.Lista_Productos.sort((menor, mayor) => {

      return menor.price - mayor.price;

    }).reverse();

  }else if(ordprice == 'down'){

    this.Lista_Productos.sort((menor, mayor) => {

      return menor.price - mayor.price;

    });


  }    

  }

  Get_Categories(){

    this.prodService.GetFiltCategories().subscribe({
      next: (result) => {

        this.List_Categories = result;

      },
      error: (err) => {

        console.log(err)

      }

    });

  }

  Get_OrderCategory(event:any){

    this.Get_ProductsLimit();
    
    this.orderCateg = event.target.value;

    this.prodService.GetOrderCategory(this.orderCateg+"?limit="+this.contLim).subscribe({
      next: (result) => {

        this.Lista_Productos = result;

      },
      error: (err) => {

        console.log(err)

      }

    });

  }

  Get_OrderAlphabet(event:any){

    const ordalphabet= event.target.value;

    
    if(ordalphabet == 'az'){

      this.Lista_Productos.sort((num1, num2) => { 

        if (num1.title < num2.title) {
            return -1; 
        } else if (num1.title > num2.title) {
            return 1; 
        } else {
            return 0; 
        }

      });
  
    }else if(ordalphabet == 'za'){
  
      this.Lista_Productos.sort((num1, num2) => { 
        if (num1.title < num2.title) {
            return -1; 
        } else if (num1.title > num2.title) {
            return 1; 
        } else {
            return 0; 
        }
      }).reverse();
    }

  }
}
