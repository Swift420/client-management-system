import React, { useEffect, useState } from "react";
import { Modal, Button, Nav, Tab } from "react-bootstrap";
// import { clients, contacts } from "../data/mockData";
import { Link } from "react-router-dom";
import { BASE_URL_CLIENT, BASE_URL_CONTACT } from "../utils/constants";
import axios from "axios";

const ContactModal = ({ showModal, handleCloseModal }) => {
  const [activeTab, setActiveTab] = React.useState("general");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [itemContacts, setItemContacts] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemSurname, setItemSurname] = useState("");
  const [itemEmail, setItemEmail] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  //   console.log(itemName);
  const [linkedClients, setLinkedClients] = useState([]);
  const [isLinked, setIsLinked] = useState(false);
  const [isLinkedState, setIsLinkedState] = useState("");
  const [clients, setClients] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL_CLIENT}`)
  //     .then((clients) => setClients(clients.data))
  //     .catch((e) => console.log(e));

  //   // fetchClients();
  // }, []);

  useEffect(() => {
    // axios
    //   .get(`${BASE_URL_CLIENT}`)
    //   .then((clients) => setClients(clients.data))
    //   .catch((e) => console.log(e));

    fetchClients();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemName || !itemSurname || !itemEmail) {
      // Display an error message or handle validation errors
      alert("Please fill in all the required fields.");
      return;
    }
    const newContact = {
      id: Date.now(),
      name: itemName,
      surname: itemSurname,
      email: itemEmail,
      linkedClients: linkedClients,
    };
    // console.log(newClient);

    // contacts.push(newContact);

    // console.log(contacts);

    // axios
    //   .post(`${BASE_URL_CONTACT}/addcontact`, newContact)
    //   .then((contact) => {
    //     console.log("Response:", contact.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${BASE_URL_CONTACT}/addcontact`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const contactData = JSON.parse(xhr.responseText);
          console.log("Response:", contactData);
        } else {
          console.error("Error:", xhr.status, xhr.statusText);
        }
      }
    };

    xhr.send(JSON.stringify(newContact));

    setItemName("");
    setItemSurname("");
    setItemEmail("");
    setLinkedClients([]);

    // Close the modal after successful submission (optional)
    handleCloseModal();
  };

  const toggleLink = (contactId) => {
    if (linkedClients.includes(contactId)) {
      setLinkedClients(linkedClients.filter((id) => id !== contactId));
    } else {
      setLinkedClients([...linkedClients, contactId]);
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
                onClick={() => handleTabChange("clients")}
              >
                Clients
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="general">
              {/* Content for General tab */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contactName">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactName"
                    required
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                  <label htmlFor="contactSurname">Surname:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactSurname"
                    required
                    value={itemSurname}
                    onChange={(e) => setItemSurname(e.target.value)}
                  />
                  <label htmlFor="clientEmail">Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="clientEmail"
                    required
                    value={itemEmail}
                    onChange={(e) => setItemEmail(e.target.value)}
                  />
                  {/* <label htmlFor="clientCode">Client Code:</label>
                  <p>{itemName}</p> */}
                </div>
                {/* Add other input fields for general details */}
              </form>
            </Tab.Pane>
            <Tab.Pane eventKey="clients">
              {/* Content for Contacts tab */}
              {clients.length !== 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Client Code</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client._id}>
                        <td>{client.name}</td>
                        <td>{client.clientCode}</td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => toggleLink(client._id)}
                        >
                          {/* Check if the contact is linked or not */}
                          {linkedClients.includes(client._id)
                            ? "Linked"
                            : "Link"}
                        </td>
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

export default ContactModal;
