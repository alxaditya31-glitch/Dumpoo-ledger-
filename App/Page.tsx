
'use client'
import {useState,useEffect} from 'react';

export default function Page(){
 const [amount,setAmount]=useState('');
 const [type,setType]=useState('Cash Sale');
 const [items,setItems]=useState<any[]>([]);

 useEffect(()=>{
   const d=localStorage.getItem('dumpoo');
   if(d) setItems(JSON.parse(d));
 },[]);

 const save=(arr:any[])=>{
   setItems(arr);
   localStorage.setItem('dumpoo',JSON.stringify(arr));
 }

 const add=()=>{
   if(!amount) return;
   const arr=[...items,{type,amount:Number(amount),date:new Date().toLocaleString()}];
   save(arr);
   setAmount('');
 }

 const total=(t:string)=>items.filter(i=>i.type===t).reduce((a,b)=>a+b.amount,0);
 const profit=total('Cash Sale')+total('Online Sale')-total('Expense');

 return <div>
   <h1>🍜 Dumpoo Ledger</h1>
   <h2>Profit: ₹{profit}</h2>
   <select value={type} onChange={e=>setType(e.target.value)}>
     <option>Cash Sale</option>
     <option>Online Sale</option>
     <option>Expense</option>
     <option>Owner Withdrawal</option>
     <option>Owner Added</option>
   </select>
   <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount"/>
   <button onClick={add}>Add</button>
   <hr/>
   {items.slice().reverse().map((i,n)=><div key={n}>{i.date} - {i.type} - ₹{i.amount}</div>)}
 </div>
}
