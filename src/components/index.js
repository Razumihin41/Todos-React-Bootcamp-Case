import List from "./main/list/list";
import Input from "./main/input/input";
import Footer from "./main/button/Footer";
import ToastMenu from "./main/bootstrap/toast";
import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function Index() {

  const localStorageName = JSON.parse(localStorage.getItem("name"));
  const [note, setNote] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({ checked: false, title: "", message: "" })
  const [userName, setUserName] = useState(localStorageName ? localStorageName : "");

  const saveName = (e) => {
    e.preventDefault();
    if (userName === "" || userName.trim().length < 3) {
      setToast(
        {
          checked: true,
          title: "Warning",
          message: "Please enter at least three words",
        }
      )
      return false;
    }
    localStorage.setItem("name", JSON.stringify(userName));
    document.querySelector(".app").classList.remove("hidden");
    document.querySelector(".inputNameData").classList.add("hidden");
  }

  const changeUserName = (e) => {
    setUserName(e.target.value);
  }

  const genericRequest = (method, index, data, toastMessage) => {
    axios({
      method: method,
      url: `https://630f989736e6a2a04eddd072.mockapi.io/todos/${index}`,
      data: data,
    })
      .then(() => {
        setToast(
          {
            checked: toastMessage.checked,
            title: toastMessage.title,
            message: toastMessage.message,
          }
        )
        refreshData();
      })
      .catch((e) => {
        setToast(
          {
            checked: true,
            title: "Not Saved",
            message: "Error source: <" + e.name + "> Please try again!",
          }
        )
        setIsLoading(false);
      })
  };

  const refreshData = () => {
    axios("https://630f989736e6a2a04eddd072.mockapi.io/todos/")
      .then(res => {
        setNote(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("name"))) {
      document.querySelector(".app").classList.remove("hidden");
      document.querySelector(".inputNameData").classList.add("hidden");
    }
    refreshData();
    statusLamp();
  }, []);

  const statusLamp = () => {
    const localStorageColor = JSON.parse(localStorage.getItem("color"));
    if (localStorageColor === "dark") {
      const LampClass = ["app", "App", "hiName", "title", "fa-lightbulb", "footer", "loading"];
      LampClass.forEach((item) =>
        document.querySelector(`.${item}`).classList.add("dark"));
    };
  };

  const changeLamp = () => {
    const localStorageColor = JSON.parse(localStorage.getItem("color"));
    document.querySelector(".fa-lightbulb").classList.toggle("dark");
    if (!localStorageColor || localStorageColor === "white") {
      const LampClass = ["app", "App", "hiName", "title", "footer", "loading"];
      localStorage.setItem("color", JSON.stringify("dark"));
      LampClass.forEach((item) =>
        document.querySelector(`.${item}`).classList.add("dark"));
    } else if (localStorageColor === "dark") {
      const LampClass = ["app", "App", "hiName", "title", "footer", "loading"];
      localStorage.setItem("color", JSON.stringify("white"));
      LampClass.forEach((item) =>
        document.querySelector(`.${item}`).classList.remove("dark"));
    };
  };

  return (
    <div className="main-display">
      <div className="inputNameData">
        <h1>Please enter your name!</h1>
        <form onSubmit={saveName} className="formMenu">
          <input type="text" placeholder="Please enter your name"
            onChange={changeUserName} value={userName}
          />
          <button>Open</button>
        </form>
      </div>
      <div className="app hidden">
        <h1 className="title">TO DO LIST</h1>
        <h2 className="hiName">Hi
          {userName &&
            " " +
            userName[0].toLocaleUpperCase() +
            userName.slice(1, userName.length) +
            " :)"
          }</h2>
        <Input
          genericRequest={genericRequest}
          setIsLoading={setIsLoading}
        />
        <List
          notes={note} setNotes={setNote}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          genericRequest={genericRequest}
          setToast={setToast}
        />
        <Footer
          notes={note} setNotes={setNote}
        />
        <i class="fa-regular fa-lightbulb" onClick={changeLamp}></i>
      </div>
      <ToastMenu
        toast={toast}
        setToast={setToast}
      />
    </div>
  );
};

export default Index