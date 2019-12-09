import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { ThumbUp } from '@material-ui/icons';
import TokenService from '../../services/token-service';
import karmaService from '../../services/karma-service';

class Header extends Component {
  state = {
    auth: TokenService.hasAuthToken(),
  };

  handleLogout = () => {
    TokenService.clearAuthToken();
    this.setState({
      auth: TokenService.hasAuthToken()
    });
  }

  render() {
    return (
      <header className="App-header">
        {/* <img className='App-logo' src='images/icon.png' alt='logo'/>{' '} */}
        <Link to="/" className="resetStyles">
          <h1>Anonygram</h1>
        </Link>{' '}
        {TokenService.hasAuthToken() ? (
          <>
            <Link
              to="/login"
              className="nav-link resetStyles"
              onClick={this.handleLogout}
            >
              Logout
            </Link>
            <div className="App__karma-total">
              <ThumbUp /> {karmaService.getKarma()}
            </div>
            |
            <Link to='/local-map' className='resetStyles'>Map View</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link resetStyles">
              Login
            </Link>
            |
            <Link to="/register" className="nav-link resetStyles">
              Register
            </Link>
            |
            <Link to='/local-map' className='resetStyles'>Map View</Link>
          </>
        )}
      </header>
    );
  }
}

export default Header;
