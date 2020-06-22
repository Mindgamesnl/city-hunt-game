# City Game
A small web game that makes your team collect points in the real world based on GPS data.

# Requirements
 - NodeJS
 - Letsencrypt certificates
 - Apache/NginX webserver
 
# Setup
 - Fill out `config/config.json` with a secrure admin password, your SSL certificates, port and latitude/longitude of your start location.
 - Fill `config/locations.json` with your locations. Points will be generated automatically.
 - Fill out `config/web-config.js` with the details of your backend server
 - Install the backend on a server using
```
git clone https://github.com/Mindgamesnl/city-hunt-game.git
cd city-hunt-game/
cd backend/
npm install
sudo node entry.js
```
 - compile the frontend
```
git clone https://github.com/Mindgamesnl/city-hunt-game.git
cd city-hunt-game/
cd frontend/
npm install
npm run-script build
```
 - serve from the build directory

