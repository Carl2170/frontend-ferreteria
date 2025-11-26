export interface CategoryResponse {
    message: string;
    data: Category[];
    total: number;
}

export interface Category {
    id: string;
    nombre: string;
}

