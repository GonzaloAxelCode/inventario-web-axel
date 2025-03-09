import { VentaCreate } from '@/app/models/venta.models';
import { ConsultaService } from '@/app/services/consultas.service';
import { crearVenta } from '@/app/state/actions/venta.actions';
import { AsyncPipe, CommonModule, NgForOf, SlicePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { TuiSheetDialog } from '@taiga-ui/addon-mobile';
import { TuiTable } from '@taiga-ui/addon-table';
import { TUI_DEFAULT_MATCHER, TuiFilterPipe, TuiMatcher } from '@taiga-ui/cdk';
import { TuiButton, TuiDropdown, TuiFallbackSrcPipe, TuiIcon, TuiTitle } from '@taiga-ui/core';
import { TuiAvatar, TuiAvatarLabeled, TuiBadge, TuiChip, TuiFade, TuiItemsWithMore, TuiRadio, TuiStatus, TuiStep, TuiStepper } from '@taiga-ui/kit';
import { TuiAppBar, TuiCell } from '@taiga-ui/layout';
export enum Steps {
  StartUp = 'Start Up',
  CashIn = 'Cash In',
  SellOut = 'Sell Out',
  BroDown = 'Bro Down',
}

@Component({
  selector: 'app-hacerventa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    TuiStepper, TuiStep,
    TuiTable, TuiBadge,
    TuiItemsWithMore,
    TuiStatus,
    TuiAvatar,
    TuiChip,
    TuiCell,
    TuiIcon,
    TuiRadio,
    MatButtonModule, TuiDropdown,
    AsyncPipe,
    FormsModule,
    NgForOf,
    SlicePipe,
    TuiAppBar,

    TuiAvatarLabeled,
    TuiButton,

    TuiFade,
    TuiFallbackSrcPipe,
    TuiFilterPipe,

    TuiSheetDialog,
    TuiTitle,
  ],
  providers: [
    { provide: 'Pythons', useValue: ['Python One', 'Python Two', 'Python Three'] },
  ],
  templateUrl: './hacerventa.component.html',
  styleUrl: './hacerventa.component.scss',

})
export class HacerventaComponent {
  selectCurrentStep = signal("Start Up");

  ventaForm: FormGroup;
  clientes: any[] = [
    { id: 1, documento: '76881855', nombre: 'GONZALO AXEL VALDEZ QUISPE' },
    { id: 2, documento: '10768818555', nombre: 'VALDEZ QUISPE GONZALO AXEL SAC', razonSocial: 'VALDEZ QUISPE GONZALO AXEL SAC', direccion: 'Av. Principal 123, Lima' },
    { id: 3, documento: '10234567890', nombre: 'EMPRESA DE IMPORTACIONES S.A.C.', razonSocial: 'EMPRESA DE IMPORTACIONES S.A.C.', direccion: 'Calle Comercio 456, Arequipa' },
    { id: 4, documento: '87654321', nombre: 'JUAN PÉREZ RODRÍGUEZ' },
    { id: 5, documento: '20654789012', nombre: 'SOLUCIONES TECNOLÓGICAS E.I.R.L.', razonSocial: 'SOLUCIONES TECNOLÓGICAS E.I.R.L.', direccion: 'Jr. Innovación 789, Trujillo' }
  ];
  selectStep(key: any) {
    this.selectCurrentStep.set(key)
  }

  constructor(private fb: FormBuilder, private consultaService: ConsultaService, private store: Store) {
    this.ventaForm = this.fb.group({
      dniRuc: [''],
      cliente: [''],
      metodoPago: [''],
      formaPago: [''],
      tipoComprobante: ['']
    });
    effect(() => {
      console.log('Nuevo valor:', this.selectCurrentStep());
    });
  }
  protected readonly steps = ['Start Up', 'Cash In', 'Sell Out', 'Bro Down'];


  buscarCliente() {
    const valor = this.ventaForm.get('dniRuc')!.value;
    if (valor.length === 8) {
      this.buscarPorDNI(valor);
    } else if (valor.length === 11) {
      this.buscarPorRUC(valor);
    }
  }

  buscarPorDNI(dni: string) {
    this.consultaService.consultarDNI(dni).subscribe(
      (response: any) => {
        if (response?.data) {
          const cliente: any = {
            documento: response.data.numero,
            nombre: response.data.nombre_completo
          };
          this.agregarCliente(cliente);
        }
      },
      error => console.error('Error al buscar DNI:', error)
    );
  }

  buscarPorRUC(ruc: string) {
    this.consultaService.consultarRUC(ruc).subscribe(
      (response: any) => {
        if (response?.data) {
          const cliente: any = {

            documento: response.data.number,
            nombre: response.data.nombre_o_razon_social,
            razonSocial: response.data.nombre_o_razon_social,
            direccion: response.data.direccion
          };
          this.agregarCliente(cliente);
        }
      },
      error => console.error('Error al buscar RUC:', error)
    );
  }

