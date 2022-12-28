import React from "react";
import ModalWithForm from "./ModalWithForm.js";

const AddItemModal = ({ isOpen, onCloseModal, onAddItem }) => {
  const [name, setName] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const [weatherType, setWeatherType] = React.useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleUrl = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeather = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(name, imageUrl, weatherType);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      name="add"
      title="New garment"
      buttonText="Add garment"
      onClose={onCloseModal}
      onAddItem={onAddItem}
      handleSubmit={handleSubmit}
      handleWeather={handleWeather}
      handleImageChange={handleUrl}
    >
      <h4 className="form__label">Name</h4>
      <input
        className="form__input form__input_type_name"
        id="name"
        name="name"
        type="text"
        onChange={handleName}
        value={name}
        placeholder="Name"
        minLength="1"
        maxLength="40"
        required
      />
      <h4 className="form__label">Image</h4>
      <input
        className="form__input form__input_type_image"
        id="link"
        name="imageUrl"
        type="url"
        onChange={handleUrl}
        value={imageUrl}
        placeholder="Image URL"
        required
      />
      <h4 className="form__label">Select the weather type:</h4>
      <div className="form__radio-container">
        <div className="form__radio">
          <input
            className="form__input-radio"
            id="hot"
            name="weather"
            value="Hot"
            type="radio"
            onChange={handleWeather}
          />
          <label className="form__label-radio" htmlFor="hot">
            Hot
          </label>
        </div>
        <div className="form__radio">
          <input
            className="form__input-radio"
            id="warm"
            name="weather"
            value="Warm"
            type="radio"
            onChange={handleWeather}
          />
          <label className="form__label-radio" htmlFor="warm">
            Warm
          </label>
        </div>
        <div className="form__radio">
          <input
            className="form__input-radio"
            id="cold"
            name="weather"
            value="Cold"
            type="radio"
            onChange={handleWeather}
          />
          <label className="form__label-radio" htmlFor="cold">
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
