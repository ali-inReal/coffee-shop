import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Chef = ({order,setOrder}) => {
 const [data,setData] = useState([]);
  useEffect(
  ()=>{
      axios.get("http://localhost:3000/accountant").then(
        (response)=>{
          setData(response.data)
        }
      )
  }
 )
 
 
  return (
    <div>
        <h1>Chef Screen</h1>
           <table border={"2px"}>
        <thead>
            <tr>
                <th>Name</th>
                <th>Quantity</th>
            </tr>
        </thead>
        <tbody>
            {
                    data.map(
                        (item,index)=>{
                            return (
                                
                                <tr>
                                    <td>{item.name}</td>
                
                                    <td>
                                        {item.quantity}
                                    </td>
                                </tr>
                            )
                        }
                    )
            }
        </tbody>
    </table>
 
    </div>
  )
}
