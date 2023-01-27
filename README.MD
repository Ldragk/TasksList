# EM DESENVOLVIMENTO

<div align="center">

# Projeto Lista de Tarefas

# (Back-End)

Projeto para praticar a utilização de Node.js com Express e Prisma Studio.

Estou construindo e planejando esse projeto do zero e sozinho. Tem o objetivo de consolidar meus conhecimentos principalmente no Back-end e conceitos de Engenharia de Software.

Trata-se de uma API para criar e manipular tarefas por meio de rotas utilizando os verbos http e banco de dados, com uma interface front-end básica para interação do usuário.

🔹 Pretendo fazer muitas alterações e acrescimentos de funções e requisitos, durante a construção do projeto.

</div>

<br><br>

<div align="center">

</div>

<table width="300px" align="center">
      <caption> <h1 align="center">Tecnologias</h1> </caption>	         
       <thead>                      
               <th width="150px" style="text-align:center" colspan="1">Back-end</th>       
               <th width="50px"></th>         
               <th width="150px" style="text-align:center" colspan="2">Front-end</th>                
       </thead>
       <tbody align="center">          
           <tr>                           
                <td colspan="1">TypeScript</th>  
                <td></th>          
                <td colspan="2">React js</th>                 
           </tr>
           <tr>             
                 <td colspan="1">Node js</th> 
                  <td></th>  
                  <td colspan="2">Vite js</th>                
           </tr>           
            <tr>             
                 <td colspan="1">Express</th> 
                  <td></th>  
                  <td colspan="2">TailWind</th>                
           </tr>           
            <tr>             
                 <td colspan="1">SQLite</th> 
                  <td></th>  
                  <td colspan="2">TypeScript</th>                
           </tr>           
            <tr>             
                 <td colspan="1">Prisma Studio</th> 
                  <td></th>  
                  <td colspan="2"></th>                
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
               <th width="32%" style="text-align:center" colspan="3">3º Sprint</th>    
       </thead>
       <tbody>          
           <tr>                           
                <td colspan="1">✔️ Criar tarefa</th>  
                <td></th>          
                <td colspan="2">✔️ Salvar tarefas deletadas</th>  
                <td></th> 
                 <td colspan="3">Editar tarefa já criada</td>
           </tr>
           <tr>             
                 <td colspan="1">✔️ Listar todas as tarefas</th> 
                  <td></th>  
                  <td colspan="2">✔️ Consultar tarefas deletadas</th>
                  <td></th> 
                 <td colspan="3">Consultar tarefas atrasadas</td>
           </tr>
           <tr>             
                <td colspan="1">✔️ Listar tarefas pelo mês</th> 
                 <td></th>  
                 <td colspan="2">✔️ Marcar ou desmarcar tarefa como feita</th>
                 <td></th> 
                 <td colspan="3">Ser notificado de tarefas próximas da data limite</td>
           </tr>           
           <tr>             
                 <td colspan="1">✔️ Listar tarefas pelo dia</th> 
                  <td></th>    
                  <td colspan="2">✔️ Consultar tarefas feitas</th>
                  <td></th> 
                 <td colspan="3">Construir o Front-end</td>
           </tr>
           <tr>             
                 <td colspan="1">✔️ Deletar tarefa(s)</th> 
                  <td></th>  
                  <td colspan="2">✔️ Consultar tarefas não feitas</th>
                  <td></th>  
                 <td colspan="3">Conectando Frond-end com Back-end</td>
           </tr>
       </tbody>

</table>

<table width="66%" align="center">          
       <thead>                      
               <th width="49%" style="text-align:center" colspan="4">4º Sprint</th>       
               <th></th>         
               <th width="49%" style="text-align:center" colspan="4">5º Sprint</th>  
               <!-- <th></th> 
               <th width="32%" style="text-align:center" colspan="6">6º Sprint</th>     -->
       </thead>
       <tbody>          
           <tr>                           
                <td colspan="4">Criar sistema de login e usuários </th>  
                <td></th>          
                <td colspan="5">Aprimorar qualidade do projeto:</th>  
                <!-- <td></th> 
                 <td colspan="6">Editar tarefa já criada</td> -->
           </tr>
           <tr>             
                 <td colspan="4">Construir a Interface do usuário Front-end</th> 
                  <td></th>  
                  <td colspan="5">Organizar estrutura do projeto</th>
                  <!-- <td></th> 
                 <td colspan="6">Consultar tarefas deletadas</td> -->
           </tr>
           <tr>             
                <td colspan="4">Conectando Frond-end com Back-end do sistema de login</th> 
                 <td></th>  
                 <td colspan="5">Aplicar princípios de Engenharia de Software</th>
                 <!-- <td></th> 
                 <td colspan="6"></td> -->
           </tr>           
           <tr>             
                 <td colspan="4"></th> 
                  <td></th>    
                  <td colspan="5">Aplicar testes unitários</th>
                  <!-- <td></th> 
                 <td colspan="6"></td> -->
           </tr>
           <!-- <tr>              -->
                 <!-- <td colspan="4"></th>  -->
                  <!-- <td></th>  
                  <td colspan="5"></th>
                  <td></th>  
                 <td colspan="6"></td> -->
           <!-- </tr> -->
       </tbody>

</table>

🔹O 5º sprint é aplicado parcialmente durante a construção do projeto, sendo no 5º sprint o monto de concentração exclusiva nesses pontos para maximiza-los.
