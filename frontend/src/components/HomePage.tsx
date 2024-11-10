import { RegistrationForm } from "./RegistrationForm"

export const HomePage = () => {

  const handleVarkTest = () => {
    // Redirige al test VARK
    console.log("Ir al test VARK");
  };

  const handlePersonalityTest = () => {
    // Redirige al test de personalidad
    console.log("Ir al test de personalidad");
  };

  return (
    <div className="text-center p-6">
      <header className="bg-gray-200 p-4 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold">Bienvenido a Pruebas.com</h1>
        <p className="text-lg text-gray-600">Descubre tu estilo de aprendizaje y tu tipo de personalidad</p>
      </header>
      <section className="flex flex-col items-center">
        <RegistrationForm />
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleVarkTest}
            className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
          >
            Realizar Test VARK
          </button>
          <button
            onClick={handlePersonalityTest}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Realizar Test de Personalidad
          </button>
        </div>
      </section>
    </div>
  )
}
