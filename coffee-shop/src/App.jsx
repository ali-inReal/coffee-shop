import { useState } from 'react'
import './App.css'
import { Chef } from './Components/Chef'
import { Menu } from './Components/Menu'
import banner from "./assets/banner.jpg"
import { Accountant } from './Components/Accountant'
function App() {

  const [order,setOrder] = useState([]);
  
  return (
    <div style={{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"column"
    }}>
    <h1 style={{
      marginTop:"1rem"
    }}>COFFEE SHOP</h1>    
    <Menu order={order} setOrder={setOrder} />
    <hr style={{width:"100vw",marginTop:"1rem"}} />
    <Accountant/>
    <hr  style={{width:"100vw",marginTop:"1rem"}} />
    <Chef/>
    </div>
  )
}

export default App
