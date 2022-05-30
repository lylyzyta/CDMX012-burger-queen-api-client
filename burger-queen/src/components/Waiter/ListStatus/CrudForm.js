import React, { useState, useEffect } from "react";

const initailForm = {
  userId: "",
  client: "",
  status: "",
  products: [
    {
      quantity: "",
      product: "",
    }
  ],
  dateEntry: "",
  dateProcessed: "",
  id: null,
};

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(initailForm);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initailForm);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    console.log(e.target.name)
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      products: [
        { [e.target.name]: e.target.value }
      ]
    });
    console.log(form)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.userId || !form.client || !form.status || !form.dateEntry || !form.dateProcessed) {
      alert("Datos incompletos");
      return;
    }

    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset();
  };

  const handleReset = (e) => {
    setForm(initailForm);
    setDataToEdit(null);
  };

  return (
    <div className="container-formStatus">
      <h3>{dataToEdit ? "Edit" : "Add"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userId"
          placeholder="User Id"
          onChange={handleChange}
          value={form.userId}
        />
        <input
          type="text"
          name="client"
          placeholder="Client"
          onChange={handleChange}
          value={form.client}
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          onChange={handleChange}
          value={form.status}
        />
        <input
          type="text"
          name="dateEntry"
          placeholder="Date Entry"
          onChange={handleChange}
          value={form.dateEntry}
        />
        <input
          type="text"
          name="dateProcessed"
          placeholder="Date Processed"
          onChange={handleChange}
          value={form.dateProcessed}
        />
        {form.products && form.products.map((product) =>
          <>
            <input
              key={product.item}
              type="text"
              name={product['quantity']}
              placeholder="Quantity"
              onChange={handleChange}
              value={product.quantity} />
            <input
              type="text"
              name="product"
              placeholder="Product"
              onChange={handleChange}
              value={product.product} />
          </>
        )}
        <input type="submit" value="Enviar" />
        <input type="reset" value="Limpiar" onClick={handleReset} />
      </form>
    </div>
  );
};

export default CrudForm;