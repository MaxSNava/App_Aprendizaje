import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <>
      <h1 className="font-black text-center text-4xl text-black">Página No Encontrada</h1>
      <p className="mt-10 text-2xl font-semibold text-center text-black">Volver a <Link className="text-cyan-400 cursor-pointer hover:text-cyan-900" to={'/'}>Home</Link></p>
    </>
  )
}
