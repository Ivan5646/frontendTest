import React from "react";
import Login from "./Login"

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                <h2>Home</h2>
                <Login/>
            </div>
        )
    }
}

export default Header;