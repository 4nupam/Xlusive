import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaHeart } from "react-icons/fa";

function ProductDetail() {
  const [pd, setPd] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetching() {
      try {
        let res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        let data = await res.json();
        console.log("API Response:", data);
        setPd(data);
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Error fetching data");
      }
    }

    fetching();
  }, [id]);

  const toggleLike = () => {
    const heartBtn = document.querySelector(".heart-btn");
    heartBtn.style.color =
      heartBtn.style.color === "red" ? "black" : "red";
  };

  function cart(pd, redirect) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductexist = cart.find((item) => item.id === pd.id);
    if (isProductexist) {
      const updatedCart = cart.map((item) => {
        if (item.id === pd.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...pd, quantity: 1 }])
      );
    }
    if (redirect) {
     alert(`Product${pd.name} added`)
    }
  }

  return (
    <section className="text-gray-600  body-font overflow-hidden">
      <div className="container px-5 py-8 mx-auto">
        {Object.keys(pd).length > 0 ? (
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="Product"
              className="lg:w-1/4 w-full lg:h-auto h-56 object-fit object-contain rounded hover:scale-105 duration-300"
              src={pd.image ? pd.image : "https://dummyimage.com/400x400"}
            />
            <div className=" lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {pd.id}
                <br/>
                {pd.category}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {pd.title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  {Array.from({ length: Math.floor(pd.rating.rate) }).map(
                    (_, index) => (
                      <svg
                        key={index}
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 text-indigo-500"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                    )
                  )}
                  <span className="text-yellow-700 ml-3">
                    {pd.rating.count} Reviews
                  </span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{pd.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-green-700">
                  ${pd.price} only
                </span>
                <button
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  onClick={() => cart(pd, true)}
                >
                  ADD TO CART
                </button>
                <button
                  className="flex rounded-full ml-auto text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600"
                  onClick={() => navigate("/cart")}
                >
                CART
                </button>
                <button className=" rounded-full bg-slate-200 w-10 h-10  p-0
                 border-0 inline-flex items-center justify-center
                  text-gray-500 ml-4" onClick={()=> toggleLike()}>
                <FaHeart className="heart-btn text-2xl "/>
                  
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto">
              <div className="flex flex-wrap -m-4">
                <div className="p-4 mx-auto">
                  <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <h2 className="text-lg font-medium title-font text-gray-900 text-center pt-10">
                      Product Not Found
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductDetail;
