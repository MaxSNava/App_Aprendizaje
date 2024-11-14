import { createBrowserRouter, Navigate } from "react-router-dom";
import { HomePage } from "../layouts/HomePage";

export const makerRouter = [
  {
    to: "/or",
    title: "Or",
    description: "Cdaa",
    component: <> </>
  },
  {
    to: "/ori",
    title: "Ori",
    description: "Cdaa",
    component: <> </>
  },
]

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      ...makerRouter.map( r => ({
        path: r.to,
        element: r.component
      })),
      {
        path: '',
        element: <Navigate to={makerRouter[0].to} />
      }
    ],
  }
]);