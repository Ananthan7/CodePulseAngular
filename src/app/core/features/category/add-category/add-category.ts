import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-category.html',
  providers: [CategoryService],
  styleUrl: './add-category.css',
})
export class AddCategory {
  private categoryService = inject(CategoryService);
  private formBuilder = inject(FormBuilder);
  categoryForm!: FormGroup;

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      urlHandle: ['', [Validators.required]]
    })
  }
  onSubmit() {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;
      this.categoryService.getCategories(categoryData);

      effect(()=>{
        if(this.categoryService.addCategoryStatus() === 'success'){
          this.categoryForm.reset({
            name: '',
            urlHandle: ''
          });
        } else if(this.categoryService.addCategoryStatus() === 'error'){
          console.error('Failed to add category');
        }
      })
    } else {
      console.log('Form is invalid');
    }
  }
}
