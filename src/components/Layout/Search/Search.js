import React from "react";
import { useState } from "react";
import { Range } from "rc-slider";
import 'rc-slider/assets/index.css';
import { useRef } from "react";
import SearchStyles from "./Search.module.css";
import Button from "../../common/Button";

function Search({ setfilter }) {
  const [nameFilter, setnameFilter] = useState("");
  const [priceFilter, setpriceFilter] = useState([0, 10000]);
  const [tagsFilter, settagsFilter] = useState([]);
  const [saleFilter, setsaleFilter] = useState("Ambos");
  const handleChangeName = (e) => {
    setnameFilter(e.target.value);
  };

  const handleChangePrice = (e) => {
    console.log(e)
    console.log('priceFilter',priceFilter)
    setpriceFilter(e);
  };

  const handleChangeRadio = (e) => {
    const name = e.target.name;
    let value = "";
    console.log(name);

    if (e.target.value === "Venta") {
      value = true;
    } else if (e.target.value === "Compra") {
      value = false;
    } else {
      value = e.target.value;
    }
    console.log(value);

    setsaleFilter({
      [name]: value,
    });
  };

  const handleChangeTags = (e) => {
    if (!tagsFilter.includes(e.target.value)) {
      settagsFilter([...tagsFilter, e.target.value]);
    }
    
  };

  const resetFilters = () => {
    setnameFilter("");
    setpriceFilter([0, 10000]);
    setsaleFilter("Ambos");
    settagsFilter([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setfilter({
      name: nameFilter,
      price: priceFilter,
      sale: saleFilter,
      tags: tagsFilter,
    });
  };

  return (
    
    <div className={SearchStyles.searchContent}>
      <form onSubmit={handleSubmit}>
        <div className={SearchStyles.formControl}>
          <label>Producto</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nombre del producto"
            value={nameFilter}
            onChange={handleChangeName}
          />
        </div>
        <div className={SearchStyles.formControl}>
          <label>Precio</label>
          <Range min={0} max={10000} onChange={handleChangePrice}/>
          <div className={SearchStyles.prices}>
            <p>{priceFilter[0]} €</p>
            <p>{priceFilter[1]} €</p>
          </div>
        </div>
        <div className={SearchStyles.formControl}>
          <div className={SearchStyles.radios}>
            <div>
              <input
                type="radio"
                value="Compra"
                name="sale"
                onChange={handleChangeRadio}
              />
              Compra
            </div>
            <div>
              <input
                type="radio"
                value="Venta"
                name="sale"
                onChange={handleChangeRadio}
              />
              Venta
            </div>
            <div>
              <input
                type="radio"
                value="Ambos"
                name="sale"
                onChange={handleChangeRadio}
              />
              Ambos
            </div>
          </div>
        </div>
        <div className={SearchStyles.formControl}>
          <select
            multiple={true}
            value={tagsFilter}
            onChange={handleChangeTags}
          >
            <option value="lifestyle">Lifestyle</option>
            <option value="mobile">Mobile</option>
            <option value="motor">Motor</option>
            <option value="work">Work</option>
          </select>
        </div>
      <Button type='submit'>Aplicar filtros</Button>
        <Button onClick={resetFilters} variant="variant">
          Borrar filtros
        </Button>
      </form>
    </div>
  );
}

export default Search;
