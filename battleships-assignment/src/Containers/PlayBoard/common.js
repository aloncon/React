import React from 'react';

export const buildBoardContent = (board, styles, ClickHandler)=>{
    const arrayOfChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const tableContent = [];
    
    //ClickHandler(event,arrayOfChars[j]+(i)+(j));
    if(ClickHandler){
        console.log('buildBoardContent ClickHandler xxxxxxxxxxxxxxxxxx', ClickHandler);
        ClickHandler('sssssssssssssssss');
    }

    for(let i=0; i < board.length; i++){
        const ths = [];
        const tds = [];
        for(let j=0; j<board[i].length;j++){
            
            if(i === 0 && j===0){
                ths.push(<div className={styles.DivFirstCol} key={'colFirstConrner'+(i)} id={'colFirstConrner'+(i)}></div>)         
            }
            if(j ===0){  
                tds.push(<div className={styles.DivFirstCol} key={'colFirst'+(i)} id={'colFirst'+(i)}>{i+1}</div>);  
            }
            if(i === 0){
                ths.push(<div className={styles.DivTH} key={arrayOfChars[j]+(j)} id={arrayOfChars[j]+(j)}>{arrayOfChars[j]}</div>)
                //tds.push(<div className={styles.DivFirstCol} key={'colFirst'+(i)} id={'colFirst'+(i)}>{i}</div>);  

            }
            {
                let feildStyle = [styles.DivTD];
                if(board[i][j] !== 0)
                feildStyle.push(styles.shipFeild)
                tds.push((<div className={feildStyle.join(' ')} 
                               key={arrayOfChars[j]+(i)+(j)} 
                               id={arrayOfChars[j]+(i)+(j)}
                               >{board[i][j]}</div>))
            }
        }    
        if(i === 0)
          tableContent.push(<div className={styles.RowH} key={'rowH'+(i)} id={'rowH'+(i)}>{ths}</div>);
        //else
        tableContent.push(<div className={styles.Row} key={'row'+(i)} id={'row'+(i)}>{tds}</div>);

    }
    
    return tableContent;

}

