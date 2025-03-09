import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { AuthlayoutComponent } from './layouts/authlayout/authlayout.component';
import { MainlayoutComponent } from './layouts/mainlayout/mainlayout.component';
import { HacerventaComponent } from './pages/hacerventa/hacerventa.component';
import { HomeComponent } from './pages/home/home.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { SettiingsComponent } from './pages/settiings/settiings.component';
import { TiendasComponent } from './pages/tiendas/tiendas.component';
import { VentasComponent } from './pages/ventas/ventas.component';


const routes: Routes = [
	{
		path: '',
		component: MainlayoutComponent,
		canActivate: [authGuard],
		children: [
			{ path: '', component: HomeComponent },
			{ path: 'inventario', component: InventarioComponent },
			{ path: 'ventas', component: VentasComponent },
			{ path: 'create_venta', component: HacerventaComponent },
			{ path: 'productos', component: ProductosComponent },
			{ path: 'proveedores', component: ProveedoresComponent },
			{ path: 'perfil', component: PerfilComponent },
			{ path: 'tiendas', component: TiendasComponent },
			{ path: 'settings', component: SettiingsComponent }
		]
	},
	{
		path: 'login',
		component: AuthlayoutComponent,
		canActivate: [loginGuard],
		children: [{ path: '', component: LoginComponent }]
	},
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }

