import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { TiTimes } from 'react-icons/ti';
import { useForm } from 'react-hook-form';
import { CgTrashEmpty } from 'react-icons/cg';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoReturnUpBack } from 'react-icons/io5';
import { useParams, useLocation } from 'react-router-dom';
import TextField from '../../components/form/TextField';
import { getCharacter, updateCharacter, updateCharacters, deletedCharacter } from '../../redux/actions';
import './styles.scss';
import Modal from '../../components/Modal';


const Character = ({ characters, character, getCharacter, updateCharacter, updateCharacters, deletedCharacter }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [saved, setSaved] = useState(false);
  const isEdit = pathname.includes('/edit');
  const params = useParams<{ id: string }>();
  const { register, handleSubmit } = useForm();
  const [person, setPerson] = useState(character);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (characters) {
      const aux = characters?.find((item) => item.id.toString() === params.id);
      if (aux) {
        setPerson(aux);
        updateCharacter({ character: aux });
      } else {
        getCharacter({ id: params.id });
      }
    } else {
      getCharacter({ id: params.id });
    }
  }, []);

  useEffect(() => {
    setPerson(character);
  }, [character]);

  const onSubmit = (data) => {
    const origin = {
      name: data.origin,
      url: character.origin.url,
    }
    const location = {
      name: data.location,
      url: character.location.url,
    }
    const newCharacter = {
      ...character,
      ...data,
      origin,
      location,
    };
    if (characters) {
      const newCharacters = characters?.map((item) => {
        if (item.id === newCharacter.id) {
          return newCharacter;
        }
        return item;
      })
      updateCharacters({ characters: newCharacters });
    }

    updateCharacter({ character: newCharacter });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  const handleDelete = () => {
    if (characters) {
      const newList = characters.filter((item) => item.id !== character.id);
      updateCharacters({ characters: newList });
      history.push('/');
    } else {
      deletedCharacter({ character });
      history.push('/');
    }
  }

  return (
    <section className='Character'>
      <Link to='/' className='Character__return btn-link-accent'>
        <span className='btn-icon'><IoReturnUpBack /></span>
        <span>Regresar</span>
      </Link>
      {person && !isEdit && (
        <>
          <figure className='Character__image'>
            <img src={person.image} alt={person.name} />
          </figure>
          <div className='Character__body'>
            <div className='flex'>
              <p><strong>{person.name}</strong></p>
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
            <p>{person.gender}</p>
            <p>{person.origin.name}</p>
            <p>{person.location.name}</p>
          </div>
        </>
      )}
      {person && isEdit && (
        <>
          <figure className='Character__image'>
            <img src={person.image} alt={person.name} />
          </figure>
          <form className='Character__body' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex'>
              <TextField
                id='Name'
                name='name'
                label='Nombre'
                autoComplete='off'
                defaultValue={person.name}
                placeholder='Digita el nombre'
                register={register('name', { required: true })}
              />
              <div className='flex'>
                <Link
                  title='Cancelar'
                  className='btn-outline-danger'
                  to={`/character/${person.id}`}
                >
                  <TiTimes />
                </Link>
              </div>
            </div>
            <TextField
              id='Status'
              name='status'
              label='Status'
              autoComplete='off'
              defaultValue={person.status}
              placeholder='Digita el status del personaje'
              register={register('status', { required: true })}
            />
            <TextField
              id='Species'
              name='species'
              label='Especie'
              autoComplete='off'
              defaultValue={person.species}
              placeholder='Digita la especie del personaje'
              register={register('species', { required: true })}
            />
            <TextField
              id='Gender'
              name='gender'
              label='Genero'
              autoComplete='off'
              defaultValue={person.gender}
              placeholder='Digita el genero del personaje'
              register={register('gender', { required: true })}
            />
            <TextField
              id='Origin'
              name='origin'
              label='Origen'
              autoComplete='off'
              defaultValue={person.origin.name}
              placeholder='Digita el origen del personaje'
              register={register('origin', { required: true })}
            />
            <TextField
              id='Location'
              name='location'
              autoComplete='off'
              label='Localización'
              defaultValue={person.location.name}
              placeholder='Digita la localización del personaje'
              register={register('location', { required: true })}
            />
            {saved && <p className='color-success bounceIn'>¡Guardado correctamente!</p>}
            <button type='submit' className='btn-primary form-button'>
              Guardar
            </button>
          </form>
        </>
      )}
      {!person && (
        <p>Loading...</p>
      )}
      <Modal
        show={openModal}
        onClose={setOpenModal}
        title='Eliminar personaje'
      >
        <div className='DeleteModal gap-8'>
          <p>¿Seguro que deseas eliminar el siguiente personaje?</p>
          <p><strong>{`${character?.id} - ${character?.name}`}</strong></p>
          <div className='flex justify-self-end'>
            <button
              type='button'
              className='btn-link-danger'
              onClick={() => setOpenModal(false)}
            >
              Cancelar
            </button>
            <button
              type='button'
              className='btn-danger'
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    character: state.character,
    characters: state.characters,
  };
};

const mapDispatchToProps = {
  getCharacter,
  updateCharacter,
  updateCharacters,
  deletedCharacter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Character);