
# Como Gerar sua Chave de API do Google para o Gemini

Para usar a API do Gemini, você precisa de uma chave de API do Google. Siga os passos abaixo para criar a sua.

## Passos

1.  **Acesse o Google AI Studio:**
    *   Abra seu navegador e vá para [https://aistudio.google.com/](https://aistudio.google.com/).

2.  **Faça Login com sua Conta Google:**
    *   Se você não estiver logado, entre com sua conta Google.

3.  **Crie um Novo Projeto (se necessário):**
    *   Se for sua primeira vez, talvez seja necessário concordar com os termos de serviço e criar um novo projeto.

4.  **Gere sua Chave de API:**
    *   No menu à esquerda, clique em **"Get API key"** (Obter chave de API).
    *   Na tela seguinte, clique no botão **"Create API key"** (Criar chave de API).
    *   Uma nova chave será gerada para você.

5.  **Copie e Guarde sua Chave:**
    *   Sua chave será uma longa sequência de letras e números.
    *   **Copie essa chave imediatamente.**
    *   **IMPORTANTE:** Trate esta chave como uma senha. Não a compartilhe publicamente nem a exponha em seu código-fonte (por exemplo, em um repositório do GitHub).

## Como Usar a Chave no Projeto

1.  No diretório principal do projeto (`gemini-chat-app`), crie um arquivo chamado `.env`.
2.  Dentro do arquivo `.env`, adicione a seguinte linha, substituindo `SUA_CHAVE_DE_API_AQUI` pela chave que você acabou de copiar:

    ```
    REACT_APP_GEMINI_API_KEY=SUA_CHAVE_DE_API_AQUI
    ```

É isso! Agora o nosso servidor Node.js poderá ler esta chave do arquivo `.env` para se autenticar com segurança na API do Gemini.
