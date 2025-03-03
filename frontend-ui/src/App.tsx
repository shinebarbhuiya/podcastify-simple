import React from "react";
import { usePodcasts } from "./hooks/usePodcasts";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import PodcastList from "./components/PodcastList";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import { WavyBackground, FloatingCircles } from "./components/Illustrations";

function App() {
  const {
    podcasts,
    isLoading,
    isError,
    error,
    searchTerm,
    updateSearchTerm,
    updateCategory,
    updatePage,
    currentPage,
  } = usePodcasts();

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <WavyBackground />
      <FloatingCircles />

      <Header />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Find Your Next Favorite Podcast
            </h2>
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={updateSearchTerm}
            />
          </div>

          <CategoryFilter
            selectedCategory={""}
            onCategoryChange={updateCategory}
          />

          <PodcastList
            podcasts={podcasts}
            isLoading={isLoading}
            isError={isError}
            error={error}
          />

          <Pagination
            currentPage={currentPage}
            onPageChange={updatePage}
            hasItems={podcasts.length > 0}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