  agregarCliente(cliente: any) {
    const existe = this.clientes.some(c => c.documento === cliente.documento);
    if (!existe) {
      this.clientes.push(cliente);
    }
    this.ventaForm.patchValue({ cliente: cliente.documento });
  }

  imprimirJSON() {
    const clienteSeleccionado = this.clientes.find(c => c.documento === this.ventaForm.value.cliente);

    const venta: VentaCreate = {
      cliente: clienteSeleccionado ? clienteSeleccionado.id : 0,
      usuario: 1,
      tienda: 1,
      metodo_pago: this.ventaForm.value.metodoPago || '',
      estado: 'PROCESO',
      tipo_comprobante: this.ventaForm.value.tipoComprobante || '',
      serie: '',
      numero: '',
      ruc_empresa: clienteSeleccionado?.documento.length === 11 ? clienteSeleccionado.documento : '',
      razon_social: clienteSeleccionado?.razonSocial || '',
      direccion_empresa: clienteSeleccionado?.documento.length === 11 ? clienteSeleccionado.direccion || '' : '',
      documento_cliente: clienteSeleccionado?.documento || '',
      condicion_venta: '',
      detalles: []
    };

    console.log(venta);
    this.store.dispatch(crearVenta({ venta }))
  }




  protected readonly sizes = ['l', 'm', 's'] as const;

  protected size = this.sizes[0];

  protected readonly data = [
    {
      checkbox: {
        title: 'Data point 1',
        subtitle: 'The first element',
      },
      title: {
        icon: '@tui.file',
        title: 'This is title',
        chip: 'Chip',
        subtitle: 'More information ・ Data',
      },
      cell: {
        name: 'John Cleese',
        email: 'silly@walk.uk',
      },
      status: {
        value: 'Success',
        color: 'var(--tui-status-positive)',
      },
      items: ['Some', 'items', 'displayed', 'here', 'and', 'can', 'overflow'],
      progress: 78,
      selected: false,
    },
    {
      checkbox: {
        title: 'Some title',
        subtitle: 'Some more text',
      },
      title: {
        icon: '@tui.heart',
        title: 'More info',
        chip: 'Chips can be here',
      },
      cell: {
        name: 'Eric Idle',
        email: 'cool@dude.com',
      },
      status: {
        value: 'Failure',
        color: 'var(--tui-status-negative)',
      },
      items: ['One', 'Item'],
      progress: 91,
      selected: false,
    },
    {
      checkbox: {
        title: 'And now',
        subtitle: 'Completely different',
      },
      title: {
        icon: '@tui.star',
        title: 'Wow',
      },
      cell: {
        name: 'Michael Palin',
        email: 'its@man.com',
      },
      status: {
        value: 'Pending',
        color: 'var(--tui-status-warning)',
      },
      items: [],
      progress: 32,
      selected: false,
    },
  ];

  protected get checked(): boolean | null {
    const every = this.data.every(({ selected }) => selected);
    const some = this.data.some(({ selected }) => selected);

    return every || (some && null);
  }

  protected onCheck(checked: any): void {
    this.data.forEach((item) => {
      item.selected = checked;
    });
  }



  protected open = signal(false);
  protected search = '';

  protected readonly items = [
    {
      name: 'Grigori Constantinopolsky',
      avatar: 'https://avatars.githubusercontent.com/u/10106368',
      email: 'grigori@gmail.com',
    },
    {
      name: 'Nikolai Rimsky-Korsakov',
      avatar: 'https://avatars.githubusercontent.com/u/11832552',
      email: 'nikolai@gmail.com',
    },
    {
      name: 'Hubert Wolfflegelstainhausenbergedorf',
      avatar: 'https://avatars.githubusercontent.com/u/46284632',
      email: 'hubert@gmail.com',
    },
    {
      name: 'Arkhangelsky Constantine',
      avatar: 'https://avatars.githubusercontent.com/u/35179038',
      email: 'contantine@gmail.com',
    },
    {
      name: 'Zoya Kosmodemyanskaya',
      avatar: 'https://avatars.githubusercontent.com/u/8158578',
      email: 'zoya@gmail.com',
    },
    {
      name: 'Johann Gambolputty',
      avatar: '',
      email: 'johann@gmail.com',
    },
    ...inject<readonly string[]>('Pythons' as any).map((name: any) => ({
      name,
      avatar: '',
      email: `${name.split(' ')[0]}@gmail.com`,
    })),
  ];

  protected readonly filter: TuiMatcher<[(typeof this.items)[0], string]> = (
    item,
    search,
  ) => TUI_DEFAULT_MATCHER(item.name, search);
}
