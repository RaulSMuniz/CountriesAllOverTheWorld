let paginaAtual = 1;
const itensPorPagina = 3;
let paisesPaginados = [];
let paisesFiltrados = [];

const obterRestCountries = (pagina = 1) => {
    // obter URL da API Rest;
    fetch(`https://restcountries.com/v3.1/all`).then(res => res.json()).then(data => {
        window.paisesOriginais = data; // Impede da paginação acumular
        paisesPaginados = data;
        mostrarPaises();
        atualizarPaginacao()
    });
};

const mostrarPaises = (paises = paisesFiltrados.length > 0 ? paisesFiltrados : paisesPaginados) => {
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const paisesParaMostrar = paises.slice(inicio, fim);

    const countryHTML = paisesParaMostrar.map(país => obterPaises(país)).join(' ');
    const div = document.getElementById('países');
    div.innerHTML = countryHTML;

    const todosPaises = div.querySelectorAll('.pais-info');
    todosPaises.forEach(paises => {
        paises.addEventListener('click', () => {
            const nomeDoPais = paises.getAttribute('nome-ingles');
            window.location.href = `pais.html?name=${encodeURIComponent(nomeDoPais)}`;
        });
    });
};

const atualizarPaginacao = (paises = paisesFiltrados.length > 0 ? paisesFiltrados : window.paisesOriginais) => {
    const totalPaginas = Math.ceil(paises.length / itensPorPagina);
    const paginacaoDiv = document.getElementById('paginacao');

    // Atualiza o texto da página atual
    paginacaoDiv.querySelector('span').textContent = `Página ${paginaAtual} / ${totalPaginas}`;

    // Verifica se existem botões de anterior e próximo
    const btnAnterior = paginacaoDiv.querySelector('#anterior');
    const btnProximo = paginacaoDiv.querySelector('#proximo');

    // Habilita ou desabilita os botões
    btnAnterior.disabled = paginaAtual === 1;
    btnProximo.disabled = paginaAtual === totalPaginas;

    btnAnterior.onclick = () => {
        if (paginaAtual > 1) {
            paginaAtual--;
            mostrarPaises(paises);
            atualizarPaginacao(paises);
        }
    };

    btnProximo.onclick = () => {
        if (paginaAtual < totalPaginas) {
            paginaAtual++;
            mostrarPaises(paises);
            atualizarPaginacao(paises);
        }
    };
};

const obterPaises = (país) => { // Cria o HTML com as informações gerais da Aplicação Web;
    return `
        <div class="pais-info" nome-ingles="${país.name.common}">
            <h2 class="nome-pais">${país.translations.por.common}</h2>
            
            <div class="info-pais">
                <img src='${país.flags.png}' class="bandeiras"></img>
                <h3>Capital: ${país.capital ? país.capital : 'None'}</h3>
                <h3>Região: ${país.region}</h3>
            </div>
        </div>
    `;
};

// Abaixo está a função para buscar os países pelo nome
document.getElementById('form').addEventListener('input', (event) => {
    // Impede a página de recarregar quando buscar um valor.
    event.preventDefault();
    // Armazena o input
    const input = document.getElementById('buscar-países');
    // Armazena o valor do input em letras minúsculas e sem espaços extras.
    const paisEscolhido = input.value.trim().toLowerCase();
    // Busca em window.paisesOriginais o pais escolhido.
    // Nota: compara apenas letras minúsculas, previnindo erro de 'case sensivity'.
    const paisBuscado = paisesFiltrados.length > 0 ? paisesFiltrados : window.paisesOriginais.filter(
        pais => pais.name.common.toLowerCase().includes(paisEscolhido) || pais.translations.por.common.toLowerCase().includes(paisEscolhido)
    );

    if (paisEscolhido === '') {
        mostrarPaises(window.paisesOriginais);
        atualizarPaginacao(window.paisesOriginais);
        return;
    }
    if (paisBuscado.length === 0) {
        paginaAtual = 1;
        mostrarPaises([]);
        atualizarPaginacao([]);
    } else {
        paginaAtual = 1;
        mostrarPaises(paisBuscado);
        atualizarPaginacao(paisBuscado);
    };
    setTimeout(() => {
        input.placeholder = 'Buscar País.';
    }, 2000);
});

// Abaixo estão todas as funções sobre o menu de ordenação
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
function mostrarPopulacao() {
    const mostrar = document.getElementsByClassName('populacao');
    for (let i = 0; i < mostrar.length; i++) {
        mostrar[i].style.display = 'flex';
        mostrar[i].addEventListener('click', (event) => {
            const elementosSelecionados = document.querySelectorAll('.ordenados.selecionado, .populacao.selecionado, .area-pais.selecionado');
            elementosSelecionados.forEach(el => el.classList.remove('selecionado'));

            event.target.classList.add('selecionado');
            ordenarPaises();
        });
    }
}

