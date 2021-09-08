import React from 'react';
import { Link } from 'react-router-dom';
// import { AiOutlineUser } from 'react-icons/ai';
// import { IoExitOutline } from 'react-icons/io5';
// import { CgMenuRightAlt, CgCloseO } from 'react-icons/cg';
import './styles.scss';
// import Modal from '../Modal';
// import TextField from '../form/TextField';
// import { useForm } from 'react-hook-form';
// import { useStateValue } from '../../context';
// import { loginUser, logoutUser } from '../../context/actions';

const Appbar = () => {
  // const { user, dispatch } = useStateValue();
  // const { register, handleSubmit } = useForm();
  // const [showModal, setShowModal] = useState(false);
  // const [error, setError] = useState(false);
  // const [menuOpen, setMenuOpen] = useState(false);

  // const onSubmit = async (data) => {
  //   const result = await loginUser({ email: data.email, password: data.password, dispatch });
  //   if (!result) {
  //     setError(true);
  //   }
  // }

  return (
    <header className='Appbar'>
      <Link to='/' className='btn-link'>
        <figure className='Heeader__logo'>
          <p className='txt-xl color-primary'><strong>Rick and Morty</strong></p>
        </figure>
      </Link>
    </header>
  );
}

export default Appbar;