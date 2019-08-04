import React from 'react';
import './LiveMatches.css';
import axios from 'axios';
import FullScoreBoard from '../Common/FullScoreBoard';

class LiveMatches extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            SelectedMatchesDetail : {
                data: {}
                ,isSuccess: false
                ,message: 'Loading'
            },
            SelectedMatchesDetailLive : {
                data: {}
                ,isSuccess: false
                ,message: 'Loading'
            },
            SelectedMatchesDetailComment : {
                data: {}
                ,isSuccess: false
                ,message: 'Loading'
            }
            ,SelectedMatchId: ''
            ,SelectedSeriesId: ''
        }
    }
    componentDidMount = () =>{
        if(localStorage.getItem("selectedMatchFromHome") != null){
            var result = JSON.parse(localStorage.selectedMatchFromHome)
            this.SelectedMatch(result.series.id,result.id);
            localStorage.removeItem('selectedMatchFromHome');
        }
        document.querySelectorAll("#menu_items")[0].childNodes.forEach((e,i)=>{
            e.classList.remove( "active" );
            if(e.id.toLowerCase() == window.location.pathname.split("/").pop().toLocaleLowerCase()){
                console.log(e);
                e.classList.add( "active" );
            }
        })
        var self = this;
        setInterval(function(){ 
            if(self.state.SelectedMatchId != ''){
                self.SelectedMatch(self.state.SelectedSeriesId,self.state.SelectedMatchId)
            } 
        }, 350000);
    }
    SelectedMatch = (seriesId,matchId) =>{
        this.setState({
            SelectedMatchId:matchId
            ,SelectedSeriesId:seriesId
        })
        var self = this;
        axios({
            url: 'https://dev132-cricket-live-scores-v1.p.rapidapi.com/matchdetail.php?seriesid='+seriesId+'&matchid='+matchId,
            method: 'get',
            headers: {
                "X-RapidAPI-Host" : "dev132-cricket-live-scores-v1.p.rapidapi.com"
                ,"X-RapidAPI-Key" : "6e9b6a0a65msh6bd761160573386p1ba0d1jsn67e1f7c9715e"
            }
        }).then(function (response) {
            console.log(response.data);
            self.setState({
                SelectedMatchesDetailLive :{
                    data:response.data,
                    isSuccess: true 
                }
            })
        }).catch(function(response){
            self.setState({
                SelectedMatchesDetailLive :{
                    message:'There Some Connectivity Problem Please check your internet connection',
                    isSuccess: false 
                }
            })
        })
        axios({
            url: 'https://dev132-cricket-live-scores-v1.p.rapidapi.com/scorecards.php?seriesid='+seriesId+'&matchid='+matchId,
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
        axios({
            url: 'https://dev132-cricket-live-scores-v1.p.rapidapi.com/comments.php?seriesid='+seriesId+'&matchid='+matchId,
            method: 'get',
            headers: {
                "X-RapidAPI-Host" : "dev132-cricket-live-scores-v1.p.rapidapi.com"
                ,"X-RapidAPI-Key" : "6e9b6a0a65msh6bd761160573386p1ba0d1jsn67e1f7c9715e"
            }
        }).then(function (response) {
            console.log(response.data);
            self.setState({
                SelectedMatchesDetailComment :{
                    data:response.data,
                    isSuccess: true 
                }
            })
        }).catch(function(response){
            self.setState({
                SelectedMatchesDetailComment :{
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
                    {this.props.AllMatch.isSuccess && !LiveMatchesExist && 
                        <div>
                            There is no Live Matches going
                        </div>
                    } 
                    {this.props.AllMatch.isSuccess && LiveMatchesExist &&
                        <div className="Box">
                            {this.props.AllMatch.data.map((e,i) =>{
                                if(e.status == 'LIVE' || e.status == 'INPROGRESS'){
                                    return (
                                            <div key={e.id} className="EachBox" >
                                                <div className="MainHeading" onClick={()=>{this.SelectedMatch(e.series.id,e.id)}}>
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
export default LiveMatches;