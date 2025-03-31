"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ImageUploader from "../components/ImageUploader"
import { FiActivity } from "react-icons/fi"
import { FaBrain } from "react-icons/fa";
function UploadPage({ setResults, setIsLoading, setActiveTab }) {
  const [selectedModel, setSelectedModel] = useState("lungs")

  const models = [
    {
      id: "lungs",
      name: "Lung Analysis",
      description: "Detect pneumonia, tuberculosis, and other lung conditions",
      icon: FiActivity,
      endpoint: "/predict",
    },
    {
      id: "brain",
      name: "Brain MRI Analysis",
      description: "Detect tumors, hemorrhages, and other brain abnormalities",
      icon: FaBrain,
      endpoint: "/predict",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-primary-600 mb-6 text-center">Upload Medical Images</h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Select Analysis Model</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {models.map((model) => {
              const Icon = model.icon
              return (
                <motion.div
                  key={model.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedModel(model.id)}
                  className={`cursor-pointer rounded-lg p-4 border-2 transition-all duration-300 ${
                    selectedModel === model.id
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-primary-300"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <div
                      className={`p-2 rounded-full ${selectedModel === model.id ? "bg-primary-100" : "bg-gray-100"}`}
                    >
                      <Icon
                        className={`w-5 h-5 ${selectedModel === model.id ? "text-primary-600" : "text-gray-600"}`}
                      />
                    </div>
                    <h4
                      className={`ml-2 font-medium ${
                        selectedModel === model.id ? "text-primary-600" : "text-gray-700"
                      }`}
                    >
                      {model.name}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600">{model.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Upload Images for {models.find((m) => m.id === selectedModel)?.name}
          </h3>

          <ImageUploader
            setResults={setResults}
            setIsLoading={setIsLoading}
            setActiveTab={setActiveTab}
            modelType={selectedModel}
          />

          <div className="mt-6 text-sm text-gray-500">
            <p>Supported file formats: PNG, JPG, JPEG, DICOM</p>
            <p>Maximum file size: 10MB per image</p>
            <p>For best results, ensure images are clear and properly oriented</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default UploadPage


