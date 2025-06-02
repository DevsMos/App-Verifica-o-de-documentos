# Aplicação React Multi-páginas de Demonstração

Esta é uma aplicação front-end de página única (SPA) construída com React, demonstrando funcionalidades comuns como cadastro de usuário, envio de arquivos, integração com carteira MetaMask e uma simulação de verificação de registro em um serviço como Chainlink. A aplicação utiliza Tailwind CSS para estilização e `lucide-react` para ícones.

## Funcionalidades

A aplicação é composta por quatro seções principais:

1.  **Página de Cadastro de Usuário:**
    * Formulário para novos usuários se registrarem com nome completo, e-mail e senha.
    * Validação básica de formulário (confirmação de senha e comprimento mínimo da senha).
    * Feedback visual para sucesso ou erro no cadastro (simulado).

2.  **Página de Envio de Documentação:**
    * Interface para upload de arquivos com funcionalidade de arrastar e soltar (drag-and-drop).
    * Validação do tamanho do arquivo (limite de 5MB simulado) e tipos de arquivo permitidos (PDF, DOC, DOCX, JPG, PNG).
    * Barra de progresso durante o "envio" simulado do arquivo.
    * Feedback visual sobre o status do upload.

3.  **Página de Conexão com MetaMask:**
    * Botão para conectar/desconectar a carteira MetaMask.
    * Exibe o endereço da conta conectada e o ID/nome da rede.
    * Lida com eventos de mudança de conta e de rede da MetaMask.
    * Fornece feedback em caso de erro na conexão ou se a MetaMask não estiver instalada.
    * Inclui um *mock* do objeto `ethereum` para permitir o funcionamento da UI em ambientes sem a MetaMask instalada, facilitando a demonstração.

4.  **Página de Verificação de Registro na Chainlink (Simulação):**
    * Campo para inserir um ID de registro ou endereço de contrato para verificação.
    * Simula uma chamada a um serviço da Chainlink para verificar o status de um registro.
    * Exibe diferentes mensagens de status (registrado, pendente, não encontrado) com base na entrada fornecida (simulado).
    * Inclui um aviso de que esta funcionalidade é uma simulação.

## Funcionalidades Adicionais

* **Navegação:** Barra de navegação no topo para alternar entre as seções. Em telas menores, um menu suspenso e botões de navegação compactos são exibidos.
* **Modo Escuro/Claro:** Um botão para alternar o tema da aplicação entre modo claro e escuro.
* **Design Responsivo:** A interface é projetada para se adaptar a diferentes tamanhos de tela.

## Tecnologias Utilizadas

* **React:** Biblioteca JavaScript para construção de interfaces de usuário.
* **Tailwind CSS:** Framework CSS utility-first para estilização rápida e customizável.
* **Lucide React:** Biblioteca de ícones SVG leves e customizáveis.
* **JavaScript (ES6+):** Linguagem de programação principal.
* **Mock `window.ethereum`:** Para simular a interação com a MetaMask quando a extensão não está presente.

## Pré-requisitos

* Node.js (versão 14.x ou superior recomendada)
* npm (geralmente vem com o Node.js) ou yarn

## Configuração e Execução do Projeto

1.  **Clone o repositório (ou crie os arquivos):**
    Se este projeto estivesse em um repositório Git:
    ```bash
    git clone <url-do-repositorio>
    cd <nome-do-diretorio-do-projeto>
    ```
    Caso contrário, crie um novo projeto React e adicione os arquivos.

2.  **Crie um projeto React (se ainda não tiver um):**
    ```bash
    npx create-react-app meu-app-frontend
    cd meu-app-frontend
    ```

3.  **Instale as dependências:**
    Substitua o conteúdo de `src/App.js` pelo código fornecido no Canvas. Depois, instale as dependências necessárias:
    ```bash
    npm install
    ```
    ou, se estiver usando yarn:
    ```bash
    yarn
    ```
    Instale também `tailwindcss` e `lucide-react`:
    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npm install lucide-react
    ```
    ou
    ```bash
    yarn add -D tailwindcss postcss autoprefixer
    yarn add lucide-react
    ```

4.  **Configure o Tailwind CSS:**
    Crie os arquivos de configuração do Tailwind:
    ```bash
    npx tailwindcss init -p
    ```
    Edite o arquivo `tailwind.config.js` para incluir os caminhos para seus arquivos de template:
    ```javascript
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      darkMode: 'class', // Habilita o modo escuro baseado na classe 'dark' no HTML
      content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Caminhos para seus arquivos React
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```
    Adicione as diretivas do Tailwind ao seu arquivo CSS principal (ex: `src/index.css`):
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
    Certifique-se de que este arquivo CSS está sendo importado no seu `src/index.js`.

5.  **Execute a Aplicação:**
    ```bash
    npm start
    ```
    ou
    ```bash
    yarn start
    ```
    A aplicação deverá abrir automaticamente no seu navegador padrão, geralmente em `http://localhost:3000`.

## Estrutura dos Componentes

* **`App`**: Componente principal que gerencia a navegação entre as páginas e o estado do modo escuro/claro.
* **`UserRegistration`**: Componente para a página de cadastro de usuário.
* **`DocumentUpload`**: Componente para a página de envio de documentação.
* **`MetaMaskConnect`**: Componente para a página de conexão com a MetaMask.
* **`ChainlinkCheck`**: Componente para a página de verificação de registro na Chainlink (simulação).
* **`NavLink`**: Componente auxiliar dentro de `App` para criar os links de navegação.

## Notas Importantes

* **Simulações:** As funcionalidades de cadastro de usuário, envio de documentos e verificação na Chainlink são **simuladas**. Nenhuma chamada real a APIs externas ou contratos inteligentes é feita para estas operações. A lógica de backend e a integração real com serviços como Chainlink precisariam ser implementadas separadamente.
* **MetaMask:** A interação com a MetaMask é real se a extensão estiver instalada. Caso contrário, um objeto `ethereum` mockado é utilizado para fins de demonstração da interface do usuário. Para interações reais com a blockchain (transações, leitura de contratos), seria necessário usar bibliotecas como `ethers.js` ou `web3.js`.
* **Estilização:** A aplicação usa Tailwind CSS. Certifique-se de que a configuração do Tailwind está correta para que os estilos sejam aplicados.

Este projeto serve como um ponto de partida e demonstração para construir aplicações React com funcionalidades comuns e interações com o ecossistema Web3.
