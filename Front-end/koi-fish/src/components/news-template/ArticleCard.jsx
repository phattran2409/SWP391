
const ArticleCard = ({ article, formatDate }) => {
    return (
        <a
            href={`/details/${article._id}`}
            className={`bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500 
            ${article.index === 0 ? 'md:col-span-2' : ''}     
            ${article.index % 6 === 0 ? 'lg:col-span-2' : ''} 
            ${article.index % 6 === 5 ? 'lg:col-span-2' : ''}`}
        >
            <img
                src={article.imageThumbnail}
                alt={article.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                {article.author && article.author.name ? (
                    <p className="text-sm text-gray-500 mt-2">Author: {article.author.name}</p>
                ) : (
                    <p className="text-sm text-gray-500 mt-2">Author: Admin</p>
                )}
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{formatDate(article.updatedAt)}</p>
            </div>
        </a>
    );
};

export default ArticleCard;