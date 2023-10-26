let inputTarefa = document.querySelector('#inputTarefa')
let btnADD = document.querySelector('#btnADD')
let areaTarefa = document.querySelector('#areaTarefa')

let arrayTarefasLocal = []
let idLocalStorage

function recupararLocal() {
    console.log(localStorage.getItem('dbTarefa'))
    if(localStorage.getItem('dbTarefa') != null){
    // Recuperar a string do Local Storage
    const arrayString = localStorage.getItem('dbTarefa');
    // Converter a string de volta para um array JavaScript
    const meuArrayRecuperado = JSON.parse(arrayString);

    console.log('array recuperado do local quando a pagina iniciou ');
    console.log(meuArrayRecuperado);

    arrayTarefasLocal = meuArrayRecuperado
    idLocalStorage = arrayTarefasLocal.length

    console.log(`tamanho total do array ${idLocalStorage}`)
    console.log('array da sessao atual do local quando a pagina iniciou ');
    console.log(arrayTarefasLocal)

    for (let i = 0; i <= arrayTarefasLocal.length - 1; i++) {
      
        createItem(arrayTarefasLocal[i].tarefa, arrayTarefasLocal[i].id)
    }
 }
}
btnADD.addEventListener('click', () => {

    if (inputTarefa.value != '') {
        
        idLocalStorage = arrayTarefasLocal.length 
        console.log(arrayTarefasLocal)
        criar(inputTarefa.value, idLocalStorage + 1)
        localStoregSalvarA(inputTarefa.value, idLocalStorage + 1)
        inputTarefa.value = ''
        inputTarefa.focus()

    } else {
        alert('adicione um texto dentro na area recomendada')
    }

})
function excluir(eid) {
    
    let div = document.querySelector(`#d${eid}`)

    const found = arrayTarefasLocal.find((element) => element.id == eid);
    let pos = arrayTarefasLocal.indexOf(found) 
    arrayTarefasLocal.splice(pos, 1);
    console.log(arrayTarefasLocal)
    localStorage.removeItem("dbTarefa");
    // Converter o array em uma string JSON
    const arrayString = JSON.stringify(arrayTarefasLocal);
    // Armazenar a string no Local Storage com uma chave
    localStorage.setItem('dbTarefa', arrayString);
    areaTarefa.removeChild(div) 
}
function criar(tarefa,novoId){
    const found = arrayTarefasLocal.find((element) => element.id == 55);
    let pos = arrayTarefasLocal.indexOf(found) 
    if(pos == -1){
        createItem(tarefa, novoId)
    }else{
        alert('id duplicado')
    }
}
function editar(id) {
    const found = arrayTarefasLocal.find((element) => element.id == id);
    let pos = arrayTarefasLocal.indexOf(found) 


    let inputEditar = document.createElement('input')
    inputEditar.setAttribute('class','inputEdicao')
    let btnSalvarAlteracao = document.createElement('button')
    btnSalvarAlteracao.innerText = 'salvar'
    
    let divTarefa = document.querySelector(`#d${id}`)
    let label = document.querySelector(`#l${id}`)
    let areabtn = document.querySelector(`#s${id}`)
    areabtn.style.display = 'none'
    label.style.display = 'none'
    divTarefa.appendChild(inputEditar)
    divTarefa.appendChild(btnSalvarAlteracao)
    inputEditar.value = arrayTarefasLocal[pos].tarefa
    inputEditar.focus()

    btnSalvarAlteracao.setAttribute('onclick', `salvarEdicao(${pos})`)

  

}
function salvarEdicao(id) {
     let divTarefa = document.querySelector(`#d${arrayTarefasLocal[id].id}`)
    let label = document.querySelector(`#l${arrayTarefasLocal[id].id}`)
    let areabtn = document.querySelector(`#s${arrayTarefasLocal[id].id}`)
    let input = document.querySelector(`#d${arrayTarefasLocal[id].id} .inputEdicao`).value
    let btn = document.querySelector(`#d${arrayTarefasLocal[id].id} button`)
    arrayTarefasLocal[id].tarefa = input
    console.log(arrayTarefasLocal)
    localStorage.removeItem("dbTarefa");
    // Converter o array em uma string JSON
    const arrayString = JSON.stringify(arrayTarefasLocal);
    // Armazenar a string no Local Storage com uma chave
    localStorage.setItem('dbTarefa', arrayString);

    areaTarefa.removeChild(divTarefa)
    idLocalStorage = arrayTarefasLocal.length 
    criar(arrayTarefasLocal[id].tarefa,idLocalStorage+1)
    
    //label.innerText = input
  /*   console.log(divTarefa)
    divTarefa.removeChild(input)
    divTarefa.removeChild(btn)
    

    areabtn.style.display = 'flex'
    label.style.display = 'flex */



}
function feita(id) {
    let checkboxValue = true

    let divTarefa = document.querySelector(`#d${id}`)
    let input = document.querySelector(`#d${id} input`)
    
    //adiciona o valor atual do input para dentro da variavel checkboxValue
    checkboxValue = input.value
    //verifica se o valor atual do input é true 
    if(checkboxValue == 'true'){
        divTarefa.style.opacity = '50%'//deica a div meio apagada
        divTarefa.style.textDecoration = "line-through"
    checkboxValue = false//inverte o valor da variavel 
    input.value = `${checkboxValue}`//adiciona o valor invertido da variavel no input, para na proxima ele tirar o estilo da div
    }else if(checkboxValue == 'false'){
        divTarefa.style.opacity = '100%'
        divTarefa.style.textDecoration = "none"
        checkboxValue = true
        input.value = `${checkboxValue}`
    }

}

