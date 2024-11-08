import axios from 'axios';
import { useEffect, useState } from 'react';
import api from "../../config/axios.js";
export default function AdvertisementTemplate() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAd = async () => {
        try {
            setLoading(true);
            const response = await api.get(`v1/post/getAllAd/3`);
            const allArticles = response.data.data;
            // Trộn ngẫu nhiên danh sách bài viết
            const shuffledArticles = allArticles.sort(() => Math.random() - 0.5);
            // Lấy 6 bài viết đầu tiên
            const limitedArticles = shuffledArticles.slice(0, 6);

            setArticles(limitedArticles);
        } catch (error) {
            console.log("Error fetching:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAd();
    }, []);

    return (
        <div className="space-y-6 lg:mt-10">
            <div className="text-center text-2xl font-bold ">Advertise</div>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="text-blue-500 text-lg font-semibold">Loading...</span>
                </div>
            ) : Array.isArray(articles) && articles.length > 0 ? (
                articles.map(ad => (
                    <div key={ad._id} className="bg-white shadow-md p-4">
                        <a
                            href={`/details/${ad._id}`}>
                            <img
                                src={ad.imageThumbnail}
                                alt={ad.title}
                                className="w-full max-h-64 object-cover mb-4 rounded"
                            />
                            <h2 className="text-xl font-semibold mb-2">{ad.title}</h2>
                        </a>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500">No advertisements to display!</div>
            )}
        </div>
    );
}
