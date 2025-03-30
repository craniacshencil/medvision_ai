import { useState } from 'react';
import { motion } from 'framer-motion';
import ImageUploader from './components/ImageUploader';
import ResultsDisplay from './components/ResultsDisplay';
import PatientHistory from './components/PatientHistory';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Hero from './components/Hero';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [activeTab, setActiveTab] = useState('upload');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-primary-50 flex flex-col">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {activeTab === 'upload' && <Hero />}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'upload' && (
            <ImageUploader 
              setResults={setResults} 
              setIsLoading={setIsLoading}
              setActiveTab={setActiveTab}
            />
          )}
          
          {activeTab === 'results' && (
            <ResultsDisplay 
              results={results} 
              isLoading={isLoading}
            />
          )}
          
          {activeTab === 'history' && (
            <PatientHistory />
          )}
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
  );
}

export default App;