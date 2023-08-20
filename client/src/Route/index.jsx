import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import Product from "../Pages/Product";

import Header from "../Component/Header";



export const Route = [
    {
        exact: true,
        path: '/login',
        element: <><Header/><Login/></>,
        auth: false,
    },
    {
        exact: true,
        path: '/',
        element: <><Header/><Login/></>,
        auth: false,
    },
    {
        path: '/registration',
        element: <><Header/><Registration /></>,
        loader:({ request }) =>
        fetch("/api/registration.json", {
          signal: request.signal,
        }),
        auth: false,
    },
    {
        path: '/product',
        element: <><Header/><Product/></>,
        loader:({ request }) =>
        fetch("/api/product.json", {
          signal: request.signal,
        }),
        auth: true,
    },
    {
        element: <><h1>Not Found</h1></>,
    },
]


export const AppRoute = () => {
const router = createBrowserRouter([...Route])
    return (
        <RouterProvider router={router} />
    )
}
