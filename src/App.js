import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [newTask, setNewTask] = useState('');


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

  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({ description: newTask })
    axios.post(URL + '/new', json, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        const addedObject = JSON.parse(json);
        addedObject.id = response.data.id;
        setData(data => [...data, addedObject]);
        setNewTask('');
      })
      .catch((response) => {
        alert('Error: ' + response.code + '\n' + response.message);
      });
  }

  function remove(id) {
    axios.delete(URL + '/delete' + '?id=' + id)
      .then(()=>{
        const newTaskWithoutRemoved = data.filter((task) => task.id !== id);
        setData(newTaskWithoutRemoved);
      })
      .catch (error => {
        alert('Error: ' + error.code + '\n' + error.message);
      })
  }


  return (
    <>
      <h3>Tasks</h3>
      <form onSubmit={save}>
        <label htmlFor="">Add Task</label>
        <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} />
        <button>Submit</button>
      </form>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.description} <a href="#" onClick={()=>remove(item.id)}>Remove</a> </li>
        ))}
      </ul>
    </>
  );
}

export default App;
