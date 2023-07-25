import React, { useEffect, useState } from "react";
import { Modal, Button, Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URL_CLIENT, BASE_URL_CONTACT } from "../utils/constants";
import axios from "axios";

const ClientContactModal = ({ showModal, handleCloseModal }) => {
  const [activeTab, setActiveTab] = React.useState("general");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [linkedContacts, setLinkedContacts] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
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
    e.preventDefault();
    // if (!itemName) {
    //   alert("Please fill in all the required fields.");
    //   return;
    // }
    const newClient = {
      name: itemName,
      description: itemDescription,
      clientCode: itemName,
      linkedContacts: linkedContacts,
    };
    try {
      const response = await axios.post(
        `${BASE_URL_CLIENT}/addclient`,
        newClient
      );
      console.log("Response:", response.data);
    } catch (error) {
      alert(error.response.data.error);

      return;
    }

    // try {
    //   axios.post(`${BASE_URL_CLIENT}/addclient`, newClient);
    // } catch (error) {
    //   alert(error.response.data.error);
    // }

    // const xhr = new XMLHttpRequest();
    // xhr.open("POST", `${BASE_URL_CLIENT}/addclient`);
    // xhr.setRequestHeader("Content-Type", "application/json");

    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === XMLHttpRequest.DONE) {
    //     if (xhr.status === 200) {
    //       const clientData = JSON.parse(xhr.responseText);
    //       console.log("Response:", clientData);
    //     } else {
    //       const errorResponse = JSON.parse(xhr.responseText);
    //       alert(`Error: ${errorResponse.error}`);
    //     }
    //   }
    // };

    // xhr.send(JSON.stringify(newClient));
    setItemName("");
    setItemDescription("");
    setLinkedContacts([]);

    handleCloseModal();
  };

  const toggleLink = (contactId) => {
    if (linkedContacts.includes(contactId)) {
      setLinkedContacts(linkedContacts.filter((id) => id !== contactId));
    } else {
      setLinkedContacts([...linkedContacts, contactId]);
    }
  };

  const sortedContacts = [...contacts].sort((a, b) =>
    a.surname.localeCompare(b.surname)
  );
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Client</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container activeKey={activeTab}>
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link
                eventKey="general"
                onClick={() => handleTabChange("general")}
              >
                General
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="contacts"
                onClick={() => handleTabChange("contacts")}
              >
                Contacts
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="general">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="clientName">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="clientName"
                    required
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />

                  <label htmlFor="clientDescription">Description:</label>
                  <textarea
                    className="form-control"
                    id="clientDescription"
                    rows="4"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </Tab.Pane>
            <Tab.Pane eventKey="contacts">
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
                    {sortedContacts.map((contact) => (
                      <tr key={contact.id}>
                        <td>
                          <Link to={`/contact/${contact.id}`}>
                            {`${contact.surname} ${contact.name} `}
                          </Link>
                        </td>
                        <td>{contact.email}</td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => toggleLink(contact.id)}
                        >
                          {linkedContacts.includes(contact.id)
                            ? `http://localhost:5000/contacts/${contact.id}/linked`
                            : `http://localhost:5000/contacts/${contact.id}/link`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No clients found.</p>
              )}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
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

export default ClientContactModal;
