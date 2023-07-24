import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import Client from "./pages/Client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import Contact from "./pages/Contact";
import ClientDetails from "./pages/ClientDetails";
import ContactDetails from "./pages/contactDetails";
function App() {
  return (
    <>
      <div className="container mt-4">
        <Routes>
          <Route exact path="/" element={<Client />} />
          <Route exact path="/contacts" element={<Contact />} />
          <Route path="/clients/:id" element={<ClientDetails />} />
          <Route path="/contacts/:id" element={<ContactDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
