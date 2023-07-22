import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, cards, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar">
                    <img
                        className="profile__avatar-image"
                        src={currentUser.avatar}
                        title="Фото профиля"
                        alt="Фото профиля"
                    />
                    <button
                        className="profile__avatar-edit-button"
                        type="button"
                        title="Обновить аватар"
                        aria-label="Open popup editing-img-profile"

                        onClick={onEditAvatar}
                    >
                        <div className="profile__avatar-edit-icon" />
                    </button>
                </div>
                <div className="profile__info">
                    <div className="profile__description">
                        <h1 className="profile__author">{currentUser.name}</h1>
                        <p className="profile__competention">{currentUser.about}</p>
                    </div>
                    <button
                        className="profile__edit-button"
                        type="button"
                        aria-label="Open popup editing-profile"
                        onClick={onEditProfile}
                    />
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    aria-label="Open popup adding-card"
                    onClick={onAddPlace}
                />
            </section>
            <section className="elements">
                {cards.map((item) => (
                    <Card
                        name={item.name}
                        link={item.link}
                        likes={[...item.likes]}
                        key={item._id}
                        _id={item._id}
                        owner={item.owner}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                ))}
            </section>
        </main>
    )
}

export default Main;