import { InferOutput } from 'valibot';
import ProductDetails from '../components/ProductDetails';
import { getProducts, updateProductAvailability } from '../services/ProductServices';
import { Product, ProductsSchema } from '../types';
//----------------------------------------------------------------------
import { ActionFunctionArgs, Link, useLoaderData } from 'react-router-dom';

export async function loader() {

    const products = await getProducts();

    return products
    
}

export async function action({request}: ActionFunctionArgs){
    const data = Object.fromEntries(await request.formData());

    await updateProductAvailability(+data.id);

    return{}
}

export type ProductsDetailProps = InferOutput<typeof ProductsSchema>


export default function Products() {

    const products = useLoaderData() as Product[]

    return (
        <>
            <div className=' flex justify-between'>
                <h2 className=' text-4xl font-bold text-slate-500'>Productos</h2>
                <Link
                    to={'products/new'}
                    className=' rounded bg-indigo-600 p-3 font-bold text-sm text-white shadow-lg hover:bg-indigo-500'
                >
                    Agregar producto
                </Link>
            </div>
            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {products.map(product => (
                            <ProductDetails
                                key={product.id}
                                product = {product}
                            />
                        ))} */}

                        {products.map(product =>(
                            <ProductDetails
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
