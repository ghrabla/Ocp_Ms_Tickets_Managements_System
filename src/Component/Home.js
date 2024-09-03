import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const Home = () => {
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    priorite: "",
    dateLimite: "",
    status: "",
    ref: null
  });

  const [loading, setLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const setUpdateOnchange = (ticket) => {
    setIsUpdate(true);
    setFormData(ticket);
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const getTicket = async () => {
    try {
      const response = await axios.get("https://localhost:7161/api/Ticket");
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTicket = async (id) => {
    try {
      await axios.delete(`https://localhost:7161/api/Ticket/${id}`);
      setTickets(tickets.filter((ticket) => ticket.id !== id));
    } catch (error) {
      console.error("Error deleting ticket", error);
    }
  };

  const createTicket = async (createTicket) => {
    try {
      await axios.post(`https://localhost:7161/api/Ticket`, createTicket);
    } catch (error) {
      console.error("Error updating ticket", error);
    }
  };

  const updateTicket = async (id, updatedTicket) => {
    try {
      await axios.put(`https://localhost:7161/api/Ticket/${id}`, updatedTicket);
      getTicket();
      setIsUpdate(false);
      setFormData({
        titre: "",
        description: "",
        priorite: "",
        dateLimite: "",
        status: "",
        ref: null
      });
    } catch (error) {
      console.error("Error updating ticket", error);
    }
  };

  useEffect(() => {
    getTicket();
  }, []);

  return (
    <div className="container mt-4">
      {loading ? (
        <p>Chargement des données...</p>
      ) : (
        <Table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Titre</th>
              <th scope="col">Description</th>
              <th scope="col">Priorite</th>
              <th scope="col">Date Limite</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
            <tr>
              <td></td>
              <td>
                <input type="text" name="titre" value={formData.titre} onChange={onChange} />
              </td>
              <td>
                <input type="text" name="description" value={formData.description} onChange={onChange} />
              </td>
              <td>
                <input type="text" name="priorite" value={formData.priorite} onChange={onChange} />
              </td>
              <td>
                <input type="text" name="dateLimite" value={formData.dateLimite} onChange={onChange} />
              </td>
              <td>
                <input type="text" name="status" value={formData.status} onChange={onChange} />
              </td>
              <td>
                <Button size="sm" onClick={() => isUpdate ? updateTicket(formData.id, formData) : createTicket(formData)}>
                  {isUpdate ? "Update" : "Add"}
                </Button>
              </td>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => {
              let rowClass = "";
              if (ticket.status === "Done") {
                rowClass = "table-success";
              } else if (ticket.status === "encours") {
                rowClass = "table-warning";
              }
              return (
                <tr className={rowClass} key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.titre}</td>
                  <td>{ticket.description}</td>
                  <td>{ticket.priorite}</td>
                  <td>{ticket.dateLimite}</td>
                  <td>{ticket.status}</td>
                  <td>
                    <Button variant="primary" size="sm" onClick={() => setUpdateOnchange(ticket)}>
                      Edit
                    </Button>{" "}
                    |{" "}
                    <Button variant="danger" size="sm" onClick={() => deleteTicket(ticket.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Home;
