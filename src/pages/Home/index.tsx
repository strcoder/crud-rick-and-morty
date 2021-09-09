import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import CharacterCard from '../../components/CharacterCard';
import { getCharacters, getNextPage } from '../../redux/actions';
import './styles.scss';

const Home = ({ characters, character, nextPage, getCharacters, getNextPage }) => {
  const [list, setList] = useState(characters);

  useEffect(() => {
    if (!characters || characters.length === 0) {
      getCharacters();
    }
  }, []);

  useEffect(() => {
    setList(characters);
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
}

const mapStateToProps = (state) => {
  return {
    nextPage: state.nextPage,
    character: state.character,
    characters: state.characters,
  };
};

const mapDispatchToProps = {
  getCharacters,
  getNextPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);