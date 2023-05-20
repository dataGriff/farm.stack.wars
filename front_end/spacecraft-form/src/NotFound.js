import { Link } from 'react-router-dom'

const NotFound = () => {
    return ( <div className="not-found">
        <h2>You seem to be in a galaxy far far away...</h2>
        <p>This page cannot be found</p>
        <Link to="/">Go to the homepage...
        </Link>
    </div> );
}
 
export default NotFound;