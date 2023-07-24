import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import ContactModal from "../components/ContactModal";
import { BASE_URL_CONTACT } from "../utils/constants";

const Contact = () => {
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  });

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

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>Contacts</h2>
        <div className="d-flex justify-content-between">
          <div>
            <Button onClick={handleOpenModal}>Create a Contact</Button>
          </div>
          <p className="text-white">__</p>
          <Link to="/">
            <Button
              className="mr-1"
              variant="warning"
              onClick={handleOpenModal}
            >
              Clients
            </Button>
          </Link>
        </div>
      </div>
      {contacts.length !== 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Surname</th>
              <th>Email Address</th>
              <th className="text-center">No. of Linked Clients</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>
                  <Link to={`/contacts/${contact.id}`}>{contact.name}</Link>
                </td>

                <td>{contact.surname}</td>
                <td>{contact.email}</td>
                <td className="text-center">{contact.linkedClients.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No contacts found.</p>
      )}

      <ContactModal showModal={showModal} handleCloseModal={handleCloseModal} />
    </div>
  );
};

export default Contact;
