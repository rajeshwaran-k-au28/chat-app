export function removeFocusClass () {
    let nameFocus = document.getElementsByClassName("name-focus-class")
    if(nameFocus.length > 0) {
        nameFocus[0].classList.remove("name-focus-class")
    }
    let userLineFocus = document.getElementsByClassName("user-line-focus-class")
    if (userLineFocus.length >0) {
        userLineFocus[0].classList.remove("user-line-focus-class")
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