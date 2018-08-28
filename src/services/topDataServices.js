export function getTopData(listOfData, data) {
  var obj = listOfData.reduce(function(acc, curr) {
    switch (data) {
      case 'os':
        acc[curr.os] ? acc[curr.os]++ : (acc[curr.os] = 1);
        return acc;

      case 'referrer':
        acc[curr.referrer] ? acc[curr.referrer]++ : (acc[curr.referrer] = 1);
        return acc;
    }
  }, {});
  var result = Object.keys(obj).map(function(key) {
    return [key, obj[key]];
  });

  let sortList = result.sort(function(a, b) {
    return b[1] - a[1];
  });
  let len = sortList.length > 4 ? 4 : sortList.length;
  let showResult = sortList.splice(0, len);
  let restResult = sortList;
  let q;
  if (restResult.length > 1) {
    q = restResult.reduce((a, b) => a[1] + b[1]);
    showResult.push(['Others', q]);
  } else if (restResult.length === 1) {
    q = restResult[0][1];
    showResult.push(['Others', q]);
  }
  return showResult;
}
