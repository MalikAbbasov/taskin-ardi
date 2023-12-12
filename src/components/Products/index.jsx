import React, { useContext, useEffect, useState } from "react";
import "./product.scss";
import { BasketContext } from "../../context/BasketContext";
function Products() {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState("All");
  const [inputSearch, setInputSearch] = useState("");
  const [selectVal, setSelectVal] = useState("");

  function handleInput(e) {
    setInputSearch(e.target.value);
  }

  function handleFilter(e) {
    setSelectVal(e.target.value);
  }

  const { basket, addBasket } = useContext(BasketContext);

  useEffect(() => {
    fetch(
      "https://6573ac96f941bda3f2af125e.mockapi.io/juan-store/api/v1/products"
    )
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setCategory(category);
  };
  const filteredProducts =
    category === "All"
      ? product
      : product.filter((item) => item.category === category);

  return (
    <div>
      <section id="product">
        <div className="container">
          <div className="product_header">
            <h1>PRODUCT OVERVIEW</h1>
          </div>
          <div className="product_filter">
            <div
              value={selectVal}
              onChange={(e) => handleFilter(e)}
              className="filters"
            >
              <ul>
                <li onClick={() => handleCategoryClick("All")}>All Products</li>
                <li onClick={() => handleCategoryClick("Womens")}>Women</li>
                <li onClick={() => handleCategoryClick("Mens")}>Men</li>
                <li onClick={() => handleCategoryClick("Kids")}>Kids</li>
              </ul>
            </div>
            <div className="search">
              <div className="srch">
              <button className="filter_aside">
                <i class="fa-solid fa-bars-staggered"></i> Filter
              </button>
                <button className="search_btn">
                  <i class="fa-solid fa-magnifying-glass"></i> Search
                </button>
              </div>
              <input placeholder="Search for Product name" onChange={(e) => handleInput(e)} type="text" />
            </div>
          </div>
          <div className="products">
            {filteredProducts
              .filter((x) =>
                x.name.toLowerCase().includes(inputSearch.toLowerCase())
              )
              .filter((country) =>
                selectVal
                  ? country.region.toLowerCase() === selectVal.toLowerCase()
                  : true
              )

              .map((x) => (
                <ul key={x}>
                  <div className="product_image">
                    <img src={x.images} alt="" />

                    <div className="buttons">
                      <i className="fa-solid fa-circle-info"></i>
                      <i
                        onClick={() => {
                          addBasket(x);
                        }}
                        className="fa-solid fa-cart-shopping"
                      ></i>
                      <i className="fa-solid fa-heart"></i>
                    </div>
                  </div>
                  <li>{x.model}</li>
                  <li>$ {x.price}</li>
                </ul>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Products;
