// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
const apiKey = '792fe8755d65ba72dd6ed16a79e335d08b1d5e8069618956a0dd56331c66f6e6';

type State = {
	isLoggedInUser: boolean,
	etherpadUrl: string,
};

class EtherpadPage extends React.Component {
	render() {
		return (
			<div>
				{"EtherpadPage"}
			</div>);
	}
}

class MainPage extends React.Component {
	etherpad: *;
    constructor() {
        super();
        this.modifyText = this.modifyText.bind(this);
        this.startSecretSharing = this.startSecretSharing.bind(this);
    }

    modifyText(data: string, secretKey: string) {
    	// remove the last \n from the string
    	const secretKeyInt = parseInt(secretKey); 
    	const dataSplit = data.substr(0, data.length-1);
    	const dataArray = dataSplit.split(" ");
    	const dataInInteger = dataArray.map(data => parseInt(data));
    	const dataModify = dataArray.map(data => data^secretKey);
    	let finalString = '';
    	dataModify.forEach((data, index) => {
    		if (index != dataArray.length-1) {
    			finalString = finalString + data.toString() + " ";
    		} else {
    			finalString = finalString + data.toString() + "\n";
    		}
    	});
    	console.log(finalString);
    	const url = "http://localhost:9001/api/1.2.12/setText?apikey="+apiKey+"&padID=temp"+"&text="+finalString;
    	axios.get(url)
    		.then(res => {
    			console.log(res);
    		})
    		.catch(e => {
    			console.log(e);
    		})
    }

    startSecretSharing() {
    	const secretKey = document.getElementById("SecretKey").value;
    	console.log(secretKey);
    	const url = "http://localhost:9001/api/1.2.12/getText?apikey="+apiKey+"&padID=temp";
    	axios.get(url)
    		.then(res => {
    			console.log(res.data);
    			this.modifyText(res.data.data.text, secretKey);
    		})
    		.catch(e => {
    			console.log('error', e);
    		})
    }

    render() {
    	console.log("over herer");
    	const windowHeight = 600;
    	const windowLength = 400;
   		return (
    		<div>
    			{"SecretKey   "}<input type="text" id="SecretKey"></input>
    			<br></br>
				<button type="button" onClick={this.startSecretSharing}>Start SecretSharing</button>
				<br></br>
				<iframe name="embed_readwrite" src="http://localhost:9001/p/temp?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false" width={windowHeight} height={windowLength}>
				</iframe>
    		</div>);
    }
}

ReactDOM.render(
    <MainPage />,
    document.getElementById('root')
);