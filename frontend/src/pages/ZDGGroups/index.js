import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Tabs from "../../components/Tabs";
import './index.css';

const http = require('https');

const init = {
  host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
  path: '/zdgGroups',
  method: 'POST',
  headers: {
    'content-type': 'application/json; charset=utf-8'
  }
};

const init2 = {
	host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
	path: '/zdgGroupsDescription',
	method: 'POST',
	headers: {
	  'content-type': 'application/json; charset=utf-8'
	}
  };

const init3 = {
	host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
	path: '/zdgGroupsCreate',
	method: 'POST',
	headers: {
	  'content-type': 'application/json; charset=utf-8'
	}
  };

const init4 = {
	host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
	path: '/zdgGroupsMessage',
	method: 'POST',
	headers: {
	  'content-type': 'application/json; charset=utf-8'
	}
  };

const init5 = {
	host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
	path: '/zdgOpenGroup',
	method: 'POST',
	headers: {
	  'content-type': 'application/json; charset=utf-8'
	}
  };

const init6 = {
	host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
	path: '/zdgCloseGroup',
	method: 'POST',
	headers: {
	  'content-type': 'application/json; charset=utf-8'
	}
  };

const init7 = {
	host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
	path: '/zdgNASA',
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

async function ZDGSetGroups (subject, iD) {
	const req = http.request(init, callback);
	const body = '{"subject":"'+ subject + '","ticketwhatsappId":' + iD + '}';
	await req.write(body);
	req.end();
}

async function ZDGSetGroupsDescription (description, iD) {
	const req = http.request(init2, callback);
	const body = '{"description":"'+ description + '","ticketwhatsappId":' + iD + '}';
	await req.write(body);
	req.end();
}

async function zdgGroupsCreate (title, contact, iD) {
	const req = http.request(init3, callback);
	const contactWPP = contact + "@c.us";
	const body = '{"title":"' + title + '","contact":"' + contactWPP + '","ticketwhatsappId":' + iD + '}';
	await req.write(body);
	req.end();
}

async function zdgSendGroupMessage (newMessageGroup, iD) {
	const req = http.request(init4, callback);
	const body = '{"newMessageGroup":"' + newMessageGroup.replace(/\n/g, "\\n") + '","ticketwhatsappId":' + iD + '}';
	await req.write(body);
	req.end();
}

async function zdgCloseGroup (iD) {
	const req = http.request(init6, callback);
	const body = '{"ticketwhatsappId":' + iD + '}';
	await req.write(body);
	req.end();
}

async function zdgOpenGroup (iD) {
	const req = http.request(init5, callback);
	const body = '{"ticketwhatsappId":' + iD + '}';
	await req.write(body);
	req.end();
}

async function zdgNASA (newMessAgeGroupNasa, iD) {
	const req = http.request(init7, callback);
	const body = '{"newMessAgeGroupNasa":"' + newMessAgeGroupNasa.replace(/\n/g, "\\n") + '","ticketwhatsappId":' + iD + '}';
	await req.write(body);
	req.end();
}

const initGet = {
	host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
	path: '/whatsappzdg'
  };
  
async function GETSender() {
	http.get(initGet, function(res) {
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


const ZDGGroups = () => {
	const classes = useStyles();
	const [inputs, setInputs] = useState({});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	}

	const resetInputField = () => {
		setInputs("");
		alert('Campos resetados.');
	  };
	
	const handleSubmit = (event) => {
		event.preventDefault();
		alert('Os dados estão sendo atualizados! Clique ok para continuar...');
		if (inputs.mensagemGrupoNASA === undefined && inputs.abrirGrupo === undefined && inputs.mensagemGrupo === undefined && inputs.titulo !== undefined && inputs.descricao === undefined && inputs.tituloNovo === undefined && inputs.contatoGrupo === undefined) {
			alert('Todos os títulos dos grupos que você é admin estão sendo atualizados! Aguarde...');
			setTimeout(function() {
				ZDGSetGroups(inputs.titulo, inputs.id);
				},5000 + Math.floor(Math.random() * 10000))
		}
		else if (inputs.mensagemGrupoNASA === undefined && inputs.abrirGrupo === undefined &&inputs.mensagemGrupo === undefined && inputs.titulo === undefined && inputs.descricao !== undefined && inputs.tituloNovo === undefined && inputs.contatoGrupo === undefined) {
			alert('Todos as descrições dos grupos que você é admin estão sendo atualizados! Aguarde...');
			setTimeout(function() {
				ZDGSetGroupsDescription(inputs.descricao, inputs.id);
				},5000 + Math.floor(Math.random() * 10000))
		}
		else if (inputs.mensagemGrupoNASA === undefined && inputs.abrirGrupo === undefined &&inputs.mensagemGrupo === undefined && inputs.titulo !== undefined && inputs.descricao !== undefined && inputs.tituloNovo === undefined && inputs.contatoGrupo === undefined) {
			alert('Todos as descrições e títulos dos grupos que você é admin estão sendo atualizados! Aguarde...');
			setTimeout(function() {
				ZDGSetGroupsDescription(inputs.descricao, inputs.id);
				},5000 + Math.floor(Math.random() * 10000))
			setTimeout(function() {
				ZDGSetGroups(inputs.titulo, inputs.id);
				},5000 + Math.floor(Math.random() * 10000))
		}
		else if (inputs.mensagemGrupoNASA === undefined && inputs.abrirGrupo === undefined &&inputs.mensagemGrupo === undefined && inputs.titulo === undefined && inputs.descricao === undefined && inputs.tituloNovo !== undefined && inputs.contatoGrupo !== undefined) {
			alert('Os grupos estão sendo criados! Aguarde...');
			setTimeout(function() {
				zdgGroupsCreate(inputs.tituloNovo, inputs.contatoGrupo, inputs.id);
				},5000 + Math.floor(Math.random() * 10000))
		}
		else if (inputs.mensagemGrupoNASA === undefined && inputs.abrirGrupo === undefined && inputs.fecharGrupo === undefined && inputs.mensagemGrupo !== undefined && inputs.titulo === undefined && inputs.descricao === undefined && inputs.tituloNovo === undefined && inputs.contatoGrupo === undefined) {
			alert('As mensagens estao sendo enviadas para os grupos! Aguarde...');
			setTimeout(function() {
				zdgSendGroupMessage(inputs.mensagemGrupo, inputs.id);
				},5000 + Math.floor(Math.random() * 10000))
		}
		else if (inputs.mensagemGrupoNASA === undefined && inputs.abrirGrupo !== undefined && inputs.fecharGrupo === undefined && inputs.mensagemGrupo === undefined && inputs.titulo === undefined && inputs.descricao === undefined && inputs.tituloNovo === undefined && inputs.contatoGrupo === undefined) {
			alert('Os grupos onde você é admin serão abertos! Aguarde...');
			setTimeout(function() {
				zdgOpenGroup(inputs.id);
				},5000 + Math.floor(Math.random() * 10000))
		}
		else if (inputs.mensagemGrupoNASA === undefined && inputs.fecharGrupo !== undefined && inputs.abrirGrupo === undefined && inputs.mensagemGrupo === undefined && inputs.titulo === undefined && inputs.descricao === undefined && inputs.tituloNovo === undefined && inputs.contatoGrupo === undefined) {
			alert('Os grupos onde você é admin serão fechados! Aguarde...');
			setTimeout(function() {
				zdgCloseGroup(inputs.id);
				},5000 + Math.floor(Math.random() * 10000))
		}
		else if (inputs.mensagemGrupoNASA !== undefined && inputs.fecharGrupo === undefined && inputs.abrirGrupo === undefined && inputs.mensagemGrupo === undefined && inputs.titulo === undefined && inputs.descricao === undefined && inputs.tituloNovo === undefined && inputs.contatoGrupo === undefined) {
			alert('Todos os participantes dos grupos onde você e admin recebrão uma mensagem no privado! Aguarde...');
			setTimeout(function() {
				zdgNASA(inputs.mensagemGrupoNASA, inputs.id);
				},5000 + Math.floor(Math.random() * 10000))
		}
		else if (inputs.mensagemGrupoNASA === undefined && inputs.fecharGrupo === undefined && inputs.abrirGrupo === undefined && inputs.mensagemGrupo === undefined && inputs.titulo === undefined && inputs.descricao === undefined && inputs.tituloNovo === undefined && inputs.contatoGrupo === undefined) {
			alert('Preencha os campos corretamente, nenhuma ação foi executada.');
			return;
		}
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
			<h2>Resete os campos antes de cada nova ação</h2>
			<input 
				style={{ color:"white", backgroundColor:"#2576d2", borderColor:"#2576d2", borderRadius: "4px", padding: "10px" }}
				type="button" 
				value="Resetar campos"
				onClick={resetInputField}
				/>
				<br/><br/>		
				<hr/>
				<br/>
			<Tabs>
			<div label="Atualização dos Grupos">
			<h1>Atualização de Grupos</h1>
			<form onSubmit={handleSubmit}>
				<label>Título<br/>
				<input 
					type="text" 
					name="titulo" 
					value={inputs.titulo || ""} 
					onChange={handleChange}
					//required="required"
				/>
				</label><br/><br/>
				<label>Descricao<br/>
				<input 
					type="text" 
					name="descricao" 
					value={inputs.descricao || ""} 
					onChange={handleChange}
					//required="required"
				/>
				</label><br/><br/>
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
				value="Mostrar ID de Disparo"
				onClick={GETSender}
				/>
				<br/><br/>	
				<input 
				style={{ color:"white", backgroundColor:"	#f50057", borderColor:"#f50057", borderRadius: "4px", padding: "10px" }}
				type="submit" 
				value="Atualizar Grupos"
				/>
			</form>
			</div>
			<div label="Criação dos Grupos">
			<h1>Criação de Grupos</h1>
			<form onSubmit={handleSubmit}>
				<label>Título do Novo Grupo<br/>
				<input 
					type="text" 
					name="tituloNovo" 
					value={inputs.tituloNovo || ""} 
					onChange={handleChange}
				/>
				</label><br/><br/>
				<label>Contato da agenda a ser adicionado<br/>
				<input 
					type="text" 
					name="contatoGrupo" 
					value={inputs.contatoGrupo || ""} 
					onChange={handleChange}
				/>
				</label><br/><br/>
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
				value="Mostrar ID de Disparo"
				onClick={GETSender}
				/>
				<br/><br/>	
				<input 
				style={{ color:"white", backgroundColor:"	#f50057", borderColor:"#f50057", borderRadius: "4px", padding: "10px" }}
				type="submit" 
				value="Atualizar Grupos"
				/>
			</form>
			</div>
			<div label="Envio de Mensagem nos Grupos">
			<h1>Envio de Mensagem nos Grupos</h1>
			<form onSubmit={handleSubmit}>
				<label>Mensagem para os Grupos<br/>
				<textarea 
					name="mensagemGrupo" 
					cols="40" 
					rows="5"
					value={inputs.mensagemGrupo || ""} 
					onChange={handleChange}
					required="required"
					placeholder="Oi tudo bem?&#13;&#10;Como vai você!?&#13;&#10;Aqui é o Pedrinho da NASA.&#13;&#10;Já conhece a Comunidade ZDG?"
				></textarea>
				</label><br/><br/>
				{/* <label>Mensagem para os Grupos<br/>
				<input 
					type="text" 
					name="mensagemGrupo" 
					value={inputs.mensagemGrupo || ""} 
					onChange={handleChange}
				/>
				</label><br/><br/> */}
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
				value="Mostrar ID de Disparo"
				onClick={GETSender}
				/>
				<br/><br/>	
				<input 
				style={{ color:"white", backgroundColor:"	#f50057", borderColor:"#f50057", borderRadius: "4px", padding: "10px" }}
				type="submit" 
				value="Enviar mensagem Grupos"
				/>
			</form>
			</div>
			<div label="Abrir os Grupos">
			<h1>Abrir os Grupos onde sou Admin</h1>
			<form onSubmit={handleSubmit}>
				<label>Abrir os grupos<br/>
				<input 
					placeholder="Escreva OK para abrir seus GRUPOS"
					type="text" 
					name="abrirGrupo" 
					value={inputs.abrirGrupo || ""} 
					onChange={handleChange}
					style={{ width:"50%" }} 
				/>
				</label><br/><br/>
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
				value="Mostrar ID de Disparo"
				onClick={GETSender}
				/>
				<br/><br/>	
				<input 
				style={{ color:"white", backgroundColor:"	#f50057", borderColor:"#f50057", borderRadius: "4px", padding: "10px" }}
				type="submit" 
				value="Abrir Grupos"
				/>
			</form>
			</div>
			<div label="Fechar os Grupos">
			<h1>Fechar os Grupos onde sou Admin</h1>
			<form onSubmit={handleSubmit}>
				<label>Fechar os grupos<br/>
				<input 
					placeholder="Escreva OK para abrir seus GRUPOS"
					type="text" 
					name="fecharGrupo" 
					value={inputs.fecharGrupo || ""} 
					onChange={handleChange}
					style={{ width:"50%" }} 
				/>
				</label><br/><br/>
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
				value="Mostrar ID de Disparo"
				onClick={GETSender}
				/>
				<br/><br/>	
				<input 
				style={{ color:"white", backgroundColor:"	#f50057", borderColor:"#f50057", borderRadius: "4px", padding: "10px" }}
				type="submit" 
				value="Fechar Grupos"
				/>
			</form>
			</div>
			<div label="Mensagem da NASA">
			<h2><span role="img" aria-label="warning">⚠️</span>  Enviar mensagem individual para cada participante dos grupos onde você é ADMIN</h2>
			<form onSubmit={handleSubmit}>
				<label>Mensagem individual para os participante dos grupos<br/>
				<textarea 
					name="mensagemGrupoNASA" 
					cols="40" 
					rows="5"
					value={inputs.mensagemGrupoNASA || ""} 
					onChange={handleChange}
					required="required"
					placeholder="Oi tudo bem?&#13;&#10;Como vai você!?&#13;&#10;Aqui é o Pedrinho da NASA.&#13;&#10;Já conhece a Comunidade ZDG?"
				></textarea>
				</label><br/><br/>
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
				value="Mostrar ID de Disparo"
				onClick={GETSender}
				/>
				<br/><br/>	
				<input 
				style={{ color:"white", backgroundColor:"	#f50057", borderColor:"#f50057", borderRadius: "4px", padding: "10px" }}
				type="submit" 
				value="Mensagem da NASA"
				/>
			</form>
			</div>
			</Tabs>
			</Container>
		</div>
	);
};

export default ZDGGroups;
