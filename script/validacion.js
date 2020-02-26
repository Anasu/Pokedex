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
            $('#respuesta').attr('class','visible');
            displayImg('#pokeImg', pokemon.id);
            displayData('#pokeData', pokemon);
            addData(pokemon);
            $('#habilidades').html('');
            for(let pokeIndex in pokemon.abilities)
            {
                let rqstHab = $.ajax({
                    url: pokemon.abilities[pokeIndex].ability.url,
                    method: "GET"
                  });
                  rqstHab.done(function(result){
                      let ability = result;
                      loadSpec(ability,pokeIndex);
                  });
            }
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
    $(`${selector}`).attr('class','invisible');
    $(`${selector} h2`).text('');
    $(`${selector} p`).text('');
    $(`${selector} img`).attr('src','img/not-found.PNG');
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
};

const loadSpec = function(pokeSpec,index)
{
    let abilTitle;
    let abilText;
    for(let flav_o of pokeSpec.names)
    {
        if(flav_o.language.name == "es")
        {
            abilTitle = flav_o.name;
            break;
        }
    }
    for(let flav_o of pokeSpec.flavor_text_entries)
    {
        if(flav_o.language.name == "es")
        {
            abilText = flav_o.flavor_text;
            break;
        }
    }
    $('#habilidades').html(
        $('#habilidades').html()+
        `<div class="habilidad__texto" id="habilidad${index}">`+
        `<h3>${abilTitle}</h3><p>${abilText}</p></div>`);
};

