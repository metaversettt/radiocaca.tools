import React from "react";
const { shell } = window.require("electron");

const footer = () => (
  <footer className="footer-light">
    <div className="row">
      <div className="col-md-12" style={{ textAlign: "center" }}>
        <h3>
          Donate for DEV team by wallet address below:(Binance Smart Chain)
        </h3>
        <span style={{ fontWeight: "bold" }}>
          0x3c5315a512a56c86ce904D0A06B10AA697B7C763
        </span>
      </div>
    </div>
    <div className="subfooter">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex">
              <div
                className="de-flex-col"
                style={{ cursor: "pointer" }}
                onClick={() => shell.openExternal(`https://radiocaca.tools/`)}
              >
                <span style={{ cursor: "pointer" }}>
                  <img alt="" className="f-logo d-1" src="./img/logo.png" />
                  <span className="copy" style={{ cursor: "pointer" }}>
                    &copy; Copyright 2021 - Radiocaca.Tools
                  </span>
                </span>
              </div>

              <div className="de-flex-col">
                <div className="icons">
                  <span
                    onClick={() =>
                      shell.openExternal(`mailto:radiocaca.tools@gmail.com`)
                    }
                  >
                    {"Request Ticket (radiocaca.tools@gmail.com)"}
                    <i className="fa fa-envelope-square"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
export default footer;
