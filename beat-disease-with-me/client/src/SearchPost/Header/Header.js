import React from "react";
import './Header.css';

class Header extends React.Component{
    render(){
       const {title} = this.props;
      return (
          <div className = "header">
            <h1>{title}</h1>
          </div>
      );      
    }
}
export default Header;
