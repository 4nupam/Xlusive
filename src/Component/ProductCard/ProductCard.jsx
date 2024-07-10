import React from 'react';
import { FaHandHoldingHeart } from "react-icons/fa";

const ProductCard = ({ 
  productImage, 
  discount, 
  productName, 
  currentPrice, 
  originalPrice, 
  rating, 
  reviews,
  onViewDetails
}) => {
  return (
    <div className="relative w-medium m-5 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md md:w-screen">
      <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
        <img className="object-fit object-contain" src={productImage} alt="product image" />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{discount}</span>
      </a>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl tracking-tight text-slate-900">{productName}</h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p className='flex flex-col'>
            <span className="text-3xl font-bold text-green-700">${currentPrice}</span>
            
            <span className="text-sm text-slate-900 line-through">${originalPrice}</span>
          </p>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                aria-hidden="true"
                className={`h-5 w-5 ${index < rating ? 'text-yellow-300' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{reviews}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <button
            className="text-indigo-500 inline-flex items-center"
            onClick={onViewDetails}
          >
            View Details
            <svg
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </button>
          <span className="text-gray-400 flex gap-2 items-center">
           
            {rating}<FaHandHoldingHeart/> | {reviews}k
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
