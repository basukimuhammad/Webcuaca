const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '642e32e7af29e363a86df156c248b837';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=id&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const visibility = document.querySelector('.weather-details .visibility span');
            const timezone = document.querySelector('.weather-details .timezone span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'src/image/clear.png ';
                    break;

                case 'Rain':
                    image.src = 'src/image/rain.png';
                    break;

                case 'Snow':
                    image.src = 'src/image/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'src/image/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'src/image/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            visibility.innerHTML = `${(parseInt(json.visibility))/1000} km`;
            timezone.innerHTML = `GMT ${(parseInt(json.timezone))/3600}:00`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});