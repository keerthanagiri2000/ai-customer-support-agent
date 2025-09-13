# AI Customer Support Agent

A full-stack AI-powered customer support agent with React (Vite) frontend and Node.js/Express backend.

## Tech Stack
Frontend: React + Vite + TailwindCSS

Backend: Node.js + Express + MongoDB

Deployment: Netlify(frontend) & Render (backend)

## Project Structure
ai-customer-support-agent/

│── client/ # React (Vite) frontend

│── server/ # Node.js backend

│── README.md

│── .gitignore

## Setup Instructions
### 1. Clone the repo
```bash
git clone https://github.com/keerthanagiri2000/ai-customer-support-agent.git
cd ai-customer-support-agent
```
### 2. Setup backend(server)
```bash
cd server
npm install
```
### 3. Create .env file(server)
Inside the server/ folder, create a .env file and add:
```bash
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET_KEY=your-jwt-secret
HUGGING_FACE_MODEL=your-model-name
HUGGING_FACE_API_TOKEN=your-huggingface-api-token
```
### 4. Run the backend
```bash
npm run dev
```
Backend will start at: http://localhost:5000

### 5. Setup frontend(client)
```bash
cd client
npm install
```
### 6. Configure API Base URL
Go to client/config.js change the api base url http://localhost:5000

### 7. Run the frontend
```bash
npm run dev
```
Frontend will start at: http://localhost:5173

### 8. Deployment Links

Frontend (Netlify): https://customer-support-ai.netlify.app/

Backend (Render): https://ai-customer-support-agent-eq4d.onrender.com

