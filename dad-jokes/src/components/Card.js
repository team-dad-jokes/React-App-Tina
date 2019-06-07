import React from "react";


const Card = props => {
  return (
    <div className="card">
        <div className="img-container">
        <h2>{props.card}</h2>
        </div>
        {/* <h3>{props.card.title}</h3> */}
    </div>
  );
};

export default Card;