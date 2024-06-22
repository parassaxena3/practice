var getFinalString = (str) => {
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "#") {
      if (stack.length) stack.length--;
    } else stack.push(str[i]);
  }
  let finalString = "";
  stack.forEach((x) => {
    finalString = finalString + x;
  });
  return finalString;
};

var backspaceCompare = function (s, t) {
  return getFinalString(s) == getFinalString(t);
};

// backspaceCompare("ab#c", "ad#c");
// backspaceCompare("ab##", "c#d#");
// backspaceCompare("a#c", "b");
backspaceCompare("a##c", "#a#c");

