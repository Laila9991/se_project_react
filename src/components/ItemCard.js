import "../Blocks/ItemCard.css";


function ItemCard({ clothingOption, onClick }) {
  return (
    <li className="card" onClick={onClick}>
      <h4 className="card__title">{clothingOption.name}</h4>
      <img
        className="card__image"
        src={clothingOption.link || clothingOption.imageUrl}
        alt={clothingOption.name}
      />
    </li>
  );
}


export default ItemCard;


