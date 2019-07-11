import React from 'react';
import './LiveMatches.css';
import axios from 'axios';

class LiveMatches extends React.Component{
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
        }
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
                }
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
        document.getElementById('AllMatchView').style.display = 'block';
        document.getElementById('EachMatchView').style.display = 'none';
    }
    
    render(){
        let LiveMatchesExist = false;
        if(this.props.AllMatch.isSuccess){
            this.props.AllMatch.data.map((e,i) =>{
                if(e.status == 'LIVE'){
                    LiveMatchesExist = true;
                }
            });
        }
        return(
            <> 
                <div id="AllMatchView"> 
                    {this.props.AllMatch.isSuccess && !LiveMatchesExist && 
                        <div>
                            There is no Live Matches going
                        </div>
                    } 
                    {this.props.AllMatch.isSuccess && LiveMatchesExist &&
                        <div className="Box">
                            {this.props.AllMatch.data.map((e,i) =>{
                                if(e.status == 'LIVE'){
                                    return (
                                            <div key={e.id} className="EachBox" >
                                                <div className="MainHeading" onClick={()=>{this.SelectedMatch(e)}}>
                                                    {e.series.name}
                                                </div>
                                                <div className="TeamName">
                                                    {e.awayTeam.shortName+' Vs '+e.homeTeam.shortName}
                                                </div>
                                                {e.matchSummaryText}
                                            </div>
                                        )
                                }
                            })}
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
                                this.state.SelectedMatchesDetail.data.fullScorecardAwards.manOfTheMatchName
                                
                            }
                        </div>
                    }
                </div>
            </>
        )
    }
}
export default LiveMatches;