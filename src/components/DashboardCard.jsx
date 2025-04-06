const DashboardCard = ({ title, value, icon, trend, trendValue, color = 'blue' }) => {
  const colorClasses = {
    blue: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300',
    green: 'text-green-500 bg-green-100 dark:bg-green-900/30 dark:text-green-300',
    red: 'text-red-500 bg-red-100 dark:bg-red-900/30 dark:text-red-300',
    purple: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300'
  }

  const trendClasses = 
    trend === 'up' 
      ? 'text-green-600 dark:text-green-400' 
      : 'text-red-600 dark:text-red-400';

  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          {trend && (
            <p className={`text-xs mt-1 ${trendClasses}`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default DashboardCard
