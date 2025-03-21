import { ConsultaService } from '@/app/services/consultas.service';
import { DialogService } from '@/app/services/ui/dialog.service';
import { crearVenta } from '@/app/state/actions/venta.actions';
import { AsyncPipe, CommonModule, NgForOf } from '@angular/common';
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TuiAmountPipe } from '@taiga-ui/addon-commerce';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiAlertService, TuiAppearance, TuiButton, TuiDataList, TuiDropdown, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiItemsWithMore, TuiRadio, TuiStepper } from '@taiga-ui/kit';
import { TuiAppBar, TuiCardLarge, TuiCell, TuiHeader } from '@taiga-ui/layout';
import { TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';

@Component({
  selector: 'app-hacerventa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,

    TuiStepper,
    TuiTable,
    TuiItemsWithMore,

    TuiRadio,
    TuiDropdown,

    FormsModule,


    TuiAppBar,
    TuiTextfield,
    TuiInputModule,
    TuiButton,
    TuiAppearance,
    TuiDataList, AsyncPipe, NgForOf,
    TuiCardLarge, TuiHeader, TuiCell, TuiTitle, TuiAmountPipe,
    TuiDataListWrapper, TuiSelectModule,
    TuiTextfieldControllerModule,
  ],
  providers: [
    { provide: 'Pythons', useValue: ['Python One', 'Python Two', 'Python Three'] },
  ],
  templateUrl: './hacerventa.component.html',
  styleUrl: './hacerventa.component.scss',


})
export class HacerventaComponent {
  selectCurrentStep = signal("Start Up");
  protected readonly units = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  protected value = this.units[0]!;
  salesTotals = {
    subtotal: 0,
    igv: 0,
    total: 0
  };
  ventaForm: FormGroup;
  listMetodosPago = [" YAPE", "Efectivo"]
  tipoComprobantes = ["Boleta", "Factura", "Sin Comprobante"]
  formasPago = ["Contado"]
  protected readonly options = { updateOn: 'blur' } as const;
  private readonly dialogService = inject(DialogService);

  protected allProductsForSale: any[] = [];
  arrayCantidades = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
  selectedItem: string = '1';
  protected sum(operations: readonly any[]): number {
    return operations.reduce((acc, { sum }) => acc + (sum || 0), 0);
  }

  protected orderBy(): number {
    return 0;
  }
  private readonly alerts = inject(TuiAlertService);

  constructor(private fb: FormBuilder, private consultaService: ConsultaService, private store: Store, private cdr: ChangeDetectorRef) {
    this.ventaForm = this.fb.group({
      tiendaId: [1, Validators.required],
      usuarioId: [1, Validators.required],
      metodoPago: ['', Validators.required],
      formaPago: ['', Validators.required],
      tipoComprobante: ['', Validators.required],
      cliente: [null, Validators.required],
      documento_cliente: [""],
      nombre_cliente: [""],
      productos: this.fb.array([], [Validators.required, Validators.minLength(1)])
    });
    this.productosFormArray.valueChanges.subscribe(() => {
      this.calcularTotales();
    });
  }

  calcularTotales(): void {
    let subtotal = 0;
    let igv = 0;
    let total = 0;
    const IGV_RATE = 0.18; // 18% IGV

    this.productosFormArray.controls.forEach(control => {
      const cantidad = parseInt(control.get('cantidad_final')?.value || '0');
      const costoVenta = parseFloat(control.get('costo_venta')?.value || '0');

      const valorVenta = cantidad * costoVenta; // Subtotal sin IGV
      subtotal += valorVenta;
    });

    igv = subtotal * IGV_RATE; // IGV calculado
    total = subtotal; // El total solo es el subtotal (sin sumar el IGV)

    this.salesTotals = { subtotal: total - igv, igv, total };
  }


  protected showDialog(): void {
    this.dialogService.open().subscribe((result: any) => {
      if (result) {
        const productosArray = this.ventaForm.get('productos') as FormArray;

        // Verificar si el producto ya existe en el FormArray
        const productoExiste = productosArray.controls.some(control =>
          control.get('inventarioId')?.value === result.id
        );

        if (productoExiste) {

          this.alerts
            .open('Mensaje informacion', { label: 'Producto ya esta agregado' })
            .subscribe();
          return; // No agregar duplicado
        }

        const nuevoProducto = this.fb.group({
          inventarioId: [result.id, Validators.required],
          cantidad_final: ["1", [Validators.required, Validators.min(1)]], // Validación de cantidad
          producto_nombre: [result.producto_nombre, Validators.required],
          nombre_categoria: [result.categoria_nombre],
          costo_venta: [result.costo_venta, Validators.required],
          productoId: [result.producto, Validators.required]
        });

        productosArray.push(nuevoProducto);
        this.calcularTotales();
      }
    });
  }

  buscarCliente() {
    const documento = this.ventaForm.get('documento_cliente')!.value;

    if (!documento) {
      console.log('Ingrese un documento válido');
      return;
    }

    let consultaObservable =
      documento.length === 8
        ? this.consultaService.consultarDNI(documento)
        : documento.length === 11
          ? this.consultaService.consultarRUC(documento)
          : null;

    if (!consultaObservable) {
      console.log('Número de documento inválido');
      return;
    }

    consultaObservable.subscribe(
      response => {
        if (response?.data) {
          console.log('Cliente encontrado:', response.data);
          this.ventaForm.patchValue({
            nombre_cliente: response.data.nombre_completo || response.data.nombre_o_razon_social,
            cliente: response.data  // Guardar objeto completo si lo necesitas
          });
          console.log(response.data)
          this.cdr.detectChanges();

        }
      },
      error => {
        console.error('Error en la búsqueda:', error);
        this.ventaForm.patchValue({
          nombre_cliente: '',
          cliente: null
        });
      }
    );
  }

  borrarCliente() {
    this.ventaForm.patchValue({
      documento_cliente: '',
      nombre_cliente: '',
      cliente: null
    });
  }

  hacerVenta() {
    if (this.ventaForm.valid) {
      const preparedData = {
        ...this.ventaForm.value,
      }
      console.log(preparedData)
      this.store.dispatch(crearVenta({ venta: preparedData }));
      this.ventaForm.patchValue({
        nombre_cliente: '',
        cliente: null
      });
    }

  }
  get productosFormArray(): FormArray<FormGroup> {
    return this.ventaForm.get('productos') as FormArray<FormGroup>;
  }
  protected readonly columns = ['producto_nombre', 'cantidad_final', 'costo_venta', 'acciones'];
  actualizarCantidad(index: number, nuevaCantidad: string) {
    this.productosFormArray.at(index).patchValue({ cantidad_final: nuevaCantidad });
  }
  eliminarProductoForm(index: number) {
    this.productosFormArray.removeAt(index);
    this.calcularTotales();
  }
}
