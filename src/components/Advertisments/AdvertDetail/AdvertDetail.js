import React from "react";
import { getAdvert } from "../NewAdvertPage/service";
import { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { Redirect, useParams } from "react-router";
import AdvertDetailStyles from "./AdvertDetail.module.css";

function AdvertDetail({ match, ...props }) {
  const [advertDetail, setadvertDetail] = useState({});
  const [error, seterror] = useState(false);

  useEffect(() => {
    getAdvert(match.params.advertId)
      .then((res) => setadvertDetail(res.data))
      .catch((e) => seterror(true));
  }, [match.params.advertId]);

  console.log(advertDetail.name);

  if (error) {
    return <Redirect to="/404" />;
  }

  return (
    <Layout {...props}>
      <div className="wrapper">
        <div className={AdvertDetailStyles.advertDetail}>
          <div className={AdvertDetailStyles.advertContent}>
            <img src={`http://localhost:3001${advertDetail.photo}`} />
            <div className={AdvertDetailStyles.info}>
              <p>
                <span>Nombre del producto: </span>
                {advertDetail.name}
              </p>
              <p>
                <span>Situacion: </span>
                {advertDetail.sale === true ? "Venta" : "Compra"}
              </p>
              <p>
                <span>Precio: </span>
                {advertDetail.price} €
              </p>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdvertDetail;
