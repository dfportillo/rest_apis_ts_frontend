import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types"
// ------------------------------------------------------------------
import axios from "axios"
import { safeParse, pipe, number, parse, string, transform } from "valibot"
import { toBoolean } from "../utils"

export type ProductData = {
    [k: string]: FormDataEntryValue
}

export async function addProduct(data: ProductData) {

    const price = parseFloat(data.price as string)
    try {
        const res = safeParse(DraftProductSchema, {
            name: data.name,
            price: price
        });
        if (res.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: res.output.name,
                price: res.output.price
            })

        } else {
            throw new Error('datos no validos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`;
        const { data } = await axios(url)

        const res = safeParse(ProductsSchema, data.data);
        if (res.success) {
            return res.output
        } else {
            throw new Error('hubo un error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios(url);
        const res = safeParse(ProductSchema, data.data);

        if (res.success) {
            return res.output
        } else {
            throw new Error('hubo un error con id')
        }

    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data: ProductData, id: Product['id']) {
    try {
        // limpieza de los datos a editar
        const numberSchema = pipe(string(), transform(Number), number())

        const res = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(numberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })

        if (res.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
            await axios.put(url, res.output);
        }

    } catch (error) {
        console.log(error)
    }
}

export async function deleteProductById(id: Product['id']) {


    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }


}

export async function updateProductAvailability(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}