/*
Atividade Avaliativa
- Rafaella de Oliveira
- Matheus de Souza Perches
*/

//Criando um request como variável global para ser usado posteriormente por mais de uma função 
var request = new XMLHttpRequest();

function escondeElementosCSS(){
	document.getElementById('profile').style.cssText = "border:none";
	document.getElementById('organization').style.cssText = "border:none";
	document.getElementById('affiliation').style.cssText = "border:none";
	document.getElementById("profile").style.display = "none";
	document.getElementById("organization").style.display = "none";
	document.getElementById("profileData").style.display = "none";
	document.getElementById("affiliation").style.display = "none";
	document.getElementById("divLoader").style.display = "none";
}

//Escondendo os elementos do CSS ao inicializar a página pois estarão vazios. 
escondeElementosCSS();

//Ao apertar o enter executa a busca
function runScript(e) {
    if (e.keyCode == 13) {
	
		//Obtendo o valor da caixa de texto de pesquisa de usuário 
		var value = document.getElementById('inputBusca').value;
	
		//Verificando se o campo está vazio 
		if(value.length == 0){
			window.alert("Insira um nome de usuário.");
			return;
		}
	
		//Garantindo que os elementos CSS estão escondidos para prevenir que estejam exibindo dados em branco. 
		escondeElementosCSS();
		
		document.getElementById("divLoader").style.display = "block";
		
		//Concatenando o valor da input no link
		var linkConta = "https://api.starcitizen-api.com/5a54b3efe20b5264fd73fd842625bd8e/v1/live/user/" + value;

		//Abrindo o request para a API com o parâmetro GET, para obter dados. 
		this.request.open('GET', linkConta, true);

		//Executar a função CarregaDados() ao receber as informações da API 
		this.request.onload = CarregaDados;

		//Enviar o request para a API 
		this.request.send();

		//Preparar as divs para receberem novos dados. 
		limpaDivs();
    }
}

//ativar a aba profile do site, escondendo o afiliation e exibindo o profile e profiledata. 
function openProfile() {
	if (this.request.readyState == 4){
		document.getElementById("affiliation").style.display = "none";
		document.getElementById("profile").style.display = "block";
		document.getElementById("profileData").style.display = "block";
	}
    
}

//ativar a aba organization do site, escondendo o profile e profiledata, e exibir a afiliation. 
function openOrganizations() {
	if(this.request.readyState == 4){
		document.getElementById("profile").style.display = "none";
		document.getElementById("profileData").style.display = "none";
		document.getElementById("affiliation").style.display = "block";
	}
}

//função que limpa as divs para as consultas seguintes 
function limpaDivs() {
    $('.limparDiv').empty();
}


//função que efetua as buscas 
function BuscaUsuario() {

    //Obtendo o valor da caixa de texto de pesquisa de usuário 
    var value = document.getElementById('inputBusca').value;
	
	//Verificando se o campo está vazio 
	if(value.length == 0){
		window.alert("Insira um nome de usuário.");
		return;
	}
	
    //Garantindo que os elementos CSS estão escondidos para prevenir que estejam exibindo dados em branco. 
    escondeElementosCSS();
	
	document.getElementById("divLoader").style.display = "block";

    //Concatenando o valor da input no link
    var linkConta = "https://api.starcitizen-api.com/5a54b3efe20b5264fd73fd842625bd8e/v1/live/user/" + value;

    //Abrindo o request para a API com o parâmetro GET, para obter dados. 
    this.request.open('GET', linkConta, true);

    //Executar a função CarregaDados() ao receber as informações da API 
    this.request.onload = CarregaDados;

    //Enviar o request para a API 
    this.request.send();
	
    //Preparar as divs para receberem novos dados. 
    limpaDivs();
		
}