function createItem(txt, id) {

    // função que entrega um numero aliatorio de 0 a 100 que usamos ele para ser o id dos objetos criados dinamicamente 
    //let id=idR()
    //console.log(id)
    //criação da div principal, aonde todos outros itrem criados vao ficar posicionado dentro dela 
    let div = document.createElement('div')
    div.setAttribute('id', `d${id}`)

    //criação da bolinha de cheque
    let checkboxValueInicial = true//variavel que vai permitir no futuro varificar se foi concluida ou nao, por padrão ela começa nao complida
    let inputRadio = document.createElement('input')
    inputRadio.setAttribute('type', 'checkbox')
    inputRadio.setAttribute('id', `${id}`)
    inputRadio.setAttribute('name', `${id}`)
    inputRadio.setAttribute('value', `${checkboxValueInicial}`)
    inputRadio.setAttribute('onclick', `feita(${inputRadio.name})`)
    div.appendChild(inputRadio)

    //criação da do elemento que vai amazerna o texto da tarefa 
    let label = document.createElement('p')
    label.setAttribute('id', `l${id}`)
    label.setAttribute('class', `tarefaDinamica`)
  
    //adicionado dentro de um array a tarefa, o id serve para escolhermos o indece quie vai 
    //ser amazernado para no futuro poder alterar a string dentro desse id
    //arrayTarefas[id]= txt
    label.innerText = txt
    div.appendChild(label)

    //criação so span, aonde os botão vão ficar posicionado
    let span = document.createElement('span')
    span.setAttribute('id', `s${id}`)
    div.appendChild(span)

    //criação do botão editar
    let btnEditar = document.createElement('button')
    btnEditar.innerHTML = `<i class="fa-solid fa-pen"></i>`
    btnEditar.setAttribute('value', `${id}`)
    btnEditar.setAttribute('onclick', `editar(${btnEditar.value})`)
    span.appendChild(btnEditar)//adicionando o botão dentro do span 

    //criação do botão excluir
    let btnExcluir = document.createElement('button')
    btnExcluir.innerHTML = `<i class="fa-solid fa-trash"></i>`
    btnExcluir.setAttribute('value', `${id}`)
    btnExcluir.setAttribute('onclick', `excluir(${btnExcluir.value})`)
    span.appendChild(btnExcluir)//adicionando o botão dentro do span 

    areaTarefa.appendChild(div)


}
function localStoregSalvarA(tarefa, id) {
    arrayTarefasLocal.push
        ({
            tarefa: tarefa,
            id: id
        })

    // Converter o array em uma string JSON
    const arrayString = JSON.stringify(arrayTarefasLocal);

    // Armazenar a string no Local Storage com uma chave
    localStorage.setItem('dbTarefa', arrayString);

}

window.onload = recupararLocal()