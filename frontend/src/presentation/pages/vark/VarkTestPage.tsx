import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../../lib/axios';

export const VarkTestPage = () => {
  const { state } = useLocation(); // Aquí recibimos el UUID de la prueba
  const pruebaId = state?.pruebaId; // Verificamos si el UUID está presente
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState<{ [key: number]: number }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const { data } = await api.get('/pruebas/vark');
        setPreguntas(data);
      } catch (err) {
        setError('Error al cargar las preguntas');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreguntas();
  }, []);

  const handleChange = (preguntaId: number, opcionId: number) => {
    setRespuestas((prev) => ({ ...prev, [preguntaId]: opcionId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pruebaId) {
      alert('ID de prueba no encontrado. Por favor, regrese a la página anterior.');
      return;
    }

    // Formatear las respuestas en el formato correcto
    const respuestasArray = Object.entries(respuestas).map(([preguntaId, opcionId]) => ({
      preguntaId: Number(preguntaId),
      opcionId: opcionId,
    }));

    try {
      await api.post(`/pruebas/${pruebaId}/vark`, respuestasArray);
      alert('Respuestas enviadas con éxito');
      
    } catch (err) {
      console.log(err);
      alert('Error al enviar las respuestas');
    }
  };

  if (isLoading) return <div>Cargando preguntas...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test VARK</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {preguntas.map((pregunta: any) => (
          <div key={pregunta.id} className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">{pregunta.textoPregunta}</h2>
            <div className="space-y-2">
              {pregunta.opciones.map((opcion: any) => (
                <label key={opcion.id} className="block">
                  <input
                    type="radio"
                    name={`pregunta-${pregunta.id}`}
                    value={opcion.id}
                    onChange={() => handleChange(pregunta.id, opcion.id)}
                    className="mr-2"
                  />
                  {opcion.textoOpcion}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enviar respuestas
        </button>
      </form>
    </div>
  );
};
