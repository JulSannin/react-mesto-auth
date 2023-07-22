import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const ref = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: ref.current.value
        });
    }

    React.useEffect(() => {
        ref.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm
            name="editing-avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <input
                        id="popup__input-link-avatar"
                        className="popup__input popup__input_type_link-avatar"
                        type="url"
                        name="linkAvatar"
                        placeholder="Ссылка на картинку"
                        required
                        ref={ref}
                    />
                    <span id="popup__input-link-avatar-error" className="popup__error" />
                </>
            }
        />
    )
}

export default EditAvatarPopup;