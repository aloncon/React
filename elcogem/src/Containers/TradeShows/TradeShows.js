import React from 'react'
import tradeShowList from '../../ModuleInfo/trade_shows';
const TradeShows = (props) => {
    console.log("trade Objext " , tradeShowList);

    for(let key in tradeShowList){
        if(tradeShowList.hasOwnProperty(key)){
            console.log("trade list",tradeShowList[key]);
        }
    }

    const tradeItems = Object.keys(tradeShowList)
        .map((tradeKey)=>{
            return (
            <div key={tradeKey} style={{backgroundColor:'#c1c1c1',color:'white', width:'70%',padding:'10px', margin:'10px'}}>
                <div>{tradeShowList[tradeKey].titleMain}</div>
                <div>{tradeShowList[tradeKey].titleSub}</div>
                <div>{tradeShowList[tradeKey].Boot}</div>
                <div>{tradeShowList[tradeKey].coments}</div>

            </div>);
        });


    return (
        <div>
            TradeShows ....
            <div>
                {tradeItems}
            </div>
        </div>
    )
}

export default TradeShows;
