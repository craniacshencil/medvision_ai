"use client"

import { motion } from "framer-motion"
import { FiShield, FiCpu, FiClock, FiUpload } from "react-icons/fi"
import { useInView } from "react-intersection-observer"

function Hero({ setActiveTab, isAuthenticated }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  const handleUploadClick = () => {
    setActiveTab("upload")
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="text-center mb-12"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-5xl font-bold text-primary-600 mb-4">Welcome to MedVision AI</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Advanced medical image analysis powered by artificial intelligence. Upload your medical images for instant
          disease classification with detailed visual explanations.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUploadClick}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg shadow-md hover:bg-primary-700 transition-colors duration-300 flex items-center space-x-2 mx-auto"
        >
          <FiUpload className="w-5 h-5" />
          <span>Start Analyzing Images</span>
        </motion.button>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
        <motion.div whileHover={{ scale: 1.05 }} className="card bg-white hover:shadow-xl transition-all duration-300">
          <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiShield className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-primary-600 mb-2">Accurate Analysis</h3>
          <p className="text-gray-600">State-of-the-art CNN models trained on extensive medical datasets</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="card bg-white hover:shadow-xl transition-all duration-300">
          <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCpu className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-primary-600 mb-2">Visual Explanations</h3>
          <p className="text-gray-600">Grad-CAM heatmaps highlight important regions in the image</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="card bg-white hover:shadow-xl transition-all duration-300">
          <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiClock className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-primary-600 mb-2">Instant Results</h3>
          <p className="text-gray-600">Get classification results and visualizations in seconds</p>
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-8 text-white max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4">Why Choose MedVision AI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">For Healthcare Professionals</h3>
            <ul className="list-disc list-inside text-left space-y-2">
              <li>Quick and accurate disease detection</li>
              <li>Detailed analysis with visual explanations</li>
              <li>Secure patient data management</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">For Medical Institutions</h3>
            <ul className="list-disc list-inside text-left space-y-2">
              <li>Streamlined workflow integration</li>
              <li>Comprehensive reporting system</li>
              <li>Advanced analytics dashboard</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Hero
