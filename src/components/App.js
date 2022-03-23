import React, {useState, useEffect} from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import api from '../utils/Api';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from '../components/EditAvatarPopup';
import AddPlacePopup from '../components/AddPlacePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    const handleEditAvatarClick = () => {setIsEditAvatarPopupOpen(true)};
    const handleEditProfileClick = () => {setIsEditProfilePopupOpen(true)};
    const handleAddPlaceClick = () => {setIsAddPlacePopupOpen(true)};
    const handleCardClick = (card) => {setSelectedCard(card)};

    const closeAllPopups = () => {
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setSelectedCard(null)
    };
    useEffect(() => {
        const handleEscClose = (e) => {
            if (e.key === "Escape") {
                closeAllPopups();
            }
        };

        document.addEventListener("keydown", handleEscClose);

        return () => document.removeEventListener("keydown", handleEscClose);
    }, []);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cards]) => {
                setCurrentUser(userData);
                setCards(cards);
            })
            .catch(err => console.log(err));
    }, []);

    const handleUpdateUser = (res) => {
        api.editProfile(res)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    };

    const handleUpdateAvatar = ({avatar}) => {
        api.updateAvatar(avatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    };

    const handleAddPlaceSubmit = (card) => {
        api.addCard(card)

            .then((newCard) => {
                console.log(card);
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    };


    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
        api.removeCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(err));
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="content">
                    <Header/>
                    <Main
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                    <Footer/>
                </div>

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
            </div>

        </CurrentUserContext.Provider>
    );
}

export default App;
