import "./styles/header.css"

function Header({ title, smalltitle }) {
    return (
        <header>
            <h1>{title}</h1>
            <h3>{smalltitle}</h3>
        </header>
    );
}

export default Header;