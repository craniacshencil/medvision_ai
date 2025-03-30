import { motion } from 'framer-motion';

function Footer() {
  return (
    <footer className="bg-white shadow-md mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-primary-600 mb-4">
              About MedVision AI
            </h3>
            <p className="text-gray-600">
              Advanced medical image analysis platform powered by deep learning,
              helping healthcare professionals make more accurate diagnoses.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary-600 mb-4">
              Important Notice
            </h3>
            <p className="text-gray-600">
              This tool is designed to assist medical professionals and should not
              be used as the sole basis for diagnosis. Always consult with qualified
              healthcare providers for medical decisions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary-600 mb-4">
              Contact
            </h3>
            <p className="text-gray-600">
              For support or inquiries:<br />
              Email: support@medvision.ai<br />
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>© 2024 MedVision AI. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Version 1.0.0 | Terms of Service | Privacy Policy
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;