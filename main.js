let pokedex = document.querySelector(".pokedex")

let arrayPokemon = [];

function crearCarta(pokemon) {
    //Carta Pokemon
    const carta = document.createElement("div");
    carta.classList.add('cartaPokemon');

    //Apartado del sprite
    const containerSprite = document.createElement('div');
    containerSprite.classList.add('container-img');

    const spriteImage = document.createElement('img');
    spriteImage.classList.add('sprite');
    spriteImage.src = pokemon.sprites.other["official-artwork"].front_default;

    containerSprite.appendChild(spriteImage);

    //Numero de Pokedex
    const numeroPokedex = document.createElement('p');
    numeroPokedex.classList.add('numeroPokedex');
    numeroPokedex.innerText = formatID(parseInt(pokemon.id)) + pokemon.id;

    //Apartado del Nombre
    const nombrePokemon = document.createElement('p');
    nombrePokemon.classList.add('nombrePokemon');
    nombrePokemon.innerText = pokemon.name;

    const containerInfo = document.createElement('div');
    containerInfo.classList.add('container-info')
    containerInfo.appendChild(nombrePokemon)
    containerInfo.appendChild(numeroPokedex)

    //Apartado de Tipos
    const containerTipos = document.createElement('div');
    containerTipos.classList.add('container-tipos');

    const listaTipos = document.createElement('ul');
    listaTipos.classList.add('listaTipos');

    for (let n = 0; n < pokemon.types.length; n++) {
        const tipoElemento = document.createElement("li");
        const tipos = document.createTextNode(pokemon.types[n].type.name);
        tipoElemento.style.backgroundColor = getColorTipoPokemon(pokemon.types[n].type.name);
        tipoElemento.appendChild(tipos);
        listaTipos.appendChild(tipoElemento);
    }

    containerTipos.appendChild(listaTipos)

    //Apartado de estadisticas
    const containerStats = document.createElement('div');
    containerStats.classList.add('container-stats');

    const grafica = document.createElement('canvas');
    grafica.classList.add('grafica')
    containerStats.appendChild(grafica);

    const ctx = grafica;
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: pokemon.stats.map((nombre) => { return nombre.stat.name }),
            datasets: [{
                label: 'Estadisticas Base ' + pokemon.name,
                data: pokemon.stats.map((stat_base) => {
                    return stat_base.base_stat
                }),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],

                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y', // Cambia el enfoque al eje x
            legend: {
                display: false // Oculta la leyenda
            },
            scales: {
                x: {
                    beginAtZero: true, // Ajusta el inicio del eje x a cero
                    max: 150,
                    grid: {
                        display: false // Oculta las líneas de la cuadrícula en el eje X
                    }
                },
            },
            plugins: {
                legend: {
                    display: true, // Muestra la leyenda
                    labels: {
                        usePointStyle: true, // Utiliza el estilo de punto en lugar de una barra
                        boxWidth: 0 // Establece el ancho de la barra en cero
                    }
                }
            }
        }

    });

    //Flip Carta
    const inner = document.createElement('div');
    inner.classList.add('card-inner')

    const cartaFront = document.createElement('div');
    cartaFront.classList.add('front');
    inner.appendChild(cartaFront);

    const cartaBack = document.createElement('div');
    cartaBack.classList.add('back')
    inner.appendChild(cartaBack);

    //Creacions
    cartaFront.appendChild(containerInfo)
    cartaFront.appendChild(containerSprite)
    cartaFront.appendChild(containerTipos)
    cartaBack.appendChild(containerStats)

    carta.appendChild(inner);
    pokedex.appendChild(carta);

}

async function buscarPokemon(id) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
    return await response.json();
}

let promises = [];
for (let n = 1; n <= 1010; n++) {
    promises.push(buscarPokemon(n))
}

Promise.all(promises).then(function (pokemons) {
    pokemons.forEach(e => crearCarta(e));
    console.log(pokemons)
});

function formatID(number) {
    if (number < 10) {
        return "#00";
    } else if (number < 100) {
        return "#0";
    } return "#";
}

// Colores para los Types de cada pokemon
const pokemonTypes = [
    { name: "normal", color: "#A8A878" },
    { name: "fire", color: "#F08030" },
    { name: "fighting", color: "#C03028" },
    { name: "water", color: "#6890F0" },
    { name: "flying", color: "#A890F0" },
    { name: "grass", color: "#78C850" },
    { name: "poison", color: "#A040A0" },
    { name: "electric", color: "#F8D030" },
    { name: "ground", color: "#E0C068" },
    { name: "psychic", color: "#F85888" },
    { name: "rock", color: "#B8A038" },
    { name: "ice", color: "#98D8D8" },
    { name: "bug", color: "#A8B820" },
    { name: "dragon", color: "#7038F8" },
    { name: "ghost", color: "#705898" },
    { name: "dark", color: "#705848" },
    { name: "steel", color: "#B8B8D0" },
    { name: "fairy", color: "#EE99AC" },
];

function getColorTipoPokemon(nombreTipo) {
    const tipoEncontrado = pokemonTypes.find(tipo => tipo.name === nombreTipo);
    return tipoEncontrado ? tipoEncontrado.color : "white";
}

