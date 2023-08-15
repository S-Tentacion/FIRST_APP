import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import "./App.css";

const cookies = new Cookies();

const DUMMY_VALUE = "dummyvalue";

const COOKIEPAYLOAD = [
  {
    name: "Shubham",
    designation: "Software Engineer",
    experience: "Kyu btao !",
  },
];

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    let currentDate = new Date();
    // Add one year to the current date
    let expirationDate = new Date(currentDate.getTime());
    expirationDate.setFullYear(currentDate.getFullYear() + 1);
    const hadValueInCookies = cookies.get(DUMMY_VALUE);
    if (!hadValueInCookies) {
      cookies.set(DUMMY_VALUE, COOKIEPAYLOAD, {
        path: "/",
        expires: expirationDate,
        domain: "recur-first-app.vercel.app",
      });
    }else{
      setData(hadValueInCookies)
    }
  }, []);

  const handleRedirect = () => {
    let url = "https://recur-second-app.vercel.app/";
    window.open(url);
  };

  return (
    <div className="App">
      <main className="mainlayout">
        <div className="wrapper">
          <div class="card">
            <h2>Cookie Value</h2>
            <p>
              {data.length
                ? data.map((item) => {
                    return (
                      <>
                        <p>Name: {item?.name}</p>
                        <p>Designation: {item?.designation}</p>
                        <p>Experience: {item?.experience}</p>
                      </>
                    );
                  })
                : null}
            </p>
          </div>
          <button className="animation-button" onClick={handleRedirect}>
            Send cookies to my brother
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
