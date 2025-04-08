import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import LineChart from '../components/LineChart'
import BarChart from '../components/BarChart'
import { Download, HelpCircle } from 'lucide-react'

const Charts = () => {
  // Sample data for line chart
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Dataset 2',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.5)',
        tension: 0.3,
      },
    ],
  }

  // Sample data for bar chart
  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Revenue',
        data: [12, 19, 3, 5, 2, 3, 9],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
      {
        label: 'Expenses',
        data: [8, 12, 6, 4, 7, 5, 4],
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
      },
    ],
  }

  // Sample data for doughnut chart
  const areaChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        fill: true,
        label: 'Weekly Activity',
        data: [18, 25, 32, 27, 40, 35, 30],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.3)',
        tension: 0.4,
      }
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Charts</h1>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            <HelpCircle size={16} className="mr-2" />
            Help
          </button>
          <button className="flex items-center px-4 py-2 bg-primary-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-primary-700">
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="dashboard-card">
          <h2 className="text-lg font-semibold mb-4">Line Chart</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Line charts are commonly used to visualize trends in data over time.
          </p>
          <LineChart 
            data={lineChartData.datasets}
            labels={lineChartData.labels}
          />
        </div>
        
        <div className="dashboard-card">
          <h2 className="text-lg font-semibold mb-4">Bar Chart</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Bar charts are useful for comparing quantities across different categories.
          </p>
          <BarChart 
            data={barChartData.datasets}
            labels={barChartData.labels}
          />
        </div>
      </div>

      <div className="dashboard-card">
        <h2 className="text-lg font-semibold mb-4">Area Chart</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Area charts emphasize the magnitude of change over time and can show the relationship of parts to a whole.
        </p>
        <div className="w-full h-96">
          <LineChart 
            data={areaChartData.datasets}
            labels={areaChartData.labels}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="dashboard-card">
          <h2 className="text-lg font-semibold mb-4">Chart Types</h2>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-primary-600 mr-2"></div>
              Line Charts - Show trends over time
            </li>
            <li className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
              Bar Charts - Compare categories
            </li>
            <li className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-600 mr-2"></div>
              Pie Charts - Show proportions
            </li>
            <li className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              Area Charts - Emphasize magnitude
            </li>
            <li className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              Scatter Plots - Show relationships
            </li>
          </ul>
        </div>
        
        <div className="dashboard-card col-span-2">
          <h2 className="text-lg font-semibold mb-4">Visualization Tips</h2>
          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <p>• Choose the right chart type for your data</p>
            <p>• Use appropriate scales to avoid misleading visualizations</p>
            <p>• Label your axes and include a legend when necessary</p>
            <p>• Use color effectively to highlight important data points</p>
            <p>• Keep it simple and avoid excessive decorations</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Charts
