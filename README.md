# CMSFrontEnd
This project make use of typescript, node and react. <br/>

This is the a list of package used and why:
react: used for rendering HTML+CSS+JS in a statefull components. Project scope is limited logic on Components.
Redux: hold a global state of the app called "store" to have a centrelised objects, plus it includes an easy manipulation using action and reducers.
Epics: Takes care of Global Business Logic on the frontend by mapping of payloads.
       It is also used to maintain a clean flow of actions between external API/Sockets and Redux store, by serving as a channel of actions/functions.
Node:  Used as a Proxy between react and actual server in order to pre-render react components as html on server instead of browser, so it will rehydrate on client side.
       All fetch request are pased to Node to an other server, waits for response and forwards back to react browser.
Express: usefull Enhancer on the Node server to make requests easier.
PostCss: a mean of reading and processing SCSS, this also reduces packages sizes by exported needed classes only.
React-router: handles global navigation system in react using url pathnames.
react-helmet: main SEO packages to render meta tags.
webpack: required to transpile and compile React into HTML+CSS+JS.
Types: Modal, Interfaces, Enums, and Objects. Should be put in a published package to be shared with other projects
      such as the main Node Backend used along with this project, find in my GitHub: 'CMSNode'.

# Features focus
most important features in this project, ordered by priority: <br/>
-SEO using server side rendering <br/>
-hot reloading both node and react. <br/>
-server renders first <br/>
-reusability of code by making it very dynamic including menu and navigation.<br/>
