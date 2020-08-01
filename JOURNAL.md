# Sam Johnson Engineering Log

---

# Initial Setup

---

## Team Wilberg Collaboration

There are a lot of sheets, resources, deliverables, etc. for the project, so a Notion page was set up to try and keep them all in one place.  This includes docs for our projects, ticketing/roadmaps for task management and any notes from our meetings.

## Research

Starting to compile a list of frameworks and resources that we'll be using for all of our services.  This is mostly so everyone can stay on the same page with standards that will keep our app from breaking, and also share helpful info.  The first of these will be our App Service Plans and some research on generating/seeding our databases with randomly generating data from Faker.js.

[Docs](https://www.notion.so/b5d03a9bc51341b38cef0aa33af4a98b)

[Engineering Wiki](https://www.notion.so/Engineering-Wiki-a222f3b123f94a6a905fb5526d05aef9)

## Data Schemas & App Service Plan

We began meeting with TM's right away after the first draft of the service plans.  Writing out the planned data schemas has actually helped a lot in solidifying how state will be managed in our services and what data will be required to complete our application as a whole.   

This is difficult at first when heading into a completely new kind of architecture, but I imagine the inverse of trying to change data or setup endpoints later while in the middle of the project would be very problematic.  

Alex had a great observation: once established these data schemas and endpoints must be immutable.   Coordinating a design system will help protect from implementing features that will break later.

### Reservation Data Schema

This is going to be the most demanding service to build, as it's very demanding in data and styling. This includes two calendar pickers (a modal that can be reused), a parallax widget that scrolls into a secondary nav bar, and an itemized breakdown of each charge for our stay a the listing.  

After meeting with Leslie, she pointed out a very helpful realization that each night would have to have its own fee that fluctuates over time.  Also there will be available dates and unavailable dates that need to be generated.  Badges can be calculated through my data rather than randomly generated like before.  

The full service plan and data structure can be found here:  

[Reservation Service Plan](https://www.notion.so/Reservation-Service-Plan-89fb3b7700644a12a0d3368edd17769f)

### Explore Data Schema

Explore will be a much simpler service with less demand on CSS & data.  That being said it will have its own challenge of using API calls to find nearby destinations based on coordinates that I will get from Krissy's service.  For now I'll randomly generate coordinates and listing types for dummy data.

Full service plan:

[Explore Service Plan](https://www.notion.so/Explore-Service-Plan-71364a91f2e84ef0a52adb377e1c57f0)

## Initializing Repo

Each member of the team is downloading the FEC repo and moving the files over to their init repos made on Github.  This comes with some drudgery of setting up React, Webpack and making sure to serve our static files through a basic Express server setup to get started.  My hierarchy will have server, client (JSX & helpers), public (bundle & html) and database directories.

# Generating data & seeding database

---

## MySQL

Two database schema SQL files were built to import my tables from the app service plan.  After building and exporting a basic connection from my db.js file, I get the depreciation warning: 

> *DeprecationWarning: timers.enroll() is deprecated. Please use setTimeout instead.*

I wasn't using timers.enroll() anywhere, so I figured to ignore for the time being.  Later with some research, it seemed that I needed to update MySQL to play nicely with my updated version of Node:

[(node:1116) [DEP0095] DeprecationWarning: timers.enroll() is deprecated. Please use setTimeout instead. · Issue #2024 · mysqljs/mysql](https://github.com/mysqljs/mysql/issues/2024)

## Generator.js & Seed.js

To separate generating sample data and seeding both databases, generator.js and seed.js scripts were written and dummy data is kept as a text file. 

Due to the nested data structure of Reservation, I decided to promisify my MySQL query using Bluebird so that I could write my seeding script in an asynchronous promise chain.  Here's a useful tip:

```jsx
const promiseQuery = Promise.promisify(db.query).bind(db);
```

'db' is the required variable from my exported database connection. 

After mapping the promiseQuery call on each listing object in the dummy data, the return array of promises is resolved with Promise.all();

# Serving static files on itemized pages

---

This was a concept that I spent too long researching because I didn't know how to research it correctly.  I wanted to write my following api call:

```jsx
axios.get(`/api/reservation/${listingId}`)
```

In order to do that, I wanted my app's state to be aware of its url endpoint so that if you pulled up a page (i.e. [localhost:8888/47](http://localhost:8888/47) for listing 47) that it would set the state to the url.  That way you are visiting the item page.  Here's the concluded express route I wrote in order to serve my static files on each item page: 

```jsx
app.get('/:listingId', (req, res) => {
  var itemPage = path.join(__dirname, '../public/index.html');
  res.sendFile(itemPage);
})
```

Once static files are served, then componentDidMount within my React app page will make a request for the listing data according to the page listed.

[Item page by samasastudio · Pull Request #4 · Wilberg-Airbnb/reservation](https://github.com/Wilberg-Airbnb/reservation/pull/4)

Andy's observation led me to use req.params to get my endpoint listingId

To add, Eric recommended static files can be served at all sub collection endpoints by adding the endpoint to the first argument of app.use before applying app.static as the second argument.

```jsx
app.use('/:listingId', express.static(path.join(__dirname, '../public/index.html')));
```

# Jest & Enzyme Testing

---

## Setup

### Jest/Enzyme Config

here's a simple regex in the jest.config.js file to help read jsx

```jsx
module.export = {
    transform: {
        "^.+\\.jsx?$": "babel-jest"
      }
    // testURL: "localhost:8888.html"
  };
```

Add to NPM:

```json
"jest": {
    "modulePaths": [
      "/shared/vendor/modules"
    ],
    "moduleFileExtensions": [
      "js",
      "jsx"
    ],
    "moduleDirectories": [
      "node_modules",
      "bower_components",
      "shared"
    ],
    "moduleNameMapper": {
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
      "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
    }
  }
```

### Babel Notes

Multiple errors have occurred that require attention to a babel.config.json setup.  

> [BABEL] Note: The code generator has deoptimised the styling of /Users/samjohnson/Documents/hrfiles/airbrb/reservation/node_modules/react-dom/cjs/react-dom.development.js as it exceeds the max of 500KB.

[BABEL Note: The code generator has deoptimised the styling of "app.js" as it exceeds the max of "100KB in Meteor](https://stackoverflow.com/questions/35192796/babel-note-the-code-generator-has-deoptimised-the-styling-of-app-js-as-it-exc)

In the end my config appeared as:

```json
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "compact": true
}
```

Ran into a runtime error when trying to use async functions in JEST testing: 

> ReferenceError: regeneratorRuntime is not defined

[Error in Async Example: ReferenceError: regeneratorRuntime is not defined · Issue #3126 · facebook/jest](https://github.com/facebook/jest/issues/3126)

I install: 

```jsx
npm install --save-dev @babel/plugin-transform-runtime
```

and added to babel.config.json

```json
{
  "env": {
    "test": {
      "plugins": ["@babel/plugin-transform-runtime"]
    }
  }
}
```

### JEST/Enzyme Testing

While testing, I ran into issues with my componentDidMount calling my Axios requests for data.  The API calls were made, my tests would finish, and then I would get log errors because the response would try to log later.  There are several solutions to this:

1. Configure lifecycles to not fire when shallow mounting components in Enzyme:

[Migration from 2.x to 3.x](https://enzymejs.github.io/enzyme/docs/guides/migration-from-2-to-3.html#lifecycle-methods)

```jsx
import Enzyme, { mount, shallow, configure } from "enzyme";
Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });
```

2. use afterEach try implementing a delay

[setTimeout per test? · Issue #5055 · facebook/jest](https://github.com/facebook/jest/issues/5055)

3. break API calls out from lifecycle methods to control async behavior: TBD

### Writing Async Tests in JEST

[Jest did not exit one second after the test run has completed. · Issue #7287 · facebook/jest](https://github.com/facebook/jest/issues/7287)

[Testing asynchronous lifecycle methods with Jest](https://dev.to/jhotterbeekx/testing-asynchronous-lifecycle-methods-with-jest-13jo)

# Endpoint testing w/ Jest & Supertest

[A step-by-step intro to end-point testing](https://www.freecodecamp.org/news/end-point-testing/)

To avoid port errors, I had to remove app.listen from my server index.  Otherwise when the tests ran there was a port conflict.  

# Proxy Server

## Connecting Bundles:

There are several ways to get bundles to your server.  For testing purposes, it may not be a bad idea to figure out a way to write a bundle from the app server and write the bundle file locally to test (or hell just copy and paste).  Besides the file directory, it can be fund at 

```jsx
localhost:5000/public/bundle.js
```

or however you designed your project work directory.

The most obvious way is to use a CDN (while the service is running) to call your service bundle and the index page of the server will have all of the service divs to append the services.  This includes their modals.  This requires using the above address as a CDN for the bundle and creating divs for the service and ALL OF ITS MODALS.  Last but not least to avoid CORS errors and authorize the CDNs, your app must pass the following headers (via middleware) while serving up the initial files:

```jsx
//middleware for CORS headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
```

# Dockerizing

I created a Dockerfile for my app and a docker-compose.yml to run the app and database together.  Successfully I could spin up my database and connect my local app to the database container, but not the two containers together.  This was a multiple solution process that took days so lets highlight some things:

### MySQL 8 Auth

MySQL 8 has a "Default Authentication" process that makes connecting via SSH difficult.  If you get any Connection Auth errors when connecting your Express app, you can manually add in MySQL:

```sql
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'null'

flush privileges;
```

I was able to also include this in my schema.sql if wanting to invoke it automatically

The yaml file version of this (in which case I didn't need the above script is:

```yaml
command: --default-authentication-plugin=mysql_native_password
```

But beware that either of these methods will leave your app with security vulnerabilities and ill-prepared for production

Another option may be to start your MySQL container at 5.6

## YAML

To run both of my containers for app and db, I created a docker-compose.yml file that read as:

```yaml
version: '3.7'

services:

  airbnb-res:
    build: ./
    working_dir: /Users/samjohnson/Documents/hrfiles/airbrb/reservation
    ports:
      - "5000:5000"
    expose:
      - 5000
    links:
      - "db"
    command: ["wait-for-it.sh", "db:3306", "--", "npm", "start"]
    volumes:
      - ./wait-for-it.sh:/usr/local/bin/wait-for-it.sh
      - ./:/Users/samjohnson/Documents/hrfiles/airbrb/reservation

  db:
    image: mysql:8
    environment:
      - MYSQL_DATABASE=airbrbRes
      - MYSQL_ROOT_PASSWORD=null
    ports:
      - "3306:3306"
    expose:
      - 3306
    volumes:
      - ./server/schema.sql:/docker-entrypoint-initdb.d/schema.sql
    command: --default-authentication-plugin=mysql_native_password
```

Please note the wait for it script which I downloaded at the below link

[vishnubob/wait-for-it](https://github.com/vishnubob/wait-for-it)

And finally the biggest bug that I've come across was making the database available through volumes after composing:

```yaml
volumes:
      - ./wait-for-it.sh:/usr/local/bin/wait-for-it.sh
      - ./:/Users/samjohnson/Documents/hrfiles/airbrb/reservation
HERE------^
```

A couple of commands helped me track how my database was connecting:

```bash
#kill all containers
docker system prune

#kill all volumes
docker system prune --volumes

#tells you DRIVER & VOLUME NAME but good to make sure volumes are deleted
docker volume ls

#see all current containers
docker ps

#inspect IP Address
docker inspect 1c04cfef8d6e | grep "IPAddress"
```

More logs

[Volumes and Logs in MySQL Docker](https://medium.com/better-programming/volumes-and-logs-in-mysql-docker-61122f8c1d84)

MySQL Docker Page

[mysql - Docker Hub](https://hub.docker.com/_/mysql)

Volumes in Docker:

[Understanding Volumes in Docker](https://blog.container-solutions.com/understanding-volumes-docker)

## Deployment & Production Build

Our team choice is to deploy on AWS using an instance of EC2 for each service and reverse proxy as well.  I've installed git and docker in the instance and cloned the Reservation repo into the main directory.  While composing the images, there are a few updates that were needed to make sure the build ran successfully.

1. The seed script actually never exits after running.  While this was easy to exit in development, this prevents the rest of my YAML script from running and so process.exit points were added to both success and catch blocks of the seed script.
2. Having npm install in both the Dockerfile and YAML was redundant.  Though the script worked on my local machine, npm install was moved to just the YAML script to run synchronously with the rest of the docker-compose commands.  

For deployment of Docker images on AWS:

[Running Docker on AWS from the ground up](https://www.ybrikman.com/writing/2015/11/11/running-docker-aws-ground-up/#creating-an-elb)

## Production Build

The application was made production ready by using a production build of webpack and Gzip compression in Express.  Additionally I integrated lazy/Suspense loading of the calendar because of how far down the page the component is from the user initially loading.  The scores proved to be excellent!  But this came with several issues that can be handled with some foresight on the next project.  

For lazy/Suspense loading:

[Code-Splitting - React](https://reactjs.org/docs/code-splitting.html)

[Code splitting with React.lazy and Suspense](https://web.dev/code-splitting-suspense/?utm_source=lighthouse&utm_medium=devtools)

### Styling BEM

This was a huge hurdle for the team and still continues to be a challenge.  Appending multiple instances of styling-components to the page creates cross-conflicts between styles being applied to the wrong components.  This is due to the hashing classNames that style-components generates to tag the component it is applying styles to.  

[styled-components: Advanced Usage](https://styled-components.com/docs/advanced)

The people at Styling-Components are aware of this, and from what I've read online there not much of a fix in the way for using their styles for individual microservices.  The best you can do is wrap your styles in an extra layer specifics.  The best defense is over-specifying your components so they do not depending on default styles from the page.  The best offense is to wrap your styles in an extra reference to the parent/root div so that those styles only fire when contained in the parent.

```jsx
const CheckButton = styled.button`
	#reservation-widget & {
		display: block;
		margin: auto;
		margin-top: 20px;
		width: 298px;
		height: 48px;
		background: radial-gradient(#F83158, #D80866);
		color: rgb(255, 255, 255);
		border: 2px solid rgba(221, 221, 221, 0.12);
		border-radius: 12px;
	}
`
```

For a better understanding of BEM: 

[BEM - Block Element Modifier](http://getbem.com/introduction/)
