export interface Venta {
    id?: number;
    cliente: number;
    usuario: number;
    tienda: number;
    fecha_hora?: string;
    fecha_realizacion?: string | null;
    fecha_cancelacion?: string | null;
    total?: number;
    metodo_pago?: string;
    estado?: string;
    tipo_comprobante?: 'BOLETA' | 'FACTURA';
    serie?: string;
    numero?: string;
    ruc_empresa?: string;
    razon_social?: string;
    direccion_empresa?: string;
    documento_cliente?: string;
    condicion_venta?: 'CONTADO' | 'CREDITO';
    total_gravado?: number;
    igv?: number;
    qr_url?: string;
    url_consulta?: string;
    detalles: DetalleVenta[];
}

export interface DetalleVenta {
    id?: number;
    producto: number;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
    descuento?: number;
    impuestos?: number;
    notas?: string;
    activo?: boolean;
}


export interface VentaCreate {
    cliente: number;
    usuario: number;
    tienda: number;
    metodo_pago: string;
    estado: string;
    tipo_comprobante: string;
    serie: string;
    numero: string;
    ruc_empresa: string;
    razon_social: string;
    direccion_empresa: string;
    documento_cliente: string;
    condicion_venta: string;
    detalles: DetalleVentaCreate[];
}

export interface DetalleVentaCreate {
    producto: number;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
    descuento: number;
    impuestos: number;
    notas: string;
}
