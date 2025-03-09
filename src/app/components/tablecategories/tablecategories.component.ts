import { Categoria, CategoriaState } from '@/app/models/categoria.models';
import { deleteCategoriaAction, loadCategorias, updateCategoriaAction } from '@/app/state/actions/categoria.actions';
import { AppState } from '@/app/state/app.state';
import { selectCategoria } from '@/app/state/selectors/categoria.selectors';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import urlSlug from 'url-slug';
@Component({
  selector: 'app-tablecategories',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIcon, FormsModule],
  templateUrl: './tablecategories.component.html',
  styleUrl: './tablecategories.component.scss'
})
export class TablecategoriesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'activo', 'acciones'];
  dataSource = new MatTableDataSource<Categoria>([]);
  editingId: number | any = null;
  editedCategoria: Partial<Categoria> = {};

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(loadCategorias());

    this.store.select(selectCategoria).subscribe((categoriaState: CategoriaState) => {
      this.dataSource.data = categoriaState.categorias;
    });
  }
  onDeleteCategoria(id: number) {
    this.store.dispatch(deleteCategoriaAction({ id }));
  }


  onEditCategoria(categoria: Categoria) {
    this.editingId = categoria.id;
    this.editedCategoria = { ...categoria };

  }

  onUpdateCategoria() {
    console.log('Datos actualizados:', this.editedCategoria);
    this.store.dispatch(updateCategoriaAction({
      categoria: {
        id: this.editedCategoria.id,
        nombre: this.editedCategoria.nombre || '',
        descripcion: this.editedCategoria.descripcion || '',
        slug: urlSlug(this.editedCategoria.nombre || '')
      }
    }))
    this.editingId = null;
  }
  onCancelEdit() {
    this.editingId = null;
  }
}
