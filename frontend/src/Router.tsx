import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout, AuthLayout } from "./presentation/layouts"
import {
  AdminAdministracionPage,
  AdminDashboardPage,
  AdminHomePage,
  HomePage,
  LoginPage,
  MbtiResPage,
  MbtiTestPage,
  NotFoundPage,
  TestPage,
  VarkResPage,
  VarkTestPage,
} from "./presentation/pages"
import { PrivateRoute } from "./presentation/components"


export const Router = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>

        <Route element={ <MainLayout />}>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/test" element={ <TestPage /> } />
          {/* -- VARK -- */}
          <Route path="/vark" element={ <VarkTestPage /> } />
          <Route path="/vark/res" element={ <VarkResPage /> } />
          {/* -- MBTI -- */}
          <Route path="/mbti" element={ <MbtiTestPage /> } />
          <Route path="/mbti/res" element={ <MbtiResPage /> } />
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
              <AdminDashboardPage />
            </PrivateRoute>
          } />
          <Route path="/auth/administracion" element={
            <PrivateRoute>
              <AdminAdministracionPage />
            </PrivateRoute>
          } />
        </Route>

        <Route element={ <AuthLayout />}>
          <Route path="*" element={ <NotFoundPage /> } />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
