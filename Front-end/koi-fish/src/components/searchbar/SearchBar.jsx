import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import api from "../../config/axios";

const SearchBar = () => {
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [ponds, setPonds] = useState([]);
    const [fish, setFish] = useState([]);
    const [posts, setPosts] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

    // Fetch data
    useEffect(() => {
        fetchKoiPonds();
        fetchKoiFish();
        fetchPosts();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isSearching && e.key === "Escape") {
                handleSearchClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isSearching]);
//   get ponds
    const fetchKoiPonds = async () => {
        try {
            const pondRequests = Array.from({ length: 5 }, (_, i) => api.get(`v1/pond/getByElement/${i + 1}`));
            const responses = await Promise.all(pondRequests);
            setPonds(responses.flatMap(res => res.data.data));
        } catch (error) {
            console.error("Error fetching koi ponds:", error.response?.status, error.response?.data || error.message);
        }
    };
// get fish 
    const fetchKoiFish = async () => {
        try {
            const response = await api.get('/v1/fish?page=1&limit=20');
            setFish(response.data.data);
        } catch (error) {
            console.error("Error fetching koi fish:", error.response?.status, error.response?.data || error.message);
        }
    };
// get posts    
    const fetchPosts = async () => {
        try {
            const response = await api.get('/v1/post/getAllPost?page=1&limit=50');
            setPosts(response.data.data);
        } catch (error) {
            console.error("Error fetching posts:", error.response?.status, error.response?.data || error.message);
        }
    };

    const colorToHex = (color) => {
        const colorMap = {
            Blue: '#0000FF',
            Red: '#FF0000',
            White: '#FFFFFF',
            Green: '#008000',
            Yellow: "#FFD700",
        };
        return colorMap[color] || '#000';
    };

    // Handle Search Query
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.trim() === "") {
            setFilteredResults([]);
            return;
        }

        // Filter results
        const isKoiSearch = query.includes("koi");
        const isFishSearch = query.includes("fish");
        const isPondSearch = query.includes("pond");
        const isPostSearch = query.includes("post");

        const filteredPonds = isPondSearch ? ponds.filter(pond => pond.shape.toLowerCase().includes(query.replace("pond", "").trim())) : [];
        const filteredFish = (isKoiSearch || isFishSearch) ? fish.filter(fish => {

            fish.koiName.toLowerCase().includes(query.replace(/koi|fish/, "").trim())
           
            console.log(fish.koiName)
     } ) : []; 
        const filteredPosts = isPostSearch ? posts.filter(post => post.title.toLowerCase().includes(query.replace("post", "").trim())) : [];
        

        console.log({filteredFish , filteredPonds, filteredPosts}); 

    
        const Ponds = ponds.filter(pond =>
            pond.shape.toLowerCase().includes(query)
        );
    console.log(searchQuery);
    
      const Fishs=  fish.filter((Fishs) => 
        // if (Fishs.koiName === searchQuery) {
        //     console.log(Fishs);
        // } else {
        //     console.warn("Fish object missing koiName property", Fishs);
        // }
        //     Fishs.koiName.includes(query.trim());
        //  }
        Fishs.koiName.toLowerCase().includes(query.trim())  
      
        ) ;
        console.log(Fishs)  

        const Posts = posts.filter(post =>
            post.title.toLowerCase().includes(query)
        );

        setFilteredResults([...filteredPonds, ...filteredFish, ...filteredPosts, ...Ponds, ...Fishs, ...Posts]);
    };


    const handleSearchClose = () => {
        setIsSearching(false);
        setSearchQuery("");
        setFilteredResults([]);
    };

    const truncateText = (text, length) => {
        if (!text) return ""; 
        return text.length > length ? `${text.substring(0, length)}...` : text;
    };
    
    
    const handleWheel = (e) => {
        e.stopPropagation(); // Prevent scroll page when hovering over results
    };

    return (
        <div className="relative flex flex-col items-center">
            {isSearching ? (
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search koi, fish, ponds, or posts..."
                        className="px-3 py-1 border rounded-2xl bg-white text-black focus:outline-none"
                    />
                    <button onClick={handleSearchClose} className="text-gray-500 hover:text-gray-200 transition duration-300">
                        <X size={20} />
                    </button>
                </div>
            ) : (
                <button onClick={() => setIsSearching(true)} className="text-white hover:text-gray-300 focus:outline-none">
                    <Search size={20} />
                </button>
            )}
    
            {/* Display search results */}
            {filteredResults.length > 0 && (
                <div
                    className="absolute bg-white border mt-2 rounded-lg shadow-md max-h-[600px] max-[1440px]:max-w-full w-[400px] overflow-y-auto z-10"
                    style={{ top: '100%' }} 
                    onWheel={handleWheel} 
                >
                    {filteredResults.map((item, index) => (
                        <div key={index} className="p-2">
                            {item.koiName && (
                                <Link to={`/koidetail/${item._id}`} className="bg-zinc-200 rounded-xl p-2 hover:bg-red-100 block">
                                    <div className="flex space-x-2">
                                        <div className="flex justify-center items-center">
                                            <img src={item.image} alt={item.koiName} className="w-20 h-20 object-cover rounded-xl" />
                                        </div>
                                        <div>
                                            <strong>Koi Fish:</strong> {item.koiName}
                                            <p>{truncateText(item.description, 50)}</p>
                                            <div className="flex items-center mt-2">
                                                <span className="font-semibold text-black">Color:</span>
                                                {item.colors?.map((color, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="ml-2 w-4 h-4 rounded-full border border-black"
                                                        style={{ backgroundColor: colorToHex(color) }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}
                            {item.shape && (
                                <Link to={`/ponddetail/${item._id}`} className="bg-zinc-200 rounded-xl p-2 hover:bg-red-100 block">
                                    <div className="flex space-x-2">
                                        <div className="flex justify-center items-center">
                                            <img src={item.image} alt={item.shape} className="w-20 h-20 object-cover rounded-xl" />
                                        </div>
                                        <div>
                                            <strong>Pond Shape:</strong> {item.shape}
                                            <p>{truncateText(item.description, 50)}</p>
                                            <p><strong>Direction:</strong> {item.direction?.join(", ")}</p>
                                        </div>
                                    </div>
                                </Link>
                            )}
                            {item.title && (
                                // /postdetail/${item._id}
                                <Link to={`/details/${item._id}`} className="bg-zinc-200 rounded-xl p-2 hover:bg-red-100 block">
                                <div className="flex space-x-2">
                                        <div className="flex justify-center items-center">
                                            <img src={item.imageThumbnail}  className="w-30 h-20 object-cover rounded-xl" />
                                        </div>
                              
                                    <div>
                                        <strong>Post:</strong> {item.title}
                                       
                                    </div>
                              
                                </div>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
