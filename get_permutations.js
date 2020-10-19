const swap = (a, i, j) => {
  let s = a[i];
  a[i] = a[j];
  a[j] = s;
};

const nextSet = (a, n) => {
  let j = n - 2;
  while (j != -1 && a[j] >= a[j + 1]) j--;
  if (j == -1) return false; // больше перестановок нет
  let k = n - 1;
  while (a[j] >= a[k]) k--;
  swap(a, j, k);
  let l = j + 1;
  let r = n - 1; // сортируем оставшуюся часть последовательности
  while (l < r) swap(a, l++, r--);
  return true;
};

const getPermutations = length => {
  let array = [];
  for (let i = 0; i < length; i++) array.push(i + 1);

  let res = [[...array]];
  while (nextSet(array, length)) res.push([...array]);

  return res;
};

module.exports = getPermutations;
