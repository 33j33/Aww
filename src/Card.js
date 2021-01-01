import React from "react";

const Card = ({ catData }) => {
  return (
    <div className="card">
      <img src={catData.img} alt="cat-img" />
      <h4>A Cat Fact</h4>
      <p>{catData.fact}</p>
    </div>
  );
};

export default Card;
