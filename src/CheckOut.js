import React, { Component } from "react";
import {CardElement, injectStripe, Elements, StripeProvider} from "react-stripe-elements";
import { Button, Container} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import Modal from 'react-modal';
let _csrfToken = null;

class CheckoutForm extends Component{

  constructor(props){
    super(props);
    this.ids = props.props.match.params.id.split('-')[0] + '/' + props.props.match.params.id.split('-')[1]
    this.url = 'https://'+this.ids
    this.submit = this.submit.bind(this);
  }

  componentWillMount(){
    async function getCsrfToken() {
      if (_csrfToken === null) {
        axios.get('http://localhost:8000/api/csrf').then(response => response.data)
        .then((data) => {
            _csrfToken = data.csrfToken
         })
         .catch((err)=>{
           
        })
      }
    }

    getCsrfToken()
  }

  

  async submit (ev) {
    let {token} = await this.props.stripe.createToken()
    fetch('https://'+this.ids, {
        method: 'POST',
        mode: "no-cors",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:JSON.stringify({
            striptoken: token
        })
    }).then((response) => {return response.text()})
    .then((responseJson) => {
      console.log(responseJson)
      window.location.href = "http://localhost:3000";
      
    })
    .catch((error) => {
    });
  }



  render() {
    return(
      <div style={{backgroundColor:'#edece8', width:500, margin:20, padding:20, color:'white', height:130, justifyContent:'center', alignItems:'center'}}>
        <CardElement>
        </CardElement>
        <Button onClick={this.submit} style={{marginTop:'20px', backgroundColor:'red', border:'none', color:'white', width:455, height:40}}>PAY</Button>
      </div>

    );
  }
}

const InjectedForm = injectStripe(CheckoutForm);

const WrappedForm = (props) => (
  <Container style={{display:'flex', justifyContent:'center', alignItems:'center', height: 500}}>
    <StripeProvider apiKey="pk_test_51JItKjSEAKARE39gAYcrcKe4qAwWqxKeM4eHyNKveoe01ZEoLydDHIC5JbvDM9TM28KZOjAOEckMXJ9P7Oe4gl3a00xs5QSbvZ">
      <div >
        <h4>Would you like to complete you payment</h4>
        <Elements>
          <InjectedForm props={props} />
        </Elements>
      </div>
    </StripeProvider>
  </Container>
);

export default WrappedForm;