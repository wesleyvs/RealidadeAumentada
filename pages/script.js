//Variáveis para armazenamento do load dos objetos dos marcadores:
var drill=false;
var tripod=false;

//RECONHECIMENTO DA PAGINA SENDO CARREGADA VIA SMARTPHONE
function detectar_mobile() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
 //RECONHECIMENTO DA PAGINA SENDO CARREGADA VIA COMPUTADOR  
    return false;
  }
}

//Variaveis para controle do final da aplicação:
var final=false;


if (detectar_mobile() == true) {
  //Mensagem inicial para SMARTPHONE
  alert("Por favor, vire seu celular.");
}

//MODELOS QUE INICIAM OCULTOS:
//Mensagem de erro:
var erro = document.getElementById("ModelErro");
erro.setAttribute('visible', false);
//Mensagem de sucesso:
var correct = document.getElementById("ModelCorrect");
correct.setAttribute('visible', false);
//Mensagem de continuidade:
var ok = document.getElementById("ModelOK");
ok.setAttribute('visible', false);

var pagina = document.getElementById("corpo");//layout da pagina inteira

//Modelo da furadeira
var modelDrill = document.getElementById("drillModel");
//Modelo do tripé
var modelTripod = document.getElementById("tripodModel");
//Modelo da chapa metálica
var metalPlate = document.getElementById("MetalPlate");

  //Mostrar ou ocultar chapa metálica:
  function hideMetalPlate() {metalPlate.setAttribute('visible', false);}
  function showMetalPlate() {metalPlate.setAttribute('visible', true);}

  //Mostrar ou ocultar erro:
  function hideError() {erro.setAttribute('visible', false);}
  function showError() {erro.setAttribute('visible', true);}

  //Mostrar ou ocultar acerto:
  function hideOk() {ok.setAttribute('visible', false);}
  function showOk() {ok.setAttribute('visible', true);}

  //Mostrar sucesso:
  function showCorrect() {correct.setAttribute('visible', true);} 

//RECONHECIMENTO DO MARKER NA CAMERA:
//Load Drill
var markerDrill = document.getElementById("markerDrill");
markerDrill.addEventListener('markerFound', function() {
  if(final != true) {
  setTimeout(function(){modelDrill.setAttribute('visible', true)}, 0);
  modelDrill.setAttribute("animation", "property: position; to: 0 0 0; dur: 0");
  drill=true;
  if (tripod==false) {
    setTimeout(hideMetalPlate, 2000); //esconder chapa metalica depois de 2 segundos
    modelDrill.setAttribute("animation", "property: position; to: -10 0 0; dur: 8000");//Simular furadeira na placa metálica
    setTimeout(function(){modelDrill.setAttribute('visible', false)}, 1950); //esconder furadeira do marker depois de 2 segundos
    
      setTimeout(showError, 2000);//mostrar erro depois de 2 segundos
      setTimeout(function(){alert("Retire o marker da furadeira e aguarde o erro desaparecer.")},2000);
    }
  }
});
//Lost Drill
var markerDrill = document.getElementById("markerDrill");
markerDrill.addEventListener('markerLost', function() {
  if(final != true) {
    drill=false;
    setTimeout(hideError, 4000);//esconder erro apos 1 segundo 
    setTimeout(showMetalPlate, 4000)//mostrar placa metálica apos 1 segundo
  }
});

//Load Tripod
var markerTripod = document.getElementById("markerTripod");

markerTripod.addEventListener('markerFound', function() {
  if(final != true) {
    modelTripod.setAttribute("animation", "property: position; to: -8 15 0; dur: 7000");
    tripod=true;
    setTimeout(hideMetalPlate, 2000); //esconder chapa metalica depois de 2 segundos
    setTimeout(function(){modelTripod.setAttribute('visible', false)}, 1950); //esconder tripé do marker depois de 2 segundos  
    setTimeout(showOk, 2000);//mostrar erro depois de 2 segundos
    setTimeout(function(){alert("Insira o marker da furadeira")},2000);
    
    setTimeout(function(){modelTripod.setAttribute('visible', true)}, 5000);
    //setTimeout(showOk, 8000);
  }
  
  markerDrill.addEventListener('markerFound', function() {
    tripod=true;
    setTimeout(function(){modelDrill.setAttribute('visible', false)}, 0);
    setTimeout(function(){modelTripod.setAttribute('visible', false)}, 0);
    modelDrill.setAttribute("animation", "property: position; to: -10 0 0; dur: 8000");//Simular furadeira na placa metálica
    setTimeout(hideOk(), 2000);
    setTimeout(showCorrect, 500);//mostrar acerto depois de 1 segundos
    setTimeout(function(){alert("Você concluiu o treinamento!\n\nParabéns!!\n\n")},5000);
    setTimeout(function(){window.location.href="/index.html"},5001);
  });
  final = true;
});

//Lost Tripod
var markerTripod = document.getElementById("markerTripod");
markerTripod.addEventListener('markerLost', function() {
  tripod=false;
});
      
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}