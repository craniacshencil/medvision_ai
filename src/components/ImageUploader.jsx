import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiUploadCloud } from 'react-icons/fi';

function ImageUploader({ setResults, setIsLoading, setActiveTab }) {
  const onDrop = useCallback((acceptedFiles) => {
    setIsLoading(true);
    toast.info('Processing images...', { autoClose: 2000 });
    
    // Simulate processing with dummy data
    setTimeout(() => {
      const processedResults = acceptedFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        filename: file.name,
        prediction: Math.random() > 0.5 ? 'Pneumonia' : 'Normal',
        confidence: (Math.random() * (0.99 - 0.70) + 0.70).toFixed(2),
        timestamp: new Date().toISOString(),
        imageUrl: URL.createObjectURL(file),
        heatmapUrl: 'https://via.placeholder.com/400x400', // Replace with actual heatmap
      }));
      
      setResults(processedResults);
      setIsLoading(false);
      setActiveTab('results');
      toast.success('Images processed successfully!');
    }, 2000);
  }, [setResults, setIsLoading, setActiveTab]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.dicom']
    },
    multiple: true
  });

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-300 ${
            isDragActive
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-primary-400'
          }`}
        >
          <input {...getInputProps()} />
          <FiUploadCloud className="w-12 h-12 mx-auto mb-4 text-primary-500" />
          <p className="text-lg text-gray-600 mb-2">
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag & drop medical images here'}
          </p>
          <p className="text-sm text-gray-500">
            or click to select files
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Supported formats: PNG, JPG, JPEG, DICOM
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default ImageUploader;