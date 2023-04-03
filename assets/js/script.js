

document.querySelector('.busca').addEventListener('submit', async(envet)=>{
    info('')
    envet.preventDefault();
    let input = document.querySelector('#searchInput').value

    if(input !== ''){
        info('carregando...')
        let city = encodeURI(input);
        let resq = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2b21d6129111d95d459a04bb47835cf5&units=metric&lang=pt_br`)
        let json = await resq.json();

        if(json.cod === 200){
            info('')
            upDate({
                nameCity:json.name,
                nameCountry:json.sys.country,
                temp : json.main.temp,
                wind:json.wind.speed,
                windDeg:json.wind.deg,
                weather:json.weather[0].description,
                weatherIcon:json.weather[0].icon,
            })

        }else{
            info('Cidade não encontrada')
            clear()
            
        }

    }else{
        info('Informe uma Cidade')
    }
})

function info(msg){
    document.querySelector('.aviso').innerHTML = msg
}
function upDate(json){
    document.querySelector('.titulo').innerHTML = `${json.nameCity},${json.nameCountry}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`
    document.querySelector('.temp img').src = `http://openweathermap.org/img/wn/${json.weatherIcon}@2x.png`
    document.querySelector('.ventoInfo').innerHTML = `${json.wind}<span>km/h</span> `
    document.querySelector('.clima').innerHTML = `${json.weather}`
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windDeg-90}deg)`
    
    document.querySelector('.resultado').style.display ='block'
}

function clear(){
    document.querySelector('.resultado').style.display ='none'
}
