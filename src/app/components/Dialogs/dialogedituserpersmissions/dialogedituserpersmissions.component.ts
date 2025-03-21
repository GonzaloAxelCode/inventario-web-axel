import { User } from '@/app/models/user.models';
import { initialStateUser } from '@/app/state/reducers/user.reducer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiAppearance, TuiDialogContext } from '@taiga-ui/core';
import { TuiSwitch } from '@taiga-ui/kit';
import { injectContext } from '@taiga-ui/polymorpheus';
@Component({
  selector: 'app-dialogedituserpersmissions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiSwitch, FormsModule, TuiAppearance],
  templateUrl: './dialogedituserpersmissions.component.html',
  styleUrl: './dialogedituserpersmissions.component.scss'
})
export class DialogedituserpersmissionsComponent {
  protected readonly context = injectContext<TuiDialogContext<boolean, Partial<User>>>();
  public user: Partial<User> = this.context.data || initialStateUser
  public permissionsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.permissionsForm = this.fb.group({
      // Permisos relacionados con ventas
      can_make_sale: [this.user.permissions?.can_make_sale ?? false],
      can_cancel_sale: [this.user.permissions?.can_cancel_sale ?? false],
      view_sale: [this.user.permissions?.view_sale ?? false],

      // Permisos relacionados con inventario
      can_create_inventory: [this.user.permissions?.can_create_inventory ?? false],
      can_modify_inventory: [this.user.permissions?.can_modify_inventory ?? false],
      can_update_inventory: [this.user.permissions?.can_update_inventory ?? false],
      can_delete_inventory: [this.user.permissions?.can_delete_inventory ?? false],
      view_inventory: [this.user.permissions?.view_inventory ?? false],

      // Permisos relacionados con productos
      can_create_product: [this.user.permissions?.can_create_product ?? false],
      can_update_product: [this.user.permissions?.can_update_product ?? false],
      can_delete_product: [this.user.permissions?.can_delete_product ?? false],
      view_product: [this.user.permissions?.view_product ?? false],

      // Permisos relacionados con categorías
      can_create_category: [this.user.permissions?.can_create_category ?? false],
      can_modify_category: [this.user.permissions?.can_modify_category ?? false],
      can_delete_category: [this.user.permissions?.can_delete_category ?? false],
      view_category: [this.user.permissions?.view_category ?? false],

      // Permisos relacionados con proveedores
      can_create_supplier: [this.user.permissions?.can_create_supplier ?? false],
      can_modify_supplier: [this.user.permissions?.can_modify_supplier ?? false],
      can_delete_supplier: [this.user.permissions?.can_delete_supplier ?? false],
      view_supplier: [this.user.permissions?.view_supplier ?? false],

      // Permisos relacionados con tiendas
      can_create_store: [this.user.permissions?.can_create_store ?? false],
      can_modify_store: [this.user.permissions?.can_modify_store ?? false],
      can_delete_store: [this.user.permissions?.can_delete_store ?? false],
      view_store: [this.user.permissions?.view_store ?? false],
    });
  }



  onSubmit(): void {
    if (this.permissionsForm.valid) {
      console.log('Formulario enviado con permisos:', this.permissionsForm.value);
      this.context.completeWith(true);
    }
  }
}
