import React, { useEffect, useState } from "react";
import { Modal, Button, Nav, Tab } from "react-bootstrap";
// import { clients, contacts } from "../data/mockData";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL_CLIENT, BASE_URL_CONTACT } from "../utils/constants";

const ClientContactModal = ({ showModal, handleCloseModal }) => {
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
    if (!itemName) {
      // Display an error message or handle validation errors
      alert("Please fill in all the required fields.");
      return;
    }
    const newClient = {
      name: itemName,
      description: itemDescription,
      clientCode: itemName,
      linkedContacts: linkedContacts,
    };
    // console.log(newClient);

    // clients.push(newClient);

    // axios
    //   .post(`${BASE_URL_CLIENT}/addclient`, newClient)
    //   .then((client) => {
    //     console.log("Response:", client.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${BASE_URL_CLIENT}/addclient`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const clientData = JSON.parse(xhr.responseText);
          console.log("Response:", clientData);
        } else {
          console.error("Error:", xhr.status, xhr.statusText);
        }
      }
    };
    //
    xhr.send(JSON.stringify(newClient));
    setItemName("");
    setItemDescription("");
    setLinkedContacts([]);

    // Close the modal after successful submission (optional)
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
              {/* Content for General tab */}
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
                  {/* <label htmlFor="clientCode">Client Code:</label>
                  <p>{itemName}</p> */}
                  <label htmlFor="clientDescription">Description:</label>
                  <textarea
                    className="form-control"
                    id="clientDescription"
                    rows="4"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                  ></textarea>
                </div>
                {/* Add other input fields for general details */}
              </form>
            </Tab.Pane>
            <Tab.Pane eventKey="contacts">
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
                          <Link to={`/contact/${contact.id}`}>
                            {contact.name}
                          </Link>
                        </td>
                        <td>{contact.email}</td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => toggleLink(contact.id)}
                        >
                          {/* Check if the contact is linked or not */}
                          {linkedContacts.includes(contact.id)
                            ? "Linked"
                            : "Link"}
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
