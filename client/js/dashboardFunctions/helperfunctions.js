export function removeFocusClass () {
    let nameFocus = document.getElementsByClassName("name-focus-class")
    if(nameFocus) {
      for(let i = 0; i <nameFocus.length; i++) {
        nameFocus[i].classList.remove("name-focus-class")
      }
    }
    let userLineFocus = document.getElementsByClassName("user-line-focus-class")
    if (userLineFocus) {
      for(let i = 0; i <userLineFocus.length; i++) {
        userLineFocus[i].classList.remove("user-line-focus-class")
      }
    }
}
export function scrollDown() {
    let textMessagesContainerEl = document.getElementById(
      "text-messages-container"
    );
    textMessagesContainerEl.scrollTop = textMessagesContainerEl.scrollHeight;
  }

export  function getFromCookie(name) {
    return (
      document.cookie
        .match("(^|;)\\s*" + `${name}` + "\\s*=\\s*([^;]+)")
        ?.pop() || ""
    );
  }
// module.exports = {removeFocusClass}