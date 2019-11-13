import React, {Component} from 'react'
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/actions/actions';
import tradeShowList from '../../ModuleInfo/trade_shows';
import Loading from '../../UI/Loading';
import Show from './Show/Show';
import Modal from '../../UI/Modal/Modal';
import styles from './TradeShows.module.css';

class TradeShows extends Component {
    state = {
        showModal: false,
        ModalKey:null
    }
    componentDidMount () {
        console.log("[TRADE SHOWS]: did mount - trade Objext before" , this.props.tradeShowList);
        this.props.dispatch(actionTypes.loadTradeShows());
        console.log("[TRADE SHOWS]: did mount - trade Objext after" , this.props.tradeShowList);
    }

    OpenModalHendler = (key) => {
        console.log('XXX OpenModalHendler clicked: Key ' + key);
        this.setState({
            showModal:true,
            ModalKey: key
        });
    }
    closeModalHandler (){
        console.log('XXX CloseModalHendler clicked');
        this.setState({
            showModal:false
        });

    }
        
    render() {
        console.log("[TRADE SHOWS]: RENDER STARTED " , this.props.tradeShowList);
        for(let key in this.props.tradeShowList){
            if(tradeShowList.hasOwnProperty(key)){
                console.log("trade list", this.props.tradeShowList[key]);
            }
        }

        const loading = this.props.loading ? <Loading /> : null;
        const errorDisplay = this.props.errorMessage ? <div>ERROR</div> : null;

        const tradeItems = Object.keys(this.props.tradeShowList)
            .map((tradeKey)=>{
                return (
    
                     <Show key={tradeKey} data={tradeShowList[tradeKey]} 
                            OpenModal={()=>(this.OpenModalHendler(tradeKey))} />
                );
            });

        const dataModal = this.props.tradeShowList[this.state.ModalKey]; 
        const modalContent = dataModal ? (
            <div className={styles.contentHeader}>
                <div className={styles.h2}>{dataModal.mainImageTitle}</div>
                <div className={styles.h3}>{dataModal.titleMain}</div>
                <div className={styles.h4}>{dataModal.titleSub}</div>
                <div className={styles.h4}>{dataModal.Boot}</div>
                <div className={styles.h4}>{dataModal.coments}</div>
            </div>
        ) : <div></div>;
        const modalImage = (dataModal && dataModal.mainImage) ? (
            <div className={styles.image}>
                <img src={dataModal.mainImage} />
            </div>) : <div></div>; 

        return (
            <div>
                <Modal 
                    showModal={this.state.showModal} 
                    closeModal={()=>(this.closeModalHandler())}>
                            {modalContent}
                            {modalImage}        
                </Modal>                        
                
                <h2>ElcoGem Co. exhibits at industry trade shows</h2>
                <div>
                        {errorDisplay}
                        {loading}
                </div>
                <div>
                    {tradeItems}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tradeShowList : state.trade.tradeShowList,
        loading : state.trade.onLoad,
        error: state.trade.errorMessage   
    };
}

export default connect(mapStateToProps)(TradeShows);
