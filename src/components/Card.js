import trashBtn from '../images/Trash.svg';
import likeBtn from '../images/like.svg';

function Card({ card, onCardClick }) {
  const handleClick = () => {
    onCardClick(card);
  };

  return (
    <div className="cards__item">
      <button className="cards__delete" type="button">
        <img className="cards__delete-image" alt="Удалить" src={trashBtn} />
      </button>

      <img className="cards__image" alt={card.name} src={card.link} onClick={handleClick} />
      <div className="cards__header">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__like">
          <button className="cards__like-btn" type="button"><img className="cards__like-image" alt="Лайк"
            src={likeBtn} /></button>
          <p className="cards__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card

