import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'
import './styles.css'

import api from '../../services/api'
import logoImg from '../../assets/logo.svg'

const Profile = () => {
    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')
    const history = useHistory()

    const [ incidents, setIncidents ] = useState([])

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        })
        .then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    const handleDeleteIncident = async (id) => {
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id))
        }
        catch(err){
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    const handleLogout = () => {
        localStorage.clear()
        history.push('/')
    }

    return(
        <div className='profile-container'>
            <header>
                <img src={logoImg} alt='Loho'/>
                <spam>Bem Vinda, {ongName}!</spam>

                <Link to='/incidents/new' className='button'>
                    Cadastrar novo caso
                </Link>
                <button type='button' onClick={handleLogout}>
                    <FiPower color='#E02041' size={18}/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {
                    incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>
                            
                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>
                            
                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                            
                            <button type='button' onClick={() => handleDeleteIncident(incident.id)}>
                                <FiTrash2 color='#A8A8B3' size={20}/>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Profile