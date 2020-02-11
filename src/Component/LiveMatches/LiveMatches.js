import React from 'react';
import './LiveMatches.css';
import axios from 'axios';
import loadingLogo from '../../img/loading.gif';
import FullScoreBoard from '../Common/FullScoreBoard';

class LiveMatches extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            SelectedMatchesDetail : {
                data: {}
                ,isSuccess: false
                ,message: 'Loading'
                ,matchStatusThing: ""
            }
            ,SelectedMatchId: ''
            ,SelectedSeriesId: ''
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
                    isSuccess: true,
                    matchStatusThing: match.matchSummaryText
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

        console.log(this.props.AllMatch)
        let LiveMatchesExist = false;
        if(this.props.AllMatch.isSuccess){
            this.props.AllMatch.data.map((e,i) =>{
                if(e.status == 'LIVE' || e.status == 'INPROGRESS'){
                    LiveMatchesExist = true;
                }
            });
        }
        return(
            <> 
                <div id="AllMatchView">                    
                    { !this.props.AllMatch.isSuccess && 
                        <div className="Box Loading">
                            { !this.props.AllMatch.isSuccess && this.props.AllMatch.faliureMessage != 'Loading' && 
                                <>{this.props.AllMatch.faliureMessage}</>
                            }
                            <img src={loadingLogo} alt="loading logo"/>
                        </div>
                    } 
                    {this.props.AllMatch.isSuccess && !LiveMatchesExist && 
                        <div className="Box Loading">
                            There is no Live Matches going
                        </div>
                    }
                    {this.props.AllMatch.isSuccess && LiveMatchesExist &&
                        <div className="Box">
                            {this.props.AllMatch.data.map((e,i) =>{
                                if(e.status == 'LIVE' || e.status == 'INPROGRESS'){
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
                        <div className="Box Loading">
                            { !this.state.SelectedMatchesDetail.isSuccess && this.state.SelectedMatchesDetail.message != 'Loading' &&
                                <>{this.state.SelectedMatchesDetail.message}</>
                            }
                            <img src={loadingLogo} alt="loading logo"/>
                        </div>
                    }
                    { this.state.SelectedMatchesDetail.isSuccess && 
                        <div className="Box">
                            {   

                                <div className="scoreBoard">
                                    <div className="statusOfMatch">{this.state.matchStatusThing}</div>
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
export default LiveMatches;
