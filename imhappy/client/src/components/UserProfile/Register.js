import React, { useReducer, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserProfileContext } from './UserProfileProvider';
import { MomentContext } from '../Moment/MomentProvider';
import formReducer from '../shared/formReducer';
import classes from '../shared/formStyle.module.css';

const initState = {
  firstName: '',
  lastName: '',
  email: '',
  birthday: '',
  password: '',
  confirmPassword: '',
  isLoading: false,
};

const Register = () => {
  const history = useHistory();

  const { register } = useContext(UserProfileContext);
  const { addMoment } = useContext(MomentContext);

  const [registerState, dispatch] = useReducer(formReducer, initState);

  const handleInputChange = (event) => {
    dispatch({
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch({ isLoading: true });

    if (
      registerState.password &&
      registerState.password !== registerState.confirmPassword
    ) {
      return alert("Passwords don't match. Do better.");
    }

    const userProfile = {
      firstName: registerState.firstName,
      lastName: registerState.lastName,
      email: registerState.email,
      birthday: registerState.birthday,
    };

    const user = await register(userProfile, registerState.password);

    const newMoment1 = {
      entry: `Happy birthday, ${user.firstName}!`,
      date: user.birthday,
      isSignificant: true,
      userProfileId: user.id,
      stickerId: 4,
    };

    const newMoment2 = {
      entry: 'Joined IMHAPPY',
      date: user.createDateTime,
      isSignificant: false,
      userProfileId: user.id,
      stickerId: 9,
    };

    await addMoment(newMoment1);
    await addMoment(newMoment2);

    dispatch({ isLoading: false });
    history.push('/');
  };

  return (
    <div className={classes['form-control']}>
      <form onSubmit={handleRegister}>
        <label htmlFor='registerFirstName'>First Name</label>
        <input
          id='registerFirstName'
          name='firstName'
          type='text'
          onChange={handleInputChange}
          required
        />

        <label htmlFor='registerLastName'>Last Name</label>
        <input
          id='registerLastName'
          name='lastName'
          type='text'
          onChange={handleInputChange}
          required
        />

        <label htmlFor='registerBirthday'>Birthday</label>
        <input
          id='registerBirthday'
          name='birthday'
          type='date'
          onChange={handleInputChange}
          required
        />

        <label htmlFor='registerEmail'>Email</label>
        <input
          id='registerEmail'
          name='email'
          type='text'
          onChange={handleInputChange}
          required
        />

        <label htmlFor='registerPassword'>Password</label>
        <input
          id='registerPassword'
          name='password'
          type='password'
          onChange={handleInputChange}
          required
        />

        <label htmlFor='registerConfirmPassword'>Confirm Password</label>
        <input
          id='registerConfirmPassword'
          name='confirmPassword'
          type='password'
          onChange={handleInputChange}
          required
        />

        <button disabled={registerState.isLoading} type='submit'>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
