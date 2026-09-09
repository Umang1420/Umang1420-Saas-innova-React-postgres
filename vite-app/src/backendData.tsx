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
        <h3>Products List:</h3><br></br>
        <table style={{ margin: '10px', border: '1px solid black', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', borderBottom: '1px solid black' }}>
            <th style={{ padding: '10px', border: '1px solid black' }}>Product Name</th>
            <th style={{ padding: '10px', border: '1px solid black' }}>Product Price</th>
            <th style={{ padding: '10px', border: '1px solid black' }}>Modification</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <tr key={product.id} style={{ borderBottom: '1px solid black' }}>
              <td style={{ padding: '10px', border: '1px solid black' }}>{product.name}</td>
              <td style={{ padding: '10px', border: '1px solid black' }}>₹ {product.price}</td>
              <td style={{ padding: '10px', border: '1px solid black' }}>
                <button style={{ marginRight: '5px' }}>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table><br></br>

      <h3>List View</h3> <br />

        <ul>
          {products.map((product: Product) => (
            <li key={product.id}>
              {product.name} - ₹ {product.price} <button>Edit</button> <button>Delete</button>
            </li>
          ))}
        </ul>
    </div>
  )
}