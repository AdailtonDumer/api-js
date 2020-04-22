import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/Api'

import './styles.css'
import {FiLogIn} from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon(){
  //state para armazenar o dado do input
  const [id, setId] = useState('')
  
  const history = useHistory()

  async function handleLogin(e){
    e.preventDefault()

    //tenta se conectar com o login do usuário
    try{
      const response = await api.post('sessions', {id})
      
      //armazena os dados no navegador para serem usados futuramente
      localStorage.setItem('ongId',id)
      localStorage.setItem('ongName',response.data.name) 

      history.push('/profile');
    }catch{
      alert('Falha ao se conectar, tente novamente')
    }
  }

    return(
      <div className="logon-container">
          <section className="form">
            <img src={logoImg} alt="Logo"/>

            <form onSubmit={handleLogin} > 
                <h1>Faça seu logon</h1>
                
                <input 
                placeholder = "Sua ID"
                value = {id}
                onChange= {e => setId(e.target.value) } />
                <button className= "button" type="submit">Entrar</button>

                <Link className = "back-link" to="/register"> 
                <FiLogIn size={16} color = "e02041"/>
                 Não tenho cadastro 
                 </Link>


            </form>
          </section>

          <img src= {heroesImg} alt= "Heroes" />
      </div>  
    )
}