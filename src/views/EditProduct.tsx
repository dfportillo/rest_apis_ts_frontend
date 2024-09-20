import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductServices";
//-----------------------------------------------------------------------------------
import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {

        const id = parseFloat(params.id)

        const product = await getProductById(id)

        if (!product) {
            return redirect('/')
        }

        return product

    }
}

export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())

    let error = '';

    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if (error.length) {
        return error
    }

    const id = parseFloat(params.id as string)

    await updateProduct(data, id)

    return redirect('/')
}

const availabilityOptions = [
    { name: 'Disponible', value: true },
    { name: 'No Disponible', value: false }
]

export default function EditProduct() {

    const error = useActionData() as string;

    const product = useLoaderData() as Product



    return (
        <>
            <div className=' flex justify-between'>
                <h2 className=' text-4xl font-bold text-slate-500'>Editar producto</h2>
                <Link
                    to={'/'}
                    className=' rounded bg-indigo-600 p-3 font-bold text-sm text-white shadow-lg hover:bg-indigo-500'
                >
                    Volver a Productos
                </Link>

            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form
                className="mt-10"
                method="POST"
            >

                <ProductForm 
                    product={product}
                />
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Guardar cambios"
                />
            </Form>

        </>
    )
}
