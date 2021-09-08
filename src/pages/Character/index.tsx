import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { CgTrashEmpty } from 'react-icons/cg';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoReturnUpBack } from 'react-icons/io5';
import { getCharacter } from '../../redux/actions';
import './styles.scss';


const Character = ({ character, getCharacter }) => {
  const params = useParams<{ id: string }>();
  useEffect(() => {
    getCharacter({ id: params.id });
  }, []);

  return (
    <section className='Character'>
      <Link to='/' className='Character__return btn-link-accent'>
        <span className='btn-icon'><IoReturnUpBack /></span>
        <span>Regresar</span>
      </Link>
      {Object.keys(character).length > 0 && (
        <>
          <figure className='Character__image'>
            <img src={character.image} alt={character.name} />
          </figure>
          <div className='Character__body'>
            <div className='flex'>
              <p><strong>{character.name}</strong></p>
              <div className='flex'>
                <button
                  type='button'
                  title='Eliminar'
                  onClick={() => {}}
                  className='btn-link-danger'
                >
                  <CgTrashEmpty />
                </button>
                <Link
                  title='Editar'
                  className='btn-primary'
                  to={`/character/editar/${character.id}`}
                >
                  <AiOutlineEdit />
                </Link>
              </div>
            </div>
            <p className={character.status}>
              {`${character.status} - ${character.species}`}
            </p>
            <p>{character.type}</p>
            <p>{character.gender}</p>
            <p>{character.origin.name}</p>
            <p>{character.location.name}</p>
          </div>
        </>
      )}
      {Object.keys(character).length === 0 && (
        <p>Loading...</p>
      )}
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    character: state.character || {},
  };
};

const mapDispatchToProps = {
  getCharacter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Character);