import React, { useEffect, useState } from "react";
import { Modal, Button, Nav, Tab } from "react-bootstrap";

import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL_CLIENT, BASE_URL_CONTACT } from "../utils/constants";

const ContactDetailModal1 = ({ showModal, handleCloseModal, contactProp }) => {
  const [linkedContacts, setLinkedContacts] = useState([]);
  const [linkedClients, setLinkedClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    setLinkedClients(contactProp.linkedClients);
    fetchClients();
    // console.log(clients);
  }, []);

  const fetchClients = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_CLIENT);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const clientData = JSON.parse(xhr.responseText);
          setClients(clientData);
        } else {
          console.log("Error fetching contacts:", xhr.status, xhr.statusText);
        }
      }
    };

    xhr.send();
  };

  const handleSubmit = async (e) => {
    const updatedContact = {
      id: contactProp.id,
      name: contactProp.name,
      surname: contactProp.surname,
      email: contactProp.email,
      linkedClients: linkedClients,
    };

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${BASE_URL_CONTACT}/updatecontact`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log("Response:", JSON.parse(xhr.responseText));
          // Reload the page after successful submission
          window.location.reload();
        } else {
          console.error("Error:", xhr.status, xhr.statusText);
        }
      }
    };

    xhr.send(JSON.stringify(updatedContact));

    console.log(updatedContact);
    // window.location.reload();
    // console.log(clients);
    handleCloseModal();
  };

  const toggleLink = (clientId) => {
    if (linkedClients.includes(clientId)) {
      setLinkedClients(linkedClients.filter((id) => id !== clientId));
    } else {
      setLinkedClients([...linkedClients, clientId]);
    }
  };
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add/Remove a Link</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {clients.length !== 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Client Code</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id}>
                  <td>
                    {client.name}
                    {/* <Link to={`/contact/${client.id}`}>{client.name}</Link> */}
                  </td>
                  <td>{client.clientCode}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleLink(client._id)}
                  >
                    {linkedClients.includes(client._id) ? "Linked" : "Link"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No clients found.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactDetailModal1;
