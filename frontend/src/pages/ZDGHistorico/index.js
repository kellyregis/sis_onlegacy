import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const http = require('https');

const init = {
  host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
  path: '/syncMessage',
  method: 'POST',
  headers: {
    'content-type': 'application/json; charset=utf-8'
  }
};

const callback = function(response) {
  let result = Buffer.alloc(0);
  response.on('data', function(chunk) {
    result = Buffer.concat([result, chunk]);
  });
  
  response.on('end', function() {
    console.log(result.toString());
  });
};

async function ZDGSender(limit, iD) {
	const req = http.request(init, callback);
	const body = '{"limit":' + limit + ',"ticketwhatsappId":' + iD + '}';
	await req.write(body);
	req.end();
}

const init2 = {
	host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
	path: '/whatsappzdg'
  };
  
async function GETSender() {
	http.get(init2, function(res) {
		res.on("data", function(wppID) {
		  alert("ID instância ativa: " + wppID) ;
		});
	  }).on('error', function(e) {
		alert("Erro: " + e.message);
	  });
}

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(4)
	},

	paper: {
		padding: theme.spacing(2),
		display: "flex",
		alignItems: "center",
	},

	settingOption: {
		marginLeft: "auto",
	},
	margin: {
		margin: theme.spacing(1),
	},
}));

const ZDGHistorico = () => {
	const classes = useStyles();
	const [inputs, setInputs] = useState({});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	  }
	
	const handleSubmit = (event) => {
		event.preventDefault();
		alert('As mensagens estão sendo importadas! Aguarde...');
		ZDGSender(inputs.limite, inputs.id);
	}
	
	useEffect(() => {
		const socket = openSocket(process.env.REACT_APP_BACKEND_URL);
		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<div className={classes.root}>  
			<Container className={classes.container} maxWidth="sm">
			<form onSubmit={handleSubmit}>
				<label>Limite de Importação<br/>
				<input 
					type="text" 
					name="limite" 
					value={inputs.limite || ""} 
					onChange={handleChange}
					required="required"
				/>
				</label>
				<br/><br/>
				<label>ID de Disparo<br/>
				<input 
					type="text" 
					name="id" 
					value={inputs.id || ""} 
					onChange={handleChange}
					required="required"
				/>
				</label><br/><br/>	
				<input 
				style={{ color:"white", backgroundColor:"#2576d2", borderColor:"#2576d2", borderRadius: "4px", padding: "10px" }}
				type="button" 
				value="Mostrar ID Ativa"
				onClick={GETSender}
				/>
				<br/><br/>	
				<input 
				style={{ color:"white", backgroundColor:"	#f50057", borderColor:"#f50057", borderRadius: "4px", padding: "10px" }}
				type="submit" 
				value="Importar mensagens"
				/>
			</form>
			</Container>
		</div>
	);
};

export default ZDGHistorico;