import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import CharacterCard from '../../components/CharacterCard';
import {
  getCharacters,
  getNextPage,
  updateCharacter,
  updateCharacters,
  setDeletedCharacter,
  createdCharacter,
} from '../../redux/actions';
import './styles.scss';

const Home = ({
  created,
  deleted,
  nextPage,
  character,
  characters,
  getNextPage,
  getCharacters,
  updateCharacter,
  updateCharacters,
  createdCharacter,
  setDeletedCharacter,
}) => {
  const [list, setList] = useState(characters);

  useEffect(() => {
    if (!characters || characters.length === 0) {
      getCharacters();
    }
  }, []);

  useEffect(() => {
    setList(characters);
    if (characters && deleted) {
      const newList = characters.filter((item) => item.id !== deleted.id);
      updateCharacters({ characters: newList });
      setDeletedCharacter();
      setList(newList);
    }
    if (characters && created) {
      characters.unshift(created);
      updateCharacter({ character: null });
      createdCharacter({ character: null });
      updateCharacters({ characters });
      setList(characters);
    }
  }, [characters]);

  useEffect(() => {
    if (characters && character) {
      const aux = characters.map((item) => {
        if (character.id === item.id) {
          return character;
        }
        return item;
      });
      setList(aux);
    }
  }, [characters]);

  return (
    <>
      <section className='Home'>
        <div className='CharactersList'>
          {list?.map((item) => (
            <React.Fragment key={item.id}>
              <CharacterCard data={item} />
            </React.Fragment>
          ))}
        </div>
        <button
          type='button'
          className='btn-link-accent'
          onClick={() => getNextPage({ characters, nextPage })}
        >
          Mostrar más
        </button>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    created: state.created,
    deleted: state.deleted,
    nextPage: state.nextPage,
    character: state.character,
    characters: state.characters,
  };
};

const mapDispatchToProps = {
  getNextPage,
  getCharacters,
  updateCharacter,
  createdCharacter,
  updateCharacters,
  setDeletedCharacter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
