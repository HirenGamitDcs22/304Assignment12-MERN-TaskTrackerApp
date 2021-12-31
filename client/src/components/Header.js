import Button from './Button';
import {useLocation} from 'react-router-dom';
const Header = ({title,onAdd,showAdd,onLogin,isLogged}) => {
    const location=useLocation();
    return (
        <header className='header' style={{color: 'red',backgroundColor: 'black',padding:20}}>
            <h1 >{title}</h1>
            {!isLogged && <Button color={'blue'} text={'Login'} onClick={onLogin}/>}
            {isLogged && location.pathname==="/" &&<Button color={showAdd?'red':'green'} text={showAdd?'Close':'Add'} onClick={onAdd}/>}
        </header>
    )
}
Header.defaultProps = {
    title: 'Task Tracker',
}
export default Header
