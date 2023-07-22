import React from "react";

function Footer({isAuth}) {

    return (
        <footer className="footer">
            {isAuth ? <p className="footer__text">© {new Date().getFullYear()} Mesto Russia</p> : <></>}
        </footer>

    )
}

export default Footer;