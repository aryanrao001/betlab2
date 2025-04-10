import React from 'react'
import banner1 from '../assets/banners/banner1.png'
import banner2 from '../assets/banners/banner2.png'
import banner3 from '../assets/banners/banner3.png'
import banner4 from '../assets/banners/banner4.png'
import banner5 from '../assets/banners/banner5.png'
import { HiSpeakerWave } from "react-icons/hi2";
import ImageSlider from './ImageSlider'
import ImageSlider2 from './ImageSlider2'

const images = [banner1, banner2, banner3,banner4,banner5];


const Banner = ({data, data2  }) => {

    const matches1 = data?.response?.items || [];
    const matches2 = data2?.response?.items || [];





    
  return (
    <div className='p-2' >
          <div className="relative w-full" data-carousel="slide">
        {/* Carousel wrapper */}
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            {images.map((img, index) => (
            <div
                key={index}
                className={`${
                index === 0 ? "block" : "hidden"
                } duration-700 ease-in-out`}
                data-carousel-item
            >
                <img
                src={img}
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt={`Slide ${index + 1}`}
                />
            </div>
            ))}
        </div>

        {/* Indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
            {images.map((_, index) => (
            <button
                key={index}
                type="button"
                className="w-3 h-3 rounded-full bg-white"
                aria-label={`Slide ${index + 1}`}
                data-carousel-slide-to={index}
            />
            ))}
        </div>

        {/* Prev/Next Buttons */}
        <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
        >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
            <svg
                className="w-4 h-4 text-white rtl:rotate-180"
                fill="none"
                viewBox="0 0 6 10"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M5 1 1 5l4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
            <span className="sr-only">Previous</span>
            </span>
        </button>

        <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
        >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
            <svg
                className="w-4 h-4 text-white rtl:rotate-180"
                fill="none"
                viewBox="0 0 6 10"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="m1 9 4-4-4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
            <span className="sr-only">Next</span>
            </span>
        </button>
        </div>

        <div className='rounded-3xl flex items-center p-2  'style={{ backgroundColor: '#222121' }} >
            <div className='w-[10%] flex justify-center text-2xl  'style={{color:'#F0960E'}}  ><HiSpeakerWave /></div>
            <div className=' w-[70%] text-[12px]  font-semibold ' style={{color:'#F0960E',}} ><h1>Welcome to the 79club! Greetings Gamers and Enthusiasts! 79club is more than just Gaming</h1></div>
            <div className='flex justify-center w-[20%] rounded-3xl p-2' style={{backgroundColor:'#F0960E'}} > Detail </div>
        </div>

        {/* <ImageSlider2 data={matches2} /> */}


        <ImageSlider data={matches1 } />
        <ImageSlider2 data1={matches2} data2={matches1} />



    </div>
  )
}

export default Banner