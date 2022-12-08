import React,{useState,useEffect} from 'react'
import axios from 'axios'
const Pages = () => {
    const[data,setData] = useState([]);
    let totalPages = data.length/10;
    const[currIndex,setCurrIndex] = useState(0);
    const[lastIndex,setLastIndex] = useState(10);
    const[page,setPage] = useState(1);
    
    const array = new Array(totalPages)

    for(let i = 1;i<totalPages+1;i++){
        array[i] = i;
    }
    useEffect(() => {
        const fetchData = () => {
            axios.get('https://jsonplaceholder.typicode.com/todos').then(data => setData(data.data))
        }
        fetchData()
    },[])

    let nextActive = lastIndex == totalPages*10 ? true : false;
    let prevActive = currIndex == 0 ? true : false

    const filteredData = data.slice(currIndex,lastIndex);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <div>
        <h1>Pagination</h1>
      </div>
      <div>
        <ul>
          {filteredData.map((item) => (
            <h3>{item.title}</h3>
          ))}
        </ul>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button
          disabled={prevActive}
          onClick={() => {
            if (currIndex != 0) {
              setCurrIndex(currIndex - 10);
              setLastIndex(lastIndex - 10);
              setPage(page-1);
            }
          }}
        >
          Previous
        </button>
        <div >
          {array.map((item, index) => (
            <span key={index} style={{margin:'10px', color: page === index ? 'green' : 'black',fontSize:page === index ? '18px' : '10px'}}>{item}</span>
          ))}
        </div>

        <button
          onClick={() => {
            if (lastIndex != totalPages * 10) {
              setCurrIndex(currIndex + 10);
              setLastIndex(lastIndex + 10);
              setPage(page+1);
            }
          }}
          disabled={nextActive}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pages