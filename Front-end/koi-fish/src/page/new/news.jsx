import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NewsPage() {
    const [newsArticles, setNewsArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 3;

    const fetchNews = async (page) => {
        try {
            setLoading(true); // Bắt đầu quá trình tải
            const response = await axios.get('http://localhost:8081/v1/post/getAllPost', {
                params: {
                    page: page,
                    limit: limit
                }
            });
            console.log(response.data);

            setNewsArticles(response.data.data);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    // Gọi fetchNews khi component render lần đầu và khi currentPage thay đổi
    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setLoading(true); // Bắt đầu quá trình tải
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setLoading(true); // Bắt đầu quá trình tải
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
            <main className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold mb-8 text-center">NEWS</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {Array.isArray(newsArticles) && newsArticles.length > 0 ? (
                        newsArticles.map((article, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500">
                                <img src={article.imageThumbnail} alt={article.title} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                                    <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                                    <p className="text-gray-700">{article.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">Không có bài viết nào để hiển thị.</div>
                    )}
                </div>
                {/* Nút phân trang */}
                <div className='flex justify-center mt-8 space-x-4'>

                    {/* Nút "Trang trước" */}
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1 || loading}
                        className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    >
                        Previous
                    </button>

                    {/* Hiển thị trang hiện tại */}
                    <span className="px-4 py-2 bg-gray-200 rounded">
                        Trang {currentPage} / {totalPages}
                    </span>

                    {/* Nút "Trang sau" */}
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages || loading}
                        className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    >
                        Next
                    </button>
                </div>

            </main>
        </div>
    );
};


