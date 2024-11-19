import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      <h1 className="font-black text-center text-4xl text-white">Página No Encontrada</h1>
      <p className="mt-10 text-2xl font-semibold text-center text-white">Volver a <Link className="text-cyan-400" to={'/'}>Home</Link></p>
    </>
  )
}
