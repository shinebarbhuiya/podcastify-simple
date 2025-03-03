import React from "react";
import { X, Info } from "lucide-react";

interface ListenNowPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ListenNowPopup: React.FC<ListenNowPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center mb-4">
          <div className="bg-purple-100 p-2 rounded-full mr-3">
            <Info className="h-6 w-6 text-purple-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Demo Feature</h3>
        </div>

        <p className="text-gray-600 mb-6">
          This is a demonstration feature. In a production environment, this
          button would launch the podcast player or redirect to the listening
          platform.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-full transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default ListenNowPopup;
