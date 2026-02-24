import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'admin/category-list',
        loadComponent: () => import('./core/features/category/category-list/category-list').then(m => m.CategoryList)
    },
    {
        path: 'admin/add-category',
        loadComponent: () => import('./core/features/category/add-category/add-category').then(m => m.AddCategory)
    },
    {
        path: 'admin/edit-category/:id',
        loadComponent: () => import('./core/features/category/edit-category/edit-category').then(m => m.EditCategory)
    }
];