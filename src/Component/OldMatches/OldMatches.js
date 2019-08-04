import React from 'react';
import '../LiveMatches/LiveMatches.css';
import axios from 'axios';
import FullScoreBoard from '../Common/FullScoreBoard';

class OldMatches extends React.Component{
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
    componentDidMount = () =>{
        if(localStorage.getItem("selectedMatchFromHome") != null){
            this.SelectedMatch(JSON.parse(localStorage.selectedMatchFromHome));
            localStorage.removeItem('selectedMatchFromHome');
        }
        document.querySelectorAll("#menu_items")[0].childNodes.forEach((e,i)=>{
            e.classList.remove( "active" );
            if(e.id.toLowerCase() == window.location.pathname.split("/").pop().toLocaleLowerCase()){
                console.log(e);
                e.classList.add( "active" );
            }
        })
    }
    SelectedMatch = (match) =>{
        var self = this;
        axios({
            url: 'https://dev132-cricket-live-scores-v1.p.rapidapi.com/scorecards.php?seriesid='+match.series.id+'&matchid='+match.id,
            method: 'get',
            headers: {
                "X-RapidAPI-Host" : "dev132-cricket-live-scores-v1.p.rapidapi.com"
                ,"X-RapidAPI-Key" : "6e9b6a0a65msh6bd761160573386p1ba0d1jsn67e1f7c9715e"
            }
        }).then(function (response) {
            console.log(response.data);
            self.setState({
                SelectedMatchesDetail :{
                    data:response.data,
                    isSuccess: true 
                },
                SelectedMatchStatus: match.currentMatchState
            })
        }).catch(function(response){
            self.setState({
                SelectedMatchesDetail :{
                    message:'There Some Connectivity Problem Please check your internet connection',
                    isSuccess: false 
                }
            })
        })
        document.getElementById('AllMatchView').style.display = 'none';
        document.getElementById('EachMatchView').style.display = 'block';
        console.log(this.state.SelectedMatchesDetail);
    }
    goBackToMacthes =()=>{
        this.setState({
            SelectedMatchesDetail:{
                isSuccess: false,
                message: 'Loading'
            }
        })
        document.getElementById('AllMatchView').style.display = 'block';
        document.getElementById('EachMatchView').style.display = 'none';
    }
    
    render(){
        console.log(this.props.AllMatch);        
        return(
            <>
                <div id="AllMatchView">
                    { !this.props.AllMatch.isSuccess && <div className="Box Loading">Loading</div> }
                    { this.props.AllMatch.isSuccess && 
                        <div className="Box">
                            {
                                this.props.AllMatch.data.map((e,i)=>{
                                    if(e.status == 'COMPLETED'){
                                        return (
                                            <div key={e.id} className='EachBox'>
                                                <div className="MainHeading" onClick={()=>{this.SelectedMatch(e)}}>
                                                    {e.series.name}
                                                </div>
                                                <div className="TeamName">
                                                {e.awayTeam.shortName+' Vs '+e.homeTeam.shortName}
                                                </div>
                                                {' Status: '+e.currentMatchState}
                                            </div>
                                        )
                                    }
                                }) 
                                
                            }
                        </div> 
                    }
                </div>
                <div id="EachMatchView">
                    <div className="btn back-btn" onClick={this.goBackToMacthes}>Back</div>
                    { !this.state.SelectedMatchesDetail.isSuccess && 
                        <div className="Box Loading">{this.state.SelectedMatchesDetail.message}</div>
                    }
                    { this.state.SelectedMatchesDetail.isSuccess && 
                        <div className="Box">
                            {   

                                <div className="scoreBoard">
                                    <div className="statusOfMatch">{this.state.SelectedMatchStatus}</div>
                                    <FullScoreBoard Match = {this.state.SelectedMatchesDetail}/>                                
                                </div>
                            }
                        </div>
                    }
                </div>
            </>
        )
    }
}
export default OldMatches;