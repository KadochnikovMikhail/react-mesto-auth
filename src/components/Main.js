import { useEffect, useState } from "react";
import editBtn from '../images/editbutton.svg';
import addBtn from '../images/addbutton.svg';
import avatar from '../images/avatar.png';
import Card from "./Card";
import {api}  from "../utils/Api";
function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState(avatar);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api
            .getUserInfo()
            .then((res) => {
                setUserName(res.name);
                setUserDescription(res.description);
                setUserAvatar(res.avatar);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        api
            .getInitialCards()
            .then((res) => {
                setCards(res);
            })
            .catch((error) => console.log(error));
    }, []);

    const template = () => {
        if (cards.length > 0) {
            return cards.map((card) => (
                <Card card={card} onCardClick={onCardClick} key={`card${card._id}`} />
            ));
        }
    };
    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__image" alt="Фото профиля" src={userAvatar} />
                    <div className="profile__overlay" onClick={onEditAvatar}></div>
                </div>

                <div className="profile__info">
                    <div className="profile__header">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="profile__edit-button" type="button">
                            <img className="profile__edit-button-image" alt="Редактировать"
                                src={editBtn} onClick={onEditProfile} />
                        </button>
                    </div>

                    <h2 className="profile__description">{userDescription}</h2>
                </div>
                <button className="profile__addbutton" type="button" onClick={onAddPlace}><img className="profile__addbutton-image" alt="Добавить"
                    src={addBtn} /></button>

            </section>
            <section className="cards">
                {template()}
            </section>
        </main>
    );
}

export default Main;