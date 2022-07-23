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
    // remove focus classes for previously selcted elements
    removeFocusClass()
    //remove arrow icon from previously selected element
    let arrowEl = document.getElementsByClassName("fa-circle-arrow-right")
    if (arrowEl.length>=1) {
        arrowEl[0].classList = "user-icon fa-solid fa-user"
    }
    //add arrow icon to currently selected element
    let faEl = event.target.parentElement.parentElement.lastElementChild
    faEl.classList ="user-icon fa-solid fa-circle-arrow-right"

    // add focus classes for the selected elements
    let userLine = event.target.parentElement.parentElement
    let nameEl = event.target.parentElement.firstElementChild
    nameEl.classList.toggle("name-focus-class")
    userLine.classList.toggle("user-line-focus-class")
  }
  // event listener for name class to focus on the selected user
   let userLines = document.getElementsByClassName("name");
   for (let i = 0; i < userLines.length; i++) {
     userLines[i].addEventListener("click", keepFocused)
   }
   // handle logout 
   const logout = () => {
    document.cookie = "jwttoken=;expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
    window.localStorage.clear();
    window.location.reload(true);
    //delte token from cookies
  
  //   function deleteAllCookies() {
  //     var cookies = document.cookie.split(";");
  
  //     for (var i = 0; i < cookies.length; i++) {
  //         var cookie = cookies[i];
  //         var eqPos = cookie.indexOf("=");
  //         var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  //         document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  //     }
  // }
  // deleteAllCookies()
  };
  let logoutEl = document.getElementsByClassName("log-out-icon")[0]
  logoutEl.addEventListener("click", logout)

}
main();
