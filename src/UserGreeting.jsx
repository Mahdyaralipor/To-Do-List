import PropTypes from "prop-types";

function UserGreeting(props) {
  const Welcome = <h2 className="welcome-message">Welcome {props.username}</h2>;
  const LoginAlert = <h2 className="login-message">Place login to cantinue</h2>;
  
  return props.isLoggedin ? Welcome : LoginAlert;
}

UserGreeting.PropTypes = {
  username: PropTypes.string,
  isLoggedin: PropTypes.bool,
};
UserGreeting.defaultProps = {
  username: "Guest",
  isLoggedin: false,
};
export default UserGreeting;
