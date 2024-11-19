import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout, AuthLayout } from "./presentation/layouts"
import { HomePage, LoginPage, NotFound, UserPage } from "./presentation/pages"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={ <MainLayout />}>
          <Route path="/" element={ <HomePage /> } index />
          <Route path="/user" element={ <UserPage /> } />
        </Route>

        <Route element={ <AuthLayout />}>
          <Route path="/auth/login" element={ <LoginPage /> } />
        </Route>

        <Route element={ <AuthLayout />}>
          <Route path="*" element={ <NotFound /> } />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
