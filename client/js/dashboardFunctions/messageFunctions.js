import { scrollDown, getFromCookie } from "./helperfunctions.js";
// upload message to DB with convoId, senderId and textData 
export function updateMessageDb(textData){
    let senderId = localStorage.getItem("currUser")
    let conversationId = localStorage.getItem("conversationId")
    console.log(conversationId)
    fetch("/message", {
        method: 'POST',
      headers: {
        jwttoken : getFromCookie("jwttoken"),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({senderId: senderId,
                     conversationId:conversationId,
                    textData: textData})});
}

// take value from input box and add it to textMessagesContainerEl
export function addMessageDiv(event) {
  event.preventDefault();
  let textMessagesContainerEl = document.getElementById(
    "text-messages-container"
  );
  let messageBoxEl = document.getElementById("message-box");
  let message = messageBoxEl.value;
  let template = `<div class="message-bubble">
    <div class="sent-message"><p class="text">${message}</p></div>
    <div class="r-empty-div"></div>
    </div>`;
  textMessagesContainerEl.innerHTML += template;
  scrollDown();
  messageBoxEl.value = "";
  //upload message to db
  updateMessageDb(message)
}

// insert data about-list from recieverId (user clicked)
async function insertAbout(receieverId) {
      // get userinfo from /userinfo/:userid
      let response = await fetch(`/userinfo/${receieverId}`, {headers:{
        jwttoken: getFromCookie("jwttoken")
      }})
      let data = await response.json()
      if(!data.phone) {
        data.phone = "Not Available"
      }
      let template = `<li class="about-line" id="name">
                          <i class=" about-icon fa-solid fa-file-signature"></i>
                          <p class="about-text">${data.name} </p>
                      </li>
                      <li class="about-line" id="username">
                          <i class=" about-icon fa-solid fa-user-astronaut"></i>
                          <p class="about-text">@${data.username}</p>
                      </li>
                      <li class="about-line" id="email">
                          <i class="about-icon fa-solid fa-envelope"></i>
                          <p class="about-text">${data.email}</p>
                      </li>
                      <li class="about-line" id="phone">
                          <i class="about-icon fa-solid fa-phone"></i>
                          <p class="about-text">${data.phone}</p>
                      </li>`
      let aboutListEl = document.getElementById("about-list")
      aboutListEl.innerHTML = template
      let aboutContainer = document.getElementById("about-container")
      aboutContainer.style = "visibility:visible"
}

//insert messages from database
export function insertMessages(userName,messages,receieverId,currUserId) {

    let selectedUserNameHeaderEl = document.getElementById("selected-user-name-header")
    selectedUserNameHeaderEl.innerText = userName
    
    let messageEl = document.getElementById("text-messages-container")
    // console.log(typeof messages);
    messages.forEach(message => {
        if(message.senderId == currUserId) {
            let template = `<div class="message-bubble">
            <div class="sent-message"><p class="text">${message.textData}</p></div>
            <div class="r-empty-div"></div>
            </div>`
            messageEl.innerHTML += template
        }else {
            let template = `<div class="message-bubble">
            <div class="receieved-message"><p class="text">${message.textData}</p></div>
            <div class="r-empty-div"></div>
            </div>`
            messageEl.innerHTML += template
        }
    } );

  }
  export async function getMessages(event) {
    let messageEl = document.getElementById("text-messages-container");
    messageEl.innerHTML = ""
    //get recieverId from local storage
    console.log("selected user name :" , event.target.parentElement.lastElementChild.lastElementChild.innerText)
    //selected username and name
    let userName =
      event.target.parentElement.lastElementChild.lastElementChild.innerText;
 
       //slicing "@" from username
      userName = userName.slice(1)
      console.log("selected user username: ", userName);
   
    let receieverId = localStorage.getItem(userName);
    let currUserId = getFromCookie("currUserId")
    console.log("curruser Id:", currUserId);
    // fetch "/conversation" and get messages (if present) with the conversation ID
    if (currUserId && receieverId) {
      let response = await fetch("/conversation", {
        method: 'POST',
      headers: {
        jwttoken : getFromCookie("jwttoken"),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({senderId: currUserId,
                     receieverId:receieverId})} );
      let data = await response.json()
    console.log("data recieved from .conversation:", data);
 
    // get selected user's name to display in chat-header
    let name = event.target.parentElement.firstElementChild.innerText;
    //store conversationId  if messages is present (empty or not)
    let messages = data.messages
    if(messages) {
        localStorage.setItem("conversationId", data.convoId)
        if(Object.keys(messages).length >= 1) {
            localStorage.setItem("conversationId", data.convoId)
            if (Object.keys(messages).length >=1) {
              insertMessages(name,messages, receieverId,currUserId)
            } else {
              console.log("No messages available");
            }
          }else{
            let selectedUserNameHeaderEl = document.getElementById("selected-user-name-header")
            selectedUserNameHeaderEl.innerText = name
            let messageEl = document.getElementById("text-messages-container");
            messageEl.innerHTML = ""
        }
    }else{

      //storing converstion id if messages doesn't exist
        localStorage.setItem("conversationId", data)
    }
    //change visibility of chat-container to visible
    let chatContainer = document.getElementById("chat-container")
    chatContainer.style.visibility = "visible"
    scrollDown()
    insertAbout(receieverId)

    } else {
      console.log("ERROR : Reciever Id not found");
    }
  }