import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';

function App() {
  const [data, setData] = useState([]);

  const URL = 'http://localhost:3001'

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setData(response.data);

      }).catch((response) => {
        alert('Error: ' + response.code + '\n' + response.message);
      }
      );
  }, [])


  return (
    <>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
