import React from 'react';
import './Header.css';
import * as $ from 'jquery'
import mainLogo from '../../img/cric-info-logo.jpg';
import {BrowserRouter, Route,Link, withRouter} from 'react-router-dom';
class Header extends React.Component{
    constructor(props){
        super(props);
    }
    menuChange = (para,e) =>{
        e.preventDefault();
        this.checkBrowserStatus();
        e.target.parentElement.querySelectorAll( ".active" ).forEach( e =>
            e.classList.remove( "active" ) 
        );    
        e.target.classList.add( "active" );
        this.props.history.push('/'+para);
    }
    checkBrowserStatus(){
        if(!navigator.onLine)
        {
            alert("Check your connection");
        }
    }
    render(){
        $(document).ready(function () {
            var isClosed = true;
            if ($(window).width() < 992) {
                $('.menu-container').removeClass("open");
                $('.menu-container').removeClass("menu-opened");
                $('#pathA').css('d', 'path("m 10.0916789,20.818994 43.8166421,0")');
                $('#pathB').css('opacity', '1');
                $('#pathC').css('d', 'path("m 10.0916788,42.95698 43.8166422,0")');
                $('body').css("overflow", "auto");
                $('.mobile-menu').removeClass("menu-opened");
                isClosed = true;
                $('.hamburger-cross').click(function () {
                    if (isClosed == true) {
                        $('.menu-container').addClass("open");
                        $('.menu-container').addClass("menu-opened");
                        $('#pathA').css('d', 'path("M 12.972944,50.936147 51.027056,12.882035")');
                        $('#pathB').css('opacity', '0');
                        $('#pathC').css('d', 'path("M 12.972944,12.882035 51.027056,50.936147")');
                        $('body').css("overflow", "hidden");
                        $('.mobile-menu').addClass("menu-opened");
                        isClosed = false;
                    } else {
                        $('.menu-container').removeClass("open");
                        $('.menu-container').removeClass("menu-opened");
                        $('#pathA').css('d', 'path("m 10.0916789,20.818994 43.8166421,0")');
                        $('#pathB').css('opacity', '1');
                        $('#pathC').css('d', 'path("m 10.0916788,42.95698 43.8166422,0")');
                        $('body').css("overflow", "auto");
                        $('.mobile-menu').removeClass("menu-opened");
                        isClosed = true;
                    }
                });
            }
        });
        return(
            <div className="header" id="header">
                <div className="mobile-menu">
                    <svg width="60" height="50" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="hamburger-cross" id="cross">
                        <g>
                            <path id="pathA" fill="none" stroke="#f15a24" strokeWidth="5" strokeLinejoin="bevel" d="m 10.0916789,20.818994 43.8166421,0"/>

                            <path id="pathB" fill="none" stroke="#f15a24" strokeWidth="5" strokeLinejoin="bevel" d="m 10.1969746,31.909063 43.8166424,0"/>

                            <path id="pathC" fill="none" stroke="#f15a24" strokeWidth="5" strokeLinejoin="bevel" d="m 10.0916788,42.95698 43.8166422,0"/>
                        </g>
                    </svg>
                </div>
                <div className="menu-container">
                    <div className="logo" onClick={(e)=>this.menuChange('',e)}>
                        <img src={mainLogo} alt="header logo"/>
                    </div> 
                    <ul className="menu-items" id="menu_items">                         
                        <li className="Each-header-tab active" id="" onClick={(e)=>this.menuChange('',e)}>Matches</li>
                        <li className="Each-header-tab" id="live" onClick={(e)=>this.menuChange('live',e)}>Live Matches</li>                                                                                         
                        <li className="Each-header-tab" id="upcoming" onClick={(e)=>this.menuChange('upcoming',e)}>Upcoming Matches</li>
                        <li className="Each-header-tab" id="old" onClick={(e)=>this.menuChange('old',e)}>Old Matches</li>
                        <li className="Each-header-tab" id="about" onClick={(e)=>this.menuChange('about',e)}>About</li>
                     </ul>
                    <div className="clearfix"></div>
                </div>
                <div className="clearfix"></div>
            </div>

        )
    }
}

export default withRouter(Header);
