import { useHistory } from 'react-router-dom'
import './pageNotFound.css'


const NotFound = () => {
    const history = useHistory()
    
    const headHome = (e) => {
        e.preventDefault()
        history.push('/posts')
    }
    return(
        <div className="image-not-found-css">
            <h1 className='page-not-found'>Page Not Found</h1>
            <img src='https://www.ecommerce-nation.com/wp-content/uploads/2018/10/404-error.jpg'></img>
            <h2 className='headHome' onClick={headHome}>Keep Browsing</h2>
        </div>
    )
}

export default NotFound