function fecharPopulacao() {
    const fechar = document.getElementsByClassName('populacao');
    for (let i = 0; i < fechar.length; i++) {
        fechar[i].style.display = 'none';
    }
}

function mostrarArea() {
    const mostrar = document.getElementsByClassName('area-pais');
    for (let i = 0; i < mostrar.length; i++) {
        mostrar[i].style.display = 'flex';
        mostrar[i].addEventListener('click', (event) => {
            const elementosSelecionados = document.querySelectorAll('.ordenados.selecionado, .populacao.selecionado, .area-pais.selecionado');
            elementosSelecionados.forEach(el => el.classList.remove('selecionado'));

            event.target.classList.add('selecionado');
            ordenarPaises();
        });
    };
};

function fecharArea() {
    const fechar = document.getElementsByClassName('area-pais');
    for (let i = 0; i < fechar.length; i++) {
        fechar[i].style.display = 'none';
    };
};

function ordenarPaises() {
    const valorOrdenacao = document.querySelector('.ordenados.selecionado, .populacao.selecionado, .area-pais.selecionado')?.getAttribute('value');
    if (!valorOrdenacao) return;

    const paisesParaOrdenar = paisesFiltrados.length > 0 ? paisesFiltrados : window.paisesOriginais;

    paisesParaOrdenar.sort((a, b) => {
        if (valorOrdenacao === 'nome-pais') {
            // Ordem Alfabética do nome comum;
            paginaAtual = 1;
            return a.name.common.localeCompare(b.name.common);
        } else if (valorOrdenacao === 'populacao-crescente') {
            // Ordenação crescente de população;
            paginaAtual = 1;
            return a.population - b.population;
        } else if (valorOrdenacao === 'populacao-decrescente') {
            // Ordem Decrescente de População;
            paginaAtual = 1;
            return b.population - a.population;
        } else if (valorOrdenacao === 'area-pais-c') {
            // Ordem Crescente da área;
            paginaAtual = 1;
            return a.area - b.area;
        } else if (valorOrdenacao === 'area-pais-d') {
            // Ordem Decrescente da área;
            paginaAtual = 1;
            return b.area - a.area;
        };
    });
    // Exibe os países ordenados (filtrados ou não)
    mostrarPaises(paisesParaOrdenar);
    // Atualiza a paginação com base nos países ordenados
    atualizarPaginacao(paisesParaOrdenar);
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
            const regiao = event.target.getAttribute('value');
            if (regiao === 'regiao-africa') {
                filtrarRegioes('Africa');
            } else if (regiao === 'regiao-america') {
                filtrarRegioes('Americas');
            } else if (regiao === 'regiao-asia') {
                filtrarRegioes('Asia');
            } else if (regiao === 'regiao-europa') {
                filtrarRegioes('Europe');
            } else if (regiao === 'regiao-oceania') {
                filtrarRegioes('Oceania');
            } else if (regiao === 'regiao-antartida') {
                filtrarRegioes('Antarctic');
            }
        });
    };
};
function fecharFiltroReg() { // Fecha o menu de regiões (continentes)
    const fechar = document.getElementsByClassName('regioes');
    for (let i = 0; i < fechar.length; i++) {
        fechar[i].style.display = 'none';
    }
};
function mostrarFiltroSub() { // Função que mostra as opções de Regiões para só então mostrar sub-região
    const mostrar = document.getElementsByClassName('sub-regioes');
    for (let i = 0; i < mostrar.length; i++) { // Loop que mostra opções de Sub-Regiões
        mostrar[i].style.display = 'flex';
        mostrar[i].addEventListener('click', (event) => {
            const subReg = document.querySelectorAll('.sub-regioes');
            subReg.forEach(sR => sR.classList.remove('selecionado'));

            event.target.classList.add('selecionado');
            mostrarSubRegioes();
        });
    };
};

function fecharFiltroSub() { // Função que fecha as sub-regiões
    const fecharSub = document.querySelectorAll('.sub-regioes');
    const fecharSubRegioes = document.querySelectorAll('.sub-america, .sub-africa, .sub-asia, .sub-europa, .oceania');

    for (let i = 0; i < fecharSub.length; i++) { // Fecha as opções que mostram mais opções de sub-regiões
        fecharSub[i].style.display = 'none';
    };
    fecharSubRegioes.forEach(subReg => { // Fecham as sub-regiões específicas
        subReg.style.display = 'none';
    });
};

