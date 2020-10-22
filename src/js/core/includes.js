import $ from 'jquery'

const loadHtmlSuccessCallback = []

export function onLoadHtmlSuccess(callback) {
    // Se a calback não estiver no array
    if(!loadHtmlSuccessCallback.includes(callback)) {
        loadHtmlSuccessCallback.push(callback)
    }
}

// Função para ler todos atributos com wm-include
function loadIncludes(parent) {
    if(!parent) parent = 'body'
    // procure dentro do parent que possuem propriedade wm-include
    $(parent).find('[wm-include]').each(function(idx, elem) {
        // Url será todo elemento que possui wm-include
        const url = $(elem).attr('wm-include')
        // Realizando chamada Ajax
        $.ajax({
            url,
            success(data) {
                // Pega resultado obtido e coloca dentro do elemento e depois remove a propriedade wm-includes
                $(elem).html(data)
                $(elem).removeAttr('wm-include')

                // Carregando todos os elementos includes
                loadHtmlSuccessCallback.forEach(callback => callback(data))
                loadIncludes(elem)
            }
        })
    })
}

loadIncludes()