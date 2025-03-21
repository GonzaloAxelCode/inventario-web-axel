
import { createCategoriaAction } from '@/app/state/actions/categoria.actions';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TuiButton, TuiError, } from '@taiga-ui/core';
import urlSlug from 'url-slug';

import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiInputModule, TuiTextareaModule, } from '@taiga-ui/legacy';
@Component({
  selector: 'app-formaddcategoria',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TuiButton, TuiError, TuiTextareaModule, TuiInputModule, TuiFieldErrorPipe
  ],
  templateUrl: './formaddcategoria.component.html',
  styleUrl: './formaddcategoria.component.scss'
})
export class FormaddcategoriaComponent {
  categoryForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      slug: [''],
      siglas_nombre_categoria: ['', [
        Validators.required,
        Validators.pattern(/^[A-Z]{3}$/)  // Solo 3 letras mayúsculas
      ]]
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const newCategory = this.categoryForm.value;
      this.store.dispatch(createCategoriaAction({
        categoria: {
          ...newCategory,
          slug: urlSlug(newCategory.nombre),
          siglas_nombre_categoria: newCategory.siglas_nombre_categoria.toUpperCase()
        }
      }));
    } else {
      this.categoryForm.markAllAsTouched(); // Resalta los errores si el usuario intenta enviar un formulario inválido
    }
  }

}
