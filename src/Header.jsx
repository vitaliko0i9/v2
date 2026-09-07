import { Link } from "react-router-dom"

function Header() {
    return(
        <div>
            {/* style this part*/}
           <section className="hero"> 
                <header className="header">
                    <div className="header__container">
                        <nav className="header__nav">
                            <ul className="header__list-item">
                                <li className="header__list-item">
                                    <Link to="NewPage" className="header__list-link active">Home</Link>
                                </li>
                                <li className="header__list-item">
                                    <Link to="try" className="header__list-link">1</Link>
                                </li>
                                <li className="header__list-item">
                                    <Link to="index.html" className="header__list-link">2</Link>
                                </li>
                                <li className="header__list-item">
                                    <Link to="index.html" className="header__list-link">3</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
            </section>
        </div>
    )
}

export default Header