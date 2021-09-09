import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { CgTrashEmpty } from 'react-icons/cg';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoReturnUpBack } from 'react-icons/io5';
import { useParams, useLocation } from 'react-router-dom';
import {
  getCharacter,
  updateCharacter,
  updateCharacters,
  deletedCharacter,
  createdCharacter,
} from '../../redux/actions';
import Modal from '../../components/Modal';
import './styles.scss';
import CharacterForm from '../../components/CharacterForm';

const Character = ({
  characters,
  character,
  getCharacter,
  updateCharacter,
  createdCharacter,
  updateCharacters,
  deletedCharacter,
}) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const isEdit = pathname.includes('/edit');
  const isCreate = pathname.includes('/create');
  const params = useParams<{ id: string }>();
  const [person, setPerson] = useState(isCreate ? null : character);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (characters && !isCreate) {
      const aux = characters?.find((item) => item.id.toString() === params.id);
      if (aux) {
        setPerson(aux);
        updateCharacter({ character: aux });
      } else {
        getCharacter({ id: params.id });
      }
    } else if (!isCreate) {
      getCharacter({ id: params.id });
    }
  }, []);

  useEffect(() => {
    setPerson(character);
  }, [character]);

  const handleDelete = () => {
    if (characters) {
      const newList = characters.filter((item) => item.id !== character.id);
      updateCharacters({ characters: newList });
      history.push('/');
    } else {
      deletedCharacter({ character });
      history.push('/');
    }
  };

  return (
    <section className='Character'>
      <Link to='/' className='Character__return btn-link-accent'>
        <span className='btn-icon'>
          <IoReturnUpBack />
        </span>
        <span>Regresar</span>
      </Link>
      {person && !isEdit && !isCreate && (
        <>
          <figure className='Character__image'>
            <img
              alt={person.name}
              src={person.image || 'https://dues.com.mx/duesAdmin/assets/web-page/logos/defaultSF.png'}
            />
          </figure>
          <div className='Character__body'>
            <div className='flex'>
              <p>
                <strong>{person.name}</strong>
              </p>
              <div className='flex'>
                <button
                  type='button'
                  title='Eliminar'
                  className='btn-link-danger'
                  onClick={() => setOpenModal(true)}
                >
                  <CgTrashEmpty />
                </button>
                <Link
                  title='Editar'
                  className='btn-primary'
                  to={`/character/edit/${person.id}`}
                >
                  <AiOutlineEdit />
                </Link>
              </div>
            </div>
            <p className={person.status}>
              {`${person.status} - ${person.species}`}
            </p>
            <p>{person.type}</p>
            <p>{`Genero: ${person.gender}`}</p>
            <p>{`Origen: ${person.origin.name}`}</p>
            <p>{`Localización: ${person.location.name}`}</p>
          </div>
        </>
      )}
      {person && isEdit && (
        <>
          <figure className='Character__image'>
            <img
              alt={person.name}
              src={person.image || 'https://dues.com.mx/duesAdmin/assets/web-page/logos/defaultSF.png'}
            />
          </figure>
          <CharacterForm
            person={person}
            character={character}
            characters={characters}
            createdCharacter={null}
            updateCharacter={updateCharacter}
            updateCharacters={updateCharacters}
          />
        </>
      )}
      {isCreate && (
        <>
          <figure className='Character__image'>
            <img
              src='https://dues.com.mx/duesAdmin/assets/web-page/logos/defaultSF.png'
              alt='No image'
            />
          </figure>
          <CharacterForm
            person={null}
            character={null}
            characters={characters}
            updateCharacter={updateCharacter}
            createdCharacter={createdCharacter}
            updateCharacters={updateCharacters}
          />
        </>
      )}
      {!person && !isCreate && <p>Loading...</p>}
      <Modal show={openModal} onClose={setOpenModal} title='Eliminar personaje'>
        <div className='DeleteModal gap-8'>
          <p>¿Seguro que deseas eliminar el siguiente personaje?</p>
          <p>
            <strong>{`${character?.id} - ${character?.name}`}</strong>
          </p>
          <div className='flex justify-self-end'>
            <button
              type='button'
              className='btn-link-danger'
              onClick={() => setOpenModal(false)}
            >
              Cancelar
            </button>
            <button type='button' className='btn-danger' onClick={handleDelete}>
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    character: state.character,
    characters: state.characters,
  };
};

const mapDispatchToProps = {
  getCharacter,
  updateCharacter,
  createdCharacter,
  updateCharacters,
  deletedCharacter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Character);
