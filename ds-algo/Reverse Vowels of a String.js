String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};
var swap = function (s, i, j) {
  let t = s[i];
  s = s.replaceAt(i, s[j]);
  s = s.replaceAt(j, t);
  return s;
};


var reverseVowels = function (s) {
  let vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
  let i = 0,
    j = s.length - 1;
  while (i < j) {
    if (!vowels.has(s[i])) {
      i++;
      continue;
    }
    if (!vowels.has(s[j])) {
      j--;
      continue;
    }
    //s=swap(s, i, j);
    s =
      s.substr(0, i) +
      s[j] +
      s.substr(i + 1, j - i - 1) +
      s[i] +
      s.substr(j + 1);

    i++;
    j--;
  }
  return s;
};

console.log(reverseVowels("leetcode"));
