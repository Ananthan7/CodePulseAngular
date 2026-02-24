import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { AddCategory, Category } from '../models/category.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl

  addCategoryStatus = signal<'success' | 'error' | 'loading' | 'idle'>('idle');
  editCategoryStatus = signal<'success' | 'error' | 'loading' | 'idle'>('idle');

  // use: add a category to the database
  addCategory(category: AddCategory) {
    this.http.post(`${this.baseUrl}/categories`, category).subscribe({
      next: (response) =>{
        this.addCategoryStatus.set('success');
      },
      error: (error)=>{
        this.addCategoryStatus.set('error');
      }   
    }
  )}

  // use: get all categories from the database
  getCategories() {
    return httpResource<Category[]>(()=> `${this.baseUrl}/categories`);
  }

  getCategoriesById(id: string) {
    return httpResource<Category>(()=> `${this.baseUrl}/categories/${id}`);
  }

}
