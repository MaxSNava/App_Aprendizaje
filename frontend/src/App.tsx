import { RouterProvider } from 'react-router-dom';
import { router } from './presentation/routes/router';

export const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}
