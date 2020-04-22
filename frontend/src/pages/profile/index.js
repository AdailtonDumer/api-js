import React, {useState,useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/Api'

import './styles.css'
import {FiPower, FiTrash2} from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'


export default function Profile(){
  const [incidents,setIncidents] = useState([])

  const usehistory = useHistory()
  //recolhe os dados do navegador para saber qual ong está conectada
  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName')

  //requisita a listagem de casos de uma ong e guarda no estado incidents
  useEffect(() => {
    api.get('profilelist', {
      headers :{
        Authorization : ongId
      }
    }).then(response =>{
      setIncidents(response.data)
    })
  }, [ongId])

  //deletar os casos
  async function handleDeleteIncident(id){
    try{
      await api.delete(`incidents/${id}`, {
        headers:{
          Authorization: ongId
        }
      })
      setIncidents(incidents.filter(incident => incident.id !== id))
    }catch(err){
      alert('Erro ao Deletar')
    }
  }

  //fazer logout
  function handleLogout(){
    localStorage.clear()

    usehistory.push('/')
  }


    return  (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Hero"/>
                <span>Bem vinda {ongName} </span>
                
                <Link className = 'button' to='/incidents/new'> Cadastrar novo caso </Link>

                <button type='button' onClick = {handleLogout}>
                    <FiPower size= {18} color="#e02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
              {incidents.map(incident => (
                 <li key={incident.id}>
                 <strong>CASO:</strong>
                 <p>{incident.title}</p>
 
                 <strong>DESCRIÇÃO:</strong>
                 <p>{incident.description}</p>
 
                 <strong>VALOR:</strong>
                 <p>{Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
              
                 <button type="button" onClick = {()=> handleDeleteIncident(incident.id)}>
                     <FiTrash2 size = {20} color = "#a8a8b3"/>
                 </button>
 
               </li>  
              ))}
            </ul>
        </div>
    ) 
    
}