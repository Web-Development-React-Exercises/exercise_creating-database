import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editedTask, setEditedTask] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');


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
      .then(() => {
        const newTaskWithoutRemoved = data.filter((task) => task.id !== id);
        setData(newTaskWithoutRemoved);
      })
      .catch(error => {
        alert('Error: ' + error.code + '\n' + error.message);
      })
  }

  function edit(id) {
    const json = JSON.stringify({id: editedTask.id, description: editedTaskText});
    axios.put(URL + '/edit', json, {headers: {'Content-Type': 'application/json'}})
      .then(()=>{
        const tempArray = [...data];
        const index = tempArray.findIndex((task) => task.id === id);
        tempArray[index].description = editedTaskText;
        setData(tempArray);
        setEditedTask(null);
      })
      .catch(error => { 
        alert('Error: ' + error.code + '\n' + error.message);
      })
  }

  function setEdited(task) {
    setEditedTask(task);
    setEditedTaskText(task.description);
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
          <li key={item.id}>
            {editedTask?.id !== item.id &&
              item.description + ''}
            {editedTask?.id === item.id &&
              <form >
                <input value={editedTaskText} onChange={e => setEditedTaskText(e.target.value)} />
                <button onClick={()=>edit(item.id)}>Save</button>
                <button onClick={() => setEditedTask(null)}>Cancel</button>
              </form>
            }
            <a href="#" onClick={() => remove(item.id)}>Remove</a>&nbsp;
            {editedTask === null &&
              <a href="#" onClick={() => setEdited(item)}>Edit</a>
            }
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
