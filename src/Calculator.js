import React from 'react';
import './App.css';

class Calculator extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            currentBalance: 0.00,
            targetBalance: 0.00,
            balanceDeficit: 0.00,
            requiredPayment: 0.00,
            govtTopup: 0.00,
            testOutput: " ",
            govtStatus: " "
        }
        this.onBalanceChange.bind(this);
        this.onTargetChange.bind(this);
    }
    
    onBalanceChange = (e) => {
        if(e.target.value === ""){
            this.modifyState({
                currentBalance: 0
        })}else{
        
        this.modifyState({
            currentBalance: parseFloat(e.target.value),
        });
    }  
    }

    onTargetChange = (e) => {
        if(e.target.value === ""){
            this.modifyState({
                targetBalance: 0
        })}else{
        
        this.modifyState({
            targetBalance: parseFloat(e.target.value),
        });
    }
    }    

    modifyState(stateChange) {
        // Merge the current state with the requested change
        const state = {
            ...this.state,
            ...stateChange
        };

        state.balanceDeficit = state.targetBalance - state.currentBalance;
        if(state.balanceDeficit <= 0){
            state.requiredPayment = 0.00;
            console.log("No deficit");
        }else{
            state.requiredPayment = (state.balanceDeficit / 1.25).toFixed(2);
            console.log("Payment Required: " + state.requiredPayment);
        }
        
        state.govtTopup = (state.requiredPayment * 0.25).toFixed(2);
        console.log("Government Topup: " + state.govtTopup);

        if(state.govtTopup > 500) {
            state.requiredPayment = ((parseFloat(state.requiredPayment)) + (parseFloat(state.govtTopup) -500)).toFixed(2);
            state.govtTopup = (500).toFixed(2);
        }

        this.setState(state);
    }
    
    render() {
        return <>
            <h2>UK Tax Free Childcare Payment Calculator</h2>
    <h4>This calculator works out how much to deposit into your childcare account to reach a specified balance.</h4>
    <br/>
    <label>Enter your <strong>Current</strong> Account Balance here:</label>
    <br/>
    <label>£</label><input onChange={this.onBalanceChange} required placeholder="0.00" id="currentBal" type="number" min="0" max="5000" step=".01"></input>
    <br/>
    <br/>
    <label>Enter your <strong>Target</strong> Account Balance here:</label>
    <br/>
    <label>£</label><input onChange={this.onTargetChange}required placeholder="0.00" id="targetBal" type="number" min="0" max="5000" step=".01"></input>
    <br/><br/>
    <h4>Required Payment: £{this.state.requiredPayment}</h4>
    <h5>Govt Contribution: £{this.state.govtTopup}</h5>
    {/*state debugging*/}
    {/*<h4>Test Output: {this.state.testOutput}</h4>
    <h5>Status Output: {this.state.status} Current Balance: {this.state.currentBalance} Target Balance: {this.state.targetBalance} Deficit: {this.state.balanceDeficit}</h5>*/}
    
    <h6>Note: This calculator assumes you have not used <em>any</em> of your Govt Topup Allowance in this calculation.<br/>
        Best use for this app is for preparing payments for the following quarter.<br/>
    Maximum Government Topup in a quarter is £500.00 per child.</h6>
        </>
    }
}

export default Calculator;