import React from 'react';
import { Link } from 'react-router-dom';
import { FiUserPlus } from 'react-icons/fi';
import './styles.scss';

const Appbar = () => {

  return (
    <header className='Appbar'>
      <Link to='/' className='btn-link'>
        <figure className='Heeader__logo'>
          <p className='txt-xl color-primary'><strong>Rick and Morty</strong></p>
        </figure>
      </Link>
      <Link to='/character/create' className='btn-link-primary'>
        <span>Crear personaje</span>
        <span className='btn-icon'><FiUserPlus /></span>
      </Link>
    </header>
  );
}

export default Appbar;