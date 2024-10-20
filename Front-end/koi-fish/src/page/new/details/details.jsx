import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaClock, FaUser } from 'react-icons/fa';
import axios from 'axios';
import AdvertisementTemplate from '../../../components/news-template/AdvertiseTemplate';
import NewsContent from "../../../components/news-template/NewsContent"
import Search from '../search';
import Banner from '../../../assets/image/Banner1.png'


export default function DetailsPage() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true); // Đặt trạng thái loading ban đầu là true

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/v1/post/getPostById/${id}`);

                setArticle(response.data);
            } catch (error) {
                console.log("Error fetching article", error)
            } finally {
                setLoading(false);
            }
        };

        fetchArticle(); // Gọi hàm lấy dữ liệu bài viết
    }, [id]); // Chạy lại khi id thay đổi

    return (
        <div className="min-h-screen relative">

            <div className="relative">
                <img src={Banner} alt="Banner" className="w-full h-auto" />
            </div>



            <div className='flex mt-4 lg:mt-16 px-4 lg:px-96 absolute left-0 right-0 z-20'>
                <Search />
            </div>

            <div className="flex items-center justify-center">
                <main className="container bg-white mx-auto mt-16 px-4 md:px-8 py-10 rounded-[30px] z-10">
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <span className="text-blue-500 text-lg font-semibold">Loading...</span>
                        </div>
                    ) : article ? (
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2 bg-white p-6">
                                <h1 className="text-4xl font-semibold mb-6">{article.title}</h1>
                                <div className="flex justify-between text-gray-600 mb-4">
                                    <p className="flex items-center">
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
                                <img
                                    src={article.imageThumbnail}
                                    alt={article.title}
                                    className="w-full h-auto object-cover mb-6"
                                />
                                <div
                                    className="text-gray-800 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: article.context }}
                                ></div>
                            </div>
                            <div className="bg-gray-100 p-4">
                                <AdvertisementTemplate /> {/* Sử dụng component quảng cáo */}
                            </div>
                        </div>

                    ) : (
                        <div className="text-center text-gray-500">No article details available!</div>
                    )}
                    <div className='mt-10 border-y-2 border-gray-300'>
                        <NewsContent />
                    </div>

                </main>
            </div>
        </div>
    );
}
