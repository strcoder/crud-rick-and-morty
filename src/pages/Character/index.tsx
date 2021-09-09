import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TiTimes } from 'react-icons/ti';
import { useForm } from 'react-hook-form';
import { CgTrashEmpty } from 'react-icons/cg';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoReturnUpBack } from 'react-icons/io5';
import { useParams, useLocation } from 'react-router-dom';
import TextField from '../../components/form/TextField';
import { getCharacter, updateCharacter } from '../../redux/actions';
import './styles.scss';


const Character = ({ character, getCharacter, updateCharacter }) => {
  const params = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const { register, handleSubmit } = useForm();
  const isEdit = pathname.includes('/edit');

  useEffect(() => {
    getCharacter({ id: params.id });
  }, []);

  const onSubmit = (data) => {
    const newCharacter = {
      ...character,
      ...data,
    };

    updateCharacter({ character: newCharacter });
  }

  return (
    <section className='Character'>
      <Link to='/' className='Character__return btn-link-accent'>
        <span className='btn-icon'><IoReturnUpBack /></span>
        <span>Regresar</span>
      </Link>
      {character && !isEdit && (
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
                  to={`/character/edit/${character.id}`}
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
      {character && isEdit && (
        <>
          <figure className='Character__image'>
            <img src={character.image} alt={character.name} />
          </figure>
          <form className='Character__body' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex'>
              <TextField
                id='Name'
                name='name'
                label='Nombre'
                autoComplete='off'
                defaultValue={character.name}
                placeholder='Digita el nombre'
                register={register('name', { required: true })}
              />
              <div className='flex'>
                <Link
                  title='Cancelar'
                  className='btn-outline-danger'
                  to={`/character/${character.id}`}
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
              defaultValue={character.status}
              placeholder='Digita el status del personaje'
              register={register('status', { required: true })}
            />
            <TextField
              id='Species'
              name='species'
              label='Especie'
              autoComplete='off'
              defaultValue={character.species}
              placeholder='Digita la especie del personaje'
              register={register('species', { required: true })}
            />
            <TextField
              id='Gender'
              name='gender'
              label='Genero'
              autoComplete='off'
              defaultValue={character.gender}
              placeholder='Digita el genero del personaje'
              register={register('gender', { required: true })}
            />
            <TextField
              id='Origin'
              name='origin'
              label='Origen'
              autoComplete='off'
              defaultValue={character.origin.name}
              placeholder='Digita el origen del personaje'
              register={register('origin', { required: true })}
            />
            <TextField
              id='Location'
              name='location'
              autoComplete='off'
              label='Localización'
              defaultValue={character.location.name}
              placeholder='Digita la localización del personaje'
              register={register('location', { required: true })}
            />
            <button type='submit' className='btn-primary form-button'>
              Guardar
            </button>
          </form>
        </>
      )}
      {!character && (
        <p>Loading...</p>
      )}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Character);