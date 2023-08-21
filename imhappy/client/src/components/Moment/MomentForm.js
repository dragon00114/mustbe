import React, { useContext, useEffect, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MomentContext } from '../Moment/MomentProvider';
import { StickerContext } from '../Sticker/StickerProvider';
import formReducer from '../shared/formReducer';
import classes from '../shared/formStyle.module.css';

const initState = {
  date: '',
  stickerId: '',
  entry: '',
  isSignificant: false,
  isLoading: false,
};

const MomentForm = () => {
  const { addMoment, getMoment, updateMoment } = useContext(MomentContext);
  const { stickers, getAllStickers } = useContext(StickerContext);

  const [momentState, dispatch] = useReducer(formReducer, initState);

  // Grabs the parameter passed on the URL
  const { momentId } = useParams();
  const history = useHistory();

  const handleInputChange = (event) => {
    dispatch({
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckboxChange = (event) => {
    dispatch({
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ isLoading: true });

    if (momentId) {
      updateMoment(momentState).then(() => history.push('/'));
    } else {
      addMoment(momentState).then(() => history.push('/'));
    }

    dispatch({ isLoading: false });
  };

  useEffect(() => {
    getAllStickers().then(() => {
      if (momentId) {
        getMoment(momentId).then((moment) => dispatch(moment));
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes['form-control']}>
      <form onSubmit={handleSubmit}>
        <label htmlFor='momentDate'>Date</label>
        <input
          id='momentDate'
          name='date'
          type='date'
          onChange={handleInputChange}
          value={momentState.date && momentState.date.split('T')[0]}
          required
        />

        <label htmlFor='momentStickerId'>Sticker</label>
        <select
          id='momentStickerId'
          name='stickerId'
          onChange={handleInputChange}
          value={momentState.stickerId}
        >
          <option value=''>Select Sticker</option>
          {stickers.map((sticker) => (
            <option key={sticker.id} value={sticker.id}>
              {sticker.emoji} {sticker.name}
            </option>
          ))}
        </select>

        <label htmlFor='momentEntry'>Entry</label>
        <textarea
          id='momentEntry'
          name='entry'
          onChange={handleInputChange}
          value={momentState.entry}
          rows={4}
          required
        />

        <input
          id='momentIsSignificant'
          name='isSignificant'
          type='checkbox'
          onChange={handleCheckboxChange}
          checked={momentState.isSignificant}
        />
        <label htmlFor='momentIsSignificant'>Significant</label>

        <button disabled={momentState.isLoading} type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default MomentForm;
