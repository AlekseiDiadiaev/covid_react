import img from '../../resources/error.png';

const ErrorMessage = () => {
    return (
        <img style={{ display: 'block', width: "200px", height: "200px",objectFit: 'contain', margin: "0 auto"}}  src={img} alt="Error"/>
    )
}

export default ErrorMessage;