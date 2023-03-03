<div align="center">

# Projeto Lista de Tarefas

# (Back-End)

</div>

Construí e planejei esse projeto do zero e sozinho. Tem o objetivo de consolidar meus conhecimentos principalmente no Back-end e de Engenharia de Software, além de praticar a utilização de Node.js com Express e Prisma Studio.

O projeto é uma API Rest para criar e manipular tarefas por meio de rotas utilizando os verbos http e banco de dados (ORM).

<br>

- Nota: Não iniciei o projeto aplicando TDD, nem mesmo DDD ou Engenharia de software. A ideia era consolidar meu estudos, de cursos e projetos de eventos, com a prática e aprender mais ao longo do desenvolvimento. Assim iniciei desenvolvendo de acordo com o aprendizado do evento <a href="https://github.com/Lucasvmarangoni/NLW-Ignite-2022" target="_blank">NLW ESpots Ignite</a> da RocketSeat. Após alcançar esse objetivo ainda pretendia fazer outras coisas (funcionalidades) antes de começar a aprimorar a engenharia e arquitetura do software, mas comecei a aprimorar algumas coisas e acabei decidindo por já organizar tudo logo, de acordo com o aprendizado com o evento <a href="https://github.com/Lucasvmarangoni/notifications-service" target="_blank">Ignite Lab 04</a> da RocketSeat. Ao longo dessa etapa mudei muitas decisões iniciais, como abandonar a ideia de criar um front-end. Por não ter iniciado com TDD, os testes unitários ficaram para o final, assim como muitas outras coisas, como validações e entre outros recursos de estrutura e engenharia. Por ter desenvolvido o projeto dessa forma tive que alterar muitas coisas por diversas vezes, o que foi bom, pois aumentou meu tempo programando e resolvendo problemas, além de desenvolver minha habilidade de manutenção do código.
  <br><br>

<div align="center">

</div>

<table width="300px" align="center">
      <caption> <h1 align="center">Tecnologias</h1> </caption>	         
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

## Instalação

     $ npm i

## Executando o aplicativo

    $ npm run start

## Teste

    $ npm test

## Documentação

    - Criar tarefa:
          - Por padrão o valor "done" inicia "false", não sendo necessário informa-lo ao criar a tarefa.
           Contudo o programa permite criar uma tarefa passando um valor inicial "done": "true"

          - Estrutura da data:
               - Data limite é o prazo final para concluir a tarefa.
               - Estrutura: mês/dia/ano;
               - Mês e Dia >= 1 < que 2 dígitos, Ano === 4 dígitos;
               - A data de limite não pode ser menor que a data atual.

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
          - A busca é pela data limite e não pelo data de criação;
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
          - Basta chamar a request para buscar por todas as tarefas atrasadas, ou seja, cujo prazo (data limite)
          foi ultrapassado.

     - Ser notificado de tarefas próximas da data limite:
          - O parâmetro com valor "1" busca pela data específica, ou seja, busca as tarefas cujo 
          data limite seja no mês/dia/ano informado.
               Ex: Tarefas com data limite daqui a 10 dias (/tasks/notifications/10/1);
          - Outro parâmetro (recomendo usar 0), busca todas as tarefas da data atual até o 
          prazo informado. (/tasks/notifications/10/0).


<br><br>

<div align="center">

## BACKLOG DO PRODUTO

</div>
<br><br><br>

<strong>
HISTORIAS:
</strong>
<br><br>

- Eu como usuário quero criar uma tarefa;
- Eu como usuário quero estabelecer o título, descrição e data limite da tarefa;
- Eu como usuário quedo deletar uma ou mais tarefas;
- Eu como usuário quero poder consultar tarefas deletadas;
- Eu como usuário quero marcar uma tarefa como feita;
- Eu como usuário quero desmarcar uma tarefa marcada como feita;
- Eu como usuário quero ver todas as tarefas feitas;
- Eu como usuário quero ver todas as tarefas não feitas;
- Eu como usuário quero ver todas as tarefas atrasadas;
- Eu como usuário quero ser notificado das tarefas antes
  da data limite;
- Eu como usuário quero poder fazer login e acessar minhas
  tarefas em qualquer aparelho.

<br><br><br>

<strong>
REQUISITOS FUNCIONAIS:
</strong>
<br><br>

- Criar tarefa com título, descrição e data limite;
- Listar todas as tarefas;
- Listar tarefas do mês;
- Listar tarefas do dia;
- Deletar tarefas;
- Salvar tarefas deletadas;
- Consultar tarefas deletadas;
- Marcar ou desmarcar tarefas como feitas;
- Consultar tarefas feitas;
- Consultar tarefas não feitas;
- Editar tarefa já criada;
- Consultar tarefas atrasadas;
- Ser notificado de tarefas próximas da data limite;

<br><br><br>

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
