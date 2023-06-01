import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit{
  constructor(private http: HttpClient,private router: Router) {}
  
  isModalOpen = false;
  newCategoryName: string = ''; // Specify the type as string
  categories: any[] = [];

  
  // categories: any[] = [
  //   { id: 1, name: 'Books' },
  //   { id: 2, name: 'Shoes' },
  //   { id: 4, name: 'Toys' },
  //   { id: 5, name: 'Sports' },
  //   { id: 6, name: 'Mobiles' },
  //   { id: 7, name: 'Shirts' },
  //   { id: 8, name: 'Grocery' }
  // ];

  ngOnInit() {

    console.log(this.isModalOpen,"xxxx")
    this.getCategories();
  }

  
  openCategoryModal() {
    this.isModalOpen = true;

  console.log(this.isModalOpen,"xxxx222")
  }

  closeCreateCategoryModal() {

    this.newCategoryName = '';
  }

  

  addCategory(): void {
    const categoryName: string = this.newCategoryName;
    console.log('Adding category:', categoryName);
    this.newCategoryName = '';
    this.isModalOpen = false;
  
    const requestBody = {
      categoryName: categoryName
    };
  
    this.http.post('http://localhost:3000/categories', requestBody)
      .subscribe(
        response => {
          console.log('Category added successfully:', response);
          // Handle the API response as needed
        },
        error => {
          console.error('Error adding category:', error);
          // Handle the error case
        }
      );
      this.getCategories();
  }

  getCategories(): void {
    this.http.get('http://localhost:3000/categories').subscribe(
      (response: any) => {
        console.log('Categories:', response);
        this.categories = response;
      },
      error => {
        console.error('Error retrieving categories:', error);
        // Handle the error case
      }
    );
  }
  

  // Function for editing a category
  editCategory(): void {
    // Implement the logic to edit the selected category
    // For example, you can open a modal or form to allow the user to update the category's details
    // Once the category is edited, you can update the category in the categories array
  }

  // Function for deleting a category
  deleteCategory(categoryId: number): void {
    this.http.delete(`http://localhost:3000/categories/${categoryId}`).subscribe(
      response => {
        console.log('Category deleted successfully:', response);
        // Handle the API response as needed
        this.getCategories(); // Refresh the categories list
        this.router.navigate(['/categories']);
      },
      error => {
        console.error('Error deleting category:', error);
        // Handle the error case
      }
    );
  }


  createNewCategory(): void {
    // Implement the logic to delete the category with the specified ID
    // Find the category in the categories array by its ID
    // Remove the category from the array
  }

  redirectToProducts(categoryId: number) {
    console.log(categoryId,"idddddddddddddddd")
    this.router.navigate(['/products'], { queryParams: { categoryId} });
    // Navigate to the products page with the selected category ID
  }
}
