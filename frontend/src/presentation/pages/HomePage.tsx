import { BookOpen, Brain, Users, FileText, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-12 text-center sm:text-left">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Descubre tu Estilo de Aprendizaje y Personalidad</h2>
        <p className="text-lg mb-4">
          Conocer tu estilo de aprendizaje y tipo de personalidad puede ayudarte a mejorar tu desarrollo personal y profesional.
        </p>
      </section>

      <section className="grid sm:grid-cols-2 gap-8 mb-12">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2 flex items-center">
              <BookOpen className="mr-2 flex-shrink-0" />
              Aprendizaje VARK
            </h3>
            <p className="text-gray-600 mb-4">Modelo de Estilos de Aprendizaje</p>
            <p className="mb-4">
              El modelo VARK identifica cuatro estilos de aprendizaje primarios:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Visual: Prefiere información presentada en gráficos y diagramas.</li>
              <li>Auditivo: Aprende mejor a través de discusiones y explicaciones verbales.</li>
              <li>Lectura/Escritura: Prefiere información presentada como palabras.</li>
              <li>Kinestésico: Aprende mejor a través de la experiencia y la práctica.</li>
            </ul>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2 flex items-center">
              <Brain className="mr-2 flex-shrink-0" />
              Test de Personalidad MBTI
            </h3>
            <p className="text-gray-600 mb-4">Indicador de Tipo Myers-Briggs</p>
            <p className="mb-4">
              El MBTI evalúa la personalidad en cuatro dimensiones:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Extraversión (E) vs. Introversión (I)</li>
              <li>Sensación (S) vs. Intuición (N)</li>
              <li>Pensamiento (T) vs. Sentimiento (F)</li>
              <li>Juicio (J) vs. Percepción (P)</li>
            </ul>
            <p className="mb-4">
              Combinando estas preferencias, se obtienen 16 tipos de personalidad distintos.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">¿Por qué es importante conocer tu estilo?</h3>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex items-start">
            <Users className="mr-4 mt-1 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold mb-2">Mejora tus relaciones</h4>
              <p>Comprende mejor a los demás y mejora tu comunicación.</p>
            </div>
          </div>
          <div className="flex items-start">
            <BookOpen className="mr-4 mt-1 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold mb-2">Optimiza tu aprendizaje</h4>
              <p>Adapta tus métodos de estudio a tu estilo preferido.</p>
            </div>
          </div>
          <div className="flex items-start">
            <Brain className="mr-4 mt-1 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold mb-2">Desarrollo personal</h4>
              <p>Identifica tus fortalezas y áreas de mejora.</p>
            </div>
          </div>
          <div className="flex items-start">
            <FileText className="mr-4 mt-1 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold mb-2">Orientación profesional</h4>
              <p>Encuentra carreras que se adapten a tu personalidad.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center">
        <Link 
          className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 duration-300"
          to='/test' 
        >
          Realiza el test
          <ArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  )
}
