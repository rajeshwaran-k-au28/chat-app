# Welcome to ChatUp!

A Real-time Chat Application built using **mongoDB, socket.io,nodejs,JavaScript, JWT,HTML and CSS.** (Deployed  [**link**](https://chatup-dep.herokuapp.com))

Using ChatUp you can connect with your friends and family instantly **(using sockets your messages are delivered to the receiver in an instant)**. All the **messages you sent and received are securely stored in MongoDB** powered by Microsoft Azure , So you don't need to worry about loosing your data.

All **routes are protected by JSON Web Tokens.**  Your **password is hashed using bcrypt** module before it reaches our database.

<<<<<<< HEAD
=======
If you  see a **green dot** near an user's name it means that the **user is currently online** if its grey then the user is offline.
>>>>>>> 3d949b3de3dd1d3da8c96d3e7b6a6b80a1e6ebe4
## Sign-Up

Signup to ChatUp using your email Id and choose an username and password. Note that **email and password should be unique for each user.**

## Sign-In

Once you finished signup you'll be redirected to login page from there you can sign in using the credentials you provided before

## Dashboard

<<<<<<< HEAD
=======
![](https://drive.google.com/file/d/1L6UnQXQnI7BDpZTA8-lSnYNgSGYdoONm/view?usp=sharing)
>>>>>>> 3d949b3de3dd1d3da8c96d3e7b6a6b80a1e6ebe4
In the dashboard, You can see your profile info in the right side along with a logout button and the list of other users to your left. click on any user to continue chatting from where you left off.

## Send message

select an user from the list and send a message.
If the **other user is online the message will be delivered instantly using sockets** and then the messages are stored in database without affecting the instant delivery of the messages. 
If the **receiver is not online  all the messages you sent will be stored in the database and delivered once the other user logs in to his account.**
<<<<<<< HEAD
=======



>>>>>>> 3d949b3de3dd1d3da8c96d3e7b6a6b80a1e6ebe4
