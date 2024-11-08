import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaClock, FaUser } from 'react-icons/fa';
import AdvertisementTemplate from '../../../components/news-template/AdvertiseTemplate';
import NewsContent from "../../../components/news-template/NewsContent"
import Search from '../search';
import api from "../../../config/axios.js";
import "../../../components/update-profile/contentStyle.css"

export default function DetailContent() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await api.get(`v1/post/getPostById/${id}`);

                setArticle(response.data);
            } catch (error) {
                console.log("Error fetching article", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    return (
        <>
            <div className="min-h-screen relative bg-gray-50">      
                <div className='mt-8 font-semibold text-center text-6xl '>Article Details
                </div>
                <div className="flex mt-4 lg:mt-16 px-4 lg:px-96 absolute left-0 right-0 z-20">
                    <Search />
                </div>

                {/* Nội dung chính */}
                <div className="flex items-center justify-center">
                    <div className="container bg-white mx-auto mt-16 px-4 md:px-8 py-10 rounded-[30px] z-10 shadow-lg">
                        {loading ? (
                            <div className="flex justify-center items-center h-40">
                                <span className="text-blue-500 text-lg font-semibold animate-pulse">Loading...</span>
                            </div>
                        ) : article ? (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 preview-content">
                                {/* Nội dung bài viết */}
                                <div className="col-span-2 bg-white p-6 ">
                                    <h1 className="text-3xl md:text-4xl font-semibold mb-6 hover:text-red-500 transition-colors duration-300">{article.title}</h1>
                                    <div className="flex justify-between text-gray-600 mb-4 flex-col sm:flex-row">
                                        <p className="flex items-center mb-2 sm:mb-0">
                                            <FaClock className="mr-2 text-red-500" />
                                            Updated: {new Date(article.updatedAt).toLocaleDateString()}
                                        </p>
                                        <p className="flex items-center">
                                            <FaUser className="mr-2 text-red-500" />
                                            {article.author && article.author.name ? (
                                                <span>Author: {article.author.name}</span>
                                            ) : (
                                                <span>Author: Admin</span>
                                            )}
                                        </p>
                                    </div>
                                    {/* Hiệu ứng hover cho ảnh */}
                                    <img
                                        src={article.imageThumbnail}
                                        alt={article.title}
                                        className="w-full h-auto object-cover mb-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
                                    />
                                    <div
                                        className="text-gray-800 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: article.context }}
                                    ></div>
                                </div>

                                <div className="col-span-1">
                                    <div className='border-t-2 border-gray-200 p-4 lg:hidden'></div>
                                    <div className="p-4 bg-white rounded-lg">
                                        <AdvertisementTemplate />
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <div className="text-center text-gray-500">No article details available!</div>
                        )}

                        <div className='mt-10 border-y-2 border-gray-300 py-4'>
                            <div className="text-center text-2xl font-bold mt-8">Related News</div>
                            <NewsContent />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
