export const capitalize = (word) => {
  try {
    if (word) {
      let wordArray = word.split("");
      let firstLeterCap = wordArray[0].toUpperCase();
      let wordWithoutFirstLetter = wordArray.splice(1);
      let newWordArray = [firstLeterCap, wordWithoutFirstLetter.join("")];
      return newWordArray.join("");
    }
  } catch (error) {
    console.log(error.message);
  }
};
