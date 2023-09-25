import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; // Import the correct function from Firebase
import { auth } from '../../../config/firebase';

export default function About() {
  const [user, setUser] = useState(); // Initialize user as null

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // ...
      } else {
        console.log("User is signed out");
        // User is signed out
        // ...
      }
    });

    // Clean up the subscription when the component unmounts

  }, []); // Empty dependency array to run this effect only once

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="text-center">About</h1>


          {/* You can display user information here */}
          {/* {user ? <p>User is signed in as {user.displayName}</p> : <p>User is signed out</p>} */}
        </div>
      </div>
    </div>
  );
}
