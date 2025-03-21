

export interface Venta {
    id: number;
    usuario: number;
    tienda: number;
    fecha_hora: string; // Formato ISO 8601 (YYYY-MM-DD HH:mm:ss)
    fecha_realizacion?: string | null;
    fecha_cancelacion?: string | null;
    metodo_pago: string;
    estado: string;
    activo: boolean;
    tipo_comprobante: string
    productos: Partial<ProductSale>[] // Relación con productos vendidos
    subtotal: number;
    gravado_total: number
    igv_total: number
    total: number
    productos_json: string
    comprobante: ComprobanteElectronico

}

export interface ComprobanteElectronico {
    tipo_comprobante: string;
    serie: string; // Ejemplo: B001, F001
    correlativo: string
    numero: string; // Ejemplo: 00000001
    moneda: string; // Ejemplo: 00000001
    // Datos del cliente
    tipo_documento_cliente: string; // Ejemplo: "1" (DNI)
    numero_documento_cliente: string;
    nombre_cliente: string;
    // Totales
    gravadas: number;
    igv: number;
    valorVenta: number;
    sub_total: number;
    total: number;
    // Otros
    leyenda: string;
    estado_sunat: string;
    // URLs de documentos generados
    xml_url: string;
    pdf_url: string;
    cdr_url: string;
    ticket_url: string;
    items: ItemComprobante[];
}
export interface ItemComprobante {
    igv: number;
    codigo: string;
    unidad: string;
    baseIgv: number;
    cantidad: number;
    valorVenta: number;
    descripcion: string;
    porcentajeIgv: number;
    valorUnitario: number;
    precioUnitario: number;
    totalImpuestos: number;
    tipoAfectacionIgv: string;
}

export interface VentaProducto {
    id: number;
    producto: number;
    producto_nombre: string;
    cantidad: number;
    valor_unitario: number; // Precio sin IGV
    valor_venta: number; // Total sin IGV
    base_igv: number; // Base imponible
    porcentaje_igv: number; // Ej: 18%
    igv: number; // Monto del IGV
    tipo_afectacion_igv: string; // Código de afectación IGV
    total_impuestos: number; // Total de impuestos
    precio_unitario: number; // Precio final con IGV
}

export interface CreateVenta {
    dniRuc: string;
    cliente: ClienteTemp;
    metodoPago: string;
    formaPago: string;
    tipoComprobante: string
    subTotal: number;
    descuentos: number;
    igv: number;
    totalPagar: number;
    productos: ProductoVenta[];
}

export interface ClienteTemp {
    numero: string;
    nombre_completo: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    codigo_verificacion: number;
    ubigeo_sunat: string;
    ubigeo: (string | null)[];
    direccion: string;
}

export interface ProductoVenta {
    inventarioId: number;
    cantidad_final: string; // Considera cambiar a number si se usa en cálculos
    producto_nombre: string;
    costo_venta: string; // Considera cambiar a number si se usa en cálculos
    productoId: number;
}
export interface ProductSale {
    id: number;
    producto: number; // ID del producto
    producto_nombre: string;
    cantidad: number;
    valor_unitario: number; // Sin IGV
    valor_venta: number;
    base_igv: number;
    porcentaje_igv: number;
    igv: number;
    tipo_afectacion_igv: string;
    total_impuestos: number;
    precio_unitario: number; // Con IGV
}
