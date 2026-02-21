import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7014/api'

  addCategoryStatus = signal<'success' | 'error' | 'loading' | 'idle'>('idle');

  // Method to fetch categories from the backend
  getCategories(category: any) {
    this.http.post(`${this.baseUrl}/category`, category).subscribe({
      next: (response) =>{
        console.log('Categories:', response);
        this.addCategoryStatus.set('success');
      },
      error: (error)=>{
        console.error('Error fetching categories:', error)
        this.addCategoryStatus.set('error');
      }   
    })
  }
}
