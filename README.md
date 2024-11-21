# Navbar Component

A customizable and responsive navigation bar component for React applications.

## Installation

To install the dependencies required for the `Navbar` component, run the following command:

```sh
npm install react react-router-dom dompurify bootstrap
```

Usage
Import the Navbar component and include it in your application:

```sh
import React from 'react';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Navbar.css';

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
        showNotifications={true}
        websocketUrl="wss://example.com/websocket"
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

Props
The Navbar component accepts the following props:

title (string): The title of the navbar. Default is 'Amazing Blog'.
links (array): An array of link objects with path and label properties.
showNotifications (bool): Whether to show the notifications icon. Default is true.
websocketUrl (string): The WebSocket URL for receiving notifications. Default is null.
customStyles (object): Custom styles for the navbar and title.

Example
```sh
const links = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

<Navbar
  title="Amazing Blog"
  links={links}
  showNotifications={true}
  websocketUrl="wss://example.com/websocket"
  customStyles={{
    navbar: { backgroundColor: '#333' },
    title: { color: '#fff' },
  }}
/>
```

Dependencies
react
react-router-dom
dompurify
bootstrap
bootstrap-icons
License
This project is licensed under the MIT License. ```
