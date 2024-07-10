import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProductCard from "../ProductCard/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        let res = await fetch("https://fakestoreapi.com/products?limit=8");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        let data = await res.json();
        // Initialize visibility state for each product
        const productsWithVisibility = data.map((product) => ({
          ...product,
          showDescription: false,
        }));
        setProducts(productsWithVisibility);
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
    fetchProducts();
  }, []);

  const toggleDescription = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, showDescription: !product.showDescription }
          : product
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {products &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              productImage={product.image}
              discount={`${Math.round(
                100 - (product.price / (product.price * 1.5)) * 100
              )}% OFF`}
              productName={product.title}
              currentPrice={product.price}
              originalPrice={(product.price * 1.5).toFixed(2)}
              rating={product.rating.rate}
              reviews={product.rating.count}
              onViewDetails={() => navigate(`/ProductDetail/${product.id}`)}
            />
          ))}
      </div>
    </div>
  );
}

export default Products;
