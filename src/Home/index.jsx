/*no react existe funções retornando HTML 
(conteúdo que vai ser renderizado na tela do urusário)

Usar "fragmentos" (<> </>)
- a função so aceita um elemento!
- agora a função recebe um pacote de elementos (três itens ou mais)
- pode utilizar uma "div" para "embrulhar" os elementos

*/

//criando estado
/*
é um HOOK!!
- hooks são funções que permite ligar, conectar os recursos
de estado e ciclo de vida do react para componentes funcionais
- orientações da atualidade é que sejam criados projetos com
componentes funcionais
- utilizar funções de forma simples, independentes e flexíveis
- lida com ciclo de vida de forma simples

"useState" - armazena estados e a cada ciclo seja conectada quando o conteúdo muda
*/
import React, { useState, useEffect } from 'react';

import './styles.css';
import { Card } from '../components/Card'

export function Home() {

  /*
  variável com conteúdo vazio
  - variável comum não tem o poder de refletir na interface
  usar conteúdo de varíavel para refletir na interface
  
  let studentName = ''

  adicionando nomes na lista
  conteúdo de uma variável em "h1" é usando com "{}"
  
  function handleNameChange(name) {
    studentName = name
  }
  */

  /*
  Estado (possui dois elementos)
  - Nome
  - Função, estado (qualquer nome)
  - useState: mostra dois elementos importantes
  - studentName: armazena o nome
  - seStudentName: função que atualiza o estado
  */
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({ name: '', avatar: ''})


  //toda vez que chamar esta função, irá criar um novo objeto
  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      //pega o horário atual (verdadeiro)
      time: new Date().toLocaleTimeString("pt-br", {
        //formatação da hora
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }

    /*
    Atualizando listagem de estudante
    - recuperar o que tinha antes no estado
    - Criar um novo valor com novo estudante
    - "prevState" fica mais claro (mas pode usar qualquer palavra!!)
    - tem todo o meu estado anterior + novo estudante
    - cria um novo vetor com o conteúdo que tinha antes + novo conteúdo
    
    - se não tive "...prevState" ele ficará dessa forma:
    Ex: 
    ['Ana']
    [['Ana'], Amanda]

    - ele adiciona um vetor dentro de um vetor + um nome (fica confudo)
    - o ideal é assim: ['Ana', Amanda]
    - por isso precisa colocar "...prevState"
    - tira o estado anterior (pega todo o conteúdo do vetor anterior) e despejar no próximo vetor
    - fica todo mundo no mesmo nível de vetor!!!
    
    */
    setStudents(prevState => [...prevState, newStudent])
  }


  /*
  useEffect
  - é executado assim que nossa interface/componentes é renderizada
  na tela do usuário, tem o useEffect entrando em ação
  - executado automaticamente
  - array serve para colocar quais são os estados que o useEffect depende
  - deixar o array vazio, sinaliza que será executado uma única vez
  - se colocar um estado no array de dependência, toda vez que esse estado por chamado,
  o useEffect vai ser executado também
  - ou seja: toda vez que "students" for chamado, terá um retorno no console do navegador
  mostrando que o useEffect foi executado.
  Obs: useEffect é sempre executado quando abre o projeto!!!!
  
  - usado para buscar informações da API
  - usando API publica do github
  - pegando avatar e nome.

  - no useEffect não consegue usar o "async" igual em uma função
  - precisa criar uma função para utilizar o async e executar essa função
  */
  useEffect(() => {
    //corpo do useEffect (ações de execução)
    fetch('https://api.github.com/users/bielzfreitas')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
  }, [])


  /* Exemplo de como usar um async
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/bielzfreitas')
      const data = await response.json()
      console.log("DADOS ===> ", data)
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    }
    fetchData()  
  }, [])  
  */


  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>  
          <img src={user.avatar} alt="Foto de perfil" />
        </div> 

      </header>
     
      
      <input 
        type="text" 
        placeholder="Digite o nome: "
        /*mostra o valor atual do input (e = event)
        onChange={e => handleNameChange(e.target.value)}
        */
        onChange={e => setStudentName(e.target.value)}
      />
      
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        /*
        Usar o "map" para percorrer cada conteudo da lista
        - deixando mais perfomáticas (adicionando uma key prop)
        - ajudar o react a fazer a análise na árvore de componentes
        - qual dado é afetado
        - Key (chave primária) é única
        - não pode ser o "name" pq pode existir estudantes com o mesmo nome
        - usando o "time", serão diferentes
        - o ideal é utiliazar uma ID
        */
        students.map(student => (
          <Card
            key={student.time} 
            name={student.name} 
            time={student.time} 
          />
        ))
      }
    </div>
  )
}

