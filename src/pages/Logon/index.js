import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './style.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
  const [id, setId] = useState('')
  const history = useHistory();

  async function handlerLogin(e) {
    e.preventDefault();

    const data = ({
      id
    });
    try {
      const response = await api.post('/session', data)
      localStorage.setItem('ongId', data.id)
      localStorage.setItem('ongNome', response.data.nome)
      console.log(response.data.nome)
      history.push('/profile')
    } catch (error) {
      console.log(error)
      alert('Essa ONG não estar cadastrada')
    }
  }
  return (
    <div className="logon-container">

      <section className="form">
        <img src={logoImg} alt="Hero" />

        <form onSubmit={handlerLogin}>
          <h1>Faça seu logon</h1>

          <input
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="Sua ID" />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02141" />
            Não tenho cadastro
          </Link>

        </form>
      </section>

      <img src={heroesImg} alt="pessoas" />
    </div>
  );
};