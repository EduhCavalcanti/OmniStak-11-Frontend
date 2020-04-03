import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './style.css';

import heroesImg from '../../assets/logo.svg';

export default function NewIncident() {
  const history = useHistory();
  const [title, setTitulo] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId')

  async function handlerNewIncidents(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };
    try {
      await api.post('incidents', data, {
        headers: {
          autorization: ongId
        }
      });
      history.push('/profile')
    } catch (error) {
      alert('Algo de errado aconteceu')
    }
  };

  return (
    <div className="new-incidents">
      <div className="content">
        <section>
          <img src={heroesImg} alt="heroes" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handlerNewIncidents} >
          <input
            value={title}
            onChange={e => setTitulo(e.target.value)}
            placeholder="Titulo do caso" />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição" />
          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Valor em reais" />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div >
  );
}
