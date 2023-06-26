import React from 'react'
import  { useEffect, useState } from 'react'
import axios from 'axios';

export const Accountant = () => {
    const [data,setData] = useState([]);
    // const [total,setTotal] = useState(0)
    useEffect(
    ()=>{
        axios.get("http://localhost:3000/accountant").then(
          (response)=>{
            setData(response.data)
          }
        )
    }
   )
   let total =0
  return (
    <div>
        <h1>Accountant Screen</h1>
        <table border={"2px"}>
        <thead>
            <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            {
                    
                    data.map(
                        (item,index)=>{
                            total=total+(item.price*item.quantity)
                            return (
                                
                                <tr>
                                    <td>{item.name}</td>
                
                                    <td>
                                        {item.quantity}
                                    </td>
                                    <td>{item.price}</td>
                                    <td>{item.price*item.quantity}</td>
                                </tr>
                            )
                        }
                    )
            }
            <tr>
                <td>
                    Grand Total
                </td>
                <td></td>
                <td></td>
                <td>{total}</td>
            </tr>
        </tbody>
    </table>
    </div>
  )
}
