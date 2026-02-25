import { Component, effect, inject, input, signal } from '@angular/core';
import { CategoryService } from '../services/category-service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-edit-category',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [CategoryService],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
  private categoryService = inject(CategoryService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  editCategoryForm: FormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      urlHandle: ['', [Validators.required]]
    })

  categoryId = this.router.url.split('/').pop() || '';

  categoryResourseRef = this.categoryService.getCategoriesById(this.categoryId);
  categoryResponse = this.categoryResourseRef.value;

  effectRef = effect(()=>{
    this.editCategoryForm.controls['name'].patchValue(this.categoryResponse()?.name ?? '')
    this.editCategoryForm.controls['urlHandle'].patchValue(this.categoryResponse()?.urlHandle ?? '')
  })


  constructor() {
    // Initialize the effect to track the status of adding a category
    this.submitStatus();
  }

  // use: signal to track the status of adding a category and show appropriate messages
  submitStatus(){
    effect(()=>{
      if(this.categoryService.editCategoryStatus() === 'success'){
        this.router.navigateByUrl('/admin/category-list')
        alert('Category edited successfully!');
      } else if(this.categoryService.editCategoryStatus() === 'error'){
        alert('Failed to edit category. Please try again.');
      }
    })
  }
  onSubmit() {
    if (this.editCategoryForm.valid) {
      const categoryData:Category = {
        id: this.categoryId,
        ...this.editCategoryForm.value,
      }

      this.categoryService.editCategory(categoryData);

      
    } else {
      alert('Form is invalid');
    }
  }
}
