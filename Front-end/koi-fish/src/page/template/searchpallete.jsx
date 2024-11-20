import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";

const SearchPalette = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: "",
    category: "",
    author: "",
    publicationType: "",
    relevance: "",
    source: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const dummySuggestions = [
    "Academic Databases",
    "Scientific Journals",
    "Data Repositories",
    "Research Methodologies",
    "Peer-Reviewed Articles",
  ];

  const dummyResults = [
    {
      id: 1,
      title: "Advanced Machine Learning Techniques",
      description: "A comprehensive study on the latest machine learning algorithms and their applications in various fields.",
      url: "https://example.com/advanced-ml",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      author: "Dr. Jane Smith",
      publicationType: "Journal Article",
      category: "Computer Science",
      date: "2023-05-15",
      source: "ACM Digital Library",
    },
    {
      id: 2,
      title: "Climate Change Impact on Biodiversity",
      description: "An in-depth analysis of how global warming affects various ecosystems and species diversity.",
      url: "https://example.com/climate-change-biodiversity",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      author: "Prof. John Doe",
      publicationType: "Research Paper",
      category: "Environmental Science",
      date: "2023-04-22",
      source: "Nature Journal",
    },
    {
      id: 3,
      title: "Advancements in Quantum Computing",
      description: "Exploring recent breakthroughs in quantum computing and their potential applications in cryptography and optimization problems.",
      url: "https://example.com/quantum-computing-advancements",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      author: "Dr. Emily Chen",
      publicationType: "Conference Paper",
      category: "Physics",
      date: "2023-06-01",
      source: "arXiv",
    },
  ];

  useEffect(() => {
    const filteredSuggestions = dummySuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setSearchResults(dummyResults);
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    console.log("Filters:", filters);
  };

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const clearFilters = () => {
    setFilters({
      dateRange: "",
      category: "",
      author: "",
      publicationType: "",
      relevance: "",
      source: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-black">
      <h1 className="text-3xl font-bold mb-8 text-center">Research Search Palette</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search databases, journals, and repositories..."
            className="w-full p-4 pr-12 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Search input"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-black hover:text-red-500"
            aria-label="Search button"
          >
            <FaSearch />
          </button>
        </div>
        {suggestions.length > 0 && (
          <ul className="mt-2 bg-white border border-black rounded-lg shadow-lg">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => setSearchTerm(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </form>

      <div className="mb-8">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-black text-white rounded-lg hover:bg-red-500 transition-colors duration-300"
          aria-expanded={showFilters}
          aria-controls="filters"
        >
          <FaFilter className="mr-2" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        {showFilters && (
          <div id="filters" className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="dateRange" className="block mb-1 font-medium">
                Date Range
              </label>
              <input
                type="date"
                id="dateRange"
                name="dateRange"
                value={filters.dateRange}
                onChange={handleFilterChange}
                className="w-full p-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label htmlFor="category" className="block mb-1 font-medium">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full p-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label htmlFor="author" className="block mb-1 font-medium">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={filters.author}
                onChange={handleFilterChange}
                className="w-full p-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label htmlFor="publicationType" className="block mb-1 font-medium">
                Publication Type
              </label>
              <input
                type="text"
                id="publicationType"
                name="publicationType"
                value={filters.publicationType}
                onChange={handleFilterChange}
                className="w-full p-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label htmlFor="relevance" className="block mb-1 font-medium">
                Relevance
              </label>
              <select
                id="relevance"
                name="relevance"
                value={filters.relevance}
                onChange={handleFilterChange}
                className="w-full p-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All</option>
                <option value="mostRelevant">Most Relevant</option>
                <option value="leastRelevant">Least Relevant</option>
              </select>
            </div>
            <div>
              <label htmlFor="source" className="block mb-1 font-medium">
                Source
              </label>
              <input
                type="text"
                id="source"
                name="source"
                value={filters.source}
                onChange={handleFilterChange}
                className="w-full p-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        )}
        {showFilters && (
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-300"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {searchResults.map((result) => (
          <div
            key={result.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 border border-black"
          >
            <img
              src={result.image}
              alt={result.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{result.title}</h2>
              <p className="text-gray-600 mb-4">{result.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-100 text-black rounded-full text-sm border border-black">
                  {result.category}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-black rounded-full text-sm border border-black">
                  {result.publicationType}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-2">Author: {result.author}</p>
              <p className="text-sm text-gray-500 mb-2">Date: {result.date}</p>
              <p className="text-sm text-gray-500 mb-4">Source: {result.source}</p>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-black text-white rounded-lg hover:bg-red-500 transition-colors duration-300"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>

      {searchResults.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-red-500 transition-colors duration-300 flex items-center justify-center mx-auto"
          >
            Load More <MdExpandMore className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPalette;
