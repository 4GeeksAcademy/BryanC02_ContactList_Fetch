import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../hooks/useGlobalReducer";

const Single = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addContact, state, updateContact } = useAppContext();


  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (id && state.contacts.length > 0) {
      const contact = state.contacts.find(c => c.id === parseInt(id));
      if (contact) setForm(contact);
    }
  }, [id, state.contacts]);


  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (id) {
      await updateContact(id, { ...form, full_name: form.name });
    } else {
      await addContact({ ...form, full_name: form.name });
    }
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">{id ? "Edit Contact" : "Add New Contact"}</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
        <input className="form-control mb-2" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input className="form-control mb-2" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input className="form-control mb-2" name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <button type="submit" className="btn btn-primary w-100">Save</button>
      </form>
    </div>
  );
};

export default Single;

