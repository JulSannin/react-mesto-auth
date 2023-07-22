import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onSubmit }) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({
            name,
            link,
        });
    }

    React.useEffect(() => {
        if (isOpen) {
            setName("");
            setLink("");
        }
    }, [isOpen]);

    return (
        <PopupWithForm
            name="adding-card"
            title="Новое место"
            buttonText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <input
                        id="popup__input-name-img"
                        className="popup__input popup__input_type_name-img"
                        type="text"
                        name="nameImg"
                        placeholder="Название"
                        minLength="2"
                        maxLength="30"
                        required
                        onChange={handleNameChange}
                        value={name}
                    />
                    <span id="popup__input-name-img-error" className="popup__error" />
                    <input
                        id="popup__input-link-img"
                        className="popup__input popup__input_type_link-img"
                        type="url"
                        name="linkImg"
                        placeholder="Ссылка на картинку"
                        required
                        onChange={handleLinkChange}
                        value={link}
                    />
                    <span id="popup__input-link-img-error" className="popup__error" />
                </>
            }
        />
    )
}

export default AddPlacePopup;