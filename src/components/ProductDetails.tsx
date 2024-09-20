import { deleteProductById } from "../services/ProductServices"
import { Product } from "../types"
import { formatCurrency } from "../utils"
//-------------------------------------------------------------
import { useNavigate,Form, ActionFunctionArgs, redirect, useFetcher } from "react-router-dom"

type ProductDetailPros = {
    product: Product
}

export async function action({params}: ActionFunctionArgs){

    if(params.id !== undefined){
        
        const id = parseFloat(params.id as string)
        
        await deleteProductById(id)

        return redirect('/')
    }

}

export default function ProductDetails({product}:ProductDetailPros) {

    const fetcher = useFetcher() //* manera correcta de conectar react-router-dom 

    const navigate = useNavigate()

    const isAvailable = product.availability;

    return (
            <tr className="border-b ">
                <td className="p-3 text-lg text-gray-800">
                    {product.name}
                </td>
                <td className="p-3 text-lg text-gray-800">
                    {formatCurrency(product.price)}
                </td>
                <td className="p-3 text-lg text-gray-800">
                    <fetcher.Form method="POST">
                        <button
                            type="submit"
                            name="id"
                            value={product.id}
                            className={`${isAvailable? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase w-full font-bold border border-black-100 hover:cursor-pointer`}>
                            {isAvailable?'Disponible':'No disponible'}
                        </button>
        
                    </fetcher.Form>
                    
                </td>
                <td className="p-3 text-lg text-gray-800 ">
                    <div className="flex gap-2 items-center">
                        <button
                            onClick={() => navigate(`products/${product.id}/edit`)}
                            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs hover:bg-indigo-400"
                        >editar</button>
                        <Form
                            className=" w-full"
                            method="POST"
                            action={`products/${product.id}/delete`} //! tiene que ser igual a la de lallamada del path para que funcione
                            onSubmit={(e) =>{
                                if(!confirm('¿eliminar?')){
                                    e.preventDefault()
                                }
                            }}
                        >
                            <input
                                type="submit"
                                value={'Eliminar'}
                                className="bg-red-600 text-white rounded-lg p-2 uppercase font-bold text-xs hover:bg-red-400"
                            />
                        </Form>
                    </div>
                </td>
            </tr>
    )
}
