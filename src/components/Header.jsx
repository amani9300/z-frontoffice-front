import * as React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header({ isLoggedIn }) {

  React.useEffect(() => console.log(isLoggedIn));

  return (
    <header className='header'>
      <div className="brand">
        <h1>Centimoo</h1>
      </div>
      <ul className="nav">
        {isLoggedIn ?
          <>
            <li><NavLink to='/contact'>Contact</NavLink></li>
            <li><NavLink to='/products'>Products</NavLink></li>
            <li><NavLink to='/logout'>Logout</NavLink></li>
          </>
          :
          <>
            <li><NavLink to='/auth'>Sign in</NavLink></li>
            <li><NavLink to='/inscription'>Register</NavLink></li>
          </>
        }
      </ul>
    </header>
  )

}
