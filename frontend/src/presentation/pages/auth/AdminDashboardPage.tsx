import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartData,
} from "chart.js";
import { Users, BookOpen } from "lucide-react";
import { useDashboardData } from "../../../hooks/useDashboardData"; 
import { SearchResults } from "../../components"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

type ChartDataState = {
  barData: ChartData<'bar'>;
  doughnutData: ChartData<'doughnut'>;
};

export const AdminDashboardPage = () => {
  const { totalUsuarios, totalTests, loading, error } = useDashboardData();

  const [chartData, setChartData] = useState<ChartDataState>({
    barData: {
      labels: [] as string[],
      datasets: [
        {
          label: "Usuarios Registrados",
          data: [] as number[],
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ],
    },
    doughnutData: {
      labels: ["VARK", "MBTI"],
      datasets: [
        {
          data: [] as number[],
          backgroundColor: ["#FF6384", "#36A2EB"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    },
  });

  useEffect(() => {
    if (totalTests) {
      setChartData({
        barData: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
          datasets: [
            {
              label: "Usuarios Registrados",
              data: [200, 300, 150, 400, 100, totalUsuarios || 0],
              backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
          ],
        },
        doughnutData: {
          labels: ["VARK", "MBTI"],
          datasets: [
            {
              data: [totalTests.vark, totalTests.mbti],
              backgroundColor: ["#FF6384", "#36A2EB"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB"],
            },
          ],
        },
      });
    }
  }, [totalUsuarios, totalTests]);

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Distribución de Tests Realizados",
      },
    },
  };

  if (loading) {
    return <p>Cargando datos del dashboard...</p>;
  }

  if (error) {
    return <p className="text-red-600">Ocurrió un error: {error.message}</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <Users size={40} className="text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Total Usuarios</h2>
              <p className="text-3xl font-bold text-blue-600">{totalUsuarios}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <BookOpen size={40} className="text-green-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Tests Realizados</h2>
              <p className="text-3xl font-bold text-green-600">
                {totalTests!.vark + totalTests!.mbti}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <SearchResults />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Doughnut data={chartData.doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
};
