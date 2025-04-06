import { 
  Users, ShoppingBag, DollarSign, CreditCard,
  TrendingUp, TrendingDown, Clock, Zap 
} from 'lucide-react'
import DashboardCard from '../components/DashboardCard'
import LineChart from '../components/LineChart'
import BarChart from '../components/BarChart'

const Dashboard = () => {
  // Sample data for line chart
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales 2023',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Sales 2022',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgba(156, 163, 175, 0.5)',
        tension: 0.3,
      },
    ],
  }

  // Sample data for bar chart
  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Traffic',
        data: [1200, 1900, 3000, 5000, 2000, 3000, 4000],
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard 
          title="Total Customers"
          value="3,127"
          icon={<Users size={20} />}
          trend="up"
          trendValue="12% from last month"
          color="blue"
        />
        <DashboardCard 
          title="Total Orders"
          value="450"
          icon={<ShoppingBag size={20} />}
          trend="up"
          trendValue="8% from last month"
          color="green"
        />
        <DashboardCard 
          title="Total Revenue"
          value="$21,350"
          icon={<DollarSign size={20} />}
          trend="down"
          trendValue="3% from last month"
          color="red"
        />
        <DashboardCard 
          title="Avg. Order Value"
          value="$47.84"
          icon={<CreditCard size={20} />}
          trend="up"
          trendValue="2% from last month"
          color="purple"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="dashboard-card">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <LineChart 
            data={lineChartData.datasets}
            labels={lineChartData.labels}
          />
        </div>
        <div className="dashboard-card">
          <h2 className="text-lg font-semibold mb-4">Weekly Traffic</h2>
          <BarChart 
            data={barChartData.datasets}
            labels={barChartData.labels}
          />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="dashboard-card">
        <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
        <div className="space-y-4">
          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="p-2 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <TrendingUp size={16} />
              </div>
              <div className="h-full w-px bg-gray-200 dark:bg-gray-700 my-2"></div>
            </div>
            <div>
              <p className="text-sm font-medium">New order received</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Order #12345 from John Doe for $350</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center">
                <Clock size={12} className="mr-1" /> 2 hours ago
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <Users size={16} />
              </div>
              <div className="h-full w-px bg-gray-200 dark:bg-gray-700 my-2"></div>
            </div>
            <div>
              <p className="text-sm font-medium">New customer registered</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Jane Smith created an account</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center">
                <Clock size={12} className="mr-1" /> 5 hours ago
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="p-2 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                <TrendingDown size={16} />
              </div>
              <div className="h-full w-px bg-gray-200 dark:bg-gray-700 my-2"></div>
            </div>
            <div>
              <p className="text-sm font-medium">Order canceled</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Order #12342 was canceled by customer</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center">
                <Clock size={12} className="mr-1" /> 8 hours ago
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="p-2 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <Zap size={16} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">System update completed</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Version 2.4.0 successfully deployed</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center">
                <Clock size={12} className="mr-1" /> 1 day ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
