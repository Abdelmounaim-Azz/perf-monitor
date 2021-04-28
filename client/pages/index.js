import {useState,useEffect} from 'react'
import styles from '../styles/Home.module.css';
import socket from "../utils/socketConn"
export default function Home() {
  const [perfData,setPerfData]=useState({});
  let sections=[];
  useEffect(()=>{
    socket.on('data',(data)=>{
      const currData={...perfData};
      currData[data.macAdress]=data;
      setPerfData(currData);
    })
  },[data])
  return (
    <div className={styles.container}>
     <ul>
       
     </ul>
    </div>
  )
}
