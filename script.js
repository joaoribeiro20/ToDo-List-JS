let inputTarefa = document.querySelector('#inputTarefa')
let btnADD = document.querySelector('#btnADD')
let areaTarefa = document.querySelector('#areaTarefa')
let arrayTarefas = []
let idLocalStorage = 0
btnADD.addEventListener('click', ()=>{
    let tarefa = inputTarefa.value
    if(inputTarefa.value != '' ){
    createItem(inputTarefa.value)
    inputTarefa.value = ''
    inputTarefa.focus()
    }else{
        alert('adicione um texto dentro na area recomendada')
    }
})
function excluir(id){
    console.log(id)
    let idDiv = `#i${id}`
    let txt = `#L${id}`
    
    let divExcluida = document.querySelector(`${idDiv}`)
    areaTarefa.removeChild(divExcluida) 
}
function editar(id){
    //criando o elemento que vai receber a tarefa editada 
    let inputEditar = document.createElement('input')
    inputEditar.setAttribute('id', `e${id}`)
    inputEditar.setAttribute('class', `divTarefa`)
    
    //pegando o texto que vai ser editado para esconder ele durante a edição 
    let labelTarefa1 = document.querySelector(`#L${id}`)
    labelTarefa1.style.display= 'none'//escondendo o texto antigo
    
    //pegando a div principal para adicionar novos elementos dentro dela 
    let div = document.querySelector(`#i${id}`)
    //pegando o span aonde fica os botoes para esconder eles
    let spanBtns = document.querySelector(`#S${id}`)
    spanBtns.style.display = 'none'//escondendo os botões

    //adicionado a area aonde vamos poder editar o texto
    div.appendChild(inputEditar)
    
    //pegando a tarefa antiga e colocando ela dentro da caixa de edição
    inputEditar.value = arrayTarefas[id]
    inputEditar.focus()

    //criando o botão salvar 
    let btnSalvar = document.createElement('button')
    btnSalvar.innerText = `Salvar`
    btnSalvar.setAttribute('value', `${id}`)
    btnSalvar.setAttribute('id', `b${id}`)
    btnSalvar.setAttribute('onclick', `salvarEdicao(${btnSalvar.value})`)
    div.appendChild(btnSalvar)//adicioando o botão na div principal 
}
function salvarEdicao(id){
    //pegando a div principal para poder manipular dnv os elementos dentro dela 
    let div = document.querySelector(`#i${id}`)

    //pegando o a caixa de edicao 
    let inputEditar = document.querySelector(`#e${id}`)
    //pegando a nova tarefa apos ser editada e salvando dentro da array com o mesmo id de antes
    let tarefaEditada = inputEditar.value
    if(tarefaEditada.length <=20){
         arrayTarefas[id] = inputEditar.value
    div.removeChild(inputEditar)

    //pegando o botão para esonder ele depois 
    let btnSalvar = document.querySelector(`#b${id}`)
    div.removeChild(btnSalvar)

    //pegando os elementos escondidos para rexibilos 
    
    let labelTarefa1 = document.querySelector(`#L${id}`)
    let spanBtns = document.querySelector(`#S${id}`)

    //pegando dentro do array atraves do id a tarefa editada e exibindo 
    labelTarefa1.innerText =  arrayTarefas[id]
    labelTarefa1.setAttribute('value',`${arrayTarefas[id]}`)
    labelTarefa1.style.display = 'flex'
    //exbindo os botões de eidtar e excluir 
    spanBtns.style.display = 'flex'
    }else{
        alert('tamanho do texto atualizado muito grande')
    }
   
}
function feita(id){
    let checkboxValue = true

    //pega o elemento div e input em especifico atraves do id 
    let idDiv = `#i${id}`
    let inp = `#in${id}`
    let div = document.querySelector(`${idDiv}`)
    let input = document.querySelector(`${inp}`)
    
    //adiciona o valor atual do input para dentro da variavel checkboxValue
    checkboxValue = input.value
    //verifica se o valor atual do input é true 
    if(checkboxValue == 'true'){
    div.style.opacity = '50%'//deica a div meio apagada
    checkboxValue = false//inverte o valor da variavel 
    input.value = `${checkboxValue}`//adiciona o valor invertido da variavel no input, para na proxima ele tirar o estilo da div
    }else if(checkboxValue == 'false'){
        div.style.opacity = '100%'
        checkboxValue = true
        input.value = `${checkboxValue}`
    }

}
function createItem(txt){
    // função que entrega um numero aliatorio de 0 a 100 que usamos ele para ser o id dos objetos criados dinamicamente 
    let id=idR()
    
    //criação da div principal, aonde todos outros itrem criados vao ficar posicionado dentro dela 
    let div = document.createElement('div')
    div.setAttribute('id', `i${id}`)
    
    //criação da bolinha de cheque
    let checkboxValueInicial = true//variavel que vai permitir no futuro varificar se foi concluida ou nao, por padrão ela começa nao complida
    let inputRadio = document.createElement('input')
    inputRadio.setAttribute('type','checkbox')
    inputRadio.setAttribute('id', `in${id}`)
    inputRadio.setAttribute('name', `${id}`)
    inputRadio.setAttribute('value', `${checkboxValueInicial}`)
    inputRadio.setAttribute('onclick', `feita(${inputRadio.name})`)
    div.appendChild(inputRadio)

    //criação da do elemento que vai amazerna o texto da tarefa 
    let label = document.createElement('p')
    label.setAttribute('id', `L${id}`)
    label.setAttribute('class', `tarefaDinamica`)
    label.setAttribute('value', `${txt}`)
    //adicionado dentro de um array a tarefa, o id serve para escolhermos o indece quie vai 
    //ser amazernado para no futuro poder alterar a string dentro desse id
    arrayTarefas[id]= txt
    label.innerText = txt
    div.appendChild(label)

    //criação so span, aonde os botão vão ficar posicionado
    let span = document.createElement('span')
    span.setAttribute('id', `S${id}`)
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
function idR(){
    //return Math.random();
   // return Math.random() * 20;
    return parseInt(Math.random() * 100)
}
function localStoregSalvar(){
 
}
function  localStoregSalvar(){
    // Converter o array em uma string JSON
const arrayString = JSON.stringify(array);

// Armazenar a string no Local Storage com uma chave
localStorage.setItem('dbTarefa', arrayString);
}
function recupararLocal(array){
// Recuperar a string do Local Storage
const arrayString = localStorage.getItem('dbTarefa');

// Converter a string de volta para um array JavaScript
const meuArrayRecuperado = JSON.parse(arrayString);

console.log(meuArrayRecuperado);
}
window.onload = localStoregSalvar()