import loginFrontPic from "../assets/images/loginFrontPic.png";

export const AuthLayout = ({ children }) => {

  return (
    <div className="login">
      <div className="login-container">
        <div className="logo">
          <img className="logoPic" src={loginFrontPic} alt="Front Page"></img>
        </div>
        <div className="loginRight">
          {children}
        </div>
      </div>
    </div>
  )
}