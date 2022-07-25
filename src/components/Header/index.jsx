import './style.css'
import PencilSquare from "./pencilSquare";

const Header = () => {
    return (
        <header className='titleWrapper'>
            <PencilSquare/>
            <h1 className='listTitle'>ToDo List </h1>
        </header>
    );
};

export default Header;
