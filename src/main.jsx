//usar npm run dev no terminal
import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles/global.css'

import { Home } from './Home'

/*
renderizando o APP (acessando a DOM)
- insere tudo que está no "root" dentro de "app"
- forma de utilizar componentes estilo html (declarativa)

Nos "Packeges" são arquivos responsáveis pelas dependências
do projeto

"Gitignore" são os arquivos que não precisam ser inseridos
no GitHub

"node_modules" são os modulos que o projeto irá utilizar

"vite.config" pasta de configuração do vite

*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)


