import { useState } from 'react';
import { motion } from 'framer-motion';

function PatientHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dummy data for demonstration
  const histories = [
    {
      id: 1,
      patientId: 'P001',
      name: 'John Doe',
      date: '2024-02-15',
      diagnosis: 'Pneumonia',
      confidence: 0.92,
      status: 'Confirmed',
    },
    // Add more dummy data as needed
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card mb-6"
      >
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button className="btn-primary">
            Search
          </button>
        </div>
      </motion.div>

      <div className="space-y-4">
        {histories.map((history) => (
          <motion.div
            key={history.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{history.name}</h3>
                <p className="text-gray-600">Patient ID: {history.patientId}</p>
                <p className="text-gray-600">Date: {history.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-primary-600">
                  {history.diagnosis}
                </p>
                <p className="text-sm text-gray-500">
                  Confidence: {(history.confidence * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500">
                  Status: {history.status}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default PatientHistory;