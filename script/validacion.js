$(document).ready(function()
{
    $('#pokeform').submit(function() 
    {
      event.preventDefault();
      resetDex('#respuesta');
      let consulta = $('#pokeInput').val();
      let request = $.ajax({
          url: `https://pokeapi.co/api/v2/pokemon/${consulta}`,
          method: "GET"
        });
        request.done(function(result){
            pokemon = result;
            displayImg('#pokeImg', pokemon.id);
            displayData('#pokeData', pokemon);
            addData(pokemon);
        });
        request.fail(function(request, statusText)
        {
            console.log('poto');
        });
    }); 	
});
let dataPoints = [
    {label: 'HP', y: ''},
    {label: 'Ataque', y: ''},
    {label: 'Defensa', y: ''},
    {label: 'Ataque especial', y: ''},
    {label: 'Defensa especial', y: ''},
    {label: 'Velocidad', y: ''}
];

const resetDex = function(selector) 
{
    $(`${selector} h2`).text('');
    $(`${selector} p`).text('');
    $(`${selector} img`).attr("src","img/not-found.PNG");
    //dataPoints = [];
};

const displayImg = function(selector, pokeID)
{
    let url = `https://www.serebii.net/art/th/${pokeID}.png`
    $(selector).attr("src",url);
};

const displayData = function(selector, pokemon)
{
    let id = pokemon.id;
    let pokeNombre = pokemon.name;
    $(`${selector} h2`).text(`#${id} - ${pokeNombre}`);
};


const chart = new CanvasJS.Chart("chartContainer", 
{
    animationEnabled: true,
    theme: "light1",
    title: {
        text: "Estadísticas base"              
    },
    data: [{
        type: "column",
        dataPoints: dataPoints
    }]
});

const addData = function(data) {
	for (let i = 0; i < data.stats.length; i++) {
        let j = data.stats.length - i -1;
		dataPoints[j].y = data.stats[i].base_stat;
    };
    chart.render();
}
