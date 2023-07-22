import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isInfoTolltip, setIsInfoTolltip] = React.useState(false);
  const [isAuthIn, setIsAuthIn] = React.useState(false);
  const [headerEmail, setHeaderEmail] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    api
      .getUser()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards([...res]);
      })
      .catch(console.error);
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTolltip(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(likes, _id) {
    const isLiked = likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .addLike(_id)
        .then((card) => {
          setCards((state) =>
            state.map((c) => (c._id === _id ? card : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .removeLike(_id)
        .then((card) => {
          setCards((state) =>
            state.map((c) => (c._id === _id ? card : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => setCards((state) => state.filter((item) => item._id !== id)))
      .catch((err) => console.log(err))
  }

  function handleUpdateUser(data) {
    api
      .setUser(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .setAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //12 cпринт

  function openInfoTooltip(isAuth) {
    setIsInfoTolltip(true);
    setIsAuthIn(isAuth);
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          openInfoTooltip(true);
          navigate('/sign-in');
          setIsAuthIn(true);
        }
      })
      .catch((err) => {
        openInfoTooltip(false);
        console.log(err);
      })
  }

  function handleAuthorization(email, password) {
    auth
      .auth(email, password)
      .then((res) => {
        if (res.token) {
          setHeaderEmail(email);
          localStorage.setItem('jwt', res.token);
          setIsAuthIn(true);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltip(false);
      })
  }

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setHeaderEmail(res.data.email);
            navigate('/');
            setIsAuthIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
          navigate('/sign-in');
        })
    }
  }, [])

  function logOut() {
    localStorage.removeItem('jwt');
    setHeaderEmail('');
    setIsAuthIn(false);
    navigate('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App page">
        <Header
          email={headerEmail}
          logOut={logOut}
          isAuth={isAuthIn}
        />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={handleAuthorization} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                isAuth={isAuthIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
        </Routes>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmit={handleAddPlaceSubmit} />
        <PopupWithForm
          name="deleting-image"
          title="Вы уверены?"
          isOpen={false}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          name="tooltip"
          isOpen={isInfoTolltip}
          onClose={closeAllPopups}
          isAuth={isAuthIn}
        />
        <Footer 
          isAuth={isAuthIn}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;