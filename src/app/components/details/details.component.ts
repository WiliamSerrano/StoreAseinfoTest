import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from '../../Interfaces/Product.Interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{

  constructor(private prodService:ProductService){}

  ngOnInit(): void {
    this.GetProductsingle();
  }

  @Input() ProductId:any;
  productSingle? : ProductInterface;

  GetProductsingle(){

    this.prodService.GenOneProduct(this.ProductId).subscribe({
      next: (result) => {

        this.productSingle = result;
        console.log(this.productSingle)

      },
      error: (err) => {

        console.log(err)

      }

    });
  }
}
