import { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';

export default function NewsPage() {
    const [newsArticles, setNewsArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchNews = async () => {
        try {
            setLoading(true); // Bắt đầu quá trình tải

            const response = await axios.get('http://localhost:8081/v1/post/getPost/1');
            setNewsArticles(response.data.datas);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    return (
        <div className="flex items-center justify-center min-h-sc   reen">
            <main className="container bg-white bg-opacity-95 mx-auto mt-16 px-4 md:px-8 py-10 md:rounded-t-[30px] z-10">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="border-t-transparent animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
                        <span className="ml-4 text-gray-700 text-lg font-semibold">Loading...</span>
                    </div>
                ) : Array.isArray(newsArticles) && newsArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {newsArticles
                            // .filter(article => article.postStatus) // Kiểm tra postStatus là true
                            .map((article, index) => (
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
            </main>
        </div>
    );
}
