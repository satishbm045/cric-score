import React from 'react';
import '../LiveMatches/LiveMatches.css';
import axios from 'axios';
import loadingLogo from '../../img/loading.gif';

class UpcomingMatches extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            UpcomingMatchesList : []
        }
    }
    componentDidMount = () =>{
        // if(localStorage.getItem("selectedMatchFromHome") != null){
        //     this.SelectedMatch(JSON.parse(localStorage.selectedMatchFromHome));
        //     localStorage.removeItem('selectedMatchFromHome');
        // }
        document.querySelectorAll("#menu_items")[0].childNodes.forEach((e,i)=>{
            e.classList.remove( "active" );
            if(e.id.toLowerCase() == window.location.pathname.split("/").pop().toLocaleLowerCase()){
                console.log(e);
                e.classList.add( "active" );
            }
        })
    }
    render(){
        console.log(this.props.AllMatch);
        function calcDate(date){
            var d = new Date(date);
            return d;
        }
        return(
            <>
                { !this.props.AllMatch.isSuccess && <div className="Box Loading">Loading</div> }
                { this.props.AllMatch.isSuccess && 
                    <div className="Box">
                        {
                            this.props.AllMatch.data.map((e,i)=>{
                                if(e.status == 'UPCOMING'){
                                    return (
                                        <div key={e.id} className='EachBox'>
                                            <div className="MainHeading">
                                                {e.series.name}
                                            </div>
                                            <div className="TeamName">
                                            {e.awayTeam.shortName+' Vs '+e.homeTeam.shortName }
                                            </div>
                                            {' Start Date: '+ calcDate(e.startDateTime) }
                                            <br/>  
                                            {'Venue: '+ e.venue.name}
                                        </div>
                                    )
                                }
                            }) 
                            
                        }
                    </div> 
                }
            </>
        )
    }
}
export default UpcomingMatches;