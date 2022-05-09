const generateId = () => {
  const random = Math.random().toString(32).substring(2);
  const dateRamdon = Date.now().toString(32);

  return random + dateRamdon;
};

export default generateId;
