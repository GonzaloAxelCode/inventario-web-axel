export interface Producto {
    id: number,
    nombre?: string;
    descripcion?: string | null;
    precio?: number | any;
    categoria?: number | null;
    sku?: string;
    marca?: string | null;
    modelo?: string | null;
    caracteristica?: Record<string, any>;
    fecha_creacion?: Date;
    fecha_actualizacion?: Date;
    activo?: boolean;
    proveedorId?: number | null;
}

export type ProductoCreate = Omit<Producto, 'id' |
    'fechaCreacion' |
    'fechaActualizacion' |
    'activo' |
    'imagen' |
    'proveedorId'>;



export interface ProductoState {
    productos: Producto[];
    loadingProductos?: boolean;
    errors?: any;
}


