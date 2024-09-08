import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function TicketCreate() {
    const [values, setValues] = useState({
        Titre: '',
        Description: '',
        Priorite: '',
        DateLimite: '',
        Statut: ''
    });
    
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`https://localhost:7161/Tickets`, values)
        .then(res => {
            console.log(res);
            navigate('/');
        })
        .catch(err => console.log(err));
    };

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-4 rounded'>
                <h1>Add a Ticket</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label htmlFor="Titre">Titre: </label>
                        <input type="text" name="Titre" className='form-control' placeholder='Entrer le Titre' onChange={e => setValues({...values, Titre: e.target.value})}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="Description">Description: </label>
                        <input type="text" name="Description" className='form-control' placeholder='Description...' onChange={e => setValues({...values, Description: e.target.value})}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="Priorite">Priorite: </label>
                        <input type="number" name="Priorite" className='form-control' onChange={e => setValues({...values, Priorite: e.target.value})}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="DateLimite">Date limite: </label>
                        <input type="date" name="DateLimite" className='form-control' onChange={e => setValues({...values, DateLimite: e.target.value})}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="Statut">Statut: </label>
                        <input type="text" name="Statut" className='form-control' onChange={e => setValues({...values, Statut: e.target.value})}/>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                    <Link to="/" className="btn btn-primary ms-3">Back</Link>
                </form>
            </div>
        </div>
    );
}

export default TicketCreate;
