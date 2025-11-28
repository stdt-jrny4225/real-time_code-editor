# REAL-TIME COLLEVERETIVE DOCUMENT EDITOR

*COMPANY* : CODTECH IT SOLUTION

*NAME:* SANJAN KUMAR

*INTERN ID :* CT06DR756

*DOMAIN:* Fullstack Development

*DURATION:* 6 WEEKS

*BATCH:* 25 OCT TO 10 DEC 2025

*DEPLOYED LINK:* https://real-time-code-editor-1-i23l.onrender.com


# Project Overview

This project is a Real-time Collaborative Code/Document Editor that allows multiple users to work together on the same document.
Changes appear instantly on all connected clients using WebSockets.

✨ Key Features

👥 Multiple users editing the same document simultaneously

🔄 Real-time syncing using Socket.IO

💾 Auto-save every few seconds

📌 Cloud database using MongoDB Atlas

🧹 Delete Document functionality

✍️ Shows collaborator name & typing status

🔐 Unique document URLs for sharing & editing

# Technologies Used
	                

Frontend	:-            React.js, React Router DOM, Socket.IO client

Backend	  :-               Node.js, Express.js, Socket.IO server 

Database	:-               MongoDB Atlas (Cloud DB)

Hosting/Deployment :-	     Render

Version Control	  :-       Git & GitHub

# System Architecture

Browser (Socket.IO Client)

      ⬇⬆
      
Node.js + Express API

      ⬇⬆
MongoDB Atlas (Cloud)


Real-time updates travel via WebSocket channels using Socket.IO

while document data is stored in MongoDB Atlas.

# Live Deployment Links

Component	Status	Link

Backend API	 LIVE

https://real-time-code-editor-1izy.onrender.com/api/document

Frontend :

https://real-time-code-editor-1-i23l.onrender.com

 Right now,  backend and frontend  are fully functioning on Render

# Features Explained

Feature	 :-                     Description

Create a document	 :-           User can add a new file with a name

Edit live	:-                    All edits sync across browser tabs

See collaborators	Shows :-      “You: your name ” + other users live

Type indication  :-           	Example- "Sanjan is typing…" appears on other screens

Auto-save    :-                	Updates DB every few seconds ("you can save manually ")

Delete documents  :-           	Removes from dashboard & DB

# OUTOUT

OUTPUT PICTURE:-
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/6e154b52-3753-4822-b8c8-facfadb120b0" /> 

OUTPUT VIDEO:-

https://github.com/user-attachments/assets/2fc2cdf0-8691-4e96-a1f1-c26937cb7a01

# Learning Outcomes

Through this project, I gained strong knowledge in:

 Fullstack MERN architecture

 Real-time communication with Socket.IO

 Cloud Deployment (Render)

 Environment variable security

 Git & version control workflow

 MongoDB CRUD operations

# Conclusion

This real-time editor demonstrates modern collaboration features used in top productivity apps like Google Docs & Notion.
I successfully built:

A backend API with MongoDB

A fully working real-time synchronized frontend

Cloud deployment & integration
