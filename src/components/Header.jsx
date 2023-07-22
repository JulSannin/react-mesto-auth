import { useEffect, useState, useRef } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import logo from '../images/logo.svg';

const handleDebounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

const checkIsMobile = () => window.matchMedia("(max-width: 768px)").matches;

const HeaderSpoiler = ({ isOpened, children }) => {
    const [height, setHeight] = useState(0);
    const elementRef = useRef(null);

    useEffect(() => {
        setHeight(elementRef.current.clientHeight);
    }, []);
    return (
        <div className={"header__spoiler"} {...(isOpened && {
            className: `${"header__spoiler"} ${"header__spoiler_opened"}`,
            style: { height: `${height}px` }
        })}>
            <div ref={elementRef} className={"header__spoiler-wrapper"}>
                {children}
            </div>
        </div>
    )
}
function Header({ email, logOut, isAuth }) {
    const [isMobile, setIsMobile] = useState(checkIsMobile);
    const [isSpoilerOpened, setIsSpoilerOpened] = useState(false);
    const toggleSpoiler = () => setIsSpoilerOpened(!isSpoilerOpened);

    const resizeSubscribe = () => window.addEventListener('resize', handleDebounce(() => setIsMobile(checkIsMobile)));
    const resizeUnsubscribe = () => window.removeEventListener('resize', handleDebounce(() => setIsMobile(checkIsMobile)));

    useEffect(() => {
        resizeSubscribe();
        return resizeUnsubscribe();
    }, []);

    return (
        <header className={"header"}>
            {isAuth && isMobile && <HeaderSpoiler isOpened={isSpoilerOpened}>
                <div className="header__container">
                    <p className="header__email">{email}</p>
                    <Link to="/sign-in" className="header__link header__logout" onClick={logOut}>
                        Выйти
                    </Link>
                </div>
            </HeaderSpoiler>}
            <div className={"header__wrapper"}>
                <img className={"header__logo"} src={logo} alt="Логотип"/>
                <div className={"header__nav"}>

                    <div className="header__info">
                        <Routes>
                            <Route path="/sign-in"
                                element={
                                    <Link to="/sign-up" className="header__link">
                                        Регистрация
                                    </Link>
                                }
                            />
                            <Route path="/sign-up"
                                element={
                                    <Link to="/sign-in" className="header__link">
                                        Войти
                                    </Link>
                                }
                            />
                            {!isMobile &&
                                <Route path="/"
                                    element={
                                        <>
                                            <div className="header__container">
                                                <p className="header__email">{email}</p>
                                                <Link to="/sign-in" className="header__link header__logout" onClick={logOut}>
                                                    Выйти
                                                </Link>
                                            </div>
                                        </>
                                    }
                                />
                            }
                        </Routes>
                    </div>

                    {isAuth && isMobile &&
                        <div
                            className={"header__button"}
                            onClick={toggleSpoiler}
                            {...(isSpoilerOpened && {
                                className: `${"header__button"} ${"header__button_active"}`
                            })}
                        >
                            <div className={"header__button-line"}></div>
                        </div>}

                </div>
            </div>
        </header>
    )
}

export default Header;