import { useReducer, useContext, createContext } from "react";

const initialState = {
  contacts: []
};

const AppContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(c => c.id !== action.payload)
      };
    default:
      return state;
  }
}

const user = "bryanC03"

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getContacts = async () => {
  try {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${user}`);
    const data = await response.json();
    if (data.contacts) {
      dispatch({ type: "SET_CONTACTS", payload: data.contacts });
    }
  } catch (error) {
    console.error("Failed to fetch contacts", error);
  }
};

  const addContact = async (contact) => {
    try {
      const res = await fetch(`https://playground.4geeks.com/contact/agendas/${user}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: contact.full_name,
          email: contact.email,
          phone: contact.phone,
          address: contact.address,
          agenda_slug: "bryanC02"
        })
      });

      const data = await res.json();
      if (data?.id) {
        dispatch({ type: "ADD_CONTACT", payload: data });
      } else {
        console.error("Failed to add contact:", data);
      }
    } catch (err) {
      console.error("Add contact error:", err);
    }
  };

  const deleteContact = async (id) => {
    try {
      await fetch(`https://playground.4geeks.com/contact/agendas/${user}/contacts/${id}`, {
        method: "DELETE"
      });
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (err) {
      console.error("Failed to delete contact:", err);
    }
  };

  const updateContact = async (id, updatedData) => {
    try {
        const res = await fetch(`https://playground.4geeks.com/contact/agendas/${user}/contacts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...updatedData,
                agenda_slug: `${user}`
            })
        });

        const data = await res.json();

        if (res.ok) {
            dispatch({ type: "SET_CONTACTS", payload: state.contacts.map(c => c.id === id ? data : c) });
        } else {
            console.error("Failed to update contact:", data);
        }
    } catch (err) {
        console.error("Update contact error:", err);
    }
};


  return (
    <AppContext.Provider value={{ state, getContacts, addContact, deleteContact, updateContact }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