function mostrarSubRegioes() { // Função que mostra as sub-regiões existentes em uma região
    const valorSubReg = document.querySelector('.sub-regioes.selecionado')?.getAttribute('value');
    if (!valorSubReg) return;

    if (valorSubReg === 'americas') { // Mostra as sub-regiões da América
        const mostrar = document.getElementsByClassName('sub-america');
        for (let i = 0; i < mostrar.length; i++) {
            mostrar[i].style.display = 'flex';
            mostrar[i].addEventListener('click', (event) => {
                const elementos = document.querySelectorAll('.sub-america, .sub-africa, .sub-asia, .sub-europa, .oceania');
                elementos.forEach(eu => eu.classList.remove('selecionado'));

                event.target.classList.add('selecionado');
                const subRegiaoEscolhida = event.target.getAttribute('value');
                if (subRegiaoEscolhida === 'america-norte') {
                    filtrarSubRegioes('North America');
                } else if (subRegiaoEscolhida === 'america-central') {
                    filtrarSubRegioes('Central America');
                } else if (subRegiaoEscolhida === 'america-sul') {
                    filtrarSubRegioes('South America');
                } else if (subRegiaoEscolhida === 'america-caribe') {
                    filtrarSubRegioes('Caribbean');
                };
            });
        };
        const fecharResto = document.querySelectorAll('.sub-africa, .sub-asia, .sub-europa, .oceania');
        fecharResto.forEach(fR => fR.style.display = 'none');
    } else if (valorSubReg === 'africa') { // Mostra as sub-regiões da África
        const mostrar = document.getElementsByClassName('sub-africa');
        for (let i = 0; i < mostrar.length; i++) {
            mostrar[i].style.display = 'flex';
            mostrar[i].addEventListener('click', (event) => {
                const elementos = document.querySelectorAll('.sub-america, .sub-africa, .sub-asia, .sub-europa, .oceania');
                elementos.forEach(eu => eu.classList.remove('selecionado'));

                event.target.classList.add('selecionado');
                const subRegiaoEscolhida = event.target.getAttribute('value');
                if (subRegiaoEscolhida === 'africa-norte') {
                    filtrarSubRegioes('Northern Africa');
                } else if (subRegiaoEscolhida === 'africa-central') {
                    filtrarSubRegioes('Middle Africa');
                } else if (subRegiaoEscolhida === 'africa-sul') {
                    filtrarSubRegioes('Southern Africa');
                } else if (subRegiaoEscolhida === 'africa-ocidente') {
                    filtrarSubRegioes('Western Africa');
                } else if (subRegiaoEscolhida === 'africa-oriente') {
                    filtrarSubRegioes('Eastern Africa');
                };
            });
        };
        const fecharResto = document.querySelectorAll('.sub-america, .sub-asia, .sub-europa, .oceania');
        fecharResto.forEach(fR => fR.style.display = 'none');
    } else if (valorSubReg === 'asia') { // Mostra as sub-regiões da Ásia
        const mostrar = document.getElementsByClassName('sub-asia');
        for (let i = 0; i < mostrar.length; i++) {
            mostrar[i].style.display = 'flex';
            mostrar[i].addEventListener('click', (event) => {
                const elementos = document.querySelectorAll('.sub-america, .sub-africa, .sub-asia, .sub-europa, .oceania');
                elementos.forEach(eu => eu.classList.remove('selecionado'));

                event.target.classList.add('selecionado');
                const subRegiaoEscolhida = event.target.getAttribute('value');
                if (subRegiaoEscolhida === 'asia-central') {
                    filtrarSubRegioes('Central Asia');
                } else if (subRegiaoEscolhida === 'asia-oriente') {
                    filtrarSubRegioes('Eastern Asia');
                } else if (subRegiaoEscolhida === 'asia-ocidente') {
                    filtrarSubRegioes('Western Asia');
                } else if (subRegiaoEscolhida === 'asia-sudeste') {
                    filtrarSubRegioes('South-Eastern Asia');
                } else if (subRegiaoEscolhida === 'asia-sul') {
                    filtrarSubRegioes('Southern Asia');
                };
            });
        };
        const fecharResto = document.querySelectorAll('.sub-america, .sub-africa, .sub-europa, .oceania');
        fecharResto.forEach(fR => fR.style.display = 'none');
    } else if (valorSubReg === 'europa') { // Mostra as sub-regiões da Europa
        const mostrar = document.getElementsByClassName('sub-europa');
        for (let i = 0; i < mostrar.length; i++) {
            mostrar[i].style.display = 'flex';
            mostrar[i].addEventListener('click', (event) => {
                const elementos = document.querySelectorAll('.sub-america, .sub-africa, .sub-asia, .sub-europa, .oceania');
                elementos.forEach(eu => eu.classList.remove('selecionado'));

                event.target.classList.add('selecionado');
                const subRegiaoEscolhida = event.target.getAttribute('value');
                if (subRegiaoEscolhida === 'europa-oriente') {
                    filtrarSubRegioes('Eastern Europe');
                } else if (subRegiaoEscolhida === 'europa-ocidente') {
                    filtrarSubRegioes('Western Europe');
                } else if (subRegiaoEscolhida === 'europa-norte') {
                    filtrarSubRegioes('Northern Europe');
                } else if (subRegiaoEscolhida === 'europa-sul') {
                    filtrarSubRegioes('Southern Europe');
                } else if (subRegiaoEscolhida === 'europa-central') {
                    filtrarSubRegioes('Central Europe');
                };
            });
        };
        const fecharResto = document.querySelectorAll('.sub-america, .sub-africa, .sub-asia, .oceania');
        fecharResto.forEach(fR => fR.style.display = 'none');
    } else if (valorSubReg === 'oceania') {
        const mostrar = document.getElementsByClassName('oceania');
        for (let i = 0; i < mostrar.length; i++) {
            mostrar[i].style.display = 'flex';
            mostrar[i].addEventListener('click', (event) => {
                const elementos = document.querySelectorAll('.sub-america, .sub-africa, .sub-asia, .sub-europa, .oceania');
                elementos.forEach(eu => eu.classList.remove('selecionado'));

                event.target.classList.add('selecionado');
                const subRegiaoEscolhida = event.target.getAttribute('value');
                if (subRegiaoEscolhida === 'polinesia') {
                    filtrarSubRegioes('Polynesia');
                } else if (subRegiaoEscolhida === 'melanesia') {
                    filtrarSubRegioes('Melanesia');
                } else if (subRegiaoEscolhida === 'micronesia') {
                    filtrarSubRegioes('Micronesia');
                }
            });
        };
        const fecharResto = document.querySelectorAll('.sub-america, .sub-africa, .sub-europa, .sub-asia');
        fecharResto.forEach(fR => fR.style.display = 'none');
    };
};

