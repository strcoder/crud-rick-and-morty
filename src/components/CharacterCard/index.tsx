import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const CharacterCard = ({ data }) => {
  if (!data) {
    return null;
  }
  const { id, name, status, species, image } = data;
  return (
    <Link to={`/character/${id}`} className='CharacterCard'>
      <figure className='CharacterCard__avatar'>
        <img src={image || 'https://dues.com.mx/duesAdmin/assets/web-page/logos/defaultSF.png'} alt={name} />
      </figure>
      <div className='CharacterCard__body'>
        <p><strong>{name}</strong></p>
        <p className={status}>{`${status} - ${species}`}</p>
      </div>
    </Link>
  );
};

export default CharacterCard;
