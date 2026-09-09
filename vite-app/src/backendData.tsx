import { useEffect, useState, type FormEvent } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function Data() {
  const [products, setProducts] = useState<Product[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [error, setError] = useState("");
  const [isAdd,setIsAdd] = useState(false);
  const [productName,setProductName] = useState("")
  const [productPrice,setProductPrice] = useState("")

  useEffect(() => {
    if (!token) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        setProducts(Array.isArray(data) ? (data as Product[]) : []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        localStorage.removeItem("token");
        setToken(null);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [token]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Invalid username or password");
      }

      const accessToken = data.access_token;
      localStorage.setItem("token", accessToken);
      setToken(accessToken);
    } catch (err) {
      console.error("Login failed:", err);
      setError(err instanceof Error ? err.message : "Login failed");
      localStorage.removeItem("token");
      setToken(null);
    }
  };

  const handleAdd = () =>{
    // let productName = prompt("Enter Product Name");
    // let productPrice = prompt("Enter Product Price");

    fetch(`http://localhost:4000/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: productName,
        price: productPrice,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to Insert user");
        return res.json();
      })

      .then((newProduct: Product) => {
        setProducts((prevProduct) => [...prevProduct, newProduct]);
      })
      .catch((err) => console.error("Error creating user:", err));

      setProductName("")
      setProductPrice("");
      setIsAdd(false);
  }

    const handleEdit = (productId:number) =>{
      const newProductName = prompt("Enter Product Name");
      const newProductPrice = prompt("Enter Product Price");

      if (newProductName === null || newProductPrice === null) {
        return;
      }

      const numericPrice = Number(newProductPrice);

      fetch(`http://localhost:4000/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newProductName,
          price: numericPrice,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to Insert user");
          return res.json();
        })

        .then(() => {
          setProducts((prevProduct) =>
            prevProduct.map((product) =>
              product.id === productId
                ? {
                    ...product,
                    name: newProductName,
                    price: numericPrice,
                  }
                : product,
            ),
          );
        })
        .catch((err) => console.error("Error creating user:", err));

      setProductName("")
      setProductPrice("");
      setIsAdd(false);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setProducts([]);
  };

  if (!token) {
    return (
      <div style={{ maxWidth: "400px", margin: "20px auto", padding: "20px"}}>
        <h3>Login</h3><br></br>
        <form onSubmit={handleLogin}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "95%", padding: "8px", marginTop: "4px" }}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "95%", padding: "8px", marginTop: "4px" }}
              />
            </label>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px 0" }}>
        <h3>Products List:</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <br />
      <button onClick={()=>setIsAdd((pre)=> !pre)}>{isAdd ? 'Cancel' : 'Add Product'}</button>
      <div style={{display : isAdd ? 'block':'none'}}>
        <label>Product Name:</label><br/>
        <input 
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        /><br/><br/>
        <label>Product Price:</label><br/>
        <input 
        type="text"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        /><br/><br/>
        <button onClick={handleAdd}>Add</button>
      </div>

      <table style={{ margin: "10px", border: "1px solid black", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2", borderBottom: "1px solid black" }}>
            <th style={{ padding: "10px", border: "1px solid black" }}>Product Name</th>
            <th style={{ padding: "10px", border: "1px solid black" }}>Product Price</th>
            <th style={{ padding: "10px", border: "1px solid black" }}>Modification</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <tr key={product.id} style={{ borderBottom: "1px solid black" }}>
              <td style={{ padding: "10px", border: "1px solid black" }}>{product.name}</td>
              <td style={{ padding: "10px", border: "1px solid black" }}>₹ {product.price}</td>
              <td style={{ padding: "10px", border: "1px solid black" }}>
                <button style={{ marginRight: "5px" }} onClick={()=>handleEdit(product.id)}>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}