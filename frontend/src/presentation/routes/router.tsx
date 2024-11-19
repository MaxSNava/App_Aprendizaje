import { createBrowserRouter, Navigate } from "react-router-dom";
import { HomePage, AdminPage, VarkPage, VarkTest } from "../pages";
import { MainLayout } from "../layouts/MainLayout";

export const makerRouter = [
  {
    to: "/home",
    title: "Home Page",
    description: "Pagina de inicio",
    component: <HomePage />
  },
  {
    to: "/vark",
    title: "Vark Page",
    description: "Pagina de Vark",
    component: <VarkPage />
  },
  {
    to: "/vark/test-id",
    title: "Vark Page Test",
    description: "Pagina de Vark Test",
    component: <VarkTest />
  },
  {
    to: "/admin",
    title: "Admin Page",
    description: "Pagina de administrador",
    component: <AdminPage />
  },
  
]

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      ...makerRouter.map( route => ({
        path: route.to,
        element: route.component
      })),
      {
        path: '',
        element: <Navigate to={makerRouter[0].to} />
      }
    ],
  }
]);