function mostrarFiltroP() { // Mostra o filtro de população
    const mostrar = document.getElementsByClassName('tamanho-populacao');
    for (let i = 0; i < mostrar.length; i++) {
        mostrar[i].style.display = 'flex';
        mostrar[i].addEventListener('click', function (event) { // Adiciona função de click
            const elementos = document.querySelectorAll('.tamanho-populacao');
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

function filtrarRegioes(regiao) {
    const paisesFiltrados = window.paisesOriginais.filter(pais => pais.region === regiao);
    paginaAtual = 1;
    mostrarPaises(paisesFiltrados);
    atualizarPaginacao(paisesFiltrados);
}

function filtrarSubRegioes(subRegiao) { // Função para filtrar por sub-regiões de continente;
    const paisesFiltrados = window.paisesOriginais.filter(pais => pais.subregion === subRegiao);
    paginaAtual = 1;
    mostrarPaises(paisesFiltrados);
    atualizarPaginacao(paisesFiltrados);
};

// Filtro por intervalo de população finalizado;
function filtrarTamanhoPopulacao() { // Função para filtrar por interavalos de população;
    const valorTamanhoPopulacao = document.querySelector('.tamanho-populacao.selecionado')?.getAttribute('value');
    let intervaloPopulacao = {};
    if (!valorTamanhoPopulacao) return;


    if (valorTamanhoPopulacao === 'menor-1m') {
        intervaloPopulacao = { min: 0, max: 1000000 }; // menos de 1 milhão
    } else if (valorTamanhoPopulacao === 'menor-10m') {
        intervaloPopulacao = { min: 1000000, max: 10000000 }; // menos de 10 milhões
    } else if (valorTamanhoPopulacao === 'menor-100m') {
        intervaloPopulacao = { min: 10000000, max: 100000000 }; // menos de 100 milhões
    } else if (valorTamanhoPopulacao === 'maior-100m') {
        intervaloPopulacao = { min: 100000000 }; // mais de 100 milhões
    };

    const paisesFiltrados = window.paisesOriginais.filter(pais => {
        return pais.population >= intervaloPopulacao.min &&
            (intervaloPopulacao.max ? pais.population <= intervaloPopulacao.max : true);
    });
    paginaAtual = 1;
    mostrarPaises(paisesFiltrados);
    atualizarPaginacao(paisesFiltrados);
};

// Abaixo está a função que reseta todos os filtros/ordenações
function resetarFiltros() {
    window.history.go(0);
};

obterRestCountries(paginaAtual); // chama a função inicial para que os dados sejam devidamente distribuídos;