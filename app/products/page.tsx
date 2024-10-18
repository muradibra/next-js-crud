import React from "react";
import { ProductTable } from "./_components/table";
import { ProductModal } from "./_components/modal";

const ProductsPage = async () => {
  const resp = await fetch("http://localhost:3000/api/products");
  const { products } = await resp.json();
  console.log(products);

  return (
    <div className="max-w-screen-lg py-10 mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Products</h1>
        <ProductModal />
      </div>
      <ProductTable products={products} />
    </div>
  );
};

export default ProductsPage;
