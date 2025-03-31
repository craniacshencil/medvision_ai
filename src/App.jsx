"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ResultsDisplay from "./components/ResultsDisplay"
import PatientHistory from "./components/PatientHistory"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import UploadPage from "./pages/UploadPage"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const [activeTab, setActiveTab] = useState("home")
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is authenticated (this would normally use a token from localStorage)
  useEffect(() => {
    // For demo purposes, we'll just check if there's a user in localStorage
    const user = localStorage.getItem("user")
    if (user) {
      setIsAuthenticated(true)
    }
  }, [])

  // Function to handle login
  const handleLogin = (userData) => {
    // In a real app, you would validate credentials with a backend
    localStorage.setItem("user", JSON.stringify(userData))
    setIsAuthenticated(true)
  }

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("user")
    setIsAuthenticated(false)
    // Redirect to home if on a protected page
    if (activeTab === "upload") {
      setActiveTab("home")
    }
  }

  return (
    <div className="min-h-screen bg-primary-50 flex flex-col">
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onLogin={handleLogin}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        {activeTab === "home" && <Hero setActiveTab={setActiveTab} isAuthenticated={isAuthenticated} />}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {activeTab === "upload" && isAuthenticated && (
            <UploadPage setResults={setResults} setIsLoading={setIsLoading} setActiveTab={setActiveTab} />
          )}

          {activeTab === "results" && <ResultsDisplay results={results} isLoading={isLoading} />}

          {activeTab === "history" && <PatientHistory />}
        </motion.div>
      </main>

      <Footer />

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App


