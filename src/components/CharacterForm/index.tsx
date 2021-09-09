import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TiTimes } from 'react-icons/ti';
import { useForm } from 'react-hook-form';
import TextField from '../form/TextField';

const CharacterForm = ({
  person,
  character,
  characters,
  updateCharacter,
  updateCharacters,
  createdCharacter,
}) => {
  const history = useHistory();
  const [saved, setSaved] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const origin = {
      name: data.origin,
      url: character.origin.url,
    };
    const location = {
      name: data.location,
      url: character.location.url,
    };
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
      });
      updateCharacters({ characters: newCharacters });
    }

    updateCharacter({ character: newCharacter });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const createCharacter = (data) => {
    const origin = {
      name: data.origin,
      url: null,
    };
    const location = {
      name: data.location,
      url: null,
    };
    const newCharacter = {
      id: new Date().getTime(),
      ...data,
      origin,
      location,
    };

    if (characters) {
      characters.unshift(newCharacter);
      updateCharacters({ characters });
      history.push('/');
      return;
    }

    updateCharacter({ character: newCharacter });
    createdCharacter({ character: newCharacter });
    history.push('/');
  };

  return (
    <form
      className='Character__body'
      onSubmit={handleSubmit(person ? onSubmit : createCharacter)}
    >
      <div className={person ? 'flex' : ''}>
        <TextField
          id='Name'
          name='name'
          label='Nombre'
          autoComplete='off'
          defaultValue={person?.name}
          placeholder='Digita el nombre'
          register={register('name', { required: true })}
        />
        {person && (
          <div className='flex'>
            <Link
              title='Cancelar'
              className='btn-outline-danger'
              to={`/character/${person?.id}`}
            >
              <TiTimes />
            </Link>
          </div>
        )}
      </div>
      <TextField
        id='Status'
        name='status'
        label='Status'
        autoComplete='off'
        defaultValue={person?.status}
        placeholder='Digita el status del personaje'
        register={register('status', { required: true })}
      />
      <TextField
        id='Species'
        name='species'
        label='Especie'
        autoComplete='off'
        defaultValue={person?.species}
        placeholder='Digita la especie del personaje'
        register={register('species', { required: true })}
      />
      <TextField
        id='Gender'
        name='gender'
        label='Genero'
        autoComplete='off'
        defaultValue={person?.gender}
        placeholder='Digita el genero del personaje'
        register={register('gender', { required: true })}
      />
      <TextField
        id='Origin'
        name='origin'
        label='Origen'
        autoComplete='off'
        defaultValue={person?.origin?.name}
        placeholder='Digita el origen del personaje'
        register={register('origin', { required: true })}
      />
      <TextField
        id='Location'
        name='location'
        autoComplete='off'
        label='Localización'
        defaultValue={person?.location?.name}
        placeholder='Digita la localización del personaje'
        register={register('location', { required: true })}
      />
      {saved && (
        <p className='color-success bounceIn'>¡Guardado correctamente!</p>
      )}
      <button type='submit' className='btn-primary form-button'>
        Guardar
      </button>
    </form>
  );
};

export default CharacterForm;
