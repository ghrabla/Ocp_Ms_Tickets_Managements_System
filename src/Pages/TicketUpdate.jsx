import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function TicketUpdate() {

  const { id } = useParams();

  const [values, setValues] = useState({
    Titre: '',
    Description: '',
    Priorite: '',
    DateLimite: '',
    Statut: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://localhost:7161/Tickets/`+id)
      .then(res => {
        setValues(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put(`https://localhost:7161/Tickets/`+id, values)
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-4 rounded'>
        <h1>Update a Ticket</h1>
        <form onSubmit={handleUpdate}>
          <div className='mb-2'>
            <label htmlFor="Titre">Titre: </label>
            <input
              type="text"
              name="Titre"
              className='form-control'
              placeholder='Entrer le Titre'
              value={values.titre} // Use values state here
              onChange={e => setValues({ ...values, titre: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="Description">Description: </label>
            <input
              type="text"
              name="Description"
              className='form-control'
              placeholder='Description...'
              value={values.description}
              onChange={e => setValues({ ...values, description: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="Priorite">Priorite: </label>
            <input
              type="number"
              name="Priorite"
              className='form-control'
              value={values.priorite} // Use values state here
              onChange={e => setValues({ ...values, priorite: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="DateLimite">Date limite: </label>
            <input
              type="date"
              name="DateLimite"
              className='form-control'
              value={values.dateLimite} // Use values state here
              onChange={e => setValues({ ...values, dateLimite: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="Statut">Statut: </label>
            <input
              type="text"
              name="Statut"
              className='form-control'
              value={values.statut} // Use values state here
              onChange={e => setValues({ ...values, statut: e.target.value })}
            />
          </div>
          <button className='btn btn-success' name='Submit'>Update</button>
          <Link to="/" className="btn btn-primary ms-3">Back</Link>
        </form>
      </div>
    </div>
  );
}

export default TicketUpdate;
