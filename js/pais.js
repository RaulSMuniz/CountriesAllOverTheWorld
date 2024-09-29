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
        let idiomas = Object.values(país.languages || {}).join(', ') || 'N/A';
        let moedas = país.currencies ? Object.values(país.currencies).map(moeda => `[${moeda.symbol}] ${moeda.name}`).join(', ') : 'N/A';
        let idd = país.idd ? país.idd.root + (país.idd.suffixes.length > 0 ? `${país.idd.suffixes.join(', ')}` : '') : 'N/A';

        return `
            <div class="pais-unico">
                <h2 class="nome-pais">${país.name.official}</h2>
                <img src='${país.flags.png}' class="bandeiras"></img>
                <div class="info-geral">
                    <p>Capital: ${país.capital ? país.capital : 'N/A'}</p>
                    <p>Região: ${país.region}</p>
                    <p>Sub-região: ${país.subregion ? país.subregion : 'N/A'}</p>
                    <p>População: ${país.population.toLocaleString('pt-BR')} habitantes</p>
                    <p>Área: ${país.area.toLocaleString('pt-BR')} km²</p>
                    <p>Idiomas falados: ${idiomas ? idiomas : 'N/A'}</p>
                    <p>Moedas: ${moedas} </p>
                    <p>Fuso horário: ${país.timezones.join(', ')}</p>
                    <p>Domínio de Internet: ${país.tld.join(', ') ? país.tld : 'N/A'}</p>
                    <p>Código de discagem internacional: ${idd}</p>
                </div>
            </div>  
        `;
    };
});
