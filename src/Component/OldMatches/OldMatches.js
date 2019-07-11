import React from 'react';
import '../LiveMatches/LiveMatches.css';
import axios from 'axios';

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
                                {   this.state.SelectedMatchesDetail.data.fullScorecard != undefined &&
                                    this.state.SelectedMatchesDetail.data.fullScorecard.innings.map((eachInnings,index)=>{
                                        return(
                                            <div className="teamBox" key={index}>
                                                <div className="matchTitle">
                                                    <div style={{float:'left'}}>{eachInnings.team.shortName}</div>
                                                    <div style={{float:'right'}}>{eachInnings.run}-{eachInnings.wicket} ({eachInnings.over})</div>
                                                    <div style={{clear:'both'}}></div>
                                                </div>
                                                <div className="batsman">
                                                    <table>
                                                    <tbody>
                                                        <tr>
                                                            <th>Batsman</th>
                                                            <th></th>
                                                            <th>Runs</th>
                                                            <th>Balls</th>
                                                            <th>4s</th>
                                                            <th>6s</th>
                                                            <th>SR</th>
                                                            <th>FOW</th>
                                                        </tr>
                                                        {
                                                            eachInnings.batsmen.map((e,i)=>{
                                                                if(e.balls > 0){
                                                                    return (
                                                                        <tr key={e.id}>
                                                                            <td>{e.name}</td>
                                                                            <td style={{fontSize:'12px'}}>{e.howOut}</td>  
                                                                            <td>{e.runs}</td>
                                                                            <td>{e.balls}</td>
                                                                            <td>{e.fours}</td>
                                                                            <td>{e.sixes}</td>
                                                                            <td>{e.strikeRate}</td>
                                                                            <td>{e.fallOfWicket}</td>
                                                                        </tr>
                                                                    )
                                                                }
                                                            })                                                
                                                        }
                                                    </tbody>
                                                    </table>
                                                </div>
                                                
                                                <div className="bowler">
                                                    <table>
                                                    <tbody>
                                                        <tr>
                                                            <th>Bowler</th>
                                                            <th>O</th>
                                                            <th>R</th>
                                                            <th>W</th>
                                                            <th>M</th>
                                                            <th>WD</th>
                                                            <th>NB</th>
                                                            <th>E</th>
                                                        </tr>
                                                        {
                                                            eachInnings.bowlers.map((e,i)=>{
                                                                return (
                                                                    <tr key={e.id} id={e.id}>
                                                                        <td>{e.name}</td>
                                                                        <td>{e.overs}</td>  
                                                                        <td>{e.runsConceded}</td>
                                                                        <td>{e.wickets}</td>
                                                                        <td>{e.maidens}</td>
                                                                        <td>{e.wides}</td>
                                                                        <td>{e.noBalls}</td>
                                                                        <td>{e.economy}</td>  
                                                                    </tr>
                                                                )
                                                            })                                                
                                                        }
                                                    </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
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