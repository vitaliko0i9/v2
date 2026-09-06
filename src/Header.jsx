import { Link } from "react-router-dom"

function Header() {
    return(
        <div>
            {/* <nav class="nav nav-pills nav-fill">
                <Link to="NewPAge" class="nav-item nav-link active" >Active</Link>
                <a class="nav-item nav-link" href="#">Link</a>
                <a class="nav-item nav-link" href="#">Link</a>
                <a class="nav-item nav-link disabled" href="#">Disabled</a>
            </nav> */}
           <section className="hero"> 
                <header className="header">
                    <div className="header__container">
                        <nav className="header__nav">
                            <ul className="header__list-item">
                                <li className="header__list-item">
                                    <Link to="NewPage" className="header__list-link active">Home</Link>
                                </li>
                                <li className="header__list-item">
                                    <Link to="index.html" className="header__list-link">1</Link>
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