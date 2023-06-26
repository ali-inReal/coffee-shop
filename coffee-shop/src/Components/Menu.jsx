import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from "axios"
export const Menu = ({order,setOrder}) => {
    const arr =["Tea","Cold Coffee","Hot Coffee","Sweets"];
    const [cat,setCat] = useState("Tea")
    const [table,setTable] = useState(0)
    const [quantity,setQuantity] = useState([])
    const [arr2,setArr2] = useState([])
    useEffect(
        ()=>{
            let c = ""
            if(cat==="Tea")
            {
                c = "tea"
            }
            else if (cat==="Cold Coffee")
            {
                c = 'coffee'
            }
            else if(cat ==="Hot Coffee")
            {
                c = "h_coffee"
            }
            else if("Sweets")
            {
                c = "sweets"
            }
            axios.get('http://localhost:3000/'+c).then(
                (response)=>{
                    setArr2(response.data)
                    const q = []
                    for (let index = 0; index < response.data.length; index++) {
                        q.push(0)   
                    }
                    order.map(
                        (item,index)=>{
                            response.data.map(
                                (item1,index1)=>{
                                    if(item.name === item1.Name)
                                    {
                                            q[index1] = item.quantity
                                    }
                                }
                            )
                        }
                    )

                    
                    
                    setQuantity(q)
                    console.log(q)
                }
            )
        },[cat]
    )

    function orderNow()
    {
        let data ={
            table:table,
            order: order
        }
        axios.post('http://localhost:3000/accountant',data).then(
            (response)=>{
                alert(response.data)
            }
        )
    }

    function count(sign,item)
    {
        const items = []
        quantity.map(
            (ite,index)=>{
                items.push(ite)
            }
        )
        console.log(items)
        for (let index = 0; index < arr2.length; index++) {
            if(index===item)
            {
                if(sign==="-" && items[item]>0)
                items[index]--;
                else if(sign==="+")
                {
                    let flag = true
                    items[index]++;
                    for (let i = 0; i < order.length; i++) {
                        if(order[i].name === arr2[index].Name)
                        {
                            const o = []
                            order.map(
                                (a,b)=>{
                                    o.push(a)
                                }
                            )
                            o[i].quantity = items[index]
                            setOrder(o)
                            flag = false
                        }
                        
                    }
                    if(flag)
                    setOrder([...order,{name:arr2[index].Name,price:arr2[index].Price,quantity:items[index],}])
                }
            }
            
        }
     setQuantity(items)
     console.log(order)
    }
    return (
    <>
    <div>
        <h2>Table</h2>
        <button onClick={()=>{if(table>0)setTable(table-1)}}>-</button>
        {table}
        <button onClick={()=>{if(table<15)setTable(table+1)}}>+</button>
    
    </div>
    <div style={{display:"flex",gap:"1rem"}}>
        {
            arr.map(
                (cat,index)=>{
                    return <button style={{
                        padding:"10px",
                        color:"white",
                        backgroundColor:"black",
                        border:"none",
                        borderRadius:"10%",
                        margin:"1rem",
                        width:"100px",
                        cursor:"pointer",

                    }} key={index} onClick={()=>setCat(cat)} >{cat}</button>
                } 
            )
        }
    </div>
    <table border={"2px"}>
        <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            {
                    arr2.map(
                        (item,index)=>{
                            return (
                                
                                <tr>
                                    <td>{item.Name}</td>
                                    <td>{item.Price}</td>
                                    <td>
                                        <button onClick={()=>{count("-",index)}}>-</button>
                                        {quantity[index]}
                                        <button onClick={()=>{count("+",index)}}>+</button>
                                    </td>
                                    <td>
                                        {
                                            item.Price*quantity[index]
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    )
            }
        </tbody>
    </table>
    <button onClick={()=>{orderNow()}}>Order Now</button>
    </>
  )
}
