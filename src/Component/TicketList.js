import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

function TicketList() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({ statut: "", priorite: "" });
  const [sortOption, setSortOption] = useState("dateLimite");

  useEffect(() => {
    axios.get('https://localhost:7161/Tickets')
      .then(res => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    filterSortSearchTickets();
  }, [data, searchTerm, filter, sortOption]);

  const filterSortSearchTickets = () => {
    let filtered = [...data];

    if (filter.statut) {
      filtered = filtered.filter(ticket => ticket.statut === filter.statut);
    }

    if (filter.priorite) {
      filtered = filtered.filter(ticket => ticket.priorite === parseInt(filter.priorite, 10)); // Fix here
    }

    if (searchTerm) {
      filtered = filtered.filter(ticket =>
        ticket.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.statut.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (sortOption === "dateLimite") {
        return new Date(a.dateLimite) - new Date(b.dateLimite);
      } else if (sortOption === "priorite") {
        return a.priorite - b.priorite;
      }
      return 0;
    });

    setFilteredData(filtered);
  };

  const deleteTicket = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce ticket ?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://localhost:7161/Tickets/${id}`);
        setData(data.filter((ticket) => ticket.id !== id));
      } catch (error) {
        console.error("Error deleting ticket", error);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1>Liste des Tickets</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex">
            <select className="me-3 form-control" onChange={(e) => setFilter({ ...filter, statut: e.target.value })}>
              <option value="">Filtrer par statut</option>
              <option value="résolu">Résolu</option>
              <option value="en cours">En cours</option>
              <option value="en attente">En attente</option>
            </select>

            <select className="me-3 form-control" onChange={(e) => setFilter({ ...filter, priorite: e.target.value })}>
              <option value="">Filtrer par priorité</option>
              <option value="0">0 (Haute)</option>
              <option value="1">1 (Faible)</option>
            </select>

            <select className="me-3 form-control" onChange={(e) => setSortOption(e.target.value)}>
              <option value="dateLimite">Trier par Date Limite</option>
              <option value="priorite">Trier par Priorité</option>
            </select>
          </div>

          <input
            type="search"
            placeholder="Rechercher..."
            className="form-control w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Titre</th>
              <th scope="col">Description</th>
              <th scope="col">Priorité</th>
              <th scope="col">Date Limite</th>
              <th scope="col">Statut</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((d, i) => {
              let rowClass = "";

              if (d.statut === "résolu") {
                rowClass = "table-success";
              } else if (d.statut === "en cours") {
                rowClass = "table-warning";
              } else if (d.statut === "en attente") {
                rowClass = "table-info";
              }

              return (
                <tr className={rowClass} key={i}>
                  <td>{d.id}</td>
                  <td>{d.titre}</td>
                  <td>{d.description}</td>
                  <td>{d.priorite}</td>
                  <td>{formatDate(d.dateLimite)}</td>
                  <td>{d.statut}</td>
                  <td>
                    <Link to={`/update/${d.id}`} className="btn btn-sm btn-primary me-2">
                      Update
                    </Link>
                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => deleteTicket(d.id)}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/ticket/${d.id}`}
                      className="btn btn-sm btn-info"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TicketList;
