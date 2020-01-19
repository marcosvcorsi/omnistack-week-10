import React from 'react';

import './styles.css';

import { MdEdit, MdClose } from 'react-icons/md'

function DevItem({ dev, remove, edit }) {

  function handleRemove() {
    remove(dev._id);
  }

  function handleEdit() {
    edit(dev);
  }

  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
        <MdEdit className="action-button" onClick={handleEdit} />
        <MdClose className="action-button" onClick={handleRemove} />
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar perfil no Github
      </a>
    </li>
  );
}

export default DevItem;
