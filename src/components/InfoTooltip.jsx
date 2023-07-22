import React from "react";
import icon_ok from "../images/icon_ok.svg";
import icon_fail from "../images/icon_fail.svg";

function InfoTooltip({ name, isAuth, isOpen, onClose }) {

    return (
        <div className={`popup popup_profile_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button
                    className="popup__button-closed"
                    type="button"
                    aria-label="Close"
                    onClick={onClose}
                />
                <img
                    className="popup__tooltip-img"
                    src={`${isAuth ? icon_ok : icon_fail}`}
                    alt=""
                />
                <h2 className="popup__title">{`${isAuth ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}`}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;