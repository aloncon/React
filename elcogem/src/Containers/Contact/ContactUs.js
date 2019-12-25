import React, {Component} from 'react';
import axios from 'axios';
import qs from "qs";
import Loading from '../../UI/Loading';
import Input from '../../UI/Input/Input';
import ContactInfo from './ContactInfo';
import styles from './ContactUs.module.css';


class ContactUs extends Component  {
  
    state = {
        contactData: {
            name: {
                placeHolder: 'Your Name',
                value: '',
                type: 'text',
                isValid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 30,
                }
            },
            email: {
                placeHolder: 'Email Adress',
                value: '',
                type: 'text',
                isValid: false,
                touched: false,
                validation: {
                    required: true,
                    isEmail: true
                }
            },
            company: {
                placeHolder: 'Company Name',
                value: '',
                type: 'text',
                touched: false,
                isValid: false,
                validation: {
                    required: false
                }
            },
            phone: {
                placeHolder: 'Phone Number',
                value: '',
                type: 'text',
                isValid: false,
                touched: false,
                validation: {
                    required: false,
                }
            },
            comments: {
                placeHolder: 'How Can ElcoGem Help?',
                value: '',
                type: 'textarea',
                isValid: false,
                touched: false,
                validation: {
                    required: false,
                }
            }
        },
        loading: false,
        serverMessage: '',
        formValid: false
    }
    
    formSubmitHandler = (event) => {
        event.preventDefault();
        this.setState( { loading: true } );
        console.log("[CU ] SUBMIT " )
        const formData = {
            'from_name': this.state.contactData.name.value,
            'email': this.state.contactData.email.value,
            'company': this.state.contactData.company.value,
         };
        console.log("[CU ] JSON.stringify(formData)", formData );
        const baseUrl = (window.location.href.indexOf('localhost')>-1) ? 'http://localhost/' : 'http://www.elcogem.com/new/';  
        //axios.post('http://www.elcogem.com/new/test3.php', formData)
        axios.post(baseUrl+'test3.php', qs.stringify(formData))
        .then((Response)=>{
            this.setState({loading:false,
                           serverMessage: 'Your Email Submitted Successfuly!'});
            console.log("Submitted Successfuly", Response.data);
             
        })


    }

    checkValidity = (ElelmentValidation, value) => {
        if(!ElelmentValidation.required){
            return true;
        }else{
            console.log("[Contact ] Check valiidt", ElelmentValidation.required);
            let isElementValid = true;
            for(let validationKey in ElelmentValidation){
                switch(validationKey){
                    case 'minLength':
                        isElementValid = isElementValid && (value.length >= ElelmentValidation['minLength']);
                        break;
                    case 'maxLength':
                        isElementValid = isElementValid && (value.length <= ElelmentValidation['maxLength']);
                        break;
                    case 'isEmail':
                            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                            isElementValid = pattern.test(value) && isElementValid;                            
                        break;        
                    }
            }
            return isElementValid;
        }
    }

    isFormValid = (contactDataReplica) => {
        let formIsValid = true;
        console.log("isFromValid", contactDataReplica);
        for(let feild in contactDataReplica){
            console.log("isFromValid contactDataReplica[feild].validation.required", contactDataReplica[feild].validation.required);
           if(contactDataReplica[feild] && contactDataReplica[feild].validation.required) 
                formIsValid = formIsValid && contactDataReplica[feild].isValid; 
        }
        return !formIsValid;
    }

    resetForm = (event) => {
        event.preventDefault();
        const contactDataReplica = {
            ...this.state.contactData
        }
        for(let feild in contactDataReplica){
            let feildObj = {
                ...contactDataReplica[feild]
            }
            feildObj.value = '';
            feildObj.isValid = false;
            feildObj.touched = false;
            contactDataReplica[feild] = feildObj;
            console.log("xxxxxxxxxxxxxxxx feildObj:",feildObj); 
        }
        
        this.setState({
            contactData: contactDataReplica
        })
        console.log("xxxxxxxxxxxxxxxx contactDataReplica:",contactDataReplica);
        console.log("xxxxxxxxxxxxxxxx contactdata:",this.state.contactData);

    }

    onEmailChangeHandler = (event, inputIdentifier) => {
        const contactData = {
            ...this.state.contactData
        }
        const contactDataInputElelment = {
            ...contactData[inputIdentifier]
        }
        
        const isValid = this.checkValidity(contactDataInputElelment.validation, event.target.value);
        console.log('[contact ] is valid:', isValid);
        contactDataInputElelment.value = event.target.value;
        if(event.target.value.length > 0)
        contactDataInputElelment.touched = true;
        
        contactDataInputElelment.isValid = isValid;
        contactData[inputIdentifier] = contactDataInputElelment;
        
        const formValid = this.isFormValid(contactData);
        this.setState({
            contactData: contactData,
            formValid: formValid 

        })
        
    }

    render(){ 
        console.log('window.location.href', window.location.href.indexOf('localhost')>-1)
    const loading = this.state.loading ? <Loading /> : null;
    const inputElementArr = [];

    for( let key in this.state.contactData){
        inputElementArr.push({
            config: this.state.contactData[key],
            id: key            
        })
    }    
   

    const inputElelments = inputElementArr.map(element => {
    const requiredStyle = element.config.validation.required ? styles.Required : null;    
    const labelClassList = [styles.Label];
    if(!element.config.isValid && element.config.touched){
        labelClassList.push(styles.Invalid);
    }
    
        return (        
            <div className={styles.Input} key={element.id}>
             <Input iType={element.config.type} 
                    iValue={element.config.value} 
                    iOnChange={(event) => this.onEmailChangeHandler(event,element.id)}
                    isValid={element.config.isValid}
                    isTouched={element.config.touched}
                    required/>
            <label className={labelClassList.join(' ')}>
                <span className={styles.LabelName}>{element.config.placeHolder}<span className={requiredStyle}></span></span>
            </label>       
            </div>)
    }    
        
    )
    
    return (
        <div>
            <ContactInfo />
            
            <div className={styles.ResMessage}>{loading}{this.state.serverMessage}</div>
            
                <form className={styles.Form}>
                  <div className={styles.Content}>
                    {inputElelments}
                  </div>                      
                    <div style={{marginTop: '20px', width: '100%', textAlign:'left'}}>
                        <button className={styles.Button} 
                                disabled={this.state.formValid}
                                onClick={this.formSubmitHandler}> Submit Email </button>
                        <button className={styles.Button} onClick={this.resetForm}> Reset </button>
                    </div>
                </form>
            </div>
        
    )
  }
}

export default ContactUs;


