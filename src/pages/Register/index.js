import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import './style.css';
import api from '../../services/api';

import heroesImg from '../../assets/logo.svg';


export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhats] = useState('');
  const [city, setCidade] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    const data = ({
      nome,
      email,
      whatsapp,
      city,
      uf
    })
    try {
      const response = await api.post('/ongs', data)
      alert(`Seu ID de acesso é: ${response.data.id}`)
      history.push('/')
    } catch (error) {
      console.log(error)
      alert("Erro ao cadastrar nova ONG")
    }
  };

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={heroesImg} alt="heroes" />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontraram os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para logon
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome da ONG" />
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="E-mail" />
          <input value={whatsapp} onChange={e => setWhats(e.target.value)} placeholder="WhatsApp" />

          <div className="input-group">
            <input value={city} onChange={e => setCidade(e.target.value)} placeholder="Cidade" />
            <input value={uf} onChange={e => setUf(e.target.value)} placeholder="UF" style={{ width: 80 }} />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
