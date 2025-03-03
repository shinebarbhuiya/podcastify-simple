import React from "react";
import { Headphones } from "lucide-react";
import { Link } from "react-router";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-8 px-4 rounded-b-3xl shadow-lg">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex items-center mb-4">
          <div className="bg-white p-3 rounded-full mr-3">
            <Headphones className="h-8 w-8 text-purple-500" />
          </div>
          <Link to="/" className="hover:text-purple-200 transition-colors">
            <h1 className="text-3xl font-bold">Podcastify</h1>
          </Link>
        </div>
        <p className="text-center text-purple-100 max-w-md font-light">
          Discover and enjoy your favorite podcasts in one place. Explore new
          voices and stories that inspire, entertain, and inform.
        </p>
      </div>
    </header>
  );
};

export default Header;
