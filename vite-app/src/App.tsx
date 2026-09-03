import Route from "./routes/route";
import "reflect-metadata";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

export function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <>
      <Route />

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
    </>
  );
}

export default App;