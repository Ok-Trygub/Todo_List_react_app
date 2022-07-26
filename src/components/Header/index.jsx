import './style.css'
import PencilSquare from "./pencilSquare";

const Header = (props) => {
    return (
        <header className='titleWrapper' onClick={props.redirect}>
            <PencilSquare/>
            <h1 className='listTitle'>ToDo List </h1>
        </header>
    );
};

export default Header;
