import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getCharacters } from '../../redux/actions';

const Home = ({ characters, getCharacters }) => {

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <section>
      <h1>Home</h1>
      {characters?.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
        </div>
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