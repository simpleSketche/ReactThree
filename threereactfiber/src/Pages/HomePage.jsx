import { Link, useNavigate } from 'react-router-dom';

export default function HomePage(){

    const navigate = useNavigate();

    const ButtonContainerStyle = {

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',

    }

    const buttonStyle = {

        padding: '10px 20px',
        fontSize: '24px',
        backgroundColor: '#ffffff',
        color: '#fffff',
        border: 'none',
        cursor: 'pointer',

    }

    const clickEnter = () => {
        navigate('/menu')
    }

    return <>
    
        <div style={ButtonContainerStyle}>
            <button style={buttonStyle} onClick={clickEnter}>
                 
                 Enter

            </button>
        </div>

    </>
}