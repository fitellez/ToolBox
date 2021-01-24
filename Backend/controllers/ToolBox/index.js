/**
 * @description Enpoint get que retorna la palabra al revés
 * @param {*} req 
 * @param {*} res 
 */
async function text(req, res) {
  const { text } = req.params;
  var letters = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s.\s_-]+$/;
  if(text.match(letters)){
    let splitString = text.trim().split("");
    if (splitString.length != 0) {
      let reverseArray = splitString.reverse();
      let joinArray = reverseArray.join("");
      let palindromo = palindrome(text);
      if(palindromo){
        res.status(200).send({ text: joinArray, palindrome: true });
      }
      else{
        res.status(200).send({ text: joinArray });
      }
    }
  }
  else{
    res.status(400).send({ text: 'no text' });
  }
}

/**
 * @description Regresa true o false si el string es palindromo.
 * @param {str} string 
 * @returns
 */
function palindrome(str){
  var re = /[\W_]/g;
  var lowRegStr = str.toLowerCase().replace(re, '');
  var reverseStr = lowRegStr.split('').reverse().join(''); 
  return reverseStr === lowRegStr;
}

module.exports = {
  text,
};
