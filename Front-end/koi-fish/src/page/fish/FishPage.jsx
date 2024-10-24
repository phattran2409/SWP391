import { useEffect, useState } from "react";

const FishPage = () => {

    const [isPageVisible, setIsPageVisible] = useState(false);

    const kitchenLayouts = [
        {
            image: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf",
            title: "Optimal Energy Flow"
        },
        {
            image: "https://images.unsplash.com/photo-1556912173-46c336c7fd55",
            title: "Balanced Elements"
        },
        {
            image: "https://images.unsplash.com/photo-1556912998-c57cc6b63cd7",
            title: "Prosperity Corner"
        }
    ];

    useEffect(() => {
        setIsPageVisible(true);
    }, []);

    return (
        <div className={`bg-white min-h-screen transition-opacity duration-1000 ${isPageVisible ? 'opacity-100' : 'opacity-0'}`}>


            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-4">Kitchen Feng Shui</h1>
                <p className="text-xl text-center text-gray-600 mb-8">Attract Abundance of Good Fortune with Kitchen Feng Shui</p>
                <div className="text-right mb-8">
                    <button className="text-green-600 font-semibold hover:text-green-700 transition-colors duration-300">
                        Read More &gt;&gt;
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {kitchenLayouts.map((layout, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                            <img src={layout.image} alt={layout.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <span className="inline-block bg-green-500 text-white px-2 py-1 text-sm font-semibold rounded mb-2">WOOD</span>
                                <h3 className="text-xl font-semibold text-gray-800">{layout.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-4">Kitchen Feng Shui</h1>
                <p className="text-xl text-center text-gray-600 mb-8">Attract Abundance of Good Fortune with Kitchen Feng Shui</p>
                <div className="text-right mb-8">
                    <button className="text-red-600 font-semibold hover:text-red-700 transition-colors duration-300">
                        Read More &gt;&gt;
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {kitchenLayouts.map((layout, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                            <img src={layout.image} alt={layout.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <span className="inline-block bg-red-600 text-white px-2 py-1 text-sm font-semibold rounded mb-2">FIRE</span>
                                <h3 className="text-xl font-semibold text-gray-800">{layout.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-4">Kitchen Feng Shui</h1>
                <p className="text-xl text-center text-gray-600 mb-8">Attract Abundance of Good Fortune with Kitchen Feng Shui</p>
                <div className="text-right mb-8">
                    <button className="text-yellow-900 font-semibold hover:text-amber-950 transition-colors duration-300">
                        Read More &gt;&gt;
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {kitchenLayouts.map((layout, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                            <img src={layout.image} alt={layout.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <span className="inline-block bg-yellow-900 text-white px-2 py-1 text-sm font-semibold rounded mb-2">EARTH</span>
                                <h3 className="text-xl font-semibold text-gray-800">{layout.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-4">Kitchen Feng Shui</h1>
                <p className="text-xl text-center text-gray-600 mb-8">Attract Abundance of Good Fortune with Kitchen Feng Shui</p>
                <div className="text-right mb-8">
                    <button className="text-gray-600 font-semibold hover:text-gray-700 transition-colors duration-300">
                        Read More &gt;&gt;
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {kitchenLayouts.map((layout, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                            <img src={layout.image} alt={layout.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <span className="inline-block bg-gray-500 text-white px-2 py-1 text-sm font-semibold rounded mb-2">METAL</span>
                                <h3 className="text-xl font-semibold text-gray-800">{layout.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-4">Kitchen Feng Shui</h1>
                <p className="text-xl text-center text-gray-600 mb-8">Attract Abundance of Good Fortune with Kitchen Feng Shui</p>
                <div className="text-right mb-8">
                    <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300">
                        Read More &gt;&gt;
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {kitchenLayouts.map((layout, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                            <img src={layout.image} alt={layout.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <span className="inline-block bg-blue-500 text-white px-2 py-1 text-sm font-semibold rounded mb-2">WATER</span>
                                <h3 className="text-xl font-semibold text-gray-800">{layout.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default FishPage;