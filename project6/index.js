const sliderValue = document.getElementById("sliderValue");
const slider = document.getElementById("slider");
const rangeInputs = document.querySelectorAll('input[type="range"]');
const bars = document.querySelectorAll(".strength-bar");
const copyIcon = document.getElementById("copyIcon");
const copyMsg = document.getElementById("copyMsg");
const generateBtn = document.getElementById("generateBtn");
const fieldText = document.getElementById("fieldText");
const uppercase = document.getElementById("inclUppercase");
const lowercase = document.getElementById("inclLowercase");
const numbers = document.getElementById("inclNumber");
const symbols = document.getElementById("inclSymbol");
const alert = document.getElementById("alert");
const levelTxt = document.getElementById("levelTxt");

sliderValue.innerHTML = 0;
slider.value = 0;

slider.oninput = function () {
  sliderValue.innerHTML = this.value;
};

function handleInputChange() {
  const checkedCount = [
    uppercase.checked,
    lowercase.checked,
    numbers.checked,
    symbols.checked,
  ].filter(Boolean).length;

  bars.forEach((bar) => {
    bar.classList.remove("tooWeak", "weak", "medium", "strong");
  });

  if (checkedCount === 0) {
    levelTxt.innerHTML = "";
    bars.forEach((bar) => bar.classList.add(""));
  } else if (checkedCount === 1) {
    levelTxt.innerHTML = "Too Weak";
    bars.forEach((bar) => bar.classList.add("tooWeak"));
    if (slider.value < 4) {
      alert.style.display = "block";
      alert.innerText = "Select more than 4 char";
    }
  } else if (checkedCount === 2) {
    levelTxt.innerHTML = "Weak";
    bars.forEach((bar) => bar.classList.add("weak"));
    if (slider.value < 4) {
      alert.style.display = "block";
      alert.innerText = "Select more than 4 char";
    }
  } else if (checkedCount === 3) {
    levelTxt.innerHTML = "Medium";
    bars.forEach((bar) => bar.classList.add("medium"));
    if (slider.value < 4) {
      alert.style.display = "block";
      alert.innerText = "Select more than 4 char";
    }
  } else if (checkedCount === 4) {
    levelTxt.innerHTML = "Strong";
    bars.forEach((bar) => bar.classList.add("strong"));
  }
}

[uppercase, lowercase, numbers, symbols].forEach((checkbox) => {
  checkbox.addEventListener("change", handleInputChange);
});

copyIcon.addEventListener("click", copyField);

function copyField() {
  var copyText = document.getElementById("fieldText").innerHTML;
  navigator.clipboard.writeText(copyText);
  copyMsg.style.display = "initial";
}

generateBtn.addEventListener("click", generate);

function generate() {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numbersChars = "0123456789";
  const symbolsChars = "@#&(§!-)^$*%+=/?";

  let chars = "";
  const selectedLength = Math.max(0, parseInt(slider.value));

  if (uppercase.checked || uppercase.checked === false) {
    chars += uppercaseChars;
  }
  if (lowercase.checked || lowercase.checked === false) {
    chars += lowercaseChars;
  }
  if (numbers.checked || numbers.checked === false) {
    chars += numbersChars;
  }
  if (symbols.checked || symbols.checked === false) {
    chars += symbolsChars;
  }

  if (selectedLength < 4) {
    fieldText.innerHTML = "Minimum 4 characters required";
    fieldText.style.color = "hsl(var(--clr-red))";
    copyMsg.style.display = "none";
    alert.style.display = "none";
    return;
  } else {
    if (slider.value < 4) {
      alert.style.display = "block";
      alert.innerText = "Select more than 4 characters";
      return;
    }

    let password = "";
    const array = new Uint32Array(selectedLength);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < selectedLength; i++) {
      password += chars[array[i] % chars.length];
    }

    fieldText.innerHTML = password;
    fieldText.style.color = "hsl(var(--clr-almostWhite))";
    copyMsg.style.display = "none";
    alert.style.display = "none";

    return password;
  }
}
