import React, { useEffect, useState } from "react";
import { Modal, Button, Nav, Tab } from "react-bootstrap";
// import { clients, contacts } from "../data/mockData";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL_CLIENT, BASE_URL_CONTACT } from "../utils/constants";

const ClientDetailModal = ({ showModal, handleCloseModal, clientProp }) => {
  const [activeTab, setActiveTab] = React.useState("general");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [itemContacts, setItemContacts] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  //   console.log(itemName);
  const [linkedContacts, setLinkedContacts] = useState([]);
  const [isLinked, setIsLinked] = useState(false);
  const [isLinkedState, setIsLinkedState] = useState("");
  const [contacts, setContacts] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL_CONTACT}`)
  //     .then((contacts) => setContacts(contacts.data))
  //     .catch((e) => console.log(e));

  //   // fetchClients();
  // }, []);

  useEffect(() => {
    setLinkedContacts(clientProp.linkedContacts);
    fetchContacts();
    console.log(contacts);
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
    // e.preventDefault();

    const updatedClient = {
      name: clientProp.name,
      description: clientProp.description,
      clientCode: clientProp.clientCode,
      linkedContacts: linkedContacts,
    };
    // console.log(newClient);

    // clients.push(newClient);

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
        {/* Content for Contacts tab */}
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
                    {/* Check if the contact is linked or not */}
                    {linkedContacts.includes(contact.id) ? "Linked" : "Link"}
                  </td>
                  {/* <td>{client.linkedContacts.length}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No clients found.</p>
        )}

        {/* You can add a list of contacts, input fields for contact details, etc. */}
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
