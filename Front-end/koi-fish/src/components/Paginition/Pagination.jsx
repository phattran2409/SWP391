
export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const getPageNumbers = () => {
        const pageNumbers = [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (startPage > 1) {
            pageNumbers.push(1);
            if (startPage > 2) pageNumbers.push("...");
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pageNumbers.push("...");
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="flex justify-center items-center my-4">
            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-1 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
            >
                «
            </button>
            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === "number" && onPageChange(page)}
                    className={`px-3 py-1 mx-1 rounded ${page === currentPage
                            ? "bg-red-600 text-white"
                            : "bg-gray-600 text-white hover:bg-gray-700"
                        } ${page === "..." ? "cursor-default" : ""}`}
                    disabled={page === "..." || page === currentPage}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 mx-1 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
            >
                »
            </button>
        </div>
    );
}