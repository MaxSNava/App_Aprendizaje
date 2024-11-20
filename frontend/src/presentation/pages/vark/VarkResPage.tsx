import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getVarkResults } from "../../../api";
// import { ResultadoVark } from "../../../types";

export const VarkResPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const pruebaId = state?.pruebaId;

  const { data: resultados, isLoading, error } = useQuery({
    queryKey: ["varkResults", pruebaId],
    queryFn: () => getVarkResults(pruebaId),
    enabled: !!pruebaId, // Solo ejecutar si pruebaId está disponible
  });

  if (isLoading) return <div>Cargando resultados...</div>;
  if (error) return <div>Error al cargar los resultados</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Resultados del Test VARK
      </h1>

      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4 text-blue-500">
          Estilo de Aprendizaje Predominante
        </h2>
        <p className="text-xl text-gray-700 mb-6">
          {resultados?.tipoResultado}
        </p>

        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Desglose de Puntajes
        </h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Visual: {resultados?.visual}</li>
          <li>Auditivo: {resultados?.auditivo}</li>
          <li>Lectura/Escritura: {resultados?.lecturaEscritura}</li>
          <li>Kinestésico: {resultados?.kinestesico}</li>
        </ul>
      </div>

      <div className="flex justify-center mt-8">
        <button
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => navigate("/")}
        >
          Volver a Inicio
        </button>
      </div>
    </div>
  );
};
