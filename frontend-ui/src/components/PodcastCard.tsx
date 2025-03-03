import React, { useState } from "react";
import { Podcast } from "../types/podcast";
import { Headphones, Star } from "lucide-react";
import ListenNowPopup from "./ListenNowPopup";

interface PodcastCardProps {
  podcast: Podcast;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Truncate description to a reasonable length
  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Handle image error by providing a fallback
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = `data:image/svg+xml,${encodeURIComponent(`
      <svg width="500" height="192" viewBox="0 0 500 192" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="192" fill="#F3F4F6"/>
        <circle cx="250" cy="76" r="40" fill="#9CA3AF"/>
        <rect x="220" y="126" width="60" height="30" rx="15" fill="#9CA3AF"/>
        <path d="M190 96c0 30 25 60 60 60s60-30 60-60" stroke="#9CA3AF" stroke-width="8"/>
      </svg>
    `)}`;
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all hover:shadow-lg transform hover:-translate-y-1 border-2 border-teal-50">
        <div className="relative">
          <img
            src={podcast.images.featured || podcast.images.default}
            alt={podcast.title}
            className="w-full h-48 object-cover"
            onError={handleImageError}
          />
          {podcast.isExclusive && (
            <div className="absolute top-3 right-3 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <Star className="h-3 w-3 mr-1" />
              Exclusive
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
              {podcast.title}
            </h3>
          </div>
          <p className="text-sm text-gray-500 mb-3">{podcast.publisherName}</p>

          <div className="mb-4">
            <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
              {podcast.categoryName || "General"}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {truncateDescription(podcast.description)}
          </p>

          <button
            onClick={() => setIsPopupOpen(true)}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-full transition-colors flex items-center justify-center"
          >
            <Headphones className="h-4 w-4 mr-2" />
            Listen Now
          </button>
        </div>
      </div>

      <ListenNowPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
};

export default PodcastCard;
