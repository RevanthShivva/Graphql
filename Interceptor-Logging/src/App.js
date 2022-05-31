import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
   const [data, setData] = useState(null);
   const [val, setVal] = useState('');
   const [fetchData, setFetch] = useState(false);

   useEffect(() => {

      if (fetchData) {
         const payload = {
            method: 'POST',
            body: JSON.stringify({ title: val }),
         };
         axios.post('https://jsonplaceholder.typicode.com/posts', payload)
.then((res) => setData(res.data.id));
      }
   }, [fetchData]);
  return (
    <>
    {data && <h1>Your data is saved with Id: {data}</h1>}
    <input
       placeholder="Username"
       value={val}
       onChange={(e) => setVal(e.target.value)}
    />
    <button onClick={() => setFetch(true)}>Save Data</button>
    </>
 );
}

export default App;
