let inputTarefa = document.querySelector('#inputTarefa')
let btnADD = document.querySelector('#btnADD')
let areaTarefa = document.querySelector('#areaTarefa')
let arrayTarefas = []

btnADD.addEventListener('click', ()=>{
    if(inputTarefa.value != ''){
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
    labelTarefa1.style.display = 'flex'
    //exbindo os botões de eidtar e excluir 
    spanBtns.style.display = 'flex'
}
let statusi = true
function feita(id){
    if(statusi == true){
    let idDiv = `#i${id}`
    let input = document.querySelector(`${idDiv}`)
    input.style.opacity = '60%'
    console.log(input) 
    statusi = false
    }else if(statusi == false){
        let idDiv = `#i${id}`
        let input = document.querySelector(`${idDiv}`)
        input.style.opacity = '100%'
        console.log(input) 
        statusi = true
    }
}
function createItem(txt){
    // função que entrega um numero aliatorio de 0 a 100 que usamos ele para ser o id dos objetos criados dinamicamente 
    let id=idR()

    //criação da div principal, aonde todos outros itrem criados vao ficar posicionado dentro dela 
    let div = document.createElement('div')
    div.setAttribute('id', `i${id}`)
   
    //criação da bolinha de cheque
    let inputRadio = document.createElement('input')
    inputRadio.setAttribute('type','radio')
    inputRadio.setAttribute('value', `${id}`)
    inputRadio.setAttribute('onclick', `feita(${inputRadio.value},)`)
    div.appendChild(inputRadio)

    //criação da do elemento que vai amazerna o texto da tarefa 
    let label = document.createElement('label')
    label.setAttribute('id', `L${id}`)
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
function localStoregSalvar(){}