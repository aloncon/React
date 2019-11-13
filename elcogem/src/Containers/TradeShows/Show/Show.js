import React from 'react'

 const Show = (props) => {
    return (
        <div key={props.tradeKey} onClick={()=>(props.OpenModal())} 
            style={{backgroundColor:'#151e35',color:'white', width:'90%',padding:'14px', margin:'20px', boxShadow:'6px 3px 4px 6px rgb(204, 204, 204)', cursor:'pointer'}}>
           <div>{props.data.titleMain}</div>
           <div>{props.data.titleSub}</div>
           <div>{props.data.Boot}</div>
           <div>{props.data.coments}</div>
   </div>    
)
}

export default Show;
