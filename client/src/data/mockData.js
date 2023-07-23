// src/mockData.js
export const clients = [
  {
    id: 1,
    name: "ABC Retailers",
    description: "New retail client for Q3 campaign",
    clientCode: "ABC001",
    linkedContacts: [1, 2, 3, "a"],
  },
  {
    id: 2,
    name: "ABC Retailers",
    description: "New retail client for Q3 campaign",
    clientCode: "ABC001",
    linkedContacts: [1, 2, 3, "a"],
  },
];

export const contacts = [
  {
    id: 1,
    name: "Jane",
    surname: "Doe",
    email: "jane.doe@example.com",
    linkedClients: [1],
  },
  {
    id: "a",
    name: "Jane1",
    surname: "Doe",
    email: "jane.doe@example.com",
    linkedClients: [1],
  },
];
