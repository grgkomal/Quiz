#📘 Full‑Stack Project Setup Documentation
1. 🖥️ Backend (Node.js + Express + MongoDB)

Step 1: Initialize Node Project
  
$ npm init -y
Creates a package.json file with default settings.

Step 2: Install Dependencies
  
$ npm install express jsonwebtoken mongoose cors
express → Web framework for building APIs.

jsonwebtoken → For authentication using JWT.

mongoose → ODM for MongoDB.

cors → Middleware to handle cross‑origin requests.

Step 3: Install Dev Dependency (Nodemon)
  
$ npm install --save-dev nodemon
nodemon restarts the server automatically when files change.

Step 4: Create server.js

Step 5: Run the Server
  
$ nodemon server.js

Step 6: Seeding Data into MongoDB


#2. 🌐 Frontend (Angular)

Step 1: Create Angular App
  
$ ng new frontend --no-standalone --skip-tests
$ cd frontend

Step 2: Generate Quiz Component
  
$ ng g c Quiz.component

Step 3: Generate Quiz Service
  
$ ng g s quiz

Step 4: Generate Directive

$ ng g d directives

Step 5: Run Angular App
  
$ ng serve
App will run at: http://localhost:4200

<img width="514" height="507" alt="Screenshot 2025-10-31 at 11 21 08 AM" src="https://github.com/user-attachments/assets/cc654301-4a65-4f56-abe8-95058e190047" />

<img width="512" height="517" alt="Screenshot 2025-10-31 at 11 21 22 AM" src="https://github.com/user-attachments/assets/3cb2cfda-1399-446b-930b-dee2dc257778" />

<img width="513" height="713" alt="Screenshot 2025-10-31 at 11 21 50 AM" src="https://github.com/user-attachments/assets/db7ebc7e-4f2a-4f64-b362-dca1b086c065" />

<img width="529" height="975" alt="Screenshot 2025-10-31 at 11 22 18 AM" src="https://github.com/user-attachments/assets/c750266d-858f-44e3-a825-64226f553c46" />

<img width="525" height="699" alt="Screenshot 2025-10-31 at 11 22 56 AM" src="https://github.com/user-attachments/assets/637ef4c9-11b2-4bf8-9bb4-9e26e2eb1dce" />

<img width="531" height="420" alt="Screenshot 2025-10-31 at 11 23 03 AM" src="https://github.com/user-attachments/assets/b7ef8be2-2977-4b1b-a055-72c857cffe24" />
