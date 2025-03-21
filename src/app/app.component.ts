import { Component } from '@angular/core';




import { checkTokenAction } from '@/app/state/actions/auth.actions';
import { loadCategorias } from '@/app/state/actions/categoria.actions';
import { loadInventarios } from '@/app/state/actions/inventario.actions';
import { loadProductosAction } from '@/app/state/actions/producto.actions';
import { loadProveedores } from '@/app/state/actions/proveedor.actions';
import { loadTiendasAction } from '@/app/state/actions/tienda.actions';
import { loadUserAction, loadUsersAction } from '@/app/state/actions/user.actions';
import { cargarVentasTienda } from '@/app/state/actions/venta.actions';
import { AppState } from '@/app/state/app.state';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,

  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store<AppState>, private toastr: ToastrService) {

  }
  ngOnInit() {
    this.store.dispatch(checkTokenAction());
    this.store.dispatch(loadCategorias());
    this.store.dispatch(loadProductosAction());
    this.store.dispatch(loadProveedores());
    this.store.dispatch(cargarVentasTienda({ tiendaId: 1 }));
    this.store.dispatch(loadTiendasAction());
    this.store.dispatch(loadInventarios({ tiendaId: 1 }));
    this.store.dispatch(loadUserAction());
    this.store.dispatch(loadUsersAction());
  }
}
