import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    return (
        <PopupWithForm
            name="editing-profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <input
                        id="popup__input-name"
                        className="popup__input popup__input_type_name"
                        type="text"
                        name="name"
                        placeholder="Имя автора"
                        minLength="2"
                        maxLength="40"
                        required
                        onChange={handleNameChange}
                        value={ name }
                    />
                    <span id="popup__input-name-error" className="popup__error" />
                    <input
                        id="popup__input-description"
                        className="popup__input popup__input_type_description"
                        type="text"
                        name="description"
                        placeholder="Профессия автора"
                        minLength="2"
                        maxLength="200"
                        required
                        onChange={handleDescriptionChange}
                        value={ description }
                    />
                    <span id="popup__input-description-error" className="popup__error" />
                </>
            }
        />
    )
}

export default EditProfilePopup;