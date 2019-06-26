const computeArray = (uArray) => {
  const moveNege = uArray.map( x => {
    if (x<0) return -x;
    return x;
  })
  console.log(moveNege)
	const sortedA = moveNege.sort((a, b) => b-a)
  let i = 0;
  let C = 1;
  console.log(sortedA)
	sortedA.forEach(x => {
    if(i>3) {
      return C;
    }
    C = C * x;
    i++;
  })
  console.log(C);
}

const findMissingArray = (array, upperBound, lowerBound) => {
  const numUpperBound = (upperBound*(upperBound+1)) / 2;
  const numLowerBound = (lowerBound*(lowerBound - 1)) / 2;
  const theroticsNumber = numUpperBound - numLowerBound;
  let Sum = 0;
  array.forEach((item) => {
    Sum = Sum + item;
  })
  const missNum = theroticsNumber - Sum;
  console.log('missing number', missNum);
}

const removeDup = (array) => {
  const array2 = array;
  let variable = 0;
  const removeDup = array.sort((a, b) =>  b-a).filter( x=> {
    if (variable != x) {
      variable = x;
      return x;
    }
  })
  console.log('removeDup', removeDup);

  let hashmap = {};
  let unique = [];

  for(var i = 0; i < array2.length; i++) {
    if(!hashmap.hasOwnProperty(array2[i])) {
      hashmap[array2[i]] = 1;
      unique.push(array2[i]);
    }
  }
  console.log('abcsss', unique);
}

const findlargestDiff = (array) => {
  if (array.length <= 1) return -1;
  let currentMin = array[0];
  let currentMaxDif = 0;
  array.forEach(element => {
    if (element > currentMin && (element - currentMin) > currentMaxDif) {
      currentMaxDif = element - currentMin;
    }
  })
}

const checkThis = () => {
  const name = 'ThangLD'

  const outerFunction = () => {

    // const k = [1,2,3,4];
    // k.forEach(element => {
    //   console.log('checkThisName', name);
    // });
  }

  outerFunction();
}
module.exports = {
    computeArray,
    findMissingArray,
    removeDup,
    checkThis
}