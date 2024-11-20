import React, { useState } from 'react'
import { Send, Mail, User, MessageSquare } from 'lucide-react'

export const FooterContact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Aquí normalmente enviarías los datos del formulario a tu backend
    // Por ahora, solo simularemos un retraso y mostraremos los datos en la consola
    console.log({ name, email, message })
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Reiniciar el formulario
    setName('')
    setEmail('')
    setMessage('')
    setIsSubmitting(false)
    alert('¡Mensaje enviado con éxito!')
  }

  return (
    <footer className="bg-gradient-to-b from-gray-100 to-gray-200 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">Contáctanos</h2>
        <form onSubmit={handleSubmit} className="space-y-6 mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tu nombre"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="tu@email.com"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje
            </label>
            <div className="relative">
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tu mensaje aquí..."
              />
              <MessageSquare className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            <Send className="ml-2 h-5 w-5" />
          </button>
        </form>
        <div className="text-center text-gray-600">
          <p>
            Todos los derechos reservados &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}