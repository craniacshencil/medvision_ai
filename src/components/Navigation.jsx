import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiList, FiClock, FiUser } from 'react-icons/fi';
import AuthModal from './AuthModal';

function Navigation({ activeTab, setActiveTab }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  const tabs = [
    { id: 'upload', label: 'Upload Images', icon: FiUpload },
    { id: 'results', label: 'Results', icon: FiList },
    { id: 'history', label: 'Patient History', icon: FiClock },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <h1 className="text-2xl font-bold text-primary-600">
              MedVision AI
            </h1>
          </motion.div>
          
          <div className="flex space-x-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-500 hover:bg-primary-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAuthOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors duration-300 flex items-center space-x-2"
            >
              <FiUser className="w-4 h-4" />
              <span>Sign In</span>
            </motion.button>
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthOpen} setIsOpen={setIsAuthOpen} />
    </nav>
  );
}

export default Navigation;