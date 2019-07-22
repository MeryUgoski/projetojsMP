function initMap() {
$(document).ready(function(){
    $('.sidenav').sidenav();

    const botaoCep = $('#procurar-cep');
    const botaoMapa = $('#botao-mapa');
    const image ={
            url:'https://avatars1.githubusercontent.com/u/51347075?s=40&v=4',
            size: new google.maps.Size(50, 50)
         };     



    $('#div-numero').hide();
    let resultado = $('#resultado');

    botaoCep.click(function(){
        $('#div-numero').show();
         $('#div-cep').hide();
        let cep = $('#cep-usuario').val();
        const api=`https://viacep.com.br/ws/${cep}/json` ;
        $.getJSON(api,function(retorno_api){
        
          resultado.html(`
            <div class="collection">
                <a href="#!" class="collection-item alinhar-centro-v"><i class="material-icons  teal-text text-accent-3">location_on</i> ${retorno_api.logradouro}</a>
                <a href="#!" class="collection-item alinhar-centro-v"><i class="material-icons  teal-text text-accent-3">map</i> Bairro: ${retorno_api.bairro}</a>
                <a href="#!" class="collection-item alinhar-centro-v"><i class="material-icons  teal-text text-accent-3">location_city</i> Cidade : ${retorno_api.localidade}</a>
                <a href="#!" class="collection-item alinhar-centro-v"><i class="material-icons  teal-text text-accent-3">business</i> Estado : ${retorno_api.uf}</a>
            </div>
            `);
            botaoMapa.click(function(){
                 $('#div-cep').show();
                let rua = retorno_api.logradouro;
                let numeroCasa = $('#numero-casa').val();
                let enderecoCompleto = `${rua} ${numeroCasa}`;
                // Geocoding
                // Geocoding
                let gerarMapa = `https://maps.googleapis.com/maps/api/geocode/json?address=${enderecoCompleto}&key=AIzaSyAlijoQhZde8cSi00VngVwAlmBbr7VdbGE`;
                // Fim Geocoding
                $.getJSON(gerarMapa, function(retorno_api){
                    var coords = retorno_api.results[0].geometry.location;
                         // Maps
                         // Maps
                        // The location of Uluru
                    let pinoLocal = coords;
                    const image ={
                    url:'https://avatars1.githubusercontent.com/u/51347075?s=40&v=4',
                    size: new google.maps.Size(50, 50)
                    };     
                    // The map, centered at pinoLocal
                    let map = new google.maps.Map(
                    document.getElementById('map'), {
                        zoom: 15, 
                        center: pinoLocal
                        });
                    // The marker, positioned at pinoLocal
                    let marker = new google.maps.Marker({position: pinoLocal, map: map,icon: image});
                    // Fim Maps
                });
            });
         
        }); 
    });
  });
}

    