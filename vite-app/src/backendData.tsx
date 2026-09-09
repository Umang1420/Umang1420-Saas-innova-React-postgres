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
                <button style={{ marginRight: "5px" }}>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />

      <h3>List View</h3>
      <br />

      <ul>
        {products.map((product: Product) => (
          <li key={product.id}>
            {product.name} - ₹ {product.price} <button>Edit</button> <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}