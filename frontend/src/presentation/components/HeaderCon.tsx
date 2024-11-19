import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'

export const HeaderCon = () => {
  return (
    <header className="bg-blue-600 text-white py-8">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Estilos de Aprendizaje y Personalidad</h1>
        <Link to="/admin" className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold flex items-center hover:bg-blue-100 transition-colors">
          <Lock className="mr-2 h-4 w-4" />
          Admin
        </Link>
      </div>
    </header>
  )
}
