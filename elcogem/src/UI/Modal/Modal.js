import React, {Component} from 'react';
import Aux from '../../hoc/Aux_';
import styles from './Modal.module.css';

class Modal extends Component {
    render(){
        let backdropStyle = styles.Backdrop;
        let modalStyles = styles.Modal;
        

        if (!this.props.showModal){
            backdropStyle = styles.ModalOff;
            modalStyles = styles.ModalOff;
            document.body.style.overflowY = 'auto';
        }else{
            document.body.style.overflowY = 'hidden';
        }

        return (
         <Aux>   
            <div className={backdropStyle} onClick={()=>(this.props.closeModal())}
                  />
            <div className={modalStyles} 
                 style={{
                     opacity: this.props.showModal ? '1':'0' }}>
                        <div className={styles.ButtonDiv}><button onClick={()=>(this.props.closeModal())}></button></div> 
                        <div className={styles.content}>
                            {this.props.children}
                        </div>                    
                {/* 
                <div className={styles.content}>
                    {modalContent}
                    {modalImage}
                </div>
                */}    
            </div>

            </Aux>);
    }
}

export default Modal;