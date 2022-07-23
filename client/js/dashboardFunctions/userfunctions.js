import { scrollDown, getFromCookie } from "./helperfunctions.js";

// creates template using data from getUsers() func and append
//it to element list-of-user in html and also stores user's username and id in localstorage as key:value
export function generateUsersList(data) {

    let listel = document.getElementById("list-of-users");
    for (let i = 0; i < data.length; i++) {
      let template = `<li class="user-line" tabindex="0">
              <div class="user">
              <p class="name">${data[i][0]}</p>
              <p class="username"><small>@${data[i][1]}</small></p> 
              </div>
          <i class="user-icon fa-solid fa-user"></i>
      </li>`;
      
      window.localStorage.setItem(`${data[i][1]}`, `${data[i][2]}`);
      listel.innerHTML += template;
    }
    console.log("generateUserlist done");
    scrollDown();
  }

  //fetch users list from '/users/:userid'(userid : logged in userid) endpoint and call generateUsersList()
export async function getUsers() {
    // get jwt token and currUserId from cookies
    let jwttoken = getFromCookie("jwttoken");
    let currUserId = getFromCookie("currUserId");
    //store currUserId to local storage from cookie
    localStorage.setItem("currUser", currUserId);
  
    const response = await fetch(`/user/${currUserId}`, {
      headers: {
        jwttoken: jwttoken,
      },
    });
    const data = await response.json();
    //   console.log(data)
    generateUsersList(data);
  }