import { useState } from "react"

export const RegistrationForm = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registrando usuario:", { name, email });
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
    <h2 className="text-2xl font-semibold mb-4">Regístrate</h2>
    <input
      type="text"
      placeholder="Nombre"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      required
    />
    <input
      type="email"
      placeholder="Correo electrónico"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      required
    />
    <button
      type="submit"
      className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      Registrarse
    </button>
  </form>
  )
}
