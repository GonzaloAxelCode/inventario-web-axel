export interface User {
    id: number
    username: string;
    first_name: string;
    last_name: string;
    photo_url: string;
    date_joined: Date;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    es_empleado: boolean;
    desactivate_account: boolean;
}