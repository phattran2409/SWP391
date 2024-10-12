import { useEffect, useState } from 'react';

export default function BlogPage() {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 5; // Hiển thị 5 bài viết mỗi trang

    // Dữ liệu giả mẫu để chạy thử
    const dummyData = [
        {
            title: 'Xóa đường dẫn cũ (old slug) của website WordPress',
            date: '30/09/2024',
            author: 'Trung Hiếu',
            comments: 6,
            imageThumbnail: 'https://unsplash.com/photos/red-and-yellow-koi-fish-borttKQSNfg', // Hình ảnh đại diện mẫu
            description: 'Có thể bạn chưa biết, khi bạn thay đổi đường dẫn (permalink hay slug) của một bài viết...'
        },
        {
            title: 'Chèn code vào từng trang riêng biệt trên website WordPress',
            date: '26/09/2024',
            author: 'Trung Hiếu',
            comments: 6,
            imageThumbnail: 'https://unsplash.com/photos/a-couple-of-fish-swimming-in-a-pond-Cmke85Kq9Ao', // Hình ảnh đại diện mẫu
            description: 'Nếu bạn đang muốn chèn code (HTML, CSS hoặc JS) vào một trang bất kỳ trên website WordPress của mình...'
        },
        // Thêm nhiều bài viết mẫu hơn
        {
            title: 'Tối ưu hóa tốc độ tải trang cho WordPress',
            date: '20/09/2024',
            author: 'Hồng Quân',
            comments: 8,
            imageThumbnail: 'https://unsplash.com/photos/a-koi-fish-swimming-in-a-pond-of-water-c0l6JEhajIY',
            description: 'Bài viết này hướng dẫn bạn các phương pháp tối ưu tốc độ tải trang cho website WordPress...'
        },
        {
            title: 'Các plugin cần thiết cho website WordPress của bạn',
            date: '15/09/2024',
            author: 'Nguyễn Thanh',
            comments: 12,
            imageThumbnail: 'https://unsplash.com/photos/red-and-yellow-koi-fish-on-water-_Qnzs1AEdCg',
            description: 'Danh sách các plugin cần thiết giúp bạn quản lý và tối ưu website WordPress hiệu quả...'
        },
        {
            title: 'Hướng dẫn cấu hình SSL cho website WordPress',
            date: '10/09/2024',
            author: 'Trung Hiếu',
            comments: 5,
            imageThumbnail: 'https://images.unsplash.com/photo-1509587961360-de7aff9a662a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'SSL giúp bảo vệ dữ liệu và tăng độ tin cậy cho website của bạn. Hướng dẫn chi tiết cách cấu hình SSL...'
        },
    ];

    const fetchArticles = (page) => {
        setLoading(true);

        // Tính toán bài viết cho trang hiện tại
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        // Lấy ra bài viết của trang hiện tại từ dữ liệu giả
        const articlesForCurrentPage = dummyData.slice(startIndex, endIndex);
        setArticles(articlesForCurrentPage);

        // Tính tổng số trang dựa trên tổng số bài viết và giới hạn mỗi trang
        setTotalPages(Math.ceil(dummyData.length / limit));

        setLoading(false);
    };

    // Gọi fetchArticles khi component render lần đầu và khi currentPage thay đổi
    useEffect(() => {
        fetchArticles(currentPage);
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
            <main className="container mx-auto px-16 py-8">
                <h2 className="text-3xl font-bold mb-8 text-center">BLOG</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    <div className="col-span-2 ">
                        {articles.length > 0 ? (
                            articles.map((article, index) => (
                                <div key={index} className="mb-10 bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
                                    <img src={article.imageThumbnail} alt={article.title} className="w-full h-48 object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                                        <p className="text-gray-700">{article.description}</p>
                                        <p className="flex justify-end mt-3 text-sm text-gray-500 mb-2 ">
                                            Cập nhật: {article.date} <span className=" text-red-500">•</span> {article.author} <span className="text-red-500">•</span>
                                            {/* {article.comments} Bình luận */}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500">Không có bài viết nào để hiển thị.</div>
                        )}
                    </div>
                </div>
                <div className="flex overflow-x-auto space-x-4 p-4">
                    <div className="min-w-[300px] flex-shrink-0">
                        <img src="image1.jpg" alt="Image 1" className="w-full h-auto rounded-lg" />
                    </div>
                    <div className="min-w-[300px] flex-shrink-0">
                        <img src="image2.jpg" alt="Image 2" className="w-full h-auto rounded-lg" />
                    </div>
                    <div className="min-w-[300px] flex-shrink-0">
                        <img src="image3.jpg" alt="Image 3" className="w-full h-auto rounded-lg" />
                    </div>

                </div>

                {/* Nút phân trang
                <div className='flex justify-center mt-8 space-x-4'>
                    {/* Nút "Trang trước" */}
                {/* <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1 || loading}
                        className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    >
                        Previous
                    </button> */}

                {/* Hiển thị trang hiện tại */}
                {/* <span className="px-4 py-2 bg-gray-200 rounded">
                        Trang {currentPage} / {totalPages}
                    </span> */}

                {/* Nút "Trang sau" */}
                {/* <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages || loading}
                        className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    >
                        Next
                    </button>
                </div> */}




            </main>
        </div>
    );
};
