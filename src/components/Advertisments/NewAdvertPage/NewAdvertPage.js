import React from "react";
import Layout from "../../Layout/Layout";
import { useState } from "react";
import { createAdvert } from "./service";
import { Redirect } from "react-router";
import NewAdvertPageStyles from "./NewAdvertPage.module.css";
import Button from "../../common/Button";

function NewAdvertPage({ ...props }) {
  const [tagsForm, settagsForm] = useState([]);

  const [formData, setformData] = useState({
    productName: "",
    compraventa: "--",
    precio: "",
    archivo: "",
  });

  const [advertCreated, setadvertCreated] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeSelect = (e) => {
    settagsForm([...tagsForm, e.target.value]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { productName, compraventa, precio, tags, archivo } = formData;

    const price = parseInt(precio);
    const data = {
      name: productName,
      sale: compraventa === "Compra" ? true : false,
      price,
      tags: tagsForm,
    };

    if (archivo) {
      data.photo = archivo;
    }

    try {
      const response = await createAdvert(data);
      setadvertCreated(response.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  if (advertCreated) {
    return <Redirect to={`/adverts/${advertCreated}`} />;
  }

  return (
    <div className={NewAdvertPageStyles.newAdvertPage}>
      <Layout {...props}>
        <div className="wrapper">
          <div className={NewAdvertPageStyles.content}>
            <form onSubmit={handleSubmit}>
              <div className={NewAdvertPageStyles.formControl}>
                <label htmlFor="productName">Nombre del producto</label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  placeholder="Nombre del producto"
                  value={formData.productName}
                  onChange={handleChange}
                />
              </div>
              <div className={NewAdvertPageStyles.formControl}>
                <label htmlFor="compraventa">Selecciona la opcion</label>
                <select
                  name="compraventa"
                  value={formData.compraventa}
                  onChange={handleChange}
                >
                  <option value="--">Seleccionar opcion</option>
                  <option value="Compra">Compra</option>
                  <option value="Venta">Venta</option>
                </select>
              </div>
              <div className={NewAdvertPageStyles.formControl}>
                <label htmlFor="precio">Precio del producto</label>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  name="precio"
                  id="precio"
                  placeholder="1000"
                  value={formData.precio}
                  onChange={handleChange}
                />
              </div>
              <div className={NewAdvertPageStyles.formControl}>
                <label htmlFor="tags">Selecciona la opcion</label>
                <select
                  multiple={true}
                  name="tags"
                  value={formData.compraventa}
                  onChange={handleChangeSelect}
                  value={tagsForm}
                >
                  <option value="lifestyle">Lifestyle</option>
                  <option value="mobile">Mobile</option>
                  <option value="motor">Motor</option>
                  <option value="work">Work</option>
                </select>
              </div>
              <div className={NewAdvertPageStyles.formControl}>
                <label>Archivo</label>
                <input
                  id="archivo"
                  name="archivo"
                  type="file"
                  onChange={handleChange}
                />
              </div>
              <Button type="submit">Crear un anuncio</Button>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default NewAdvertPage;
