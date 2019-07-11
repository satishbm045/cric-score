import React from 'react';
import '../LiveMatches/LiveMatches.css';
import axios from 'axios';

class UpcomingMatches extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            UpcomingMatchesList : []
        }
    }
    
    render(){
        console.log(this.props.AllMatch);
        
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
                                            {e.awayTeam.shortName+' Vs '+e.homeTeam.shortName}
                                            </div>
                                            {' Start Date: '+e.startDateTime}
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