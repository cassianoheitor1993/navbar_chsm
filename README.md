# Navbar Component

A customizable and responsive navigation bar component for React applications. It includes support for Bootstrap styling, routing, and real-time notifications via WebSocket or other backends (like Socket.io).

## Installation

### Install required dependencies

To install the dependencies required for the `Navbar` component, run the following command:

```sh
npm install react react-router-dom dompurify bootstrap bootstrap-icons
```

### Install navbar_chsm component

To install the navbar_chsm component, run the following command:
```sh
npm install navbar_chsm
```

### Usage

Import the Navbar component into your application and use it as follows:
```sh
import React from 'react';
import Navbar from 'navbar_chsm'; // Import the navbar_chsm component
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <div>
      <Navbar
        title="Amazing Blog"
        links={links}
        showNotifications={true} // Toggle notifications
        websocketUrl="wss://example.com/websocket" // WebSocket URL for notifications
        socketLibrary="websocket" // Use "socket.io" if using Socket.io instead of WebSocket
        customStyles={{
          navbar: { backgroundColor: '#333' },
          title: { color: '#fff' },
        }}
      />
      {/* Other components */}
    </div>
  );
};

export default App;
```

### Props
The Navbar component accepts the following props:

* title (string): The title of the navbar. Default is 'Amazing Blog'.
* links (array): An array of link objects with path and label properties.
* showNotifications (bool): Whether to show the notifications icon. Default is true.
* websocketUrl (string): The WebSocket URL for receiving notifications. Default is null. If you're using Socket.io, pass the appropriate URL.
* socketLibrary (string): The library used for real-time communication. Options include 'websocket' (default) and 'socket.io' for Socket.io connections.
* customStyles (object): Custom styles for the navbar and title.


### Example
Here’s an example of how you can use the Navbar component with your custom links, notifications, and WebSocket configuration:
```sh
const links = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

<Navbar
  title="Amazing Blog"
  links={links}
  showNotifications={true} // Toggle notification icon visibility
  websocketUrl="wss://example.com/websocket" // WebSocket URL for receiving notifications
  socketLibrary="websocket" // Option to switch to Socket.io if required
  customStyles={{
    navbar: { backgroundColor: '#333' },
    title: { color: '#fff' },
  }}
/>
```

### Dependencies
* react: React library for building the UI.
* react-router-dom: For routing.
* dompurify: To ensure content security when using dynamic content.
* bootstrap: For the default styling.
* bootstrap-icons: For including Bootstrap's icon library.
* WebSocket or Socket.io: Depending on your backend, the component can use either WebSocket or Socket.io for real-time notifications. * Socket.io support is optional and can be toggled with the socketLibrary prop.

### License
This project is licensed under the MIT License.


### Key Changes:
1. **Updated Description:** The README now reflects the new support for both WebSocket and Socket.io, as well as the ability to toggle notifications and customize styling.
2. **Props Documentation:** Added `socketLibrary` to specify whether to use WebSocket or Socket.io for real-time communication.
3. **Installation Instructions:** Clearer installation commands for both the component and its dependencies.
4. **Usage Example:** Demonstrates the use of both `showNotifications` and `socketLibrary` props.

This README will help users understand how to integrate your component into their projects and take full advantage of the new features!
