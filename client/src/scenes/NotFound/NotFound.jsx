import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();
    return (
        <div className="not-found">
            <div>
                <h2 onClick={
					() => {
						navigate('/');
					}
				}>404 | This route does not exist. Click here to return to dashboard.</h2>
            </div>
        </div>
    );
};

export default NotFound;