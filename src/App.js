import React from 'react';
import Header from './Component/Header/Header';
import LiveMatches from './Component/LiveMatches/LiveMatches';
import UpcomingMatches from './Component/UpcomingMatches/UpcomingMatches';
import OldMatches from './Component/OldMatches/OldMatches';
import Matches from './Component/Matches/Matches';
import NotFound from './Component/NotFound';
import loadingLogo from './img/loading.gif';
import {BrowserRouter,Switch, Route,Link, withRouter} from 'react-router-dom';
import './App.css';
import $ from 'jquery'
import axios from 'axios';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			apiCall : {
				isSuccess: false,
				data: [],
				faliureMessage: ''
			}
		}
	}
	componentDidMount =() =>{
		var self = this;
        $.ajax({
          url : "https://6cym66wz30.execute-api.ap-southeast-1.amazonaws.com/dev/search",
          type : 'post',
          dataType : 'json',
          crossDomain: true,
          "headers": {
            "content-type": "application/json",
            "x-api-key": "a1HNwmvKMsX9E5YF1uzv8tQFV2QYBjX61GatKNDf"
          },
          "data": JSON.stringify({"keyword"  :"sbi"})
        }).done(function(data) {
          console.log(JSON.parse(data));
        }).fail(function(data) {
          console.log(data);
        }).always(function(data) {
          console.log(data);
        });
        axios({
            url: "https://dev132-cricket-live-scores-v1.p.rapidapi.com/matches.php?completedlimit=10&inprogresslimit=10&upcomingLimit=10",
            method: 'get',
            headers: {
                "X-RapidAPI-Host" : "dev132-cricket-live-scores-v1.p.rapidapi.com"
                ,"X-RapidAPI-Key" : "6e9b6a0a65msh6bd761160573386p1ba0d1jsn67e1f7c9715e"
            }
        }).then(function (response) {
            self.setState({
                apiCall : {
                	isSuccess: true,
                	data : response.data.matchList.matches,
                	faliureMessage: 'Loading'
                }
            })
            console.log(self.state.apiCall);
        }).catch(function(response){
        	self.setState({
                apiCall : {
                	isSuccess: false,
                	data : '',
                	faliureMessage: 'There Some Connectivity Problem Please check your internet connection'
                }
            })
        	console.log(response.data);
        })
    }
	render(){
		function yourHandler(){
			console.log(window.location.href);
		}
  		return (
    		<BrowserRouter >
      			<div className="App">
        			<Header />
                    <div className="page-start">
			
              <Switch>
						{ !this.state.apiCall.isSuccess && <Route path='/' exact render = {()=> <div>
							{ !this.state.apiCall.isSuccess && 
								<div className="Box Loading">
									{ !this.state.apiCall.isSuccess && this.state.apiCall.faliureMessage != 'Loading' && 
										<>{this.state.apiCall.faliureMessage}</>
									}
									<img src={loadingLogo} alt="loading logo"/>
								</div>
							}
							</div>} />
						}
            			{ this.state.apiCall.isSuccess && 
                            <Route path='/' exact render = {() => <Matches AllMatch = {this.state.apiCall} /> }/>
                        }
            			<Route path='/live' exact render = {() => <LiveMatches AllMatch = {this.state.apiCall} />}/>
            			<Route path='/Upcoming' exact render ={()=> <UpcomingMatches AllMatch = {this.state.apiCall} />} />
                        <Route path='/old' exact render = {()=> <OldMatches AllMatch = {this.state.apiCall} />} />
                        <Route path='/about' exact render = {()=> 'Under development....    by Satish'} />
			<Route component={NotFound} />
				
              </Switch>
                    </div>
      			</div>
    		</BrowserRouter>
  		);
  	}
}

export default App;
