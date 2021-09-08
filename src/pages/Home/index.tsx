import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import CharacterCard from '../../components/CharacterCard';
import { getCharacters } from '../../redux/actions';
import './styles.scss';

const Home = ({ characters, getCharacters }) => {

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <section className='Home'>
      {characters?.map((item) => (
        <React.Fragment key={item.id}>
          <CharacterCard data={item} />
        </React.Fragment>
      ))}
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    characters: state.characters || [],
  };
};

const mapDispatchToProps = {
  getCharacters,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);