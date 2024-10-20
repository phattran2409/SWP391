import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AdvertisementTemplate() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAd = async () => {
        try {
            setLoading(true); // Sửa lại từ `loading(true)` thành `setLoading(true)`
            const response = await axios.get(`http://localhost:8081/v1/post/getPost/3`);
            setArticles(response.data.datas);
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
        <div className="space-y-6">
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="text-blue-500 text-lg font-semibold">Loading...</span>
                </div>
            ) : Array.isArray(articles) && articles.length > 0 ? (
                articles.map(ad => (
                    <div key={ad._id} className="bg-white shadow-md p-4">
                        <a href={`/details/${ad._id}`}>
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
