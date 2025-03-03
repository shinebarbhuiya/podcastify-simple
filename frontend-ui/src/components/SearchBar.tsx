import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search podcasts..."
          className="w-full pl-12 pr-4 py-3 rounded-full bg-white border-2 border-purple-200 focus:border-purple-400 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm transition-all"
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-purple-400" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;