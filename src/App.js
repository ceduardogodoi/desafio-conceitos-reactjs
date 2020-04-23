import React, { useEffect, useState } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api
      .get('/repositories')
      .then((response) => setRepositories(response.data))
      .catch((error) => console.error(error));
  }, []);

  async function handleAddRepository() {
    const random = Math.floor(Math.random() * 1000);

    const response = await api.post('/repositories', {
      title: `Repo ${random}`,
      url: `http://repo${random}`,
      techs: [],
    });

    const repository = await response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api
      .delete(`/repositories/${id}`)
      .then((response) => {
        if (response.status === 204) {
          const repos = repositories.filter(
            (repository) => repository.id !== id
          );

          setRepositories(repos);
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={(id) => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
