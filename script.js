let inputField = document.getElementById("input")
let messagesContainer = document.getElementById("messages");
inputField.addEventListener("keypress", getInputValue)
let scanner;
let hobbyNumber = 0
let hobbies = []

addBotEntry(getMenuString())

function getInputValue(event) {
  if (event.key === "Enter") {
    let inputValue = inputField.value;
    inputField.value = ""
    addUserEntry(inputValue)
    performSelectedAction(inputValue)
    let menu = getMenuString()
    addBotEntry(menu)
  }
}

function addUserEntry(input) {
  let userMessageDiv = document.createElement("div");
  userMessageDiv.className = "user-message"
  userMessageDiv.innerText = input;
  messagesContainer.appendChild(userMessageDiv);
}

function addBotEntry(input) {
  let botMessageDiv = document.createElement("div")
  botMessageDiv.className = "bot-message";
  botMessageDiv.innerText = input;
  messagesContainer.appendChild(botMessageDiv);
}

// function talkAboutHobbies() {
//   let option
//   do {
//     printMenu()
//     console.log('Choose option: ')
//     option = scanner.questionInt()
//     performSelectedAction(option)
//   } while (option != 5)
// }

function getMenuString() {
  let menu = 'Hi there, I am your assistant. How can I help you?' +
    '\n1. Add hobby' +
    '\n2. How much is a hobby' +
    '\n3. Which is the cheapest hobby' +
    '\n4. Erase hobby' +
    '\n5. Recommend a hobby for today' +
    '\n6. No more hobbies';
  return menu;
}

function handleOption1(input) {
  let hobbyDetails = input.split(",")
  let hobbyName = hobbyDetails[0]
  let hobbyPrice = hobbyDetails[1]
  let hobby = {
    name: hobbyName,
    price: hobbyPrice
  }
  addHobby(hobby)
  addBotEntry("Your hobbies are: " + JSON.stringify(hobbies))
}

function addHobby(hobby) {
  hobbies[hobbyNumber] = hobby
  hobbyNumber++
}

function handleOption2(hobbyName) {
  let price = getHobbyPrice(hobbyName);
  addBotEntry('Price is: ' + price);
}

function getHobbyPrice(hobbyName) {
  for (let i = 0; i < hobbies.length; i++) {
    if (hobbies[i].name == hobbyName) {
      return hobbies[i].price;
    }
  }
}

function handleOption3() {
  let min = hobbies[0].price;
  let index = 0;
  for (let i = 1; i < hobbies.length; i++) {
    if (min > hobbies[i].price) {
      min = hobbies[i].price;
      index = i;
    }
  }
  console.log('The cheapest hobby is:', hobbies[index].name);
}

function handleOption4() {
  console.log('Write name:');
  let hobbyName = scanner.question();
  let index;
  for (let i = 0; i < hobbies.length; i++) {
    if (hobbyName == hobbies[i].name) {
      index = i;
    }
  }
  for (let i = index; i < hobbies.length; i++) {
    hobbies[i] = hobbies[i + 1];
  }
  hobbyNumber--;
  console.log(hobbies);
}

function handleOption5() {
  let index = Math.floor(Math.random() * hobbies.length);
  console.log('You can practice:' + hobbies[index].name);
}

function performSelectedAction(input) {
  let optionDetails = input.split(":")
  let option = optionDetails[0]
  let hobbyDetails = optionDetails[1]
  switch (Number(option)) {
    case 1:
      handleOption1(hobbyDetails)
      break
    case 2:
      handleOption2(hobbyDetails)
      break
    case 3:
      handleOption3()
      break
    case 4:
      handleOption4()
      break
    case 5:
      handleOption5()
      break
    case 6:
      console.log('Thanks for your question. Come back again')
      break
    default:
      console.log('Choose option 1-5')
  }
}