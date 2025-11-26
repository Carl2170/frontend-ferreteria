'use client';

import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button } from "flowbite-react";
import { useEffect, useState } from 'react';

import { getProduct, deleteProduct } from '@/app/api/product';
import { Product } from '../interfaces/product';

import { CreateProductComponent } from "./create";
import { EditProductComponent } from "./edit";

import Swal from 'sweetalert2';

export default function ProductComponent() {

    const [products, setProducts] = useState<Product[]>([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);

    const addProductToList = (newProduct: Product) => {
        setProducts(prev => [...prev, newProduct]);
    };

    useEffect(() => {
        async function fetchProducts() {
            try {
                const result = await getProduct();
                setProducts(result);
            } catch (err: any) {
                console.error("Error loading products", err);
            }
        }
        fetchProducts();
    }, []);

    const handleDelete = (id: number) => {
        Swal.fire({
            title: '¿Deseas eliminar el producto?',
            text: 'Esta acción es irreversible',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#006EFD',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            preConfirm: async () => {
                try {
                    await deleteProduct(id);
                    return true;
                } catch (err: any) {
                    Swal.close();
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err?.message,
                        confirmButtonColor: '#d33'
                    });
                    return false;
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setProducts(prev => prev.filter(p => p.id !== id));
                Swal.fire({
                    title: 'Producto eliminado',
                    text: 'El producto se eliminó correctamente',
                    icon: 'success',
                    confirmButtonColor: '#006EFD'
                });
            }
        });
    };

    return (
        <div className="overflow-x-auto">
            <div className="flex items-center justify-between p-2">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Productos
                </h1>
                <Button pill onClick={() => setOpenModalCreate(true)}>Agregar</Button>
            </div>

            <Table striped>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>ID</TableHeadCell>
                        <TableHeadCell>Nombre</TableHeadCell>
                        <TableHeadCell>ID Categoría</TableHeadCell>
                        <TableHeadCell>Descripción</TableHeadCell>
                        <TableHeadCell>Stock</TableHeadCell>
                        <TableHeadCell>Precio</TableHeadCell>
                        <TableHeadCell>Acciones</TableHeadCell>
                    </TableRow>
                </TableHead>

                <TableBody className="divide-y">
                    {products.map((p) => (
                        <TableRow key={p.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <TableCell>{p.id}</TableCell>
                            <TableCell>{p.name}</TableCell>
                            <TableCell>{p.id_category}</TableCell>
                            <TableCell>{p.description}</TableCell>
                            <TableCell>{p.stock}</TableCell>
                            <TableCell>{p.price}</TableCell>

                            <TableCell className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setProductToEdit(p);
                                        setOpenModalEdit(true);
                                    }}
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => handleDelete(p.id)}
                                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                                >
                                    Eliminar
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* Modal Crear */}
            {openModalCreate && (
                <CreateProductComponent
                    openModal={openModalCreate}
                    onCloseModal={() => setOpenModalCreate(false)}
                    onAddProduct={addProductToList}
                />
            )}

            {/* Modal Editar */}
            {openModalEdit && (
                <EditProductComponent
                    openModal={openModalEdit}
                    onCloseModal={() => setOpenModalEdit(false)}
                    product={productToEdit}
                    onUpdateProduct={(updated: Product) =>
                        setProducts(prev => prev.map(p => p.id === updated.id ? updated : p))
                    }
                />
            )}

        </div>
    );
}
