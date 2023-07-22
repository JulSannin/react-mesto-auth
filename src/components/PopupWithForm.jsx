function PopupWithForm({ name, title, children, buttonText, isOpen, onClose, onSubmit}) {
    

    return (
        <div className={`popup popup_profile_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button
                    className="popup__button-closed"
                    type="button"
                    aria-label="Close"
                    onClick={onClose}
                />
                <h3 className="popup__form-text">{`${title}`}</h3>
                <form className="popup__form" name={`popup__form_${name}`} onSubmit={onSubmit}>
                    {children}
                    <button className="popup__button-saved" type="submit">
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;