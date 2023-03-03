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
- Criar sistema de login e usuários.

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
                <td colspan="2">✔️ Salvar tarefas deletadas.</th>  
                <td></th> 
                 <td colspan="3">✔️ Editar tarefa já criada.</td>
           </tr>
           <tr>             
                 <td colspan="1">✔️ Listar todas as tarefas.</th> 
                  <td></th>  
                  <td colspan="2">✔️ Consultar tarefas deletadas.</th>
                  <td></th> 
                 <td colspan="3">✔️ Consultar tarefas atrasadas.</td>
           </tr>
           <tr>             
                <td colspan="1">✔️ Listar tarefas pelo mês.</th> 
                 <td></th>  
                 <td colspan="2">✔️ Marcar ou desmarcar tarefa como feita.</th>
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
                 <td colspan="1">✔️ Deletar tarefa(s).</th> 
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
