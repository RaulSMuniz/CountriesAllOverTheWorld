document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const nomeDoPais = params.get('name');

    fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(nomeDoPais)}`)
        .then(response => response.json())
        .then(data => {
            mostrarInfoPais(data[0]);
        });

    const mostrarInfoPais = (infoPaís) => {
        const paisHTML = obterPais(infoPaís); // Armazena o HTML
        const div = document.getElementsByClassName('país')[0];
        div.innerHTML = paisHTML;
    };
    const obterPais = (país) => { // Cria o HTML 
        let idiomas = Object.values(país.languages || {}).join(', ');
        let moedas = Object.values(país.currencies).map(moeda => `(${moeda.symbol}) ${moeda.name} `).join(', ');
        let idd = país.idd.root + (país.idd.suffixes.length > 0 ? `${país.idd.suffixes.join(', ')}` : '')

        return `
            <div class="pais-unico">
                <h2>${país.name.official}</h2>
                <img src='${país.flags.png}' class="bandeiras"></img>
                <h3>Capital: ${país.capital ? país.capital : 'N/A'}</h3>
                <h3>Região: ${país.region}</h3>
                <h3>Sub-região: ${país.subregion ? país.subregion : 'N/A'}</h3>
                <h3>População: ${país.population}</h3>
                <h3>Área: ${país.area} km²</h3>
                <h3>Idiomas falados: ${idiomas ? idiomas: 'N/A'}</h3>
                <h3>Moedas: ${moedas} </h3>
                <h3>Fuso horário: ${país.timezones.join(', ')}</h3>
                <h3>Domínio de Internet: ${país.tld.join(', ') ? país.tld : 'N/A'}</h3>
                <h3>Código de discagem internacional: ${idd}</h3>
            </div>  
        `;
    };
});
