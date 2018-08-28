export function getTopData(listOfData, data = null) {
  var obj = listOfData.reduce(function(acc, curr) {
    //accumulator, currentValue
    switch (data) {
      case 'os':
        acc[curr.os] ? acc[curr.os]++ : (acc[curr.os] = 1);
        return acc;

      case 'referrer':
        acc[curr.referrer] ? acc[curr.referrer]++ : (acc[curr.referrer] = 1);
        return acc;
      default:
        acc[curr] ? acc[curr]++ : (acc[curr] = 1);
        return acc;
    }
  }, {});
  let resultObj = {
    result: Object.keys(obj).map(function(key) {
      return [key, obj[key]];
    }),
  };
  let sortList = resultObj.result.sort(function(a, b) {
    return b[1] - a[1];
  });

  let len = sortList.length > 4 ? 4 : sortList.length;
  let showResult = sortList.slice(0, len);
  let restResult = sortList.slice(len, sortList.length);
  let q;
  if (restResult.length > 1) {
    q = restResult.reduce((a, b) => a[1] + b[1]);
    showResult.push(['Others', q]);
  } else if (restResult.length === 1) {
    q = restResult[0][1];
    showResult.push(['Others', q]);
  }

  resultObj = {
    result: sortList,
    showTopResult: showResult,
  };

  console.log(resultObj);

  return resultObj;
}