function CarregaDados() {
    // Acessando a informação em formado JSON retornada da API
    var d = JSON.parse(this.response);
	
	try{
	//verificando se o retorno do servidor deu sucesso
		if (request.status >= 200 && request.status < 400) {
			//escondendo o gif de espera
			document.getElementById('divLoader').style.display = "none";
			//Forçando a ativação da aba Perfil do site ao receber os dados 
			document.getElementById('profile').style.cssText = "border:block";
			document.getElementById('organization').style.cssText = "border:block";
			document.getElementById('affiliation').style.cssText = "border:block";
			document.getElementById("affiliation").style.display = "none";
			document.getElementById("profile").style.display = "block";
			document.getElementById("profileData").style.display = "block";

			/*
			-----------------------------------------------------------------------------------------------------
												profile - inicio
			-----------------------------------------------------------------------------------------------------
			*/
		
			//Recebendo os dados da API no que se diz respeito ao perfil em uma variável
			var profile = d.data.profile;

			//----------------------------------------------------------------------------------------------------//	

			//Criando um elemento "img" no documento e atribuindo a variavel profileImg, para receber a imagem de perfil da conta
			var profileImg = document.createElement('img');
			//Atribui a imagem de perfil a variavel profileImg criada acima
			profileImg.src = profile.image;
			//Adicionando um ID para a variavel profileImg 
			profileImg.id = 'profileImg';
			//Obtém a DIV pelo seu ID e insere a imagem de perfil no local correto da página 
			document.getElementById('profile').appendChild(profileImg);
		
		
			//----------------------------------------------------------------------------------------------------//
		
			//Cria um span no documento e o insere na variavel span 
			var span = document.createElement('span');
			//Obtém a DIV pelo seu ID e insere o span no local correto da página 
			document.getElementById('profile').appendChild(span);
			//Preenche o span com conteúdo
			span.textContent = 'Community Moniker'; 
		
			//Criando um elemento "p" no documento e atribuindo a variavel pDisplay 
			var pDisplay = document.createElement('p');
			//Atribui o valor de profile.display ao pDisplay como conteúdo de texto, por se tratar de um nome 
			pDisplay.textContent = profile.display;
			//Obtém a DIV pelo seu ID e insere o texto no local correto da página 
			document.getElementById('profile').appendChild(pDisplay); // aplica o display value naa div perfil

			
			//----------------------------------------------------------------------------------------------------//

			//Cria um span no documento e o insere na variavel span 
			var span = document.createElement('span');
			//Obtém a DIV pelo seu ID e insere o span no local correto da página 
			document.getElementById('profile').appendChild(span);
			//Preenche o span com conteúdo
			span.textContent = 'Handle name'; 
		
			//Criando um elemento "p" no documento e atribuindo a variavel pHandle 
			var pHandle = document.createElement('p');
			//Atribui o profile.handle a variavel pHandle em formato de texto 
			pHandle.textContent = profile.handle;
			//Obtém a DIV pelo seu ID e insere o texto no local correto da página 
			document.getElementById('profile').appendChild(pHandle);

			//----------------------------------------------------------------------------------------------------//

			//Cria um span no documento e o insere na variavel span 
			var span = document.createElement('span');
			//Obtém a DIV pelo seu ID e insere o span no local correto da página 
			document.getElementById('profile').appendChild(span);
			//Preenche o span com conteúdo
			span.textContent = 'Badge'; 
		
			//Criando um elemento "img" no documento e atribuindo a variavel badgeImg
			var badgeImg = document.createElement('img');
			//Atribui o profile.badge_image a variavel badgeImg em formato de imagem 
			badgeImg.src = profile.badge_image;
			//Adiciona um ID em badgeImg
			badgeImg.id = 'badgeImg';
			//Obtém a DIV pelo seu ID e insere a imagem no local correto da página
			document.getElementById('profile').appendChild(badgeImg);
	
			//----------------------------------------------------------------------------------------------------//

			//Criando um elemento "p" no documento e atribuindo a variavel pBadge
			var pBadge = document.createElement('p');
			//Atribui o profile.badge a variavel pBadge em formato de texto 
			pBadge.textContent = profile.badge;
			//Obtém a DIV pelo seu ID e insere o texto no local correto da página
			document.getElementById('profile').appendChild(pBadge);
		
			/*
			-----------------------------------------------------------------------------------------------------
        									profileData - inicio
			-----------------------------------------------------------------------------------------------------
			*/
		
			//Cria um span no documento e o insere na variavel span
			var span = document.createElement('span');
			//Obtém a DIV pelo seu ID e insere o spanSid no local correto da página 
			document.getElementById('profileData').appendChild(span);
			//Preenche o span com conteúdo
			span.textContent = 'Account ID';
		
			//Criando um elemento "p" no documento e atribuindo a variavel pID 
			var pID = document.createElement('p');
			//Atribui o profile.id a variavel pID em formato de texto 
			pID.textContent = profile.id;
			//Obtém a DIV pelo seu ID e insere o texto no local correto da página
			document.getElementById('profileData').appendChild(pID);
		
			//----------------------------------------------------------------------------------------------------//
		
			//Cria um span no documento e o insere na variavel span
			var span = document.createElement('span');
			//Obtém a DIV pelo seu ID e insere o spanSid no local correto da página 
			document.getElementById('profileData').appendChild(span);
			//Preenche o span com conteúdo
			span.textContent = 'Account Link';
			//Criando um elemento "p" no documento e atribuindo a variavel pLink 
			var pLink = document.createElement('p');
			//Montando o link do site original 
			pLink.textContent = "https://robertsspaceindustries.com/citizens/" + document.getElementById('inputBusca').value;
			//Obtém a DIV pelo seu ID e insere o texto no local correto da página
			document.getElementById('profileData').appendChild(pLink);
		
			//----------------------------------------------------------------------------------------------------//
		
			//Declarando variáveis
			var Data; 
			var DataFinal;
		
			//Cria um span no documento e o insere na variavel span 
			var span = document.createElement('span');
			//Obtém a DIV pelo seu ID e insere o span no local correto da página 
			document.getElementById('profileData').appendChild(span);
			//Preenche o span com conteúdo
			span.textContent = 'Enlisted'; 
			//Criando um elemento "p" no documento e atribuindo a variavel pEnliste 
			var pEnliste = document.createElement('p');
			//A variavel Data recebe a data de criação da conta, excluindo o horário do final da string
			Data = profile.enlisted.substr(0,10);
		
			//Separando a string entre dia, mês e ano
			var dia  = Data.split("-")[2];
			var mes  = Data.split("-")[1];
			var ano  = Data.split("-")[0];
		
			//Data pronta para ser inserida na página 
			DataFinal = dia + '/' + mes + '/' + ano;
		
			//O elemento HTML recebe a data da criação da conta
			pEnliste.textContent = DataFinal;

			//Obtém a DIV pelo seu ID e insere a data no local correto da página
			document.getElementById('profileData').appendChild(pEnliste);
		
			//----------------------------------------------------------------------------------------------------//
		
			//Recebendo os dados da API no que se diz respeito a localização do usuário em uma variável
			var location = profile.location;
		
			//----------------------------------------------------------------------------------------------------//
		
			//Cria um span no documento e o insere na variavel span
			var span = document.createElement('span');
			//Obtém a DIV pelo seu ID e insere o spanSid no local correto da página 
			document.getElementById('profileData').appendChild(span);
			//Preenche o span com conteúdo
			span.textContent = 'Country';
		
			//Criando um elemento "p" no documento e atribuindo a variavel pCountry
			var pCountry = document.createElement('p');
			//Atribui o location.country a variavel pCountry em formato de texto 
			pCountry.textContent = location.coutry;
			//Obtém a DIV pelo seu ID e insere o texto no local correto da página
			document.getElementById('profileData').appendChild(pCountry);
			
			//----------------------------------------------------------------------------------------------------//
		
			//Cria um span no documento e o insere na variavel span
			var span = document.createElement('span');
			//Obtém a DIV pelo seu ID e insere o spanSid no local correto da página 
			document.getElementById('profileData').appendChild(span);
			//Preenche o span com conteúdo
			span.textContent = 'Region';
			//Criando um elemento "p" no documento e atribuindo a variavel pRegion
			var pRegion = document.createElement('p');
			//Atribui o location.region a variavel pRegion em formato de texto 
			pRegion.textContent = location.region;
			//Obtém a DIV pelo seu ID e insere o texto no local correto da página
			document.getElementById('profileData').appendChild(pRegion); // pega a div pelo ID e adiciona o p
		
			//----------------------------------------------------------------------------------------------------//
		
			//Cria um span no documento e o insere na variavel span 
			var span = document.createElement('span');
			//Obtém a DIV pelo seu ID e insere o span no local correto da página 
			document.getElementById('profileData').appendChild(span);
			//Preenche o span com conteúdo
			span.textContent = 'Fluency'; 
			//Atribui a profile.fluency a variavel fluency criada abaixo
			var fluency = profile.fluency;
			//Especificando o tamanho do vetor através de quantas línguas o usuário especificou que conhece.
			var qntLinguagem = fluency.length;
			//Variável contador
			var j;
		
			//Iniciando o loop "for"
			for (j = 0; j < qntLinguagem; j++) {
				//Cria o elemento li 
				var pFluency = document.createElement('li'); 
				//Atribui o valor vindo da API, iterando através do valor de J pelas línguas recebidas
				pFluency.textContent = fluency[j];
				//Obtém a DIV pelo seu ID e insere o texto no local correto da página
				document.getElementById('profileData').appendChild(pFluency);
			}

			/* 
			-----------------------------------------------------------------------------------------------------
											Organization - INICIO
			-----------------------------------------------------------------------------------------------------
			*/
		
		
			//Recebendo os dados da API no que se diz respeito a organização principal do usuário em uma variável
			var organization = d.data.organization;
		
			//----------------------------------------------------------------------------------------------------//
		
			//Criando um elemento "img" no documento e atribuindo a variavel img, para receber a imagem da organização
			var img = document.createElement('img');
			//Atribui a imagem da organização a variavel img criada acima
			img.src = organization.image;
			//Adicionando um ID para a variavel img 
			img.id = 'organizationImg';
			//Obtém a DIV pelo seu ID e insere o texto no local correto da página
			document.getElementById('organization').appendChild(img);

			//----------------------------------------------------------------------------------------------------//	
			
			//Cria um span no documento e o insere na variavel span 
			var span = document.createElement('span');
			//Obtém a DIV pelo seu ID e insere o span no local correto da página 
			document.getElementById('organization').appendChild(span);
			//Preenche o span com conteúdo
			span.textContent = 'Organization Name';
		
			//Criando um elemento "p" no documento e atribuindo a variavel pName
			var pName = document.createElement('p');
			//Atribui o organization.name a variavel pName em formato de texto
			pName.textContent = organization.name;
			//Obtém a DIV pelo seu ID e insere o texto no local correto da página
			document.getElementById('organization').appendChild(pName);

			//----------------------------------------------------------------------------------------------------//

			//Cria um span no documento e o insere na variavel spanSid
			var spanSid = document.createElement('span');
			//Obtém a DIV pelo seu ID e insere o spanSid no local correto da página 
			document.getElementById('organization').appendChild(spanSid);
			//Preenche o span com conteúdo
			spanSid.textContent = 'Spectrum Identification (SID)';
		
			//Criando um elemento "p" no documento e atribuindo a variavel pSid
			var pSid = document.createElement('p');
			//Atribui o organization.sid a variavel pSid em formato de texto
			pSid.textContent = organization.sid;
			//Obtém a DIV pelo seu ID e insere o texto no local correto da página
			document.getElementById('organization').appendChild(pSid);
		
			//----------------------------------------------------------------------------------------------------//

			//Cria um span no documento e o insere na variavel spanRank
			var spanRank = document.createElement('span');
			//Obtém a DIV pelo seu ID e insere o spanSid no local correto da página 
			document.getElementById('organization').appendChild(spanRank);
			//Preenche o span com conteúdo
			spanRank.textContent = 'Organization rank';
		
			//Criando um elemento "p" no documento e atribuindo a variavel pRank
			var pRank = document.createElement('p');
			//Atribui o organization.rank a variavel pRank em formato de texto
			pRank.textContent = organization.rank;
			//Obtém a DIV pelo seu ID e insere o texto no local correto da página
			document.getElementById('organization').appendChild(pRank);

			/*
			-----------------------------------------------------------------------------------------------------
												affiliation - INICIO
			-----------------------------------------------------------------------------------------------------				
			*/


			//Recebendo os dados da API no que se diz respeito as afiliações do usuário em uma variável
			var affiliation = d.data.affiliation;
			// Especificando o tamanho do vetor através de quantas afiliações o usuário possui
			var tamanhoAffiliation = affiliation.length; 
			//Declarando o contador
			var i;
		
			//Iniciando o loop "for"
			for (i = 0; i < tamanhoAffiliation; i++) {
			
				//Criando um elemento "div" no documento e atribuindo a variavel div
				var div = document.createElement('div');
				//Obtém a DIV pelo seu ID e insere a variavel "div" no local correto da página 
				document.getElementById('affiliation').appendChild(div);
				//adiciona um ID à div
				div.id = 'affiliation-' + i;
				//adiciona uma class chamada left-col no html
				document.getElementById('affiliation-' + i).classList.add('left-col');
				//adiciona uma class chamada affiliation no html
				document.getElementById('affiliation-' + i).classList.add('affiliation');
			
				//----------------------------------------------------------------------------------------------------//
			
				//Criando um elemento "img" no documento e atribuindo a variavel img
				var img = document.createElement('img');
				//Atribui a imagem da organização afiliada a variavel img criada acima, iterando pelo valor de "i" no loop. 	
				img.src = affiliation[i].image;			
				//Obtém a DIV pelo seu ID utilizando a variável "i" para interar, e insere o texto no local correto da página
				document.getElementById('affiliation-' + i).appendChild(img);
			
				//----------------------------------------------------------------------------------------------------//
			
				//Cria um span no documento e o insere na variavel span
				var spanName = document.createElement('span');
				//Obtém a DIV pelo seu ID e insere o spanSid no local correto da página 
				document.getElementById('affiliation-' + i).appendChild(spanName);
				//Preenche o span com conteúdo
				spanName.textContent = 'Organization name';
				//Criando um elemento "p" no documento e atribuindo a variavel pName
				var pName = document.createElement('p');
				//Atribui o affiliation[i].name a variavel pName em formato de texto
				pName.textContent = affiliation[i].name;	
				//Obtém a DIV pelo seu ID utilizando a variável "i" para interar, e insere o texto no local correto da página
				document.getElementById('affiliation-' + i).appendChild(pName);
			
				//----------------------------------------------------------------------------------------------------//
			
				//Cria um span no documento e o insere na variavel spanRank
				var spanRank = document.createElement('span');
				//Obtém a DIV pelo seu ID e insere o spanRank no local correto da página 
				document.getElementById('affiliation-' + i).appendChild(spanRank);
				//Preenche o span com conteúdo
				spanRank.textContent = 'Organization Rank';
			
				//Criando um elemento "p" no documento e atribuindo a variavel pRank
				var pRank = document.createElement('p');
				//Atribui o affiliation[i].rank a variavel pRank em formato de texto
				pRank.textContent = affiliation[i].rank;
				//Obtém a DIV pelo seu ID utilizando a variável "i" para interar, e insere o texto no local correto da página
				document.getElementById('affiliation-' + i).appendChild(pRank);
			
				//----------------------------------------------------------------------------------------------------//
			
				//Cria um span no documento e o insere na variavel spanSid
				var spanSid = document.createElement('span');
				//Obtém a DIV pelo seu ID e insere o spanSid no local correto da página 
				document.getElementById('affiliation-' + i).appendChild(spanSid);
				//Preenche o span com conteúdo
				spanSid.textContent = 'Spectrum Identification (SID)';
			
				//Criando um elemento "p" no documento e atribuindo a variavel pSid
				var pSid = document.createElement('p');
				//Atribui o affiliation[i].sid a variavel pSid em formato de texto
				pSid.textContent = affiliation[i].sid;
				//Obtém a DIV pelo seu ID utilizando a variável "i" para interar, e insere o texto no local correto da página
				document.getElementById('affiliation-' + i).appendChild(pSid);

			}
		
			/*
			-----------------------------------------------------------------------------------------------------
											-- FIM DA OBTENÇÃO DE DADOS DO USUÁRIO --
			-----------------------------------------------------------------------------------------------------				
			*/

    } else if (request.status == 404){
		//Inserindo um alerta para caso o usuário não seja encontrado. 
        //window.alert("Usuário não encontrado.");
		var mensagemErro = document.createElement('p');
		mensagemErro.textContent = "Dados não encontrados. Verifique digitação.";
		mensagemErro.id = 'mensagemErro';
		document.getElementById('principal').appendChild(mensagemErro);
		//Garantindo que os elementos do CSS estarão escondidos. 
		escondeElementosCSS();
    }
	}
	catch (erro){
		//Inserindo o erro no console
		console.log(erro);
		//Inserindo um alerta para caso algum erro ocorra.
		var mensagemErro = document.createElement('p');
		mensagemErro.textContent = "Dados não encontrados. Verifique digitação.";
		mensagemErro.id = 'mensagemErro';
		document.getElementById('principal').appendChild(mensagemErro);
		//window.alert("Dados não encontrados. Verifique digitação.");
		//Garantindo que os elementos do CSS estarão escondidos. 
		escondeElementosCSS();
	}
	
}