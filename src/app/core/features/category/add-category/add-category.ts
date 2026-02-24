import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../services/category-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.html',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [CategoryService],
  styleUrl: './add-category.css',
})
export class AddCategory {
  private categoryService = inject(CategoryService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  categoryForm!: FormGroup;

  constructor() {
    // Initialize the effect to track the status of adding a category
    this.submitStatus();
  }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      urlHandle: ['', [Validators.required]]
    })

  }
  // use: signal to track the status of adding a category and show appropriate messages
  submitStatus(){
    effect(()=>{
      if(this.categoryService.addCategoryStatus() === 'success'){
        this.router.navigateByUrl('/admin/category-list')
      } else if(this.categoryService.addCategoryStatus() === 'error'){
        alert('Failed to add category. Please try again.');
      }
    })
  }
  onSubmit() {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;
      this.categoryService.addCategory(categoryData);

      
    } else {
      console.log('Form is invalid');
    }
  }
}
