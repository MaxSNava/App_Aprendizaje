import { useState } from 'react';
import { getResultadosVark, getResultadosMbti } from '../../../api';
import { ResultadoItem } from '../../../types';

export const SearchResults = () => {
  const [categoria, setCategoria] = useState<'individual' | 'grupal' | 'total'>('total');
  const [id, setId] = useState('');
  const [tipoPrueba, setTipoPrueba] = useState<'vark' | 'mbti'>('vark');
  const [resultados, setResultados] = useState<ResultadoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detalleResultado, setDetalleResultado] = useState<ResultadoItem | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      let data: ResultadoItem[];
      if (tipoPrueba === 'vark') {
        data = await getResultadosVark(categoria, id);
      } else {
        data = await getResultadosMbti(categoria, id);
      }
      setResultados(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocurrió un error inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerDetalles = (resultado: ResultadoItem) => {
    setDetalleResultado(resultado);
  };

  const handleCerrarDetalles = () => {
    setDetalleResultado(null);
  };

  const formatFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Buscar Resultados</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block mb-2">Tipo de Prueba:</label>
        <select
          value={tipoPrueba}
          onChange={(e) => setTipoPrueba(e.target.value as 'vark' | 'mbti')}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="vark">VARK</option>
          <option value="mbti">MBTI</option>
        </select>
      </div>
      <div>
        <label className="block mb-2">Categoría:</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value as 'individual' | 'grupal' | 'total')}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="total">Total</option>
          <option value="grupal">Grupal</option>
          <option value="individual">Individual</option>
        </select>
      </div>
    </div>
    {(categoria === 'individual' || categoria === 'grupal') && (
      <div className="mb-4">
        <label className="block mb-2">ID:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          placeholder={`Ingrese el ID del ${categoria === 'individual' ? 'usuario' : 'grupo'}`}
        />
      </div>
    )}
    <button
      onClick={handleSearch}
      className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
    >
      Buscar
    </button>

    {loading && <p className="mt-4">Cargando resultados...</p>}
    {error && <p className="mt-4 text-red-600">{error}</p>}

    {resultados.length > 0 && (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Resultados:</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Usuario</th>
                <th className="py-2 px-4 border-b">Fecha</th>
                <th className="py-2 px-4 border-b">Tipo</th>
                <th className="py-2 px-4 border-b">Resultado</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((resultado) => (
                <tr key={resultado.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{resultado.usuarioNombre}</td>
                  <td className="py-2 px-4 border-b">
                    {formatFecha(resultado.fechaRealizacion)}
                  </td>
                  <td className="py-2 px-4 border-b uppercase">{resultado.tipoPrueba}</td>
                  <td className="py-2 px-4 border-b">
                    {tipoPrueba === 'vark'
                      ? resultado.resultadoVark?.tipoResultado || 'N/A'
                      : resultado.resultadoMbti?.tipoPersonalidad || 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleVerDetalles(resultado)}
                      className="text-blue-500 hover:underline"
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}

    {/* Modal de Detalles */}
    {detalleResultado && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Detalles del Resultado</h3>
          <p>
            <strong>Usuario:</strong> {detalleResultado.usuarioNombre}
          </p>
          <p>
            <strong>Fecha:</strong> {formatFecha(detalleResultado.fechaRealizacion)}
          </p>
          <p>
            <strong>Tipo de Prueba:</strong> {detalleResultado.tipoPrueba.toUpperCase()}
          </p>
          {detalleResultado.tipoPrueba === 'vark' && detalleResultado.resultadoVark && (
            <div className="mt-4 space-y-2">
              <p>
                <strong>Visual:</strong> {detalleResultado.resultadoVark.visual}
              </p>
              <p>
                <strong>Auditivo:</strong> {detalleResultado.resultadoVark.auditivo}
              </p>
              <p>
                <strong>Lectura/Escritura:</strong> {detalleResultado.resultadoVark.lecturaEscritura}
              </p>
              <p>
                <strong>Kinestésico:</strong> {detalleResultado.resultadoVark.kinestesico}
              </p>
              <p>
                <strong>Estilo Dominante:</strong> {detalleResultado.resultadoVark.tipoResultado}
              </p>
            </div>
          )}
          {detalleResultado.tipoPrueba === 'mbti' && detalleResultado.resultadoMbti && (
            <div className="mt-4 space-y-2">
              <p>
                <strong>Extrovertido:</strong> {detalleResultado.resultadoMbti.extrovertido}
              </p>
              <p>
                <strong>Introvertido:</strong> {detalleResultado.resultadoMbti.introvertido}
              </p>
              <p>
                <strong>Sensorial:</strong> {detalleResultado.resultadoMbti.sensorial}
              </p>
              <p>
                <strong>Intuitivo:</strong> {detalleResultado.resultadoMbti.intuitivo}
              </p>
              <p>
                <strong>Racional:</strong> {detalleResultado.resultadoMbti.racional}
              </p>
              <p>
                <strong>Emocional:</strong> {detalleResultado.resultadoMbti.emocional}
              </p>
              <p>
                <strong>Calificador:</strong> {detalleResultado.resultadoMbti.calificador}
              </p>
              <p>
                <strong>Perceptivo:</strong> {detalleResultado.resultadoMbti.perceptivo}
              </p>
              <p>
                <strong>Tipo de Personalidad:</strong> {detalleResultado.resultadoMbti.tipoPersonalidad}
              </p>
            </div>
          )}
          <button
            onClick={handleCerrarDetalles}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Cerrar
          </button>
        </div>
      </div>
    )}
  </div>
  );
};