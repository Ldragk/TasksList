<div align="center">
<a href="#projeto" target="_blank">
    <img align="center" src="https://img.shields.io/badge/-Projeto-05122A?style=flat&logo=Projeto" alt=""/>
  </a>
  <a href="#tecnologias">
     <img align="center" src="https://img.shields.io/badge/-Tecnologias-05122A?style=flat&logo=Tecnologias" alt=""/>
  </a>
  <a href="#instalação">
     <img align="center" src="https://img.shields.io/badge/-Execu%C3%A7%C3%A3o-05122A?style=flat&logo=Execu%C3%A7%C3%A3o" alt=""/>
  </a>
  <a href="#documentação">
     <img align="center" src="https://img.shields.io/badge/-Documenta%C3%A7%C3%A3o-05122A?style=flat&logo=Documenta%C3%A7%C3%A3o" alt=""/>
  </a>
  <a href="#backlog">
     <img align="center" src="https://img.shields.io/badge/-Backlog-05122A?style=flat&logo=Backlog" alt=""/>
  </a>
</div>

<br>

<div align="center">

# Projeto Lista de Tarefas


# (Back-End)
![version](https://img.shields.io/badge/version-2.3.2-purple)


</div>

<br><br>

<div align="center">

## Projeto

</div>

- Esse é um projeto que planejei e construí do zero sozinho. 


É um Projeto back-end que utiliza API REST, sendo um app para criar tarefas, editar, deletar, consultar e receber notificações.

<br>

### Objetivo 

Inicialmente teve o objetivo de consolidar meus conhecimentos principalmente no Back-end e Engenharia de Software, além de praticar a utilização de Node.js com Express e Prisma Studio. Prendo continuar utilizando esse projeto para praticar, aprimorando-o com as novas habilidades, tecnologias e ferramentas que adquiro enquanto desenvolvo outros projetos. 

<br>

### Registro de Desenvolvimento

<br>

O objetivo do projeto era consolidar meus estudos de cursos e projetos de eventos por meio da prática, e também aprender mais durante o desenvolvimento.

<br>

![version](https://img.shields.io/badge/version-1.0.0-white)<br>
O projeto teve seu desenvolvimento iniciado de acordo com o aprendizado do evento <a href="https://github.com/Lucasvmarangoni/NLW-Ignite-2022" target="_blank">NLW ESpots Ignite</a> da RocketSeat, ou seja, um back-end simples e básico.


Após alcançar esse objetivo, ainda pretendia fazer outras coisas (funcionalidades) antes de começar a aprimorar a engenharia e arquitetura do software, mas comecei a aprimorar algumas coisas e acabei decidindo por já organizar tudo logo.

<br>

![version](https://img.shields.io/badge/version-2.0.0-white)<br>
Então comecei a aplicar os conhecimento obtidos com o evento <a href="https://github.com/Lucasvmarangoni/notifications-service" target="_blank">Ignite Lab 04 - Notification Service</a> da RocketSeat. Ao longo dessa etapa, mudei muitas decisões iniciais. Por não ter iniciado com TDD, alguns testes unitários ficaram para depois da funcionalidade estar pronta, assim como muitas outras coisas, como validações e outros recursos de estrutura e engenharia. 

- Por ter desenvolvido o projeto dessa forma, tive que alterar muitas coisas por diversas vezes, o que foi bom, pois aumentou meu tempo programando e resolvendo os problemas que surgiam, além de desenvolver minha habilidade de manutenção do código.

![version](https://img.shields.io/badge/version-3.0.0-white)<br>
A versão 3.0.0 já esta em planejamento. Será aplicado o conhecimento do projeto <a href="https://github.com/Lucasvmarangoni/Best-Surfing" target="_blank">Best-Surfing</a> afim de aprimorar o projeto e consolidar esses novos conhecimentos.


<br><br>



<div align="center">

</div>


<br><br>

<div align="center">

## Tecnologias

</div>

<table width="300px" align="center">
      <caption> <h1 align="center">         
      </h1> </caption>	         
       <thead>                      
               <th width="150px" style="text-align:center" colspan="1">Back-end</th>                  
       </thead>
       <tbody align="center">          
           <tr>                           
                <td colspan="1">TypeScript</th>                              
           </tr>
           <tr>             
                 <td colspan="1">Node js</th>       
           </tr>           
            <tr>             
                 <td colspan="1">Express</th>          
           </tr>           
            <tr>             
                 <td colspan="1">SQLite</th>             
           </tr>           
            <tr>             
                 <td colspan="1">Prisma Studio</th>   
            </tr>   
            <tr>             
                 <td colspan="1">Vitest</th>   
            </tr>  
            <tr>             
                 <td colspan="1">Class-validator</th>   
            </tr>        
       </tbody>
</table>

<br><br>

<div align="center">

## Instalação

</div>

     $ npm i

<div align="center">

## Executando o aplicativo

</div>

    $ npm run start

<div align="center">

## Teste

</div>

    $ npm test

<div align="center">

<br><br>

## Documentação

</div>

    - Criar tarefa:
          - Por padrão o valor "done" inicia "false", não sendo necessário informa-lo ao criar a
          tarefa. Contudo o programa permite criar uma tarefa passando um valor inicial
          "done": "true"

          - Estrutura da data:
               - Data limite é o prazo final para concluir a tarefa.
               - Estrutura: mês/dia/ano;
               - Mês e Dia >= 1 < que 2 dígitos, Ano === 4 dígitos;
               - A data limite não pode ser menor que a data atual.

           Request JSON:

               {
                "title": "title",
                "content": "Vendo se deu certo",
                "date": "03/5/2023"
               }

               {
                "title": "title",
                "content": "Vendo se deu certo",
                "date": "03/5/2023",
                "done": true
               }

     - Listar tarefa:
          - A busca é pela data limite e não pela data de criação;
          - Pelo Dia: Informar mês/dia/ano. (/tasks/date/21/2/2023);
          - Pelo Mês: Informar mês/ano. (/tasks/month/2/2024);
          - Pelo Ano: Informar ano. (/tasks/year/2023).

     - Marcar ou desmarcar tarefa como feita:
          - Ao chamar a request o valor "done" é alterado, alternando entre "true" e "false"

     - Deletar tarefas:
          - Pode ser 1 tarefa, pelo ID, ou todas de uma vez.

     - Salvar tarefas deletadas: Pode ser uma única tarefa pelo ID ou todas.
          - Esta vinculado a request de deletar tarefas.

     - Consultar tarefas deletadas:
          - Busca todas as tarefas deletadas.

     - Consultar tarefas feitas e não feitas:
          - O parâmetro com valor "1" busca pelas tarefas feitas (true). (/tasks/done/1);
          - Outro valor (recomendo usar 0) busca pelas tarefas não feitas (false). (/tasks/done/0).

     - Editar tarefa criada:
          - Request JSON:

          {
           "title": "put post",
           "content": "tudo bem?",
           "date": "02/22/2023",
           "done": false
          }

     - Consultar tarefas atrasadas:
          - Basta chamar a request para buscar por todas as tarefas atrasadas, ou seja,
          cujo prazo (data limite) foi ultrapassado.

     - Ser notificado de tarefas próximas da data limite:
          - São passados dois parâmetros, um com valor em dias, outro para
          selecionar o modo de notificação, nessa ordem respectivamente.
          - O parâmetro com valor "1" busca pela data específica, ou seja, busca as tarefas cujo
          data limite seja no dia informado. (/tasks/notifications/10/1)
               Ex: Tarefas com data limite daqui a 10 dias, supondo que estamos em 02/28/2023,
               trará tarefas do dia 03/10/2023;
          - Outro parâmetro (recomendo usar 0), busca todas as tarefas entre data atual e o
          prazo informado. (/tasks/notifications/10/0).

<br><br>

<div align="center">

## Backlog

</div>
<br><br><br>

<strong>
HISTORIAS:
</strong>
<br><br>

- Eu como usuário quero criar uma tarefa;
- Eu como usuário quero estabelecer o título, descrição e data limite da tarefa;
- Eu como usuário quero ver todas as tarefas criadas;
- Eu como usuário quero ver as tarefas por dia, mês ou ano;
- Eu como usuário quedo deletar uma ou mais tarefas;
- Eu como usuário quero marcar uma tarefa como feita;
- Eu como usuário quero poder consultar tarefas deletadas;
- Eu como usuário quero desmarcar uma tarefa marcada como feita;
- Eu como usuário quero ver todas as tarefas feitas;
- Eu como usuário quero ver todas as tarefas não feitas;
- Eu como usuário quero ver todas as tarefas atrasadas;
- Eu como usuário quero ser notificado das tarefas antes
  da data limite;
- Eu como usuário quero poder fazer login e acessar minhas
  tarefas em qualquer aparelho.

<br><br>

<strong>
REQUISITOS FUNCIONAIS:
</strong>
<br><br>

- Criar tarefa com título, descrição e data limite;
- Listar todas as tarefas;
- Listar tarefas do mês;
- Listar tarefas do dia;
- Listar tarefas do ano;
- Deletar tarefas;
- Salvar tarefas deletadas;
- Consultar tarefas deletadas;
- Marcar ou desmarcar tarefas como feitas;
- Consultar tarefas feitas;
- Consultar tarefas não feitas;
- Editar tarefa já criada;
- Consultar tarefas atrasadas;
- Ser notificado de tarefas próximas da data limite;

<br><br>

<div align="center">

## SPRINTS

</div>

<br><br>

<table width="100%" align="center">
      <caption> <h1 align="center">Scrum Board</h1> </caption>	         
       <thead>                      
               <th width="32%" style="text-align:center" colspan="1">✔️ 1º Sprint</th>       
               <th></th>         
               <th width="32%" style="text-align:center" colspan="2">✔️ 2º Sprint</th>  
               <th></th> 
               <th width="32%" style="text-align:center" colspan="3">✔️ 3º Sprint</th>    
       </thead>
       <tbody>          
           <tr>                           
                <td colspan="1">✔️ Criar tarefa.</th>  
                <td></th>          
                <td colspan="2">✔️ Deletar tarefa(s).</th>  
                <td></th> 
                 <td colspan="3">✔️ Editar tarefa.</td>
           </tr>
           <tr>             
                 <td colspan="1">✔️ Listar todas as tarefas.</th> 
                  <td></th>  
                  <td colspan="2">✔️ Salvar tarefas deletadas.</th>
                  <td></th> 
                 <td colspan="3">✔️ Consultar tarefas atrasadas.</td>
           </tr>
           <tr>             
                <td colspan="1">✔️ Listar tarefas pelo mês.</th> 
                 <td></th>  
                 <td colspan="2">✔️ Consultar tarefas deletadas.</th>
                 <td></th> 
                 <td colspan="3">✔️ Ser notificado de tarefas próximas da data limite.</td>
           </tr>           
           <tr>             
                 <td colspan="1">✔️ Listar tarefas pelo dia.</th> 
                  <td></th>    
                  <td colspan="2">✔️ Consultar tarefas feitas.</th>
                  <td></th> 
                 <td colspan="3"></td>
           </tr>
           <tr>             
                 <td colspan="1">✔️ Marcar ou desmarcar tarefa como feita.</th> 
                  <td></th>  
                  <td colspan="2">✔️ Consultar tarefas não feitas.</th>
                  <td></th>  
                 <td colspan="3"></td>
           </tr>
       </tbody>

</table>

<table width="33%" align="left">          
       <thead>                      
               <th width="100%" style="text-align:center" colspan="4">✔️ 4º Sprint</th>                         
       </thead>
       <tbody>          
           <tr>                 
                <td colspan="4">✔️ Organizar estrutura do projeto.</th>
           </tr>
           <tr>         
                 <td colspan="4">✔️ Aplicar validações</th>                        
           </tr>
           <tr>             
                <td colspan="4">✔️ Aplicar testes unitários</th> 
           </tr>                
       </tbody>
</table>
