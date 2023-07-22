function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_card_opening-image ${card ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__img-container">
                <button
                    onClick={onClose}
                    className="popup__button-closed"
                    type="button"
                    aria-label="Close"
                />
                <img className="popup__img-card" src={card ? card.link : '#'} title={card ? card.name : '#'} alt={card ? card.name : '#'} />
                <h3 className="popup__img-card-name">{card ? card.name : ''}</h3>
            </div>
        </div>
    )
}

export default ImagePopup;