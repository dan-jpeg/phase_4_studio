import {NavLink} from "react-router-dom"

function NavBar({ adminMode, handleLogin, enteredUsername }){
    return (
        <nav>
            <div>
                <NavLink to="/">home</NavLink>
            </div>
            
            {adminMode ? <div>
                <NavLink to="/add_product">add</NavLink>
                <NavLink to="/update_product">update</NavLink>
                </div>
            :'' }
            <div>
            <div className='loginDiv'>
      {!adminMode ? (
      <form onSubmit={handleLogin}>
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button className="submit-button" type="submit">Login</button>
      </form>
    ) : (
     <div>logged in as <span className="username-display">{enteredUsername}</span></div>
    )}
  </div>
            </div>
        </nav>
    )
}

export default NavBar;