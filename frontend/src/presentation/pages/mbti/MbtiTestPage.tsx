import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getPreguntasMbti, sendAnswersMbti } from '../../../api';
import { PreguntaMbti, PruebaMbtiRes } from '../../../types';

export const MbtiTestPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const pruebaId = state?.pruebaId;

  const [respuestas, setRespuestas] = useState<{ [key: number]: number }>({});

  const { data: preguntas, isLoading, error } = useQuery({
    queryKey: ["preguntasMbti"],
    queryFn: getPreguntasMbti,
  });

  const mutation = useMutation({
    mutationFn: (respuestasArray: PruebaMbtiRes[]) =>
      sendAnswersMbti(pruebaId, respuestasArray),
    onSuccess: () => {
      toast.success("Respuestas enviadas con éxito");
      navigate("/mbti/res", { state: { pruebaId } });
    },
    onError: (error) => {
      toast.error(error.message || "Error al enviar las respuestas");
    },
  });

  const handleChange = (preguntaId: number, opcionId: number) => {
    setRespuestas((prev) => ({ ...prev, [preguntaId]: opcionId }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pruebaId) {
      toast.error(
        'ID de prueba no encontrado. Por favor, regrese a la página anterior.'
      );
      return;
    }
    const respuestasArray: PruebaMbtiRes[] = Object.entries(respuestas).map(
      ([preguntaId, opcionId]) => ({
        preguntaId: Number(preguntaId),
        opcionId: Number(opcionId),
      })
    );
    mutation.mutate(respuestasArray);
  };

  if (isLoading) return <div>Cargando preguntas...</div>;
  if (error) return <div>Error al cargar las preguntas</div>;


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Test MBTI</h1>
      <form className="space-y-8" onSubmit={handleSubmit}>
        {preguntas!.map((pregunta: PreguntaMbti, index: number) => (
          <div key={pregunta.id} className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              <span className="text-blue-500 mr-2">{index + 1}.</span>
              {pregunta.textoPregunta}
            </h2>
            <div className="space-y-3">
              {pregunta.opciones.map((opcion) => (
                <label
                  key={opcion.id}
                  className="flex items-center space-x-3 p-3 bg-white rounded-md shadow-sm hover:bg-blue-50 transition-colors"
                >
                  <input
                    type="radio"
                    name={`pregunta-${pregunta.id}`}
                    value={opcion.id}
                    onChange={() => handleChange(pregunta.id, opcion.id)}
                    className="form-radio text-blue-600 focus:ring-blue-500 h-5 w-5"
                  />
                  <span className="text-gray-700">{opcion.textoOpcion}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="submit"
          >
            Enviar respuestas
          </button>
        </div>
      </form>
    </div>
  )
}
