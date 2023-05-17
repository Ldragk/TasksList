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
               - Mês e Dia 1 ou 2 dígitos, Ano 4 dígitos;
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

