import React from 'react'

const playBoardMatrix = (props) => {
    const arrayOfChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const tableContent = [];
    
    //ClickHandler(event,arrayOfChars[j]+(i)+(j));

    for(let i=0; i < props.board.length; i++){
        const ths = [];
        const tds = [];
        for(let j=0; j<props.board[i].length;j++){
            
            if(i === 0 && j===0){
                ths.push(<div className={props.styles.DivFirstCol} key={'colFirstConrner'+(i)} id={'colFirstConrner'+(i)}></div>)         
            }
            if(j ===0){  
                tds.push(<div className={props.styles.DivFirstCol} key={'colFirst'+(i)} id={'colFirst'+(i)}>{i+1}</div>);  
            }
            if(i === 0){
                ths.push(<div className={props.styles.DivTH} key={arrayOfChars[j]+(j)} id={arrayOfChars[j]+(j)}>{arrayOfChars[j]}</div>);
            }
            {
                let feildStyle = [props.styles.DivTD];
                if(props.board[i][j].value !== 0)
                 feildStyle.push(props.styles.shipFeild);
                if(!props.board[i][j].vertical)
                 feildStyle.push(props.styles.Rotate);
                 if(!props.board[i][j].vertical){
                 feildStyle.push(props.styles.Rotate);
                 feildStyle.push(props.styles['Rotate'+props.board[i][j].size]);
                 }

                const elementStyle = {width: 27*props.board[i][j].size+'px'};  //props.board[i][j].size+'px'};
                const imageShipType = './Assets/'+ props.fleetTypes[ props.board[i][j].size ]+'.svg';
                const feildContent = []; 
                      feildContent.push( props.board[i][j].size ? <img alt="ship" key={'image'+i+j} style={elementStyle} src={imageShipType}/> : null);
                if( props.board[i][j].value==2)        
                      feildContent.push(<div><img alt="Hit" key={'hit'+i+j} style={{position:'relative', width: '13px'}} src="./Assets/Hit.svg"/></div>);
                if(props.board[i][j].value==1)
                      feildContent.push(<div><img alt="Miss" key={'miss'+i+j} style={{position:'relative', width: '13px'}} src="./Assets/Miss.svg"/></div>);
                      

                tds.push((<div className={feildStyle.join(' ')} 
                               key={arrayOfChars[j]+(i)+(j)} 
                               id={arrayOfChars[j]+(i)+(j)}
                               //{ ...(props.onFeildClick ? {onClick: (event)=>props.onFeildClick(event, arrayOfChars[j]+(i)+(j), i, j)} : {})}
                               { ...(props.onFeildClick ? {onClick: (event)=>props.onFeildClick(i, j, props.board)} : {})}
                               //onClick={()=>props.onFeildClick(i,j,props.board)}
                               >{   feildContent
                                   //props.board[i][j].value
                                }
                               </div>))
            }
        }    
        if(i === 0)
          tableContent.push(<div className={props.styles.RowH} key={'rowH'+(i)} id={'rowH'+(i)}>{ths}</div>);
        //else
        tableContent.push(<div className={props.styles.Row} key={'row'+(i)} id={'row'+(i)}>{tds}</div>);

    }
    
        
    return (
        <div>
         {tableContent}    
        </div>
    )
}

export default playBoardMatrix;
