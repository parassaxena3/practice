//React Router
/*
React Router is a standard library for routing in React. It enables the navigation among views of various components in a React Application, allows changing the browser URL, and keeps UI in sync with the URL.
React Router provides a <BrowserRouter> component that uses the HTML5 history API to keep the UI in sync with the URL. It also provides a <Route> component that renders a component based on the URL path.
React Router also provides a <Link> component that allows navigating to a different view without a full page reload.
React Router supports nested routes, route parameters, query parameters, and route transitions.
React Router is widely used in single-page applications built with React.

// Example of React Router usage:
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
       </Routes>
    </BrowserRouter>
  );
}

// Example of nested routes:
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
      </div>
    );
  }
  
  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="stats" element={<Stats />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  

// useNavigate
useNavigate is a hook provided by React Router that returns a navigate function to navigate to a different view programmatically. It allows passing some state to the new route and replacing the current entry in the history stack.

import { useNavigate } from 'react-router-dom';
function Home() {
  let navigate = useNavigate();
  const handleClick = () => {
  navigate('/path', {
    replace: true, // Replace the current entry in the history stack
    state: { from: 'previousPage' } // Pass some state to the new route
  });
};
  return (
    <button onClick={handleClick}>Go to About</button>
  );
}


// Link
Link is a component provided by React Router that allows navigation to a different view without a full page reload. It renders an anchor tag (<a>) with the specified URL path.
import { Link } from 'react-router-dom';
function App() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
  );
}

// Redirect
Redirect is a component provided by React Router that redirects to a different view programmatically. It renders a <Redirect> element with the specified URL path.
import { Redirect } from 'react-router-dom';
function App() {
  const isAuthenticated = true;
  return isAuthenticated ? <Redirect to="/dashboard" /> : <Login />;
}

// Example of getting route parameters:

import { useParams } from 'react-router-dom';
function UserProfile() {
  const { userId } = useParams();
  return <div>User ID: {userId}</div>;
}

// Example of getting query parameters (user?id=123):

import { useLocation } from 'react-router-dom';
function UserProfile() {
    const searchParams = new URLSearchParams(useLocation().search);
    const userId = searchParams.get('id');
    return <div>User ID: {userId}</div>;
    }
*/

// Higher-Order Components (HOCs)
/*
Higher-Order Components (HOCs) are a design pattern in React that allows reusing component logic. A Higher-Order Component is a function that takes a component and returns a new component with additional props or functionality.
HOCs are commonly used for cross-cutting concerns such as logging, authentication, authorization, and data fetching.

Example of a Higher-Order Component:
function withAuthentication(Component) {
    return function WithAuthentication(props) {
        if (isLoggedIn()) {
        return <Component {...props} />;
        } else {
        return <Redirect to="/login" />;
        }
    };
    }


// Usage of a Higher-Order Component:
const Profile = withAuthentication(ProfileComponent);
*/

// Pure Components
/*
Pure Components are a type of React component that implements the shouldComponentUpdate lifecycle method with a shallow prop and state comparison. If the new props and state are equal to the previous props and state, the component does not re-render.
Pure Components are useful for optimizing performance by preventing unnecessary re-renders of components when the props and state have not changed.
Pure Components are recommended for functional components and class components that do not have local state or side effects.

Example of a Pure Component:
class Counter extends React.PureComponent {
    render() {
        return <div>{this.props.count}</div>;
    }
}

// Note: React.memo is a higher-order component that can be used with functional components to achieve the same optimization as Pure Components.

// Example of React.memo:
const Counter = React.memo(function Counter(props) {
    return <div>{props.count}</div>;
});
*/

// Lazy Loading:
/*
Lazy Loading is a technique in React that allows delaying the loading of components until they are needed. Lazy Loading can improve the initial loading time of an application by splitting the code into smaller chunks and loading them on demand.
React provides a built-in lazy function and Suspense component to enable Lazy Loading of components.
The lazy function allows dynamically importing a component and returns a Promise that resolves to the component.
The Suspense component can be used to show a loading indicator while the lazy-loaded component is being loaded.
Lazy Loading is commonly used for optimizing the performance of large applications with many components.

// Example of Lazy Loading:
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
    return (
        <div>
            <React.Suspense fallback={<div>Loading...</div>}>
                <LazyComponent />
            </React.Suspense>
        </div>
    );
}

//Suspense
Suspense is a component provided by React that allows handling loading states in components that use lazy loading or data fetching. It can be used to show a loading indicator while the content is being loaded.
eg with data fetching:

import React, { Suspense } from 'react';
import { fetchData } from './api';
function DataComponent() {
    const data = fetchData(); // This will throw a promise if the data isn't ready
    return <div>{data}</div>;
}
function App() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <DataComponent />
            </Suspense>
        </div>
    );
}


*/

// Project Structure
/*
A typical React project structure consists of the following directories and files:

my-app/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       ├── images/
│       └── icons/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   │       ├── index.css
│   │       └── App.css
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.js
│   │   │   └── Input.js
│   │   ├── layout/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   └── Sidebar.js
│   │   └── specific/
│   │       ├── UserCard.js
│   │       └── ProductList.js
│   ├── hooks/
│   │   └── useCustomHook.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── About.js
│   │   └── Contact.js
│   ├── services/
│   │   ├── api.js
│   │   └── auth.js
│   ├── utils/
│   │   └── helpers.js
│   ├── App.js
│   ├── index.js
│   └── routes/
│       └── AppRoutes.js
├── .gitignore
├── package.json
├── README.md
└── yarn.lock / package-lock.json

*/
