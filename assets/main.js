// Chave da Api -> Open Weather Map //

const apiKey = 'd463f3fe8b634900fa2a6ee695a4fabb';

// Url que vai ser pesquisada mediante a um fetch, pelo Current Weather Data //

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';

// Elementos necessários para mostrar no card //

// Nome da cidade

const searchBox = document.querySelector('.search input');

// Botão que consulta a API //

const searchBtn = document.querySelector('.search button');

// Imagem que represente o weather //

const weatherIcon = document.querySelector('.weather-icon');

// Função para consultar a API //

/*
vai ser async, porque ela não bloqueia a execução do programa, tendo o uso do await, 
no intuito de que essa promessa deve ser resolvida antes de executar o programa
*/

async function checkWeather(city){

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Caso (if) der certo, ou der errado (else) //

    if (response.status == 404){

        // Se der errado, mostra a mensagem de erro, e claramente não mostra o weather (none) //

        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';

    } else {

        // Uma variável pega os dados no formato JSON //

        var data = await response.json();

        // Inserção dos dados no weather card //

        document.querySelector('.city').innerHTML = searchBox.value;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' m/s';
        document.querySelector('.max').innerHTML = Math.round(data.main.temp_max) + '°C';
        document.querySelector('.min').innerHTML = Math.round(data.main.temp_min) + '°C';
        document.querySelector('.country').innerHTML = data.sys.country;
        document.querySelector('.coord').innerHTML = data.coord.lat + ', ' + data.coord.lon;

        // Mudando a foto (if) no weather card //

        if (data.weather[0].main == 'Clouds'){

            weatherIcon.src = '/images/clouds.png';
            document.querySelector('.way').innerHTML = 'Nublado';

        } else if (data.weather[0].main == 'Clear'){

            weatherIcon.src = '/images/clear.png';
            document.querySelector('.way').innerHTML = 'Claro';

        } else if (data.weather[0].main == 'Rain'){

            weatherIcon.src = '/images/rain.png';
            document.querySelector('.way').innerHTML = 'Chuva';

        } else if (data.weather[0].main == 'Drizzle'){

            weatherIcon.src = '/images/drizzle.png';
            document.querySelector('.way').innerHTML = 'Garoa';

        } else if (data.weather[0].main == 'Mist'){

            weatherIcon.src = '/images/mist.png';
            document.querySelector('.way').innerHTML = 'Névoa';
            
        } else if (data.weather[0].main == 'Snow'){

            weatherIcon.src = '/images/snow.png';
            document.querySelector('.way').innerHTML = 'Neve';
            
        }

        // Mostrando o weather card sem mensagem de erro //

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.way').style.display = 'block';
        document.querySelector('.error').style.display = 'none';

    }

}

// Executando a função, quando houver o click no botão //

searchBtn.addEventListener('click', ()=>{
    checkWeather(searchBox.value);
});