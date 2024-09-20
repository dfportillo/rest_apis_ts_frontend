import Layout from './layouts/Layout';
import Products, { loader as productsLoader,action as updateAvailabilityAction } from './views/Products';
import EditProduct, { loader as editProductLoader, action as editProductAction } from './views/EditProduct';
import NewProduct, { action as newProductAction } from './views/NewProduct';
import{action as deleteProductAction} from './components/ProductDetails'
// -----------------------------------------------------------------------
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader,// funciona como un useEffect
                action: updateAvailabilityAction
            },
            {
                path: 'products/new',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: 'products/:id/edit', //ROA Pattern - resource - oriented design
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'products/:id/delete', //ROA Pattern - resource - oriented design
                action: deleteProductAction
            }
        ]
    }
])