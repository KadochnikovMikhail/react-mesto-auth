import React, { useState } from "react";

// import closeBtn from '../images/CloseIcon.svg';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import  ImagePopup  from "./ImagePopup";
import "../index.css";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);

  const closeAllPopups = (evt) => {
    if (
      evt.type === "keydown" ||
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__closebutton-image") ||
      evt.target.classList.contains("popup__overlay")
    ) {
      setIsAddPlacePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setSelectedCard(null);
    }
  };


  return (

    <div className="page">
      <div className="content">
        <Header />
        <Main
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>

      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        title="Редактировать профиль"
        name="user-info"
        children={
          <>
            <input className="form__data" id="name" type="text" name="name" placeholder="Имя" required minLength="2"
              maxLength="40" />
            <span id="name-error" className="error"></span>
            <input className="form__data" id="job" type="text" name="description" placeholder="О себе" required
              minLength="2" maxLength="200" />
            <span id="job-error" className="error"></span>
          </>
        }
      />

      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        title="Новое место"
        name="new-card"
        children={
          <>
            <input className="form__data" id="title" type="text" name="name" placeholder="Название" required
              minLength="2" maxLength="30" />
            <span id="title-error" className="error"></span>
            <input className="form__data" id="link" type="url" name="description" placeholder="Ссылка на картинку"
              required />
            <span id="link-error" className="error"></span>
          </>
        }
      />


      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        title="Обновить аватар"
        name="avatar"
        children={
          <>

            <input className="form__data" id="avatar" type="url" name="avatar" placeholder="Ссылка на фото" required
              minLength="2" />
            <span id="avatar-error" className="error"></span>
          </>
        }
      />



      <ImagePopup onClose={closeAllPopups} card={selectedCard} />


      {/*<div className="popup popup_type_confirm">*/}
      {/*  <div className="popup__overlay" id="overlay__confirm"></div>*/}
      {/*  <div className="popup__container ">*/}
      {/*    <button className="popup__closebutton" id="confirm-close" type="button">*/}
      {/*      <img className="popup__closebutton-image" alt="закрыть" src={closeBtn} />*/}
      {/*    </button>*/}
      {/*    <form className="form" id="form-confirm" name="confirm-form">*/}
      {/*      <div className="form__header">*/}
      {/*        <h2 className="form__title">Вы уверены?</h2>*/}
      {/*      </div>*/}
      {/*      <button className="form__buttonsave form__buttonsave_type_confirm" type="submit">Да</button>*/}
      {/*    </form>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}


export default App;
