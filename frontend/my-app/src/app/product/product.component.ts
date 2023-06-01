import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  newCategoryName: string = '';
  isModalOpen = false;
  categoryId: number | undefined;
  products: any[] = [];



  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.categoryId = params['categoryId'];
      if (this.categoryId) {
        this.getProductsByCategory(this.categoryId);
      } else {
        // this.getProducts();
      }
    });
  }
  getProductsByCategory(categoryId: number): void {
    const url = `http://localhost:3000/products/${categoryId}`;
    this.http.get(url).subscribe(
      (response: any) => {
        console.log(`Products for category ${categoryId}:`, response);
        this.products = response;
      },
      error => {
        console.error('Error retrieving products:', error);
        // Handle the error case
      }
    );
  }

  
  openCategoryModal() {
    this.isModalOpen = true;

  console.log(this.isModalOpen,"xxxx222")
  }

  closeCreateCategoryModal() {

    this.newCategoryName = '';
  }


  createProduct(): void{

    const categoryName: string = this.newCategoryName;
    this.newCategoryName = '';
    this.isModalOpen = false;
  
    const requestBody = {
      name: categoryName,
      category_id:this.categoryId
    };
  
    this.http.post('http://localhost:3000/products', requestBody).subscribe(
      response => {
        console.log('Product added successfully:', response);
        // Handle the API response as needed
      },
      error => {
        console.error('Error adding product:', error);
        // Handle the error case
      }
    );
  }
  deleteCategory(id: number): void {
    this.http.delete(`http://localhost:3000/products/${id}`).subscribe(
      response => {
        console.log('Category deleted successfully:', response);
        // Handle the API response as needed
        // this.getProductsByCategory(); // Refresh the categories list
        this.router.navigate(['/product']);
      },
      error => {
        console.error('Error deleting product:', error);
        // Handle the error case
      }
    );
  }
  editCategory(): void {

  }
}