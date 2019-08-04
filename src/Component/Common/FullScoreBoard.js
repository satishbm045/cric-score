import React from 'react';

const FullScoreBoard = (props) =>{
	console.log(props);
    return(
        <>
            {   props.Match.data.fullScorecard != undefined &&
                props.Match.data.fullScorecard.innings.map((eachInnings,index)=>{
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
        </>
    )
}

export default FullScoreBoard;