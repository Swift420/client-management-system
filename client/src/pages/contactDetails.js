// src/ClientDetails.js
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL_CLIENT, BASE_URL_CONTACT } from "../utils/constants";
import axios from "axios";
import { Button } from "react-bootstrap";
import ClientDetailModal from "../components/ClientDetailModal";
import ContactDetailModal1 from "../components/contactDetailModal1";
// import ContactDetailModal from "../components/ContactDetailModal";

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

  const fetchContacts = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_CONTACT);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const contactData = JSON.parse(xhr.responseText);
          setContacts(contactData);
        } else {
          console.log("Error fetching clients:", xhr.status, xhr.statusText);
        }
      }
    };

    xhr.send();
  };

  const fetchClients = () => {
    axios
      .get(BASE_URL_CLIENT)
      .then((response) => setClients(response.data))
      .catch((error) => console.log("Error fetching contacts:", error));
  };

  const id = useParams();
  //   const id = "1690148554553";
  //   console.log(id);
  const contact = contacts.find((c) => c.id === id.id);
  const linkedClients = clients.filter(
    (client) => contact && contact.linkedClients.includes(client._id)
  );
  console.log(linkedClients);
  if (!contact) {
    return <div>Contact not found</div>;
  }

  return (
    <div>
      {/* <h2>{client.name}</h2> */}
      <p>Name: {contact.name}</p>
      <p>Surname: {contact.surname}</p>
      <p>Email Address: {contact.email}</p>

      <div className="d-flex justify-content-between">
        <h3>Linked Clients</h3>
        <div className="d-flex justify-content-between">
          <div>
            <Button onClick={handleOpenModal}>Link/UnLink Clients</Button>
          </div>
        </div>
      </div>

      {linkedClients.length !== 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>ClientCode</th>
            </tr>
          </thead>
          <tbody>
            {linkedClients.map((client) => (
              <tr key={client.id}>
                <td>
                  {client.name}
                  {/* <Link to={`/contact/${contact.id}`}>{contact.name}</Link> */}
                </td>
                <td>{client.clientCode}</td>
                {/* <td>{client.email}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No clients found.</p>
      )}
      <ContactDetailModal1
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        contactProp={contact}
      />
    </div>
  );
};

export default ContactDetails;
