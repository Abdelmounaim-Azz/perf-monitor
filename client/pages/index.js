import {useState,useEffect} from 'react'
import styles from '../styles/Home.module.css';
import socket from "../utils/socketConn"
export default function Home() {
  const [perfData,setPerfData]=useState({});
  useEffect(()=>{
    socket.on('perfData',(data)=>{
      console.log(data)
    })
  },[])
  return (
    <div className={styles.container}>
     <ul>
       <li>
       </li>
     </ul>
    </div>
  )
}
