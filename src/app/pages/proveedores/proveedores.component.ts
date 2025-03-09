import { Component } from '@angular/core';
import { FormproveedorComponent } from "../../components/formproveedor/formproveedor.component";
import { TableproveedorComponent } from "../../components/tableproveedor/tableproveedor.component";

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [TableproveedorComponent, FormproveedorComponent],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export class ProveedoresComponent {

}
