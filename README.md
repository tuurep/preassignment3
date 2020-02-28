### Preassignment project

**Objectives:**

* Creating a multiplayer game
* React web application
* Implement a counter that works with multiple simultaneous users in an error-free way
* Host on cloud (Heroku)

**Dependencies:**

* react-alert
* express
* socket.io
* (for running dev servers) [concurrently](https://www.npmjs.com/package/concurrently)

**Install dependencies:**

npm install needs to be run on client and server separately

1. `cd client`
2. `npm install`
3. `cd ../server`
4. `npm install`

**Run locally:**

Run both servers with *concurrently*

* *Be at /server directory*
* `npm run dev`
* App runs at localhost:3000

**Available publicly on the Internet:**

Go here to see and try the app:
* [https://preassignment3-client.herokuapp.com/](https://preassignment3-client.herokuapp.com/)

I created separate Heroku dynos for server and client. Server is running here, but there's nothing to see:
* [https://preassignment3-server.herokuapp.com/](https://preassignment3-server.herokuapp.com/)
