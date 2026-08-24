import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './context/login'

interface stringType{
  name : string
}


const Toolbar = () => {
  const theme = useContext(ThemeContext); 
  
  const [data, setData] = useState<stringType>({name:'Alex'})
  const abc: stringType = { name: 'Bob' }
  
  useEffect(()=>{
    setData(abc)
    console.log(data);
  },[])

  
  const divStyle = {
    backgroundColor: theme === "dark" ? "#333333" : "#ffffff",
    color: theme === "dark" ? "#ffffff" : "#000000",
    padding: "20px"
  };

 
  return (

    <div style={divStyle}>
      <h1>Welcome to the App</h1>
    </div>
  )
}

export default Toolbar;
