import React from 'react';
import './Header.css';
import mainLogo from '../../img/cric-info-logo.jpg';
import {BrowserRouter, Route,Link, withRouter} from 'react-router-dom';

class Header extends React.Component{
    constructor(props){
        super(props);
    }
    menuChange = (para) =>{
        this.props.history.push('/'+para);
    }
    render(){
        return(
            // <div className="header-main">
            //     <div className="header-tab">
            //         <div className="Each-header-tab" onClick={()=>this.menuChange('live')}>
            //             Live Matches
            //         </div>
            //         <div className="Each-header-tab" onClick={()=>this.menuChange('upcoming')}>
            //             Upcoming Matches
            //         </div>
            //         <div className="Each-header-tab" onClick={()=>this.menuChange('old')}>
            //             Old Matches
            //         </div>
            //     </div>
            // </div>

            <div className="header">
                <div className="menu-container">
                    <div className="logo" onClick={()=>this.menuChange('')}>
                        <img src={mainLogo} alt="header logo"/>
                    </div> 
                    <ul className="menu-items">                        
                        <li className="Each-header-tab" onClick={()=>this.menuChange('matches')}>Matches</li>
                        <li className="Each-header-tab" onClick={()=>this.menuChange('live')}>Live Matches</li>                                                                                         
                        <li className="Each-header-tab" onClick={()=>this.menuChange('upcoming')}>Upcoming Matches</li>
                        <li className="Each-header-tab" onClick={()=>this.menuChange('old')}>Old Matches</li>
                        <li className="Each-header-tab" onClick={()=>this.menuChange('about')}>About</li>
                     </ul>
                    <div className="clearfix"></div>
                </div>
                <div className="clearfix"></div>
            </div>

        )
    }
}

export default withRouter(Header);