
export const AuthLayout = ({ children }: { children: JSX.Element[] }) => {

  return (
    <div className="login">
      <div className="login-container">
        <div className="logo">
          <img className="logoPic" src='/public/json/homePage.png' alt="home Page"></img>
        </div>
        <div className="loginRight">
          {children}
        </div>
      </div>
    </div>
  )
}