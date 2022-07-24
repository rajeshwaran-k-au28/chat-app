import {removeFocusClass, keepFocused, logOut} from "./dashboardFunctions/helperfunctions.js"
import { addMessageDiv, getMessages, insertAbout} from "./dashboardFunctions/messageFunctions.js"
import { getUsers, currUserProfile} from "./dashboardFunctions/userfunctions.js"

async function onClickUser(event){
  keepFocused(event)
  await getMessages(event)
  document.getElementById("intro-header").style = "visibility:hidden"
}
async function main() {
  await getUsers();
  await currUserProfile(event)
  // handle click on the user-
  let usersArray = document.getElementsByClassName("name");
  for (let i = 0; i < usersArray.length; i++) {
      usersArray[i].addEventListener("click", onClickUser);
    }

  // add message bubble onsending message
  let sendbtnEl = document.getElementById("send-button");
  sendbtnEl.addEventListener("click", addMessageDiv);
  //handle click on brandname
  let brandel = document.getElementById("brand-name")
  brandel.addEventListener("click", currUserProfile)
  //logout
  let logoutEl = document.getElementsByClassName("log-out-icon")[0]
  logoutEl.addEventListener("click", logOut)
}
main()
