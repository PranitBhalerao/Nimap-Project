import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  createCategory(categoryName: string) {
    return this.http.post(`${this.baseUrl}/categories`, { categoryName });
  }

  editCategory(categoryId: number, categoryName: string) {
    return this.http.put(`${this.baseUrl}/categories/${categoryId}`, { categoryName });
  }

  deleteCategory(categoryId: number) {
    return this.http.delete(`${this.baseUrl}/categories/${categoryId}`);
  }

  getProductsByCategory(categoryId: number) {
    return this.http.get(`${this.baseUrl}/products/${categoryId}`);
  }

  createProduct(name: string, categoryId: number) {
    return this.http.post(`${this.baseUrl}/products`, { name, category_id: categoryId });
  }

  editProduct(productId: number, name: string, categoryId: number) {
    return this.http.put(`${this.baseUrl}/products/${productId}`, { name, category_id: categoryId });
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${this.baseUrl}/products/${productId}`);
  }
}
