import {useState, useEffect} from "react";
import socket from "../utils/socketConn";
import {Section} from "../components/Section";
import {Title} from "../utils/use-title";
export default function Home() {
  const [perfData, setPerfData] = useState({});
  let sections = [];
  Object.entries(perfData).forEach(([key, value]) => {
    sections.push(<Section key={key} data={value} />);
  });
  useEffect(() => {
    socket.on("data", (data) => {
      const currData = {...perfData};
      currData[data.macAdress] = data;
      setPerfData(currData);
    });
  }, [perfData]);
  return (
    <>
      <Title title="Monitor your machine performance in real time." />
      <div class="container">{sections}</div>
    </>
  );
}
