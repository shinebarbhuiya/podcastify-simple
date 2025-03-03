import React from "react";
import { Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-8 mt-12 border-t border-gray-200">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <p className="text-gray-600 flex items-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for
            podcast lovers
          </p>
        </div>
        <p className="text-gray-400 text-xs font-medium bg-yellow-100 inline-block px-2 py-1 rounded">
          Assignment Project For Paul Xue
        </p>
      </div>
    </footer>
  );
};

export default Footer;
