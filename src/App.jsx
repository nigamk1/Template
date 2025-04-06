import { useEffect, useState } from 'react'
import AppRoutes from './routes/AppRoutes'

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="App">
      <AppRoutes theme={theme} toggleTheme={toggleTheme} />
    </div>
  )
}

export default App
