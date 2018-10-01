import React from "react";

export const UserContext = React.createContext();

class UserProvider extends React.Component {
  constructor(props) {
    super(props);

    this.UserLogin = () => {
      //Function to authenticate log in and adjust state values will go here
    };

    this.state = {
      //Sets state of the component to have no active user.
      userID: null,
      loggedIn: false
      // https://alligator.io/react/context-api/
    };
  }
}
