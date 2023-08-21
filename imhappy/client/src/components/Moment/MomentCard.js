import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import classes from './MomentCard.module.css';
import { MomentContext } from './MomentProvider';

const MomentCard = (props) => {
  const history = useHistory();
  const { deleteMoment } = useContext(MomentContext);

  const handleDelete = () => {
    deleteMoment(props.moment.id).then(() => {
      history.push('/');
    });
  };

  const handleEdit = () => {
    history.push(`/moments/edit/${props.moment.id}`);
  };

  let d = new Date(props.moment.date);
  const m = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = m[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  const dateString = `${month} ${day}, ${year}`;

  return (
    <tr
      className={`${classes[month]} ${
        props.moment.isSignificant && classes.significant
      }`}
    >
      <td className={classes.emoji}>{props.moment.sticker.emoji}</td>
      <td className={classes.date}>{dateString}</td>
      <td className={classes.entry}>{props.moment.entry}</td>

      {!props.moment.actionsDisabled && (
        <td className={classes.actions}>
          <i
            className={'material-icons ' + classes['actions-button']}
            onClick={handleEdit}
          >
            edit
          </i>
          <i
            className={'material-icons ' + classes['actions-button']}
            onClick={handleDelete}
          >
            delete
          </i>
        </td>
      )}
    </tr>
  );
};

export default MomentCard;
