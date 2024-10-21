import React, { useEffect, useState } from 'react';
import api from "../../config/axios";
import Loading from '../../components/loading/Loading';
import '../../components/animation/fadein.css';
import AnimationReveal from '../../components/animation/AnimationReveal';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const ShowFish = () => {
    const [fishs, setFish] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);

    // Fetch Koi Fish from API
    const fetchKoiFish = async () => {
        try {
            const response = await api.get('/v1/fish');
            setFish(response.data.data);
        } catch (error) {
            console.error("Error fetching koi fish:", error.response?.status, error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchKoiFish();
    }, []);

    if (!fishs.length) {
        return (
            <div><Navbar />
                <div className="flex flex-col items-center justify-center h-full w-full bg-white rounded-xl p-6 max-w-[80%] mx-auto fade-in">
                    <Loading />
                </div>
            </div>
        );
    }

    const colorToHex = (color) => {
        const colorMap = {
            Blue: '#0000FF',
            Red: '#FF0000',
            White: '#FFFFFF',
            Green: '#008000',
        };
        return colorMap[color] || '#000';
    };

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 6);
    };

    return (
        <div>
            <Navbar />
            <AnimationReveal>
                <div className="flex flex-col items-center justify-center h-full w-full bg-white rounded-xl p-6 max-w-[80%] mx-auto">
                    <h2 className="text-4xl font-bold mb-10 text-black text-center">
                        Koi Fish
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-20 gap-x-10">
                        {fishs.slice(0, visibleCount).map((item, index) => (
                            <div
                                key={item.id || index}
                                className="flex flex-col group relative shadow bg-white text-black rounded-xl overflow-hidden h-[800px] w-full sm:w-[80%] mx-auto fade-in border-2 border-gray-300"
                            >
                                <div
                                    className="h-[70%] w-full bg-white bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(${item.image})`,
                                        backgroundSize: 'contain', 
                                        backgroundPosition: 'center',
                                        backgroundColor: 'white',
                                    }}
                                />

                                <div className="h-auto bg-white p-4 flex flex-col justify-between">
                                    <h1 className="text-xl font-semibold">{item.koiName}</h1>
                                    <p className="text-black text-justify">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center mt-2">
                                        <span className="font-semibold">Color:</span>
                                        {item.colors.map((color, idx) => (
                                            <span
                                                key={idx}
                                                className="ml-2 w-4 h-4 rounded-full border border-black"
                                                style={{ backgroundColor: colorToHex(color) }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {visibleCount < fishs.length && (
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

export default ShowFish;
