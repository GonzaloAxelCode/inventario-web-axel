import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { checkTokenAction } from './state/actions/auth.actions';
import { loadCategorias } from './state/actions/categoria.actions';
import { loadProductosAction } from './state/actions/producto.actions';
import { AppState } from './state/app.state';

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

  }
}
