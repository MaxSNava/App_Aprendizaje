import { useState } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Users, BookOpen } from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export const AdminDashboardPage = () => {
  const [chartData, setChartData] = useState({
    barData: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [{
        label: 'Usuarios Registrados',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      }]
    },
    doughnutData: {
      labels: ['VARK', 'MBTI', 'Otros'],
      datasets: [{
        data: [300, 200, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }]
    }
  })

  console.log(setChartData);
  

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Usuarios Registrados por Mes',
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Distribución de Tests Realizados',
      },
    },
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
              <p className="text-3xl font-bold text-blue-600">1,234</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <BookOpen size={40} className="text-green-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Tests Realizados</h2>
              <p className="text-3xl font-bold text-green-600">5,678</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Bar data={chartData.barData} options={barOptions} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Doughnut data={chartData.doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  )
}