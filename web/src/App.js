import React, { useEffect, useState } from 'react';

import api from './services/api';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  const [devs, setDevs] = useState([]);
  const [devEdit, setDevEdit] = useState(null);

  useEffect(() => {
    loadDevs();
  }, []);

  async function loadDevs() {
    const response = await api.get('/devs');

    setDevs(response.data);
  }

  function handleAddDev(data) {
    if (devEdit) {
      editDev(data);
    } else {
      saveDev(data);
    }
  }

  async function saveDev(data) {
    const response = await api.post('/devs', data);

    if (response.data) {
      setDevs([...devs, response.data]);
    }
  }

  async function editDev(data) {
    const { _id } = data;

    const response = await api.put(`/devs/${_id}`, data);

    if (response.data) {
      setDevEdit(null);
      loadDevs();
    }
  }

  async function removeDev(id) {
    await api.delete(`/devs/${id}`);

    const currentDevs = devs.filter(dev => dev._id !== id);
    setDevs([...currentDevs]);
  }

  function handleEditDev(data) {
    setDevEdit(data);
  }

  return (
    <div id="app">
      <aside>
        <strong>{devEdit ? 'Editar' : 'Cadastrar'}</strong>

        <DevForm onSubmit={handleAddDev} data={devEdit} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} remove={removeDev} edit={handleEditDev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
