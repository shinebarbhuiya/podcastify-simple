import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasItems: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange, hasItems }) => {
  if (!hasItems) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-10 h-10 rounded-full ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
        }`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      {[...Array(3)].map((_, idx) => {
        const pageNumber = currentPage - 1 + idx;
        if (pageNumber < 1) return null;
        
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              pageNumber === currentPage
                ? 'bg-purple-500 text-white'
                : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
            }`}
          >
            {pageNumber}
          </button>
        );
      })}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;