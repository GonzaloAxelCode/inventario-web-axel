export type TipoComprobante = 'BOLETA' | 'FACTURA';

export interface ComprobanteElectronico {
    id?: number;
    venta: number; // ID de la venta relacionada
    tipo_comprobante: TipoComprobante;
    serie?: string | null; // Ejemplo: B001, F001
    numero?: string | null; // Ejemplo: 00000001
    fecha_emision: string; // ISO 8601 (Ejemplo: "2025-02-16T12:34:56Z")

    // Datos del cliente
    tipo_documento_cliente?: string | null; // Ejemplo: "1" (DNI)
    numero_documento_cliente?: string | null;
    nombre_cliente?: string | null;
    direccion_cliente?: string | null;
    email_cliente?: string | null;
    telefono_cliente?: string | null;

    // Totales
    gravadas?: number | null;
    igv?: number | null;
    valor_venta?: number | null;
    sub_total?: number | null;
    total?: number | null;

    // Otros
    leyenda?: string | null;
    xml_firmado?: string | null;
    codigo_hash?: string | null;
    cdr_respuesta?: string | null;
    estado_sunat?: 'Pendiente' | 'Aceptado' | 'Rechazado' | null;

    // URLs de documentos generados
    xml_url?: string | null;
    pdf_url?: string | null;
    cdr_url?: string | null;
    ticket_url?: string | null;
}

export interface ClienteComprobante {
    tipoDoc: string; // Ejemplo: "1" para DNI, "6" para RUC
    numDoc: string;
    nombre: string;
    direccion: string;
    email?: string;
    telefono?: string;
}

export interface Item {
    codigo: string;
    unidad: string; // Ejemplo: "NIU"
    descripcion: string;
    cantidad: number;
    valorUnitario: number;
    valorVenta: number;
    baseIgv: number;
    porcentajeIgv: number;
    igv: number;
    tipoAfectacionIgv: string; // Ejemplo: "10" (Gravado), "20" (Exonerado)
    totalImpuestos: number;
    precioUnitario: number;
}

export interface CreateBoletaElectronica {
    moneda: string; // Ejemplo: "PEN"
    cliente: ClienteComprobante;
    gravadas: number;
    igv: number;
    valorVenta: number;
    subTotal: number;
    total: number;
    leyenda: string;
    items: Item[];
}

export interface CreateFacturaElectronica {
    moneda: string; // Ejemplo: "PEN"
    gravadas: number;
    exoneradas: number;
    igv: number;
    valorVenta: number;
    subTotal: number;
    total: number;
    leyenda: string;
    cliente: ClienteComprobante;
    items: Item[];
}
