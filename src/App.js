import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./styles.css";
import Loader from "react-loader-spinner";
import catIcon from "./cat.svg";

export default function App() {

  const catPicApiUrl = "https://aws.random.cat/meow";
  const catFactApiUrl =
    "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=1";
  // https://alexwohlbruck.github.io/cat-facts/docs/endpoints/facts.html
  const [catData, setCatData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    let catFact, catPicUrl;
    // When we call this function we set loading to true.
    setLoading(true);
    try {
      let response = await fetch(catPicApiUrl);
      let jsonData = await response.json();
      catPicUrl = jsonData.file;
      response = await fetch(catFactApiUrl);
      jsonData = await response.json();
      catFact = jsonData.text;
      setLoading(false);
      // When the data is fetched we set loading to false.
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setCatData({ img: catPicUrl, fact: catFact });
  };
  // Fetches data from the two Api
  // It only runs once 
  useEffect(()=> {
    fetchData();
  }, [])
  const loader = (
    <Loader
      type="TailSpin"
      color="#331457"
      height={150}
      width={150}
    />
  );
  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>
            <img src={catIcon} alt="catIcon" />
            Aww!
          </h1>
          <p>Get cat pics and facts. Click on the button below.</p>
        </header>
        <button onClick={fetchData}>More "Aww"</button>
        {loading ? loader : <Card catData={catData} />}
      </div>
    </div>
  );
}
