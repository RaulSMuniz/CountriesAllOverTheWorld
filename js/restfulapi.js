const obterRestCountries = () => {
    // obter URL da API Rest;
    fetch('https://restcountries.com/v3.1/all').then(res => res.json()).then(data => {
        window.paisesOriginais = [...data];
        mostrarPaises(data);
    });
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
            <h3>Capital: ${país.capital ? país.capital : 'None'}</h3>
            <h3>Região: ${país.region}</h3>
            <h3>Sub-região: ${país.subregion ? país.subregion: 'None'}</h3>
        </div>
    `;
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
        };
    });
    mostrarPaises(window.paisesOriginais);
};

function mostrarOrdenacao() { // Função para mostrar o menu de ordenação;
    const mostrar = document.getElementsByClassName('ordenados');
    for (let i = 0; i < mostrar.length; i++) {
        mostrar[i].style.display = 'flex';
        mostrar[i].addEventListener('click', function (event) { // Adiciona função de click
            const elementos = document.querySelectorAll('.ordenados');
            elementos.forEach(el => el.classList.remove('selecionado'));

            event.target.classList.add('selecionado');
            ordenarPaises();
        });
    };
};

function fecharOrdenacao() { // Função para fechar o menu de ordenação;
    const fechar = document.getElementsByClassName('ordenados');
    for (let i = 0; i < fechar.length; i++) {
        fechar[i].style.display = 'none';
    };
};

/* Abaixo estão todas as funções sobre o Menu de Filtros */

function mostrarFiltros() { // Mostra o menu de filtros
    var mostrar = document.getElementsByClassName('filtrado');
    for (let i = 0; i < mostrar.length; i++) {
        mostrar[i].style.display = 'flex'
    };
};
function fecharFiltros() { // Fecha o menu de filtros
    const fechar = document.getElementsByClassName('filtrado');
    for (let i = 0; i < fechar.length; i++) {
        fechar[i].style.display = 'none';
    }
}

function mostrarFiltroReg() { // Mostra o menu de regiões (continentes)
    const mostrar = document.getElementsByClassName('regioes');
    for (let i = 0; i < mostrar.length; i++) {
        mostrar[i].style.display = 'flex';
        mostrar[i].addEventListener('click', (event) => { // Adiciona função de click
            const elementos = document.querySelectorAll('.regioes');
            elementos.forEach(el => el.classList.remove('selecionado'));

            event.target.classList.add('selecionado');
            filtrarRegioes();
        });
    };
};
function fecharFiltroReg(){ // Fecha o menu de regiões (continentes)
    const fechar = document.getElementsByClassName('regioes');
    for (let i = 0; i < fechar.length; i++){
        fechar[i].style.display = 'none';
    }
};
function mostrarFiltroSub() { // Função que mostra as opções de Regiões para só então mostrar sub-região
    const mostrar = document.getElementsByClassName('sub-regioes');
    const mostrarOceania = document.getElementsByClassName('oceania');
    const mostrarIlha = document.getElementsByClassName('ilhas-pacifico');
    for (let i = 0; i < mostrar.length; i++) { // Loop que mostra opções de Sub-Regiões
        mostrar[i].style.display = 'flex';
        mostrar[i].addEventListener('click', (event) => {
            const subReg = document.querySelectorAll('.sub-regioes');
            subReg.forEach(sR => sR.classList.remove('selecionado'));

            event.target.classList.add('selecionado');
            mostrarSubRegioes();
        });
    };
    for (let i = 0; i < 1; i++) {
        mostrarOceania[i].style.display = 'flex';
        mostrarIlha[i].style.display = 'flex';
    };
};

function fecharFiltroSub() { // Função que fecha as sub-regiões
    const fechar = document.getElementsByClassName('sub-regioes');
    const fecharSubAmerica = document.querySelectorAll('.sub-america');
    const fecharAfrica = document.querySelectorAll('.sub-africa');
    const fecharEuropa = document.querySelectorAll('.sub-europa');
    const fecharAsia = document.querySelectorAll('.sub-asia');
    const fecharOceania = document.querySelectorAll('.oceania');
    const fecharIlha = document.querySelectorAll('.ilhas-pacifico')
    // Fecha as sub-regiões
    for (let i = 0; i < fechar.length; i++) {
        fechar[i].style.display = 'none';
    };
    // Fecha sub-americas
    for (let i = 0; i < fecharSubAmerica.length; i++) {
        fecharSubAmerica[i].style.display = 'none';
    };
    // Fecha sub-africa
    for (let i = 0; i < fecharAfrica.length; i++) {
        fecharAfrica[i].style.display = 'none';
    };
    // Fecha sub-europa
    for (let i = 0; i < fecharEuropa.length; i++) {
        fecharEuropa[i].style.display = 'none';
    };

    // Fecha sub-asia
    for (let i = 0; i < fecharAsia.length; i++) {
        fecharAsia[i].style.display = 'none';
    };

    // Fecha oceania
    for (let i = 0; i < fecharOceania.length; i++) {
        fecharOceania[i].style.display = 'none';
    };

    // Fecha ilhas-pacifico
    for (let i = 0; i < fecharIlha.length; i++) {
        fecharIlha[i].style.display = 'none';
    };
}

function mostrarSubRegioes() { // Função que mostra as sub-regiões existentes em uma região
    const valorSubReg = document.querySelector('.sub-regioes.selecionado')?.getAttribute('value');
    const fecharSubAmerica = document.querySelectorAll('.sub-america');
    const fecharAfrica = document.querySelectorAll('.sub-africa');
    const fecharEuropa = document.querySelectorAll('.sub-europa');
    const fecharAsia = document.querySelectorAll('.sub-asia');
    if (!valorSubReg) return;

    if (valorSubReg === 'americas') { // Mostra as sub-regiões da América
        const mostrar = document.getElementsByClassName('sub-america');
        for (let i = 0; i < mostrar.length; i++) {
            mostrar[i].style.display = 'flex';
            mostrar[i].addEventListener('click', (event) => { 
                const elementosEU = document.querySelectorAll('.sub-europa');
                const elementosAM = document.querySelectorAll('.sub-america');
                const elementosAF = document.querySelectorAll('.sub-africa');
                const elementosAS = document.querySelectorAll('.sub-asia');
                const elementosOC = document.querySelectorAll('.oceania');
                const elementosIP = document.querySelectorAll('.ilhas-pacifico');
                elementosEU.forEach(eu => eu.classList.remove('selecionado'));
                elementosAM.forEach(eu => eu.classList.remove('selecionado'));
                elementosAF.forEach(eu => eu.classList.remove('selecionado'));
                elementosAS.forEach(eu => eu.classList.remove('selecionado'));
                elementosOC.forEach(eu => eu.classList.remove('selecionado'));
                elementosIP.forEach(eu => eu.classList.remove('selecionado'));

                event.target.classList.add('selecionado');
                filtrarAmerica();
            });
        };
        // Fecha sub-africa
        for (let i = 0; i < fecharAfrica.length; i++) {
            fecharAfrica[i].style.display = 'none';
        };
        // Fecha sub-europa
        for (let i = 0; i < fecharEuropa.length; i++) {
            fecharEuropa[i].style.display = 'none';
        };
        // Fecha sub-asia
        for (let i = 0; i < fecharAsia.length; i++) {
            fecharAsia[i].style.display = 'none';
        };
    } else if (valorSubReg === 'africa') { // Mostra as sub-regiões da África
        const mostrar = document.getElementsByClassName('sub-africa');
        for (let i = 0; i < mostrar.length; i++) {
            mostrar[i].style.display = 'flex';
            mostrar[i].addEventListener('click', (event) => {
                const elementosEU = document.querySelectorAll('.sub-europa');
                const elementosAM = document.querySelectorAll('.sub-america');
                const elementosAF = document.querySelectorAll('.sub-africa');
                const elementosAS = document.querySelectorAll('.sub-asia');
                const elementosOC = document.querySelectorAll('.oceania');
                const elementosIP = document.querySelectorAll('.ilhas-pacifico');
                elementosEU.forEach(eu => eu.classList.remove('selecionado'));
                elementosAM.forEach(eu => eu.classList.remove('selecionado'));
                elementosAF.forEach(eu => eu.classList.remove('selecionado'));
                elementosAS.forEach(eu => eu.classList.remove('selecionado'));
                elementosOC.forEach(eu => eu.classList.remove('selecionado'));
                elementosIP.forEach(eu => eu.classList.remove('selecionado'));

                event.target.classList.add('selecionado');
                filtrarAfrica();
            });
        };
        // Fecha sub-americas
        for (let i = 0; i < fecharSubAmerica.length; i++) {
            fecharSubAmerica[i].style.display = 'none';
        };
        // Fecha sub-europa
        for (let i = 0; i < fecharEuropa.length; i++) {
            fecharEuropa[i].style.display = 'none';
        };
        // Fecha sub-asia
        for (let i = 0; i < fecharAsia.length; i++) {
            fecharAsia[i].style.display = 'none';
        };
    } else if (valorSubReg === 'asia') { // Mostra as sub-regiões da Ásia
        const mostrar = document.getElementsByClassName('sub-asia');
        for (let i = 0; i < mostrar.length; i++) {
            mostrar[i].style.display = 'flex';
            mostrar[i].addEventListener('click', (event) => {
                const elementosEU = document.querySelectorAll('.sub-europa');
                const elementosAM = document.querySelectorAll('.sub-america');
                const elementosAF = document.querySelectorAll('.sub-africa');
                const elementosAS = document.querySelectorAll('.sub-asia');
                const elementosOC = document.querySelectorAll('.oceania');
                const elementosIP = document.querySelectorAll('.ilhas-pacifico');
                elementosEU.forEach(eu => eu.classList.remove('selecionado'));
                elementosAM.forEach(eu => eu.classList.remove('selecionado'));
                elementosAF.forEach(eu => eu.classList.remove('selecionado'));
                elementosAS.forEach(eu => eu.classList.remove('selecionado'));
                elementosOC.forEach(eu => eu.classList.remove('selecionado'));
                elementosIP.forEach(eu => eu.classList.remove('selecionado'));

                event.target.classList.add('selecionado');
                filtrarAsia();
            });
        };
        // Fecha sub-americas
        for (let i = 0; i < fecharSubAmerica.length; i++) {
            fecharSubAmerica[i].style.display = 'none';
        };
        // Fecha sub-africa
        for (let i = 0; i < fecharAfrica.length; i++) {
            fecharAfrica[i].style.display = 'none';
        };
        // Fecha sub-europa
        for (let i = 0; i < fecharEuropa.length; i++) {
            fecharEuropa[i].style.display = 'none';
        };
    } else if (valorSubReg === 'europa') { // Mostra as sub-regiões da Europa
        const mostrar = document.getElementsByClassName('sub-europa');
        for (let i = 0; i < mostrar.length; i++) {
            mostrar[i].style.display = 'flex';
            mostrar[i].addEventListener('click', (event) => {
                const elementosEU = document.querySelectorAll('.sub-europa');
                const elementosAM = document.querySelectorAll('.sub-america');
                const elementosAF = document.querySelectorAll('.sub-africa');
                const elementosAS = document.querySelectorAll('.sub-asia');
                const elementosOC = document.querySelectorAll('.oceania');
                const elementosIP = document.querySelectorAll('.ilhas-pacifico');
                elementosEU.forEach(eu => eu.classList.remove('selecionado'));
                elementosAM.forEach(eu => eu.classList.remove('selecionado'));
                elementosAF.forEach(eu => eu.classList.remove('selecionado'));
                elementosAS.forEach(eu => eu.classList.remove('selecionado'));
                elementosOC.forEach(eu => eu.classList.remove('selecionado'));
                elementosIP.forEach(eu => eu.classList.remove('selecionado'));

                event.target.classList.add('selecionado');
                filtrarEuropa();
            });
        };
        // Fecha sub-americas
        for (let i = 0; i < fecharSubAmerica.length; i++) {
            fecharSubAmerica[i].style.display = 'none';
        };
        // Fecha sub-africa
        for (let i = 0; i < fecharAfrica.length; i++) {
            fecharAfrica[i].style.display = 'none';
        };
        // Fecha sub-asia
        for (let i = 0; i < fecharAsia.length; i++) {
            fecharAsia[i].style.display = 'none';
        };
    } else if (valorSubReg === 'oceania') {
        const mostrar = document.getElementsByClassName('oceania');
        for (let i = 0; i < mostrar.length; i++) {
            mostrar[i].style.display = 'flex';
            mostrar[i].addEventListener('click', (event) => {
                const elementosEU = document.querySelectorAll('.sub-europa');
                const elementosAM = document.querySelectorAll('.sub-america');
                const elementosAF = document.querySelectorAll('.sub-africa');
                const elementosAS = document.querySelectorAll('.sub-asia');
                const elementosOC = document.querySelectorAll('.oceania');
                const elementosIP = document.querySelectorAll('.ilhas-pacifico');
                elementosEU.forEach(eu => eu.classList.remove('selecionado'));
                elementosAM.forEach(eu => eu.classList.remove('selecionado'));
                elementosAF.forEach(eu => eu.classList.remove('selecionado'));
                elementosAS.forEach(eu => eu.classList.remove('selecionado'));
                elementosOC.forEach(eu => eu.classList.remove('selecionado'));
                elementosIP.forEach(eu => eu.classList.remove('selecionado'));

                event.target.classList.add('selecionado');
                filtrarOceania();
            });
        };
    } else if (valorSubReg === 'ilhas') {
        const mostrar = document.getElementsByClassName('ilhas-pacifico');
        for (let i = 0; i < mostrar.length; i++) {
            mostrar[i].style.display = 'flex';
            mostrar[i].addEventListener('click', (event) => {
                const elementosEU = document.querySelectorAll('.sub-europa');
                const elementosAM = document.querySelectorAll('.sub-america');
                const elementosAF = document.querySelectorAll('.sub-africa');
                const elementosAS = document.querySelectorAll('.sub-asia');
                const elementosOC = document.querySelectorAll('.oceania');
                const elementosIP = document.querySelectorAll('.ilhas-pacifico');
                elementosEU.forEach(eu => eu.classList.remove('selecionado'));
                elementosAM.forEach(eu => eu.classList.remove('selecionado'));
                elementosAF.forEach(eu => eu.classList.remove('selecionado'));
                elementosAS.forEach(eu => eu.classList.remove('selecionado'));
                elementosOC.forEach(eu => eu.classList.remove('selecionado'));
                elementosIP.forEach(eu => eu.classList.remove('selecionado'));

                event.target.classList.add('selecionado');
                filtrarIlhas();
            });
        };
    };
};

function mostrarFiltroP() { // Mostra o filtro de população
    const mostrar = document.getElementsByClassName('tamanho-populacao');
    for (let i = 0; i < mostrar.length; i++) {
        mostrar[i].style.display = 'flex';
        mostrar[i].addEventListener('click', function (event) { // Adiciona função de click
            const elementos = querySelectorAll('.tamanho-populacao');
            elementos.forEach(el => el.classList.remove('selecionado'));

            event.target.classList.add('selecionado');
            filtrarTamanhoPopulacao();
        });
    };
};
function fecharFiltroP() { // Fecha o filtro de população
    const fechar = document.getElementsByClassName('tamanho-populacao');
    for (let i = 0; i < fechar.length; i++) {
        fechar[i].style.display = 'none';
    }
}

function filtrarRegioes() { // Função para filtrar por continente;
    // pendente
}

// condicionais pendentes abaixo;
function filtrarTamanhoPopulacao() { // Função para filtrar por interavalos de população;
    const valorTamanhoPopulacao = document.querySelector('.tamanho-populacao.selecionado')?.getAttribute('value');
    if (!valorTamanhoPopulacao) return;

    if (valorTamanhoPopulacao === 'menor-1m'){

    } else if (valorTamanhoPopulacao === 'menor-10m'){

    } else if (valorTamanhoPopulacao === 'menor-100m'){

    } else if (valorTamanhoPopulacao === 'maior-100m'){

    };
}
obterRestCountries(); // chama a função inicial para que os dados sejam devidamente distribuídos;