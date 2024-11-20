import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout, AuthLayout } from "./presentation/layouts"
import { HomePage, LoginPage, NotFound, TestPage, AdminHomePage, AdminDashboard, AdminAdministracion, VarkTest, MbtiTest } from "./presentation/pages"
import { PrivateRoute } from "./presentation/components"


export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={ <MainLayout />}>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/test" element={ <TestPage /> } />
          <Route path="/vark" element={ <VarkTest /> } />
          <Route path="/mbti" element={ <MbtiTest /> } />
        </Route>

        <Route element={ <AuthLayout />}>
          <Route path="/auth/login" element={ <LoginPage /> } />
          <Route path="/auth/home" element={
            <PrivateRoute>
              <AdminHomePage />
            </PrivateRoute>
          } />
          <Route path="/auth/dashboard" element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } />
          <Route path="/auth/administracion" element={
            <PrivateRoute>
              <AdminAdministracion />
            </PrivateRoute>
          } />
        </Route>

        <Route element={ <AuthLayout />}>
          <Route path="*" element={ <NotFound /> } />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
