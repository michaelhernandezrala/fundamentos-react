import React from "react";
import AdvertSytles from "./Advert.module.css";
import src from "../../../images/descarga.png";
import Button from "../../common/Button";
import { deleteAdvert } from "../Adverts/service";
import Swal from "sweetalert2";
import { Redirect } from "react-router";

function Advert({ id, name, sale, price, tags, photo, createdAt, history }) {
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(id);

    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar el elemento eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAdvert(id)
          .then(() => {
            Swal.fire(
              "Eliminado!",
              "El anuncio se ha eliminado con éxito.",
              "success"
            );

            history.push('/')
          })
          .catch(() => {
            <Redirect to="/404" />;
          });
      }
    });
  };
  return (
    <article className={AdvertSytles.advertContent}>
      <img src={`http://localhost:3001${photo}`} />
      <div className={AdvertSytles.advertInfo}>
        <p className={AdvertSytles.name}>{name}</p>
        <p className={AdvertSytles.info}>
          <span>Situación: </span>
          {sale === true ? "Venta" : "Compra"}
        </p>
        <p className={AdvertSytles.info}>
          <span>Precio: </span>
          {price} €
        </p>
        <p className={AdvertSytles.info}>
          <div className={AdvertSytles.tags}>
            {tags.map((tag) => (
              <span className={AdvertSytles.tag}>{tag}</span>
            ))}
          </div>
        </p>
        <Button onClick={handleClick} variant="variant">
          Eliminar Anuncio
        </Button>
      </div>
    </article>
  );
}

export default Advert;
