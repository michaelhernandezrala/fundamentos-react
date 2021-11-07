import React from "react";
import { Link } from "react-router-dom";
import Button from "../../common/Button";
import Layout from "../../Layout/Layout";
import Advert from "../Advert/Advert";
import { useState, useEffect } from "react";
import { getAdverts } from "./service";
import LayoutStyles from "../../Layout/Layout.module.css";
import AdvertStyles from "./Adverts.module.css";
import Search from "../../Layout/Search/Search";

const EmptyListFiltered = () => (
  <div className={AdvertStyles.emptyList}>
    <div className={AdvertStyles.emptyListContent}>
      <p>No hay resultados</p>
    </div>
  </div>
);

function Adverts({ history, ...props }) {
  const [adverts, setadverts] = useState([]);
  const [filter, setfilter] = useState({
    name: "",
    price: [0, 10000],
    sale: "Ambos",
    tags: [],
  });

  useEffect(() => {
    getAdverts().then((response) => {
      let tagsFiltered = [];
      if (filter.tags.length !== 0) {
        response.data.forEach((element) => {
          for (const tag of filter.tags) {
            if (element.tags.includes(tag) && !tagsFiltered.includes(element)) {
              tagsFiltered.push(element);
            }
          }
        });
      } else {
        tagsFiltered = response.data;
      }

      let finalfiltersAdverts = [];
      for (const ad of tagsFiltered) {
        console.log(filter)
        if (
          ad.name.includes(filter.name) &&
          ad.price <= filter.price[1] &&
          ad.price >= filter.price[0] &&
          (filter.sale.sale === "Ambos" || filter.sale.sale === ad.sale || filter.sale === 'Ambos')
        ) {
          finalfiltersAdverts.push(ad);
        }
      }

      setadverts(finalfiltersAdverts)

    });
  }, [filter]);

  return (
    <Layout
      title="Anuncios disponibles"
      {...props}
      className={LayoutStyles.layout}
    >
      <div className={AdvertStyles.numberContent}>
        Número de anuncios: {adverts.length}
      </div>
      <div className={AdvertStyles.advertsContent}>
        <Search setfilter={setfilter} />
        {adverts.length ? (
          <ul className={AdvertStyles.advertsList}>
            {adverts.map(({ id, ...advert }) => (
              <li key={id} className={AdvertStyles.advert}>
                <Link to={`/adverts/${id}`}>
                  <Advert id={id} {...advert} history={history} />
                </Link>
              </li>
            ))}
          </ul>
        ) : ( 
          <EmptyListFiltered />
        )}
      </div>
    </Layout>
  );
}

export default Adverts;
