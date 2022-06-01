import React, { useState, useEffect } from "react";
import style from './CrudForm.module.css';

const initailForm = {
  userId: "",
  client: "",
  status: "",
  products: [
    {
      qty: "",
      product: "",
    }
  ],
  dateEntry: "",
  dateProcessed: "",
  id: null,
};

const CrudForm = ({ createData, updateData, editOrder, setEditOrder }) => {
  const [form, setForm] = useState(initailForm);

  useEffect(() => {
    if (editOrder) {
      setForm(editOrder);
    } else {
      setForm(initailForm);
    }
  }, [editOrder]);

  const handleChange = (e) => {
    console.log(e.target.name)
    setForm({
      ...form,
      [e.target.name]: e.target.value,
       products: [
        { [e.target.name] : e.target.value}
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
    setEditOrder(null);
  };

  return (
    <div className={style.containerFormStatus}>
      <h3 className={style.titleTable}>{editOrder ? "Edit Order" : "Edit Order"}</h3>
      <form className={style.form}onSubmit={handleSubmit}>
      <h3 className={style.titleForm}>Order Form</h3>
      <section className={style.boxForm}>
      <label className={style.labelForm}> Order Id:  </label>
      <input className={style.inputForm}
          type="text"
          name="id"
          placeholder="Order id"
          onChange={handleChange}
          value={form.id}
        />

      <label className={style.labelForm}> User Id: </label>
        <input className={style.inputForm}
          type="text"
          name="userId"
          placeholder="User Id"
          onChange={handleChange}
          value={form.userId}
        />

        <label className={style.labelForm}> Client:</label>
        <input className={style.inputForm}
          type="text"
          name="client"
          placeholder="Client"
          onChange={handleChange}
          value={form.client}
        />


      <label className={style.labelForm}> Status:</label>
      <input className={style.inputForm}
          type="text"
          name="status"
          placeholder="Status"
          onChange={handleChange}
          value={form.status}
        />


        <label className={style.labelForm}> Date Entry:
        </label>
        <input className={style.inputForm}
          type="text"
          name="dateEntry"
          placeholder="Date Entry"
          onChange={handleChange}
          value={form.dateEntry}
        />


        <label className={style.labelForm}> Date Processed:</label>
        <input className={style.inputForm}
          type="text"
          name="dateProcessed"
          placeholder="Date Processed"
          onChange={handleChange}
          value={form.dateProcessed}
        />

        {form.products && form.products.map((product)=>
          <>
          <label className={style.labelForm}> Quantity: </label>
          <input className={style.inputForm}
                type="text"
                name={product['qty']}
                placeholder="Quantity"
                onChange={handleChange}
                value={product.quantity} />

          
          <label className={style.labelForm}> Product:
          </label>
          <input className={style.inputForm}
              type="text"
              name="product"
              placeholder="Product"
              onChange={handleChange}
              value={product.product} />

          </>
        )}
        <section className={style.btnAccions}>
          <input className={style.btnForm} type="submit" value="Send Order" />
          <input className={style.btnForm} type="reset" value="Clean Form" onClick={handleReset} />
        </section>
        </section>
      </form>
    </div>
  );
};

export default CrudForm;