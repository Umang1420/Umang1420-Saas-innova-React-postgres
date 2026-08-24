import { useEffect, useState } from "react"

interface Quote {
  id: number
  quote: string
  author: string
}

const Cart = () => {
  const [item, setItem] = useState<string>("")
  const [itemList, setItemList] = useState<string[]>([])

  const handleItem = () => {
    const trimmedItem = item.trim()
    if (!trimmedItem) return
    setItemList((prev) => [...prev, trimmedItem])
    setItem("")
  }

  const [userInput, setUserInput] = useState<string>("")
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!userInput.trim()) {
      setFilteredQuotes([])
      return
    }





    

    setLoading(true)

    const getData = setTimeout(() => {
      fetch("https://dummyjson.com/quotes")
        .then((res) => res.json())
        .then((data) => {
          const allQuotes: Quote[] = data.quotes || []

          const matches = allQuotes.filter((q) =>
            q.author.toLowerCase().includes(userInput.toLowerCase())
          )

          setFilteredQuotes(matches)
          setLoading(false)
        })
        .catch((err) => {
          console.error("Error fetching data:", err)
          setFilteredQuotes([])
          setLoading(false)
        })
    }, 500)

    return () => clearTimeout(getData)
  }, [userInput])

  return (
    <div>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Add custom item"
      />
      <button onClick={handleItem}>Add Item</button>
      <ul>
        {itemList.map((listItem, index) => (
          <li key={`${listItem}-${index}`}>{listItem}</li>
        ))}
      </ul>

      <br />
      <hr />
      <br />

      <p>Search Quotes by author (ex.. Rumi, Buddha, Einstein):</p>
      <br />
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type author name..."
      />

      <br />
      <br />
      {loading && <p>Searching...</p>}

      <ul>
        {!loading && filteredQuotes.length > 0
          ? filteredQuotes.map((item) => (
              <li key={item.id}>
                <strong>{item.author}:</strong> "{item.quote}"
              </li>
            ))
          : userInput.trim() &&
            !loading && <li>No quotes found for this author.</li>}
      </ul>
    </div>
  )
}

export default Cart
