
import closeBtn from '../images/CloseIcon.svg';


function PopupWithForm({ title, name, children, isOpen, onClose }) {

    return (
            <div className={isOpen ? `popup ${name} popup_opened` : `popup ${name}`} onClick={onClose}>
            <div className="popup__overlay" id="overlay__profile" ></div>
            <div className="popup__container">
                <button className="popup__closebutton" id="profile-close" type="button" onClick={onClose}>
                    <img className="popup__closebutton-image" alt="закрыть" src={closeBtn} />
                </button>
                <form className="form" id="form-edit" name={name}>
                    <div className="form__header">
                        <h2 className="form__title">{title}</h2>
                    </div>
                    {children}
                    
                    <button className="form__buttonsave form__buttonsave_type_save" id="profile-button" type="submit">Сохранить</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm