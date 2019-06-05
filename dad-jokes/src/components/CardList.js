import React from 'react';
import Card from './Card';


const CardList = props => {
  return (
    <div className="cards-container">
          {props.cards.map(card => <Card card={card} />)}
    </div>
  )
}

export default CardList;