// src/ClientDetails.js
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL_CLIENT, BASE_URL_CONTACT } from "../utils/constants";
import axios from "axios";
import { Button } from "react-bootstrap";
import ClientDetailModal from "../components/ClientDetailModal";

const ContactDetails = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchClients();
    fetchContacts();
  }, []);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

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

  const fetchContacts = () => {
    axios
      .get(BASE_URL_CONTACT)
      .then((response) => setContacts(response.data))
      .catch((error) => console.log("Error fetching contacts:", error));
  };

  const id = useParams();

  const contact = contacts.find((c) => c.id === id.id);
  const linkedClients = clients.filter(
    (client) => contact && contact.linkedContacts.includes(client.clientCode)
  );

  if (!contact) {
    return <div>Client not found</div>;
  }

  return (
    <div>
      {/* <h2>{client.name}</h2> */}
      <p>Name: {contact.description}</p>
      <p>Surname: {contact.description}</p>
      <p>Email Address: {contact.clientCode}</p>

      <div className="d-flex justify-content-between">
        <h3>Linked Contacts</h3>
        <div className="d-flex justify-content-between">
          <div>
            <Button onClick={handleOpenModal}>Link/UnLink Contacts</Button>
          </div>
        </div>
      </div>

      {linkedClients.length !== 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email Address</th>
            </tr>
          </thead>
          <tbody>
            {linkedClients.map((client) => (
              <tr key={client.id}>
                <td>
                  {client.name}
                  {/* <Link to={`/contact/${contact.id}`}>{contact.name}</Link> */}
                </td>
                <td>{client.surname}</td>
                <td>{client.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No contacts found.</p>
      )}
      {/* <ClientDetailModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        clientProp={client}
      /> */}
    </div>
  );
};

export default ContactDetails;
