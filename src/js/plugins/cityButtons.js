import $ from 'jquery'

import { onLoadHtmlSuccess } from '../core/includes'

const duration = 300

function filterByCity(city) {
    // Filtrando elementos que possuem a propriedade wm-city
    $('[wm-city').each(function (idx, elem) {
        // Se for verdadeiro cidade exibida e falso cidade escondida
        const isTarget = $(this).attr('wm-city') === city
            || city === null
        // Se for a cidade Fade in se não, fade out. Se null, exibirá todas as cidades.
        if (isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}

$.fn.cityButtons = function () {
    // Usando set para não repetir o nome da cidade
    const cities = new Set
    $('[wm-city').each(function (idx, elem) {
        // Colocando nome da cidade dentro de Set
        cities.add($(elem).attr('wm-city'))
    })

    const btns = Array.from(cities).map(city => {
        const btn = $('<button>')
            // Adicionando classe para botão e adicionando nome da cidade como conteúdo.
            .addClass(['btn', 'btn-info']).html(city)
        // Ao clique, chamando a função criada para filtrar a cidade.
        btn.click(elem => filterByCity(city))
        return btn
    })

    // Botão para filtrar todas as cidades! Quando valor for nulo.
    const btnAll = $('<button>')
        .addClass(['btn', 'btn-info', 'active']).html('Todas')
    btnAll.click(elem => filterByCity(null))
    btns.push(btnAll)

    const btnGroup = $('<div>').addClass(['btn-group'])
    btnGroup.append(btns)

    $(this).html(btnGroup)
    return this
}

onLoadHtmlSuccess(function()  {
    $('[wm-city-buttons]').cityButtons()
})
