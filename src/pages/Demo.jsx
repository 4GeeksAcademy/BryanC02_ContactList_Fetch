import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../hooks/useGlobalReducer";

const Demo = () => {
  const { state, getContacts, deleteContact } = useAppContext();

  useEffect(() => {
    getContacts();
  }, []);

  const contacts = Array.isArray(state.contacts) ? state.contacts : [];

  const [showModal, setShowModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setContactToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteContact(contactToDelete);
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Contact List</h2>
      <Link to="/add" className="btn btn-success mb-3">
        Add New Contact
      </Link>

      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul className="list-group shadow-sm rounded">
          {contacts.map((contact, index) => (
            <li className="list-group-item" key={index}>
              <div className="d-flex align-items-start">
                <img
                  src="https://media.istockphoto.com/id/2006436002/video/happy-confident-and-portrait-of-indian-man-in-office-with-creative-professional-at-tech.jpg?s=640x640&k=20&c=vcKAWd0sGJpV3xR0AK1RCM7zTEpFUcBhQEXbNvN1M78="
                  alt={contact.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    flexShrink: 0
                  }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/80";
                  }}
                />
                <div className="flex-grow-1 ms-3">
                  <h5 className="mb-1">{contact.name}</h5>
                  <p className="mb-1">
                    <i className="fas fa-map-marker-alt me-2 text-muted" />
                    {contact.address}
                  </p>
                  <p className="mb-1">
                    <i className="fas fa-phone me-2 text-muted" />
                    {contact.phone}
                  </p>
                  <p className="mb-1">
                    <i className="fas fa-envelope me-2 text-muted" />
                    {contact.email}
                  </p>
                </div>
                <div className="text-end">
                  <Link
                    to={`/edit/${contact.id}`}
                    className="btn btn-outline-dark btn-sm me-2"
                  >
                    <i className="fas fa-pencil-alt" />
                  </Link>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteClick(contact.id)}>
                    <i className="fas fa-trash-alt" />
                  </button>
                  {showModal && (
                    <div className="modal show d-block" tabIndex="-1" role="dialog">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Are you sure?</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                          </div>
                          <div className="modal-body">
                            <p>If you delete this contact, it cannot be undone.</p>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                              Cancel
                            </button>
                            <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                              Yes, delete it
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>

  );
};

export default Demo;