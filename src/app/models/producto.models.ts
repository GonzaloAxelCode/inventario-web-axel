export interface Producto {
    id: number,
    nombre?: string;
    descripcion?: string | null;
    categoria?: number | null;
    sku?: string;
    marca?: string | null;
    modelo?: string | null;
    caracteristica?: Record<string, any>;
    fecha_creacion?: Date;
    fecha_actualizacion?: Date;
    activo?: boolean;
    categoria_nombre?: string
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


