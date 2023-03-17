import img from '../../resources/error.png';

const ErrorMessage = ({children}) => {
    return (
        <>
        <img style={{ display: 'block', width: "200px", height: "200px",objectFit: 'contain', margin: "0 auto"}}  src={img} alt="Error"/>
        <div className='text-center'>{children}</div>
        </>
    )
}

export default ErrorMessage;