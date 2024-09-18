const obterRestCountries = () => {
    // obter URL da API Rest;
    fetch('https://restcountries.com/v3.1/all').then(res => res.json()).then(data => {
        window.paisesOriginais = [...data];
        mostrarPaises(data);
    })
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

function ordenarPaises() { // Função para ordenar os países;
    const valorOrdenacao = document.querySelector('.ordenados.selecionado')?.getAttribute('value');
    if (!valorOrdenacao) return;

    window.paisesOriginais.sort((a, b) => {
        if (valorOrdenacao === 'nome-pais') {
            // Ordem Alfabética do nome comum;
            return a.name.common.localeCompare(b.name.common);
        } else if (valorOrdenacao === 'populacao-crescente') {
            // Ordenação crescente de população;
            return a.population - b.population;
        } else if (valorOrdenacao === 'populacao-decrescente') {
            // Ordem Decrescente de População
            return b.population - a.population;
        } else if (valorOrdenacao === 'area-pais-c') {
            // Ordem Crescente da área;
            return a.area - b.area;
        } else if (valorOrdenacao === 'area-pais-d') {
            // Ordem Decrescente da área;
            return b.area - a.area;
        }
    });

    mostrarPaises(window.paisesOriginais);
};

function mostrarOrdenacao() {
    const mostrar = document.getElementsByClassName('ordenados');
    const estiloBorda = document.getElementById('container-ordenacao');
    for (let i = 0; i < mostrar.length; i++) {
        mostrar[i].style.opacity = 0;
        mostrar[i].style.display = 'flex';
        mostrar[i].addEventListener('click', function (event) {
            const elementos = document.querySelectorAll('.ordenados');
            elementos.forEach(el => el.classList.remove('selecionado'));

            event.target.classList.add('selecionado');
            ordenarPaises();
        });
        setTimeout(() => {
            mostrar[i].style.opacity = 1;
        }, 50);
    };
};

function fecharOrdenacao() {
    const fechar = document.getElementsByClassName('ordenados');
    const estiloBorda = document.getElementById('container-ordenacao');
    for (let i = 0; i < fechar.length; i++) {
        fechar[i].style.opacity = 1;
        fechar[i].style.display = 'none';
        setTimeout(() => {
            fechar[i].style.opacity = 0;
        }, 50);
    };
};

obterRestCountries(); // chama a função inicial para que os dados sejam devidamente distribuídas;