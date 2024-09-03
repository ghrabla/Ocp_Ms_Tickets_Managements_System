import React, { Component, useEffect } from "react";
import { TicketConsumer } from "../Context";
import { Table, Button } from "react-bootstrap";
import axios from "axios";


export default Home {
    const rowData = async () => {
        try {
          const response = await axios.get("https://localhost:7161/api/Ticket");
          console.log(response.data);
          return response.data;
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };

    useEffect(() => {
        console.log(1234567);
        
        rowData();
    },[])

    return (
      <div className="container mt-4">
        <TicketConsumer>
          {(value) => {
            if (!value.AllData || !Array.isArray(value.AllData)) {
              return <p>Chargement des données...</p>;
            }
            return (
              <Table class="table table-bordered">
                <tbody>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Titre</th>
                    <th scope="col">Description</th>
                    <th scope="col">Priorite</th>
                    <th scope="col">Date Limite</th>
                    <th scope="col">Statut</th>
                    <th scope="col">Actions</th>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <input
                        type="text"
                        value={value.Titre}
                        onChange={(e) => {
                          value.updateValue(e, "Titre");
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={value.Description}
                        onChange={(e) => {
                          value.updateValue(e, "Description");
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={value.Priorite}
                        onChange={(e) => {
                          value.updateValue(e, "Priorite");
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={value.DateLimite}
                        onChange={(e) => {
                          value.updateValue(e, "DateLimite");
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={value.Statut}
                        onChange={(e) => {
                          value.updateValue(e, "Statut");
                        }}
                      />
                    </td>
                    <td>
                      <Button
                        size="sm"
                        onClick={() => {
                          value.onSave(value.id);
                        }}
                      >
                        {value.id ? "Save" : "Add New Ticket"}
                      </Button>
                    </td>
                  </tr>
                  {value.AllData.map((ticket) => {
                    let rowClass = "";
                    if (ticket.Statut === "Done") {
                      rowClass = "table-success";
                    } else if (ticket.Statut === "encours") {
                      rowClass = "table-warning";
                    }
                    return (
                      <tr className={rowClass}>
                        <td>{ticket.id}</td>
                        <td>{ticket.Titre}</td>
                        <td>{ticket.Description}</td>
                        <td>{ticket.Priorite}</td>
                        <td>{ticket.DateLimite}</td>
                        <td>{ticket.Statut}</td>
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              value.onEdit(ticket.id);
                            }}
                          >
                            Edit
                          </Button>{" "}
                          |{" "}
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => {
                              value.onDelete(ticket.id);
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            );
          }}
        </TicketConsumer>
      </div>
    );
}
