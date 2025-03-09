import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiButton, tuiDialog, TuiDialogService, TuiDropdown, TuiExpand } from '@taiga-ui/core';
import { TuiConfirmService, TuiItemsWithMore, TuiRadio } from '@taiga-ui/kit';

import {
  TuiInputModule
} from '@taiga-ui/legacy';

import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

import { DialogcreateproductComponent } from '@/app/components/dialogcreateproduct/dialogcreateproduct.component';
import { FormaddcategoriaComponent } from "../../components/formaddcategoria/formaddcategoria.component";
import { TableproductComponent } from "../../components/tableproduct/tableproduct.component";

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [ReactiveFormsModule,
    TuiRadio,
    TuiButton,
    TuiDropdown,
    TuiItemsWithMore,
    FormsModule,
    TuiDropdown,
    TuiItemsWithMore,
    TuiTable,
    TuiInputModule,
    TuiExpand, TableproductComponent, FormaddcategoriaComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiConfirmService]


})
export class ProductosComponent {
  private readonly confirm = inject(TuiConfirmService);
  private readonly dialogs = inject(TuiDialogService);

  protected value = '';

  protected onModelChange(value: string): void {
    this.value = value;
    this.confirm.markAsDirty();
  }

  protected onClick(content: PolymorpheusContent): void {
    const closeable = this.confirm.withConfirm({
      label: 'Are you sure?',
      data: {
        content: 'Your data will be <strong>lost</strong>',
      },
    });

    this.dialogs
      .open(content, { label: 'Crear Categoria', closeable, dismissible: closeable, size: "auto" })
      .subscribe({
        complete: () => {
          this.value = '';
          this.confirm.markAsPristine();
        },
      });
  }

  private readonly dialog = tuiDialog(DialogcreateproductComponent, {
    dismissible: true,
    label: 'Agregar Producto',
    size: "l"
  });
  protected showDialog(): void {
    this.dialog().subscribe({
      next: (data) => {
        console.info(`Dialog emitted data = ${data}`);
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }
}
