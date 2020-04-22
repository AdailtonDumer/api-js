import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'



import api from '../../services/Api'
import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Register(){

    //States feitos para armazenar os dados fos inputs
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [whatsapp,setWhatsapp] = useState('')
    const [city,setCity] = useState('')
    const [uf,setUf] = useState('')

    const history = useHistory()

    //função para receber os dados e passar para o backend
    async function handleRegister (e){
        e.preventDefault()

        //objeto que armazena os dados
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }

       try{
            //passa os dados para o back, espera a resposta (await) e grava a resposta na const
            const response = await api.post('ongs', data)
            alert (`Seu ID de acesso: ${response.data.id}`)

            //volta para a tela inicial assim que o cadastro é concluído
            history.push('/')
            
       }catch(err){
           alert('Erro ao cadastrar')
       }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadstro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>

                <Link className = "back-link" to="/"> 
                <FiArrowLeft size={16} color = "e02041"/>
                 Voltar para o logon
                 </Link>
                </section>

                <form onSubmit= {handleRegister}>

                    <input 
                    placeholder="Nome da ONG"
                    value = {name}
                    onChange = {e => setName(e.target.value)}
                    />

                    <input 
                    type= "email" placeholder = "Email"
                    value = {email}
                    onChange = {e => setEmail(e.target.value)}
                    />

                    <input 
                    placeholder = "Whatsapp"
                    value = {whatsapp}
                    onChange = {e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                    <input 
                    placeholder = "Cidade" 
                    value = {city}
                    onChange = {e => setCity(e.target.value)}
                    />
                    <input 
                    placeholder = "UF"  style = {{ width: 80 }}
                    value = {uf}
                    onChange = {e => setUf(e.target.value)}
                    />
                    </div>

                    <button className="button" type = "submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}