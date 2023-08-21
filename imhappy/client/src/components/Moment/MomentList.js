import React, { useContext, useEffect } from 'react';
import MomentCard from './MomentCard';
import { MomentContext } from './MomentProvider';
import classes from './MomentList.module.css';

const MomentList = () => {
  const { moments, getAllMoments } = useContext(MomentContext);

  useEffect(() => {
    getAllMoments();
    // eslint-disable-next-line
  }, []);

  if (!moments || moments.length === 0) {
    const noMoments = {
      entry: 'No moments found. Log a happy moment today!',
      sticker: { emoji: '😀' },
      date: new Date(),
      isSignificant: false,
      actionsDisabled: true,
    };
    return (
      <table className={classes.table}>
        <tbody>
          <MomentCard moment={noMoments} />
        </tbody>
      </table>
    );
  }

  return (
    <table className={classes.table}>
      <tbody>
        {moments.map((moment) => (
          <MomentCard key={moment.id} moment={moment} />
        ))}
      </tbody>
    </table>
  );
};

export default MomentList;
