import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {loginActions} from './../redux/loginSlice'

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isAdmin = useSelector((state) => state.login.admin)
  const email = useSelector((state) => state.login.email)
  const handleLogout = () => {
    dispatch(loginActions.setEmail(null))
    
    navigate('/');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {email ? (
        <>
          {!isAdmin && <Link to="/editprofile">Profile</Link>}
          {!isAdmin && <Link to="/order-history">Orders</Link>}
          {isAdmin && (
            <>
              <Link to="/manage-movies">Manage Movies</Link>
              <Link to="/manage-promotions">Manage Promotions</Link>
              <Link to="/manage-users">Manage Users</Link>
            </>
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}
