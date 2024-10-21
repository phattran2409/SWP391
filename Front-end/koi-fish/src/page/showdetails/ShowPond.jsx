import React, { useEffect, useState, useRef } from 'react';
import api from "../../config/axios";
import Loading from '../../components/loading/Loading';
import '../../components/animation/fadein.css';
import AnimationReveal from '../../components/animation/AnimationReveal';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const ShowPond = () => {
    const [ponds, setPonds] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const ref = useRef();

    // Fetch Koi Ponds from multiple API endpoints
    const fetchKoiPonds = async () => {
        try {
            const pondRequests = [];
            // Loop through 1 to 5 and create a list of promises for the requests
            for (let i = 1; i <= 6; i++) {
                pondRequests.push(api.get(`v1/pond/getByElement/${i}`));
            }

            // Resolve all promises and aggregate the results
            const responses = await Promise.all(pondRequests);
            const allPonds = responses.flatMap(response => response.data.data); // Combine data from all requests

            setPonds(allPonds);
        } catch (error) {
            console.error("Error fetching koi ponds:", error.response?.status, error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchKoiPonds(); // Fetch data when the component mounts
    }, []);

    if (!ponds.length) {
        return (
            <div><Navbar />
                <div className="flex flex-col items-center justify-center h-full w-full bg-white rounded-xl p-6 max-w-[80%] mx-auto fade-in">
                    <Loading />
                </div>
            </div>
        );
    }

    const handleShowMore = () => {
        setVisibleCount(ponds.length); // Show all ponds
    };

    return (
        <div>
            <Navbar />
            <AnimationReveal>
                <div className="flex flex-col items-center justify-center h-full w-full bg-white rounded-xl p-6 max-w-[80%] mx-auto">
                    <h2 className="text-4xl font-bold mb-10 text-black text-center">
                        Koi Ponds
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-20 gap-x-10">
                        {ponds.slice(0, visibleCount).map((item, index) => (
                            <div
                                key={item._id || index}
                                className="flex flex-col group relative shadow bg-white text-black rounded-xl overflow-hidden h-[800px] w-full sm:w-[80%] mx-auto fade-in border-2 border-gray-300"
                            >
                                <div
                                    className="h-[70%] w-full bg-white bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(${item.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundColor: 'white',
                                    }}
                                />

                                <div className="h-auto bg-white p-4 flex flex-col justify-between">
                                    <h1 className="text-xl font-semibold">Shape: {item.shape}</h1>
                                    <p className="text-black text-justify">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center mt-2">
                                        <span className="font-semibold">Direction:</span>
                                        {item.direction.map((dir, idx) => (
                                            <span key={idx} className="ml-2">{dir}</span>
                                        ))}
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="font-semibold">Trees:</span>
                                        <span className="ml-2">{item.trees}</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="font-semibold">Water Flow:</span>
                                        <span className="ml-2">{item.waterFlow}</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="font-semibold">Light:</span>
                                        <span className="ml-2">{item.light}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {visibleCount < ponds.length && (
                        <button
                            onClick={handleShowMore}
                            className="mt-10 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Show More
                        </button>
                    )}
                </div>
            </AnimationReveal>
            <Footer />
        </div>
    );
};

export default ShowPond;
