import {NavLink} from "react-router-dom"

function NavBar(){
    return (
        <nav>
            <div>
                <NavLink to="/">home</NavLink>
            </div>
            <div>
                <NavLink to="/add_product">add</NavLink>
                <NavLink to="/update_product">update</NavLink>
                <NavLink to="/cart">cart</NavLink>
            </div>
        </nav>
    )
}

export default NavBar;