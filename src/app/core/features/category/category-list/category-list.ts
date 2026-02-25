import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../services/category-service';

@Component({
  selector: 'app-category-list',
  imports: [RouterModule],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList {

  private categoryService = inject(CategoryService);
  private getCategoriesRef = this.categoryService.getCategories();

  isLoading = this.getCategoriesRef.isLoading;
  isError = this.getCategoriesRef.error;
  value = this.getCategoriesRef.value;

  deleteCategory(category: any) {
    if (confirm('Are you sure you want to delete this category?')) {
      // delete API
      this.categoryService.deleteCategory(category.id).subscribe({
        next: (response) => {
          alert('Category deleted successfully!');
          // refresh the category
          this.getCategoriesRef.reload();
        },
        error: (error) => {
          alert('Failed to delete category. Please try again.');
        }
      })
    }
  }
}
