export interface ClientResponse {
    message: string;
    data: Client[];
    total: number;
}

export interface Client {
    id: string;
    nombre: string;
    apellidos: string;
    ci: string;
    telefono: string;
    nit: string;
}