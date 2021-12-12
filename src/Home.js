import React from "react";
import Select from "react-select";
import Footer from "./components/footer";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import {
  Outer,
  GlobalStyles,
  customStyles,
  options,
  options1,
  options2,
  options3,
  alarm,
} from "./const/exploreConsts";
const { shell } = window.require("electron");

Number.prototype.format = function(n, x) {
  var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
};

let DEBUG = process.env.NODE_ENV === "development";
if (!DEBUG) {
  if (!window.console) window.console = {};
  let methods = ["log", "debug", "warn", "info", "error"];
  for (let i = 0; i < methods.length; i++) {
    console[methods[i]] = () => {};
  }
}

let autoEnabled = true;

function Explore() {
  const [nfts, setNfts] = React.useState([]);
  const [category, setCategory] = React.useState(
    localStorage.getItem("category")
      ? parseInt(localStorage.getItem("category"), 10)
      : 0
  );

  const [sortBy, setSortBy] = React.useState(
    localStorage.getItem("sortBy")
      ? parseInt(localStorage.getItem("sortBy"), 10)
      : 0
  );

  const [delayTime, setDelayTime] = React.useState(
    localStorage.getItem("delayTime")
      ? parseInt(localStorage.getItem("delayTime"), 10)
      : 3
  );

  const [noItems, setNoItems] = React.useState(
    localStorage.getItem("noItems")
      ? parseInt(localStorage.getItem("noItems"), 10)
      : 10
  );

  const [pricingWarning, setPricingWarning] = React.useState(
    localStorage.getItem("pricingWarning")
      ? JSON.parse(localStorage.getItem("pricingWarning"))
      : {}
  );

  const [open, setOpen] = React.useState(false);
  const [openWarnItem, setOpenWarnItem] = React.useState(false);
  const [warnItem, setWarnItem] = React.useState(null);

  const loadNfts = async (category, type, noItems) => {
    if (!autoEnabled) return;
    let sortText = "created_at";
    let orderText = "asc";
    switch (type) {
      case 0:
        sortText = "created_at";
        orderText = "desc";
        break;
      case 1:
        sortText = "fixed_price";
        orderText = "asc";
        break;
      case 2:
        sortText = "fixed_price";
        orderText = "desc";
        break;
      case 3:
        sortText = "single_price";
        orderText = "asc";
        break;
      case 4:
        sortText = "single_price";
        orderText = "desc";
        break;
      default:
        sortText = "created_at";
        orderText = "desc";
    }

    let url = `https://market-api.radiocaca.com/nft-sales?pageNo=1&pageSize=${noItems}${
      category > 0 ? `&category=${category}` : `&category`
    }&sortBy=${sortText}&name=&order=${orderText}`;

    const res = await axios.get(url);
    let items = res.data ? res.data.list : [];

    if (!autoEnabled) return;

    setNfts(items);
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      const price = pricingWarning[element.name];
      if (price && price > 0) {
        if (parseInt(element.fixed_price, 10) <= parseInt(price, 10)) {
          autoEnabled = false;
          setWarnItem(element);
          setOpenWarnItem(true);
          alarm.pause();
          alarm.currentTime = 0;
          alarm.play();
          return;
        }
      }
    }
  };

  React.useEffect(() => {
    loadNfts(category, sortBy, noItems);

    const myInterval = setInterval(() => {
      loadNfts(category, sortBy, noItems);
    }, delayTime * 1000);

    return () => {
      clearInterval(myInterval);
      alarm.pause();
      alarm.currentTime = 0;
    };
  }, [category, sortBy, noItems, delayTime, pricingWarning]);

  const handleInputPricingChange = (e) => {
    let data = localStorage.getItem("pricingWarning")
      ? JSON.parse(localStorage.getItem("pricingWarning"))
      : {};
    data[e.target.name] = e.target.value;
    localStorage.setItem("pricingWarning", JSON.stringify(data));
    setPricingWarning(data);
  };

  return (
    <div>
      <GlobalStyles />
      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${"./img/background/subheader.jpg"})` }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">
                  Radio Caca NFT Market Support Trade Tools
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter">
              <div className="dropdownSelect one">
                <Select
                  styles={customStyles}
                  menuContainerStyle={{ zIndex: 999 }}
                  value={{
                    label: options.find((e) => e.value === category).label,
                    value: category,
                  }}
                  options={options}
                  onChange={(e) => {
                    setCategory(e.value);
                    localStorage.setItem("category", e.value);
                  }}
                />
              </div>
              <div className="dropdownSelect two">
                <Select
                  styles={customStyles}
                  value={{
                    label: options1.find((e) => e.value === sortBy).label,
                    value: sortBy,
                  }}
                  options={options1}
                  onChange={(e) => {
                    setSortBy(e.value);
                    localStorage.setItem("sortBy", e.value);
                  }}
                />
              </div>

              <div className="dropdownSelect three">
                <Select
                  styles={customStyles}
                  value={{
                    label: options3.find((e) => e.value === noItems).label,
                    value: noItems,
                  }}
                  options={options3}
                  onChange={(e) => {
                    setNoItems(e.value);
                    localStorage.setItem("noItems", e.value);
                  }}
                />
              </div>

              <div className="dropdownSelect four">
                <Select
                  styles={customStyles}
                  value={{
                    label: options2.find((e) => e.value === delayTime).label,
                    value: delayTime,
                  }}
                  options={options2}
                  onChange={(e) => {
                    setDelayTime(e.value);
                    localStorage.setItem("delayTime", e.value);
                  }}
                />
              </div>

              <div
                className="dropdownSelect five"
                style={{ marginLeft: "10px" }}
              >
                <span
                  className="btn-main"
                  onClick={() => {
                    setOpen(true);
                    autoEnabled = false;
                  }}
                >
                  Pricing Filter Alarm Setting
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {nfts.map((nft, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
            >
              <div className="nft__item m-0">
                <div
                  className="de_countdown"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    shell.openExternal(
                      `https://market.radiocaca.com/#/market-place/${nft.id}`
                    )
                  }
                >
                  <span>View On Market</span>
                </div>
                <div className="nft__item_info">
                  <span>
                    <h4>{`#${nft.id}`}</h4>
                  </span>
                </div>
                <div
                  className="nft__item_wrap"
                  style={{ width: `200px`, height: `120px` }}
                >
                  <Outer>
                    <span>
                      <img
                        style={{ width: `80px`, height: `120px` }}
                        src={nft.image_url}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </span>
                    {/* <span>Detail: updating</span> */}
                  </Outer>
                </div>
                <div className="nft__item_info">
                  <span>
                    <h4>{nft.name}</h4>
                  </span>
                  <div className="nft__item_price">
                    {`Fixed price: `}
                    <span>{parseInt(nft.fixed_price, 10).format()}</span>
                  </div>
                  <div className="nft__item_price">
                    {`Total price: `}
                    <span>
                      {parseInt(nft.fixed_price * nft.count, 10).format()}
                    </span>
                  </div>
                  <div className="nft__item_action">
                    <span>{`x${nft.count}`}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <video id="video"></video>
      </section>

      <Footer />

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          alarm.pause();
          alarm.currentTime = 0;
          autoEnabled = true;
        }}
        center
      >
        <h2>Pricing Limit Setting</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="field-set">
              <label>Metamon</label>
              <input
                name="Metamon"
                type="number"
                className="form-control"
                value={pricingWarning ? pricingWarning["Metamon"] : 1000}
                onChange={handleInputPricingChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="field-set">
              <label>Metamon Egg</label>
              <input
                name="Metamon Egg"
                type="number"
                className="form-control"
                value={pricingWarning ? pricingWarning["Metamon Egg"] : 1000}
                onChange={handleInputPricingChange}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="field-set">
              <label>RACAPunk Avatar</label>
              <input
                name="RACAPunk Avatar"
                type="number"
                className="form-control"
                value={
                  pricingWarning ? pricingWarning["RACAPunk Avatar"] : 1000
                }
                onChange={handleInputPricingChange}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="field-set">
              <label>Potion</label>
              <input
                name="Potion"
                type="number"
                className="form-control"
                value={pricingWarning ? pricingWarning["Potion"] : 1000}
                onChange={handleInputPricingChange}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="field-set">
              <label>Metamon Avatar</label>
              <input
                name="Metamon Avatar"
                type="number"
                className="form-control"
                value={pricingWarning ? pricingWarning["Metamon Avatar"] : 1000}
                onChange={handleInputPricingChange}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="field-set">
              <label>SpaceXNaut Dog</label>
              <input
                name="SpaceXNaut Dog"
                type="number"
                className="form-control"
                value={pricingWarning ? pricingWarning["SpaceXNaut Dog"] : 1000}
                onChange={handleInputPricingChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="field-set">
              <label>Matrix Plus Box</label>
              <input
                name="Matrix Plus Box"
                type="number"
                className="form-control"
                value={
                  pricingWarning ? pricingWarning["Matrix Plus Box"] : 1000
                }
                onChange={handleInputPricingChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="field-set">
              <label>Bake Musk Mixer</label>
              <input
                name="Bake Musk Mixer"
                type="number"
                className="form-control"
                value={
                  pricingWarning ? pricingWarning["Bake Musk Mixer"] : 1000
                }
                onChange={handleInputPricingChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="field-set">
              <label>DING</label>
              <input
                name="DING"
                type="number"
                className="form-control"
                value={pricingWarning ? pricingWarning["DING"] : 1000}
                onChange={handleInputPricingChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="field-set">
              <label>Yellow Diamond</label>
              <input
                name="Yellow Diamond"
                type="number"
                className="form-control"
                value={pricingWarning ? pricingWarning["Yellow Diamond"] : 1000}
                onChange={handleInputPricingChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="field-set">
              <label>Diamond Box</label>
              <input
                name="Diamond Box"
                type="number"
                className="form-control"
                value={pricingWarning ? pricingWarning["Diamond Box"] : 1000}
                onChange={handleInputPricingChange}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="field-set">
              <label>Kiss-up State Land</label>
              <input
                name="Kiss-up State Land"
                type="number"
                className="form-control"
                value={
                  pricingWarning ? pricingWarning["Kiss-up State Land"] : 1000
                }
                onChange={handleInputPricingChange}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="field-set">
              <label>Dragon Fruit Dog</label>
              <input
                name="Dragon Fruit Dog"
                type="number"
                className="form-control"
                value={
                  pricingWarning ? pricingWarning["Dragon Fruit Dog"] : 1000
                }
                onChange={handleInputPricingChange}
              />
            </div>
          </div>

          <button
            className="btn-main"
            onClick={() => {
              alarm.play();
            }}
          >
            Test Alarm
          </button>
        </div>
      </Modal>
      {warnItem && (
        <Modal
          open={openWarnItem}
          onClose={() => {
            setOpenWarnItem(false);
            alarm.pause();
            alarm.currentTime = 0;
            autoEnabled = true;
          }}
          center
        >
          <div className="d-item">
            <div className="nft__item m-0">
              <div
                className="de_countdown"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  shell.openExternal(
                    `https://market.radiocaca.com/#/market-place/${warnItem.id}`
                  )
                }
              >
                <span>View On Market</span>
              </div>
              <div className="nft__item_info">
                <span>
                  <h4>{`#${warnItem.id}`}</h4>
                </span>
              </div>
              <div
                className="nft__item_wrap"
                style={{ width: `200px`, height: `120px` }}
              >
                <Outer>
                  <span>
                    <img
                      style={{ width: `80px`, height: `120px` }}
                      src={warnItem.image_url}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </span>
                  {/* <span>Detail: updating</span> */}
                </Outer>
              </div>
              <div className="nft__item_info">
                <span>
                  <h4>{warnItem.name}</h4>
                </span>
                <div className="nft__item_price">
                  {`Fixed price: `}
                  <span>{parseInt(warnItem.fixed_price, 10).format()}</span>
                </div>
                <div className="nft__item_price">
                  {`Total price: `}
                  <span>
                    {parseInt(
                      warnItem.fixed_price * warnItem.count,
                      10
                    ).format()}
                  </span>
                </div>
                <div className="nft__item_action">
                  <span>{`x${warnItem.count}`}</span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Explore;
