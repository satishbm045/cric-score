import React from 'react';
import '../LiveMatches/LiveMatches.css';
import {withRouter} from 'react-router-dom';

class Matches extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            SelectedMatchesDetail : {
                data: {}
                ,isSuccess: false
                ,message: 'Loading'
            }
            ,SelectedMatchId: ''
            ,SelectedSeriesId: ''
            ,SelectedMatchStatus: ''
        }
    }
    componentDidMount=()=>{
        document.querySelectorAll("#menu_items")[0].childNodes.forEach((e,i)=>{
            e.classList.remove( "active" );
            if(e.id.toLowerCase() == window.location.pathname.split("/").pop().toLocaleLowerCase()){
                e.classList.add( "active" );
            }
        })
    }
    redirectToSelectedMatch = (e) => {
        if(e.status.toLowerCase() == 'live'){
            localStorage.setItem('selectedMatchFromHome', JSON.stringify(e));
            this.props.history.push('/live');
        }
        if(e.status.toLowerCase() == 'completed'){
            localStorage.setItem('selectedMatchFromHome', JSON.stringify(e));
            this.props.history.push('/old');
        }
        if(e.status.toLowerCase() == 'upcoming'){
            // localStorage.setItem('selectedMatchFromHome', JSON.stringify(e));
            // this.props.history.push('/Upcoming');
        }
    }
    render(){
        console.log(this.props.AllMatch);
        return(
            <>
                <div id="AllMatchView">
                    { this.props.AllMatch.isSuccess && 
                        <div className="Box">
                            {
                                this.props.AllMatch.data.map((e,i)=>{
                                    return (
                                        <div key={e.id} className='EachBox'>
                                            <div className="MainHeading" onClick={()=>{this.redirectToSelectedMatch(e)}}>
                                                {e.series.name}
                                            </div>
                                            <div className="TeamName">
                                            {e.awayTeam.shortName+' Vs '+e.homeTeam.shortName}
                                            </div>
                                            {' Status: '+e.currentMatchState}
                                        </div>
                                    )
                                })                                
                            }
                        </div> 
                    }
                </div>
            </>
        )
    }
}
export default withRouter(Matches);