

import Search from '../search';
import NewsContent from '../../../components/news-template/NewsContent';
import Navbar from "../../../components/navbar/Navbar";
import bgImage1 from '../../../assets/image/bg-news1.jpg';
import bgImage2 from '../../../assets/image/bg-news2.jpg';
import bgImage3 from '../../../assets/image/bg-news3.jpg';
import bgImage4 from '../../../assets/image/bg-news4.jpg';
import bgImage5 from '../../../assets/image/bg-news5.jpg';
import bgImage6 from '../../../assets/image/bg-news6.jpg';

import { useEffect, useState } from 'react';


export default function NewsPage() {
    const [myImage, setMyImage] = useState('')

    const images = [bgImage1, bgImage2, bgImage3, bgImage4, bgImage5, bgImage6]

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    }

    useEffect(() => {
        // Cập nhật ảnh nền khi trang được tải
        setMyImage(getRandomImage());
    }, []);


    return (
        <>
        <Navbar />
        <div
            className="relative min-h-screen bg-cover bg-center bg-fixed pt-10"
            style={{ backgroundImage: `url(${myImage})` }}
        >
            {/* <div>.</div> */}

            <div className='flex mt-4 lg:mt-20 px-4 lg:px-96 absolute top-0 left-0 right-0 z-20'>
                <Search />
            </div>
            <div className='mt-10'><NewsContent /></div>

        </div>
        </>
    );
}
