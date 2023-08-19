<div align="center">
<a href="#projeto" target="_blank">
    <img align="center" src="https://img.shields.io/badge/-Projeto-05122A?style=flat&logo=Projeto" alt=""/>
  </a>
  <a href="#tecnologias">
     <img align="center" src="https://img.shields.io/badge/-Tecnologias-05122A?style=flat&logo=Tecnologias" alt=""/>
  </a>  
  </a>  
     <a href="#instalação">
     <img align="center" src="https://img.shields.io/badge/-Instalação-05122A?style=flat&logo=Tecnologias" alt=""/>
     </a>
     <a href="#registro-de-desenvolvimento">
     <img align="center" src="https://img.shields.io/badge/-Registro%20de%20Desenvolvimento-05122A?style=flat&logo=Tecnologias" alt=""/>
     </a>
</div>

<br>

<div align="center">

# Projeto Lista de Tarefas


# (Backend)
![version](https://img.shields.io/badge/version-2.1.0-white)


</div>

<br><br>

<div align="center">

## Projeto

</div>

O projeto é uma API REST para servir uma aplicação de Lista de tarefas, seguindo o padrão CRUD, com sistema de notificação.

- Projeto planejado e desenvolvi por mim. 
- Finalidade: aprendizado, prática e portfólio.

<br>

### Objetivo 

Inicialmente teve o objetivo de consolidar meus conhecimentos de Back-end e Engenharia de Software, além de praticar a utilização de Node.js com Express e Prisma Studio. O objetivo agora é continuar utilizando esse projeto para praticar, aprimorando-o com as novas habilidades, tecnologias e ferramentas que adquiro.

<br>



## Instalação

     npm i


### Database
É necessário criar um cluster no MongoDB Atlas ou configurar um banco de dados mongoDB para o prisma studio. A url deve ser colocada em uma variável de ambiente no arquivo .env nomeada de DATABASE_URL.
- Recomendo criar o cluster no Atlas, pois será muito mais rápido e fácil.

### ‼️ Aviso

➜ O projeto esta com problema no sistema de caching. 

O cache não esta sendo atualizado em tempo de execução, portanto é necessário encerrar e executar a aplicação para que seja atualizado. 
Dessa forma, se já existem 3 tasks no cache da rota get all, ao criar mais tasks, será necessário reiniciar a aplicação para que elas apareçam na response da rota get all. 

➜ Por esse motivo comentei o código referente ao sistema de caching, até que eu possa resolver da melhor forma.



<div align="center">

## Tecnologias

</div>


<table width="300px" align="center">
      <caption> 
      </caption>	         
       <thead>                      
               <th width="50%px" style="text-align:center" colspan="1">v2.0.0</th>                  
               <th width="50%px" style="text-align:center" colspan="2">v2.1.0</th>                  
       </thead>
       <tbody align="center">          
           <tr>                           
                <td colspan="1">TypeScript</th>                              
                <td colspan="2">Overnight.js</th>                              
           </tr>
           <tr>             
                 <td colspan="1">Node.js</th>     
                 <td colspan="2">Http status codes</th>                               
           </tr>           
            <tr>             
                 <td colspan="1">Express</th>          
                 <td colspan="2">Pino</th>
           </tr>           
            <tr>             
                 <td colspan="1">SQLite</th>           
                 <td colspan="2">Express pino logger</th>                
           </tr>           
            <tr>             
                 <td colspan="1">Prisma Studio</th>   
                 <td colspan="2">Node cache</th>   
            </tr>   
            <tr>             
                 <td colspan="1">Vitest</th>   
                 <td colspan="2">Supertest</th>                    
            </tr>  
            <tr>             
                 <td colspan="1">Class-validator</th>   
                 <td colspan="2">SQLite &#8594; MongoDB</th>   
            </tr>                             
            <tr>             
                 <td colspan="1"></th>   
                 <td colspan="2">MongoDB Atlas</th>   
            </tr>    
                 <td colspan="1"></th>   
                 <td colspan="2">Swagger-ui express</th>   
            </tr>     
             </tr>                             
                 <td colspan="1"></th>   
                 <td colspan="2">Express openapi validator</th>   
            </tr>     
            <tr>             
                 <td colspan="1"></th>   
                 <td colspan="2">Express rate limit</th>   
            </tr>  
            <tr>             
                 <td colspan="1"></th>   
                 <td colspan="2">Github actions</th>   
            </tr>
            <tr>             
                 <td colspan="1"></th>   
                 <td colspan="2">Node Config</th>   
            </tr>      
            <tr>             
                 <td colspan="1"></th>   
                 <td colspan="2">Bcrypt</th>   
            </tr>   
            <tr>             
                 <td colspan="1"></th>   
                 <td colspan="2">Json Web Token</th>   
            </tr>                  
       </tbody>
</table>

<br>

## Registro de Desenvolvimento

- Link para o código da versão nas badges.

<br>

<a href="" title="Não possui link da versão 1.0.0">![version](https://img.shields.io/badge/version-1.0.0-white)</a> 
<br>
O projeto teve seu desenvolvimento iniciado com um back-end simples e básico.
<br>
<br>
<a href="https://github.com/Lucasvmarangoni/TaskList/tree/2690efd2b1ca82fe52ce211c912a0f021fd8d8eb" title="clique para ver o código da versão 2.0.0">![version](https://img.shields.io/badge/version-2.0.0-white)</a> 
<br>
O projeto passou a ser uma API REST, CRUD, com sistema de notificação, desenvolvida com Node.js, Express e Typescript, aplicando testes unitários,
validações, DDD, TDD, in memory database, factory pattern, singleton, inversão de dependência e princípios SOLID.
<br>
<br>
<a href="https://github.com/Lucasvmarangoni/TaskList" title="clique para ver o código da versão 2.1.0">![version](https://img.shields.io/badge/version-2.1.0-black)</a> 
<br>
Nesta atualização, estou aprimorando testes, mocks, testes end to end, tratando erros, status code, logging, cache, graceful
shutdown, troca do banco de dados, documentação OpenAPI, workflow, autenticação com criptografia e refatoração.

<br>






