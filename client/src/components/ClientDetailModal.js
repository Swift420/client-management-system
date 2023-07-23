import React, { useEffect, useState } from "react";
import { Modal, Button, Nav, Tab } from "react-bootstrap";

import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL_CLIENT, BASE_URL_CONTACT } from "../utils/constants";

const ClientDetailModal = ({ showModal, handleCloseModal, clientProp }) => {
  const [linkedContacts, setLinkedContacts] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setLinkedContacts(clientProp.linkedContacts);
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_CONTACT);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const contactsData = JSON.parse(xhr.responseText);
          setContacts(contactsData);
        } else {
          console.log("Error fetching contacts:", xhr.status, xhr.statusText);
        }
      }
    };

    xhr.send();
  };

  const handleSubmit = async (e) => {
    const updatedClient = {
      name: clientProp.name,
      description: clientProp.description,
      clientCode: clientProp.clientCode,
      linkedContacts: linkedContacts,
    };

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${BASE_URL_CLIENT}/updateclient`);
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

    xhr.send(JSON.stringify(updatedClient));

    console.log(updatedClient);
    window.location.reload();
    handleCloseModal();
  };

  const toggleLink = (contactId) => {
    if (linkedContacts.includes(contactId)) {
      setLinkedContacts(linkedContacts.filter((id) => id !== contactId));
    } else {
      setLinkedContacts([...linkedContacts, contactId]);
    }
  };
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add/Remove a Link</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {contacts.length !== 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>
                    <Link to={`/contact/${contact.id}`}>{contact.name}</Link>
                  </td>
                  <td>{contact.email}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleLink(contact.id)}
                  >
                    {linkedContacts.includes(contact.id) ? "Linked" : "Link"}
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

export default ClientDetailModal;
