import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {FiArrowLeft} from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'

import api from '../../services/Api'
import './styles.css'

export default function NewIncident(){

    const history = useHistory()
    const ongId = localStorage.getItem('ongId')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    async function handleNewIncident (e){
        e.preventDefault()

        //objeto que armazena os dados
        const data = {
            title,
            description,
            value
        }


       try{
            //passa os dados para o back, espera a resposta (await) e grava a resposta na const
            await api.post('incidents', data, {
                headers:{
                    Authorization: ongId
                  }
            })
            alert ('Cadastrado com sucesso!')

            //volta para a tela inicial assim que o cadastro é concluído
            history.push('/profile')
            
       }catch(err){
           alert('Erro ao cadastrar')
       }
    }


    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o seu caso detalhadamente para encontrar um herói para resolver isso</p>

                <Link className = "back-link" to="/profile"> 
                <FiArrowLeft size={16} color = "e02041"/>
                 Voltar para home
                 </Link>
                </section>

                <form onSubmit = {handleNewIncident} >
                    <input 
                    placeholder="Título do caso"
                    value = {title}
                    onChange = {e => setTitle(e.target.value)}
                    />

                    <textarea 
                    placeholder = "Descrição"
                    value = {description}
                    onChange = {e => setDescription(e.target.value)}
                     />

                    <input 
                    placeholder = "Valor em reais" 
                    value = {value}
                    onChange = {e => setValue(e.target.value)}
                    />

                    <button className="button" type = "submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}