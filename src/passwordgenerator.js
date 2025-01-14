window.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.querySelector(".generate_button");
  const processingBar = document.querySelector("#processing_bar");
  const passwordelement = document.querySelector(".password");
  const clipboardCopy = document.querySelector(".lucide.lucide-files");
  const strongNumber = document.querySelector(".strong_number");
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+=-[]{}|;:',.<>?/";

  function getRandomCharacter(str) {
    return str[Math.floor(Math.random() * str.length)];
  }

  function generatePasswords(
    length,
    useUppercase,
    useLowercase,
    useNumbers,
    // eslint-disable-next-line prettier/prettier
    useSymbols
  ) {
    let characters = "";
    let generatePassword = "";

    if (useUppercase) {
      characters += uppercaseLetters;
    }
    if (useLowercase) {
      characters += lowercaseLetters;
    }
    if (useNumbers) {
      characters += numbers;
    }
    if (useSymbols) {
      characters += symbols;
    }

    for (let i = 0; i < length; i++) {
      generatePassword += getRandomCharacter(characters);
    }

    return generatePassword;
  }

  generateButton.addEventListener("click", () => {
    const length = parseInt(processingBar.value, 10);
    const useUppercase = document.querySelector("#IncludeUppercase").checked;
    const useLowercase = document.querySelector("#IncludeLowercase").checked;
    const useNumbers = document.querySelector("#IncludeNumbers").checked;
    const useSymbols = document.querySelector("#IncludeSymbols").checked;

    const setpassword = generatePasswords(
      length,
      useUppercase,
      useLowercase,
      useNumbers,
      // eslint-disable-next-line prettier/prettier
      useSymbols
    );
    passwordelement.textContent = setpassword;
    updateStrengthMeter(passwordelement.textContent);
    strongNumber.textContent = passwordelement.textContent.length;
  });

  clipboardCopy.addEventListener("click", () => {
    const copyPassword = passwordelement.textContent;
    navigator.clipboard.writeText(copyPassword).then(() => {
      console.log(`'Password copied->'`);
    });
  });

  function updateStrengthMeter(inputPassword) {
    const strengthPowers = document.querySelectorAll(".strength_power");
    const strength = calculateStrength(inputPassword);
    strengthPowers.forEach((bar, index) => {
      if (index < strength) {
        bar.classList.add("active");
      } else {
        bar.classList.remove("active");
      }
    });
  }

  function calculateStrength(inputPassword) {
    let strength = 0;
    if (/[A-Z]/.test(inputPassword)) strength++;
    if (/[a-z]/.test(inputPassword)) strength++;
    if (/[0-9]/.test(inputPassword)) strength++;
    if (/[^A-Za-z0-9]/.test(inputPassword)) strength++;

    return strength;
  }
});
