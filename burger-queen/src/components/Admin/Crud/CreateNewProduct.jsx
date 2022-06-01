import "./../Admin.css";
import { useState } from "react";

export default function CreateNewProduct() {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState();
  const [type, setType] = useState();
  const [dateEntry, setDateEntry] = useState();

  function postDataProducts() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item, price, img, type, dateEntry }),
    };
    fetch(
      "https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/products",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <section className="container-show-control-panel">
      <h3 className="titles-control-panel">Add New Product</h3>
      <section className="container-form-new-item">
        <form className="create-form">
          <label className="label-form-text">Product</label>
          <input
            className="input-form-text"
            placeholder="Name"
            onChange={(e) => setItem(e.target.value)}
          />

          <label className="label-form-text">Price</label>
          <input
            className="input-form-text"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />

          <label className="label-form-text">Image</label>
          <input
            className="input-form-text"
            placeholder="Image"
            onChange={(e) => setImg(e.target.value)}
          />

          <label className="label-form-text">Category</label>
          <input
            className="input-form-text"
            placeholder="Category"
            onChange={(e) => setType(e.target.value)}
          />

          <label className="label-form-text">Date</label>
          <input
            className="input-form-text"
            placeholder="Date"
            onChange={(e) => setDateEntry(e.target.value)}
          />

          <button
            className="btn-add-item"
            type="submit"
            onClick={postDataProducts}
          >
            Submit
          </button>
        </form>
      </section>
    </section>
  );
}
