import {removeFocusClass} from "./dashboardFunctions/helperfunctions.js"
import { addMessageDiv, getMessages} from "./dashboardFunctions/messageFunctions.js"
import { getUsers} from "./dashboardFunctions/userfunctions.js"

// add message div onclick
let sendbtnEl = document.getElementById("send-button");
sendbtnEl.addEventListener("click", addMessageDiv);

//calling async getUsers
async function main() {
  await getUsers();
  // on click of any user run this function 
  // loop through usersArray  and call getmessages() on click
  let usersArray = document.getElementsByClassName("name");
  for (let i = 0; i < usersArray.length; i++) {
    usersArray[i].addEventListener("click", getMessages);
  }

  //focus the clicked user by toggling class
  function keepFocused(event) {
    // remove all focus-classes for userLine and nameEl before adding new
    removeFocusClass()
    // add focus classes
    let userLine = event.target.parentElement.parentElement
    let nameEl = event.target.parentElement.firstElementChild

    nameEl.classList.toggle("name-focus-class")
    userLine.classList.toggle("user-line-focus-class")
    console.log(userLine.classList)

  }
  // event listener for name class to focus on the selected user
   let userLines = document.getElementsByClassName("name");
   for (let i = 0; i < userLines.length; i++) {
     userLines[i].addEventListener("click", keepFocused)
   }
}
main();
