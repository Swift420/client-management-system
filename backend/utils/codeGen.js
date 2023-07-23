const generateNumericCode = (num) => {
  return num.toString().padStart(3, "0");
};

// Utility function to generate the alpha part of the client code based on the client name
const generateAlphaCode = (name) => {
  const words = name.split(" ");
  let alphaPart = "";

  for (const word of words) {
    alphaPart += word.charAt(0).toUpperCase();
  }

  return alphaPart.slice(0, 3).padEnd(3, "A");
};

module.exports = { generateNumericCode, generateAlphaCode };
