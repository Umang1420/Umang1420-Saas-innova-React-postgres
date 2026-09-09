import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function Data(){
 const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <div>
        <h1>Frontend React App</h1>
        <h3>Products List:</h3>
        <ul>
          {products.map((product: Product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
    </div>
  )
}