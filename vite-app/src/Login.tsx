import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Data() {

  const [username, setUsername] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )
  const [error, setError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
   
  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.message || "Invalid username or password")
      }

      const accessToken = data.access_token
      localStorage.setItem("token", accessToken)
      setToken(accessToken)
    } catch (err) {
      console.error("Login failed:", err)
      setError(err instanceof Error ? err.message : "Login failed")
      localStorage.removeItem("token")
      setToken(null)
    }

    navigate("/products")
    setUsername("")
    setUserEmail("")
    setPassword("")
  }

  const handleSignUp = async () => {
    const res = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.message || "Invalid username or password")
      }
      setIsLoggedIn(true)
  }

    return (
      <div style={{ maxWidth: "400px", margin: "20px auto", padding: "20px" }}>
        
        <form onSubmit={handleLogin}>
          
          <div style={{display: isLoggedIn ? "none" : "block"}}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px"}}
          >
            <h3>Login</h3>
            <label>
              User Email
              <input
                type="email"
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
            <button
              type="submit"
              style={{ padding: "10px", cursor: "pointer" }}
            >
              Login
            </button>
            <button
              type="button"
                onClick={() => setIsLoggedIn((prev) => !prev)}
              style={{ padding: "10px", cursor: "pointer" }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
      <form onSubmit={handleSignUp}>
          <div style={{ display: isLoggedIn ? "block" : "none" }}>
            <h3>Sign Up</h3>
            <br></br>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <label>
                User Email
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
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
              <button
                type="submit"
                style={{ padding: "10px", cursor: "pointer" }}
              >
              Sign Up
              </button>
              <button
                type="button"
                onClick={() => setIsLoggedIn((prev) => !prev)}
                style={{ padding: "10px", cursor: "pointer" }}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
