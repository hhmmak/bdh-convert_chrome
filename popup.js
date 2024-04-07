
//.. constants


//.. DOM elements

// user input
const numBin = document.getElementById('numBin')
const numDec = document.getElementById('numDec')
const numHex = document.getElementById('numHex')

//result container
const numComp = document.getElementById('numComp')
const numCompHex = document.getElementById('numCompHex')
const numSignDec = document.getElementById('numSignDec')

// button
const submitBin = document.getElementById('submitBin')
const submitDec = document.getElementById('submitDec')
const submitHex = document.getElementById('submitHex')

//.. helper functions

// calculate 2's complement of binary number
const calcTwosComp = (bin) => {
  
  let compArr = bin.split('').reverse();

  // add leading 0 to array to fit byte size
  while (compArr.length % 4 !== 0){
    compArr.push('0');
  }

  compArr = compArr.map(digit => digit === '1' ? '0' : '1');
  console.log(compArr)

  let idx = 0;

  if (compArr[idx] === '0'){
    compArr[idx] = '1'
  } else {
    while (idx < compArr.length && compArr[idx] === '1'){
      compArr[idx] = '0';
      idx ++;
    }
    if (idx === compArr.length) {
      compArr.append('1');
    } else {
      compArr[idx] = '1'
    }
  }
  console.log(compArr)
  const compNum = compArr.reverse().join('');
  console.log(compNum)

  return compNum === bin? '1111' + compNum : compNum;
}

// formatter functions

const formatBin = (bin) => {
  return bin.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
}

const formatDec = (dec) => {
  return dec.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const formatHex = (hex) => {
  return hex.replace(/\B(?=(\d{2})+(?!\d))/g, " ").toUpperCase();
}


//.. error warning


//.. main function

const convertBase = (str, base) => {

  // clean input
  switch(base){
    case '2':
      str = str.replace(/[^01]/g, "");
      break;
    case '10':
      str = str.replace(/\D/g, "");
      break;
    case '16':
      str.replace(/[^0-9A-Fa-f]/g, "")
      break;
    default:
      str = "";

  }

  // set default result
  const result = {
    bin: '0',
    dec: '0',
    hex: '0',
    cpb: '0',
    cph: '0',
    cpd: '0'
  }

  // only convert if number is not 0
  if (str.length > 0) {

    const numClean = parseInt(str, base);

    // convert number base
    result.bin = numClean.toString(2);
    result.dec = numClean.toString();
    result.hex = numClean.toString(16);

    // calculate 2's complement
    result.cpb = calcTwosComp(result.bin);

    const compNum = parseInt(result.cpb, 2);

    result.cph = compNum.toString(16);
    result.cpd = result.cpb[0] === '1' ? '+' + result.dec : '-' + compNum.toString();

  }

  // display results
  numBin.value = formatBin(result.bin)
  numDec.value = formatDec(result.dec)
  numHex.value = formatHex(result.hex)
  numComp.innerText = formatBin(result.cpb);
  numCompHex.innerText = formatHex(result.cph);
  numSignDec.innerText = formatDec(result.cpd);

}


//.. button event listeners

submitBin.addEventListener("click", () => {
  convertBase(numBin.value, '2')
})

submitDec.addEventListener("click", () => {
  convertBase(numBin.value, '10')
})

submitHex.addEventListener("click", () => {
  convertBase(numBin.value, '16')
})

