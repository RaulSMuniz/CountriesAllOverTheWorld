const obterRestCountries = () => {
    // obter URL da API Rest;
    fetch('https://restcountries.com/v3.1/all').then(res => res.json()).then(data => mostrarPaises(data));
};

const mostrarPaises = paises => {
    /* Em mostrarPaises, utiliza da arrow function com parâmetro 'paises' que contém o Array 
    com informações de todos os países (utilizado em .then(data => mostrarPaises(data)));

    Em countryHTML, se reutiliza de paises para percorrer tudo e armazenar as informações na
    variável dita anteriormente (countryHTML);
    */
    const countryHTML = paises.map(país => obterPaises(país)); 
    const div = document.getElementById('países'); // Obtém a div em que os países serão inseridos;
    div.innerHTML = countryHTML.join(' '); // Mostra o countryHTML e retira as vírgulas;
    console.log(paises);
};

const obterPaises = (país) => { // Cria o HTML com as informações gerais da Aplicação Web;
    return `
        <div class="pais-info">
            <h2>${país.name.common}</h2>
            <img src='${país.flags.png}' class="bandeiras"></img>
            <h3>Capital: ${país.capital}</h3>
            <h3>Região: ${país.region}</h3>
        </div>
    `
};
obterRestCountries(); // chama a função inicial para que os dados sejam devidamente distribuídas;