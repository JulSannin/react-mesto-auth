import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ name, link, likes, onCardClick, owner, _id, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = owner._id === currentUser._id;
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `elements__like-button ${isLiked && 'elements__like-button_active'}`
    );;

    function handleClickCard() {
        onCardClick({ name, link });
    }

    function handleLikeClick() {
        onCardLike(likes, _id);
    }

    function handleDeleteClick() {
        onCardDelete(_id)
    }

    return (
        <div className="elements__item">
            <img className="elements__photo"
                src={link}
                title={name}
                alt={name}
                onClick={handleClickCard}
            />
            {/* Далее в разметке используем переменную для условного рендеринга */}
            {isOwn &&
                <button
                    className="elements__deleted-button"
                    type="button"
                    aria-label="Delete card"
                    onClick={handleDeleteClick}
                />
            }
            <div className="elements__card">
                <h2 className="elements__place-name">{name}</h2>
                <div className="element__like-container">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        aria-label="Like"
                        onClick={handleLikeClick}
                    />
                    <p className="elements__like-counter">{likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;