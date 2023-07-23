// src/ClientList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { clients } from "../data/mockData";
import { Button, Modal } from "react-bootstrap";
import ClientContactModal from "../components/ClientModal";
import axios from "axios";
import { BASE_URL_CLIENT } from "../utils/constants";
const Client = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchClients();
  });

  const fetchClients = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_CLIENT);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const clientsData = JSON.parse(xhr.responseText);
          setClients(clientsData);
        } else {
          console.log("Error fetching clients:", xhr.status, xhr.statusText);
        }
      }
    };

    xhr.send();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>Clients</h2>
        <div className="d-flex justify-content-between">
          <div>
            <Button onClick={handleOpenModal}>Create a Client</Button>
          </div>
          <p className="text-white">__</p>
          <Link to="/contacts">
            <Button
              className="mr-1"
              variant="warning"
              onClick={handleOpenModal}
            >
              Contacts
            </Button>
          </Link>
        </div>
      </div>
      {clients.length !== 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Client Code</th>
              <th>No. of Linked Contacts</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.clientCode}>
                <td>
                  <Link to={`/clients/${client.clientCode}`}>
                    {client.name}
                  </Link>
                </td>
                <td>{client.clientCode}</td>
                <td>{client.linkedContacts.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No clients found.</p>
      )}

      <ClientContactModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default Client;
