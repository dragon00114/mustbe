const formReducer = (prevState, action) => {
  return {
    ...prevState,
    ...action,
  };
};

export default formReducer;
