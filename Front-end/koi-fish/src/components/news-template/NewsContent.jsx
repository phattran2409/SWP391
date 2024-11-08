import { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import api from "../../config/axios.js";
export default function NewsPage() {
    const [newsArticles, setNewsArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const limit = 6;

    const fetchNews = async (page) => {
        try {
            setLoading(true);
            const response = await api.get(`v1/post/getPost/1?page=${page}&limit=${limit}`);
            const newArticles = response.data.data;

            if (newArticles.length < limit) {
                setHasMore(false);
            }

            setNewsArticles(prevArticles => [...prevArticles, ...newArticles]);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    const handleLoadMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <main className="container bg-white bg-opacity-95 mx-auto mt-6 px-4 md:px-8 py-10 md:rounded-t-[30px] z-10">
                {Array.isArray(newsArticles) && newsArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {newsArticles.map((article, index) => (
                            <ArticleCard
                                key={index}
                                article={{ ...article, index }}
                                formatDate={formatDate}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500">No articles to display!</div>
                )}

                {loading && (
                    <div className="flex justify-center items-center h-40">
                        <div className="border-t-transparent animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
                        <span className="ml-4 text-gray-700 text-lg font-semibold">Loading...</span>
                    </div>
                )}

                {/* Nút Load More */}
                {!loading && hasMore && (
                    <div className="flex justify-end mt-10">
                        <button
                            className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transform transition-transform duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
                            onClick={handleLoadMore}
                        >
                            Load more
                        </button>
                    </div>
                )}

                {!hasMore && (
                    <div className="text-center text-gray-500 mt-10">
                        No more articles to load!
                    </div>
                )}
            </main>
        </div>
    );
}
