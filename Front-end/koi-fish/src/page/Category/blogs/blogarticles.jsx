import { useEffect, useState } from 'react';
import { FaClock, FaUser } from 'react-icons/fa';
import Pagination from '../../../components/Paginition/Pagination';
import AdvertisementTemplate from '../../../components/news-template/AdvertiseTemplate';
import Search from '../search';
import api from "../../../config/axios.js";
export default function BlogPage() {
    const [blogsArticles, setBlogsArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 6;

    const extractTextFromP = (html, maxLength = 270) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const pTags = doc.getElementsByTagName("p");

        let extractedText = "";
        for (let i = 0; i < pTags.length; i++) {
            extractedText += pTags[i].textContent;
            if (extractedText.length >= maxLength) {
                break;
            }
        }

        return extractedText.length > maxLength
            ? `${extractedText.slice(0, maxLength)}...`
            : extractedText;
    };

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await api.get(`v1/post/getPost/2?page=${currentPage}&limit=${limit}`);
            setBlogsArticles(response.data.data);
            setTotalPages(response.data.totalPages)
        } catch (error) {
            console.error('Error fetching Blogs', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [currentPage]);

    return (
        <>
            <div className="min-h-screen">
            {/* <SocialLinks /> */}
            
                <div className=' font-semibold text-center text-6xl '>
                    BLOG
                </div>
                <div className='flex mt-4 lg:mt-16 px-4 lg:px-96 absolute left-0 right-0 z-20'>
                    <Search />

                </div>
                <div className="flex items-center justify-center min-h-screen">
                
                    <main className="container bg-white bg-opacity-90 mx-auto mt-16 px-4 md:px-8 py-10 rounded-[30px] z-10">
                        {loading ? (
                            <div className="flex justify-center items-center h-40">
                                <span className="text-blue-500 text-lg font-semibold">Loading...</span>
                            </div>
                        ) : Array.isArray(blogsArticles) && blogsArticles.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-10">
                                {/* Cột bên trái - bài viết chính */}
                                <div className="lg:col-span-2">
                                    {blogsArticles

                                        .map((article, index) => (
                                            <div key={index} className="border-b-2 border-gray-300 p-4 bg-white mb-6">
                                                <a href={`/details/${article._id}`} className="text-4xl font-medium mt-4 hover:underline hover:text-red-600">{article.title}</a>
                                                <div className='flex justify-between'>
                                                    <p className="flex text-xl my-10">
                                                        <FaClock className="mr-2 text-red-500" />
                                                        Updated: {new Date(article.updatedAt).toLocaleDateString()}
                                                    </p>
                                                    <div className="flex text-xl my-10">
                                                        <FaUser className="mr-2 text-red-500" />
                                                        {article.author && article.author.name ? (
                                                            <p>Author: {article.author.name}</p>
                                                        ) : (
                                                            <p>Author: Admin</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='flex w-full'>
                                                    <img src={article.imageThumbnail} alt={article.title} className="w-full h-48 max-w-56 object-cover mr-10" />
                                                    <p className="max-w-full text-gray-600 mt-2 break-words line-clamp-5">
                                                        {extractTextFromP(article.context)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>


                                <div>
                                    <AdvertisementTemplate />
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-500">No articles to display!</div>
                        )}
                        {/* Phần điều hướng trang */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </main>
                </div>
            </div>
        </>
    );
}
