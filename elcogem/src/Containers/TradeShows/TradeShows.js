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
        ModalKey: null
    }
    componentDidMount () {
        this.props.dispatch(actionTypes.loadTradeShows());
    }

    OpenModalHendler = (key) => {
        
        this.setState({
            showModal:true,
            ModalKey: key
        });
    }
    closeModalHandler (){
        this.setState({
            showModal:false
        });

    }
        
    render() {
       /*
        for(let key in this.props.tradeShowList){
            if(tradeShowList.hasOwnProperty(key)){
                console.log("trade list", this.props.tradeShowList[key]);
            }
        }*/

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
                <div className={styles.h2}>{dataModal.modalTitle}</div>
                <div className={styles.h3}>{dataModal.titleMain}</div>
                <div className={styles.h4}>{dataModal.titleSub}</div>
                <div className={styles.h4}>{dataModal.Boot}</div>
                <div className={styles.h4}>{dataModal.coments}</div>
            </div>
        ) : <div></div>;
        const modalImage = (dataModal && dataModal.mainImage) ? (
            <div className={styles.imageDiv}>
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
