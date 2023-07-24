const generateNumericCode = (num) => {
  return num.toString().padStart(3, "0");
};

const generateAlphaCode = (name) => {
  const words = name.split(" ");
  let alphaPart = "";
  if (words.length >= 2) {
    for (const word of words) {
      alphaPart += word.charAt(0).toUpperCase();
    }
  }
  if (words.length == 1 && words[0].length < 3) {
    alphaPart += words[0].toUpperCase();
  }

  if (words.length == 1 && words[0].length >= 3) {
    alphaPart += words[0].slice(0, 3).toUpperCase();
  }

  return alphaPart.slice(0, 3).padEnd(3, "A");
};

module.exports = { generateNumericCode, generateAlphaCode };
