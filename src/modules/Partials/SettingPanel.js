import React, { useState } from "react";
import "../../chat/Chat.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleChatButton } from "../../reducers/authReducer";
import Chat from "../../chat/Chat";
const SettingPanel = () => {
  const dispatch = useDispatch();
  const { toggleChat } = useSelector((state) => state.user);
  console.log("hideShowSettings...", toggleChat);
  const [hide, setHide] = useState(false);
  const [hover, setHover] = useState(true);

  const SettingFun = () => {
    // setHide(!hide);
    dispatch(toggleChatButton(hide));
    setHover(true);
  };
  return (
    <>
      <div className="theme-setting-wrapper ">
        <div id="settings-trigger">
          <i className="ti-settings"></i>
        </div>
        <div id="theme-settings" className="settings-panel">
          <i className="settings-close ti-close"></i>
          <p className="settings-heading">SIDEBAR SKINS</p>
          <div className="sidebar-bg-options selected" id="sidebar-light-theme">
            <div className="img-ss rounded-circle bg-light border mr-3"></div>
            Light
          </div>
          <div className="sidebar-bg-options" id="sidebar-dark-theme">
            <div className="img-ss rounded-circle bg-dark border mr-3"></div>
            Dark
          </div>
          <p className="settings-heading mt-2">HEADER SKINS</p>
          <div className="color-tiles mx-0 px-4">
            <div className="tiles success"></div>
            <div className="tiles warning"></div>
            <div className="tiles danger"></div>
            <div className="tiles info"></div>
            <div className="tiles dark"></div>
            <div className="tiles default"></div>
          </div>
        </div>
      </div>
      <div
        id="right-sidebar"
        className={`settings-panel ${toggleChat ? "open" : ""} `}
      >
        <i
          className={`settings-close ti-close ${hover ? "fontHover" : ""}`}
          onClick={() => SettingFun()}
        ></i>
        <>{toggleChat ? <Chat /> : ""}</>

        {/*  <ul
          className="nav nav-tabs border-top"
          id="setting-panel"
          role="tablist"
        >
          <li className="nav-item">
            <a
              className="nav-link active"
              id="todo-tab"
              data-toggle="tab"
              href="#todo-section"
              role="tab"
              aria-controls="todo-section"
              aria-expanded="true"
            >
              TO DO LIST
            </a>
  </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="chats-tab"
              data-toggle="tab"
              href="#chats-section"
              role="tab"
              aria-controls="chats-section"
            >
              CHATS Active Now
            </a>
          </li>
        </ul>

        <div className="add-items d-flex mb-0  ">
          <form className="form w-100 ">
            <div class="col-sm-12 col-sm-offset-8 frame">
              <ul className="ull">
                <li style={{ width: "100%" }}>
                  <div className="msj macro">
                    <div className="avatar">
                      <img
                        className="img-circle"
                        style={{ width: "100%" }}
                        src="'+ me.avatar +'"
                      />
                    </div>

                    <div className="text text-l">
                      <p>Hey broooooooo how are you</p>
                      <p>
                        <small>1/7/2022</small>
                      </p>
                    </div>
                  </div>
                </li>
                <li style={{ width: "100%" }}>
                  <div className="msj-rta macro">
                    <div className="text text-r">
                      <p>I am fine</p>
                      <p>
                        <small>1/7/2022</small>
                      </p>
                    </div>
                    <div
                      className="avatar"
                      style={{ padding: "0px 0px 0px 10px !important" }}
                    >
                      <img
                        className="img-circle"
                        style={{ width: "100%" }}
                        src=""
                      />
                    </div>
                  </div>
                </li>
              </ul>
              <div>
                <div className="msj-rta macro" style={{ margin: "auto" }}>
                  <div className="message-input">
                    <div className="wrap">
                      <input
                        type="text"
                        style={{
                          overflowX: "hidden",
                          overflowY: "scroll",
                        }}
                        placeholder="Write your message..."
                      />

                      <button
                        className="submit  "
                        style={{
                          float: "right",
                          border: "none",
                          outline: "none",
                          background: "none",
                          borderRadius: "50%",
                          // padding: "3px",
                          marginLeft: "3rem",
                          border: "none",
                        }}
                      >
                        <i
                          className="fa fa-paper-plane text-primary"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
*/}
        {/*  <h4 className="px-3 text-muted mt-5 font-weight-light mb-0">Events</h4>
        <div className="events pt-4 px-3">
          <div className="wrapper d-flex mb-2">
            <i className="ti-control-record text-primary mr-2"></i>
            <span>Feb 11 2018</span>
          </div>
          <p className="mb-0 font-weight-thin text-gray">
            Creating component page build a js
          </p>
          <p className="text-gray mb-0">The total number of sessions</p>
        </div>
        <div className="events pt-4 px-3">
          <div className="wrapper d-flex mb-2">
            <i className="ti-control-record text-primary mr-2"></i>
            <span>Feb 7 2018</span>
          </div>
          <p className="mb-0 font-weight-thin text-gray">Meeting with Alisa</p>
          <p className="text-gray mb-0 ">Call Sarah Graves</p>
        </div>

         To do section tab ends  
        <div
          className="tab-pane fade"
          id="chats-section"
          role="tabpanel"
          aria-labelledby="chats-section"
        >
          <div className="d-flex align-items-center justify-content-between border-bottom">
            <p className="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">
              Friends
            </p>
            <small className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 font-weight-normal">
              See All
            </small>
          </div>
          <ul className="chat-list">
            <li className="list active">
              <div className="profile">
                <img src="images/faces/face1.jpg" alt="face" />
                <span className="online"></span>
              </div>
              <div className="info">
                <p>Thomas Douglas</p>
                <p>Available</p>
              </div>
              <small className="text-muted my-auto">19 min</small>
            </li>
            <li className="list">
              <div className="profile">
                <img src="images/faces/face2.jpg" alt="image" />
                <span className="offline"></span>
              </div>
              <div className="info">
                <div className="wrapper d-flex">
                  <p>Catherine</p>
                </div>
                <p>Away</p>
              </div>
              <div className="badge badge-success badge-pill my-auto mx-2">
                4
              </div>
              <small className="text-muted my-auto">23 min</small>
            </li>
            <li className="list">
              <div className="profile">
                <img src="images/faces/face3.jpg" alt="image" />
                <span className="online"></span>
              </div>
              <div className="info">
                <p>Daniel Russell</p>
                <p>Available</p>
              </div>
              <small className="text-muted my-auto">14 min</small>
            </li>
            <li className="list">
              <div className="profile">
                <img src="images/faces/face4.jpg" alt="image" />
                <span className="offline"></span>
              </div>
              <div className="info">
                <p>James Richardson</p>
                <p>Away</p>
              </div>
              <small className="text-muted my-auto">2 min</small>
            </li>
            <li className="list">
              <div className="profile">
                <img src="images/faces/face5.jpg" alt="image" />
                <span className="online"></span>
              </div>
              <div className="info">
                <p>Madeline Kennedy</p>
                <p>Available</p>
              </div>
              <small className="text-muted my-auto">5 min</small>
            </li>
            <li className="list">
              <div className="profile">
                <img src="images/faces/face6.jpg" alt="image" />
                <span className="online"></span>
              </div>
              <div className="info">
                <p>Sarah Graves</p>
                <p>Available</p>
              </div>
              <small className="text-muted my-auto">47 min</small>
            </li>
          </ul>
        </div>*/}
        {/* chat tab ends  */}
      </div>
    </>
  );
};

export default SettingPanel;
