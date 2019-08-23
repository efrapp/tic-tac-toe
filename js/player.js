const Player = (name, mark) => {
  let pName = name;
  let pMark = mark;

  const getName = () => pName;
  const getMark = () => pMark;

  const setName = (newName) => { pName = newName; };
  const setMark = (newMark) => { pMark = newMark; };

  return {
    getName,
    setName,
    getMark,
    setMark,
  };
};

export default Player;
