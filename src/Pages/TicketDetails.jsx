import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function TicketDetails() {
    const [data, setData] = useState({});
    const { id } = useParams();

    useEffect(() => {
      axios.get(`https://localhost:7161/Tickets/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
    }, [id]);

    return (
      <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
        <div className='w-50 border bg-white shadow px-5 pt-4 rounded'>
          <h3>Detail de Ticket</h3>
          <div className='mb-2'>
            <strong>Titre : </strong>{data.titre}
          </div>
          <div className='mb-2'>
            <strong>Description : </strong>{data.description}
          </div>
          <div className='mb-2'>
            <strong>Priorite : </strong>{data.priorite}
          </div>
          <div className='mb-2'>
            <strong>Date Limite : </strong>{data.dateLimite}
          </div>
          <div className='mb-2'>
            <strong>Statut : </strong>{data.statut}
          </div>
          <div className='mb-2'>
            <strong>Réference : </strong>{data.ref}
          </div>
          <Link to={`/update/${id}`} className='btn btn-success'>Update</Link>
          <Link to="/" className="btn btn-primary ms-3">Back</Link>
        </div>
      </div>
    );
}

export default TicketDetails;
