import { motion, AnimatePresence } from 'framer-motion';
import { FiLoader, FiAlertCircle, FiCheckCircle, FiBarChart2, FiCalendar, FiClock } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ResultsDisplay({ results, isLoading }) {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center py-12"
      >
        <FiLoader className="w-8 h-8 text-primary-500 animate-spin" />
        <span className="ml-3 text-gray-600">Processing images...</span>
      </motion.div>
    );
  }

  if (!results.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-gray-600 py-12"
      >
        <FiAlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg">No results to display.</p>
        <p className="text-sm">Upload some images to get started.</p>
      </motion.div>
    );
  }

  const chartData = {
    labels: results.map((_, index) => `Analysis ${index + 1}`),
    datasets: [
      {
        label: 'Confidence Score',
        data: results.map(result => parseFloat(result.confidence)),
        fill: false,
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.4,
      }
    ]
  };

  return (
    <AnimatePresence>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-primary-600 mb-4">Analysis Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <FiCheckCircle className="w-6 h-6 text-primary-500" />
                <div>
                  <p className="text-sm text-gray-600">Total Analyses</p>
                  <p className="text-2xl font-bold text-primary-600">{results.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-primary-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <FiBarChart2 className="w-6 h-6 text-primary-500" />
                <div>
                  <p className="text-sm text-gray-600">Average Confidence</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {(results.reduce((acc, curr) => acc + parseFloat(curr.confidence), 0) / results.length * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-primary-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <FiClock className="w-6 h-6 text-primary-500" />
                <div>
                  <p className="text-sm text-gray-600">Latest Analysis</p>
                  <p className="text-lg font-bold text-primary-600">
                    {format(new Date(results[results.length - 1].timestamp), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Confidence Trend</h3>
            <div className="h-64">
              <Line data={chartData} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 1,
                  }
                }
              }} />
            </div>
          </div>
        </motion.div>

        {results.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="font-semibold text-lg">{result.filename}</h3>
                  <span className="text-sm text-gray-500 flex items-center">
                    <FiCalendar className="w-4 h-4 mr-1" />
                    {format(new Date(result.timestamp), 'MMM d, yyyy HH:mm')}
                  </span>
                </div>
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  src={result.imageUrl}
                  alt="Uploaded medical image"
                  className="w-full rounded-lg shadow-md transition-transform duration-300"
                />
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-4">Analysis Results</h4>
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600 mb-2">Prediction:</p>
                    <p className={`text-2xl font-bold ${
                      result.prediction === 'Normal' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {result.prediction}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600 mb-2">Confidence Score:</p>
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-3 mb-4 text-xs flex rounded bg-primary-100">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                        />
                      </div>
                      <p className="text-2xl font-bold text-primary-600">
                        {(result.confidence * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-600 mb-2">Region Analysis (Grad-CAM):</p>
                    <motion.img
                      whileHover={{ scale: 1.02 }}
                      src={result.heatmapUrl}
                      alt="Grad-CAM heatmap"
                      className="w-full rounded-lg shadow-md transition-transform duration-300"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Highlighted regions indicate areas of interest for the prediction
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}

export default ResultsDisplay;