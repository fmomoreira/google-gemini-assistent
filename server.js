
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 5000;

// Carrega a chave de API do arquivo .env
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Inicializa o cliente do Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log('API Key carregada:', process.env.GEMINI_API_KEY ? 'Sim (valor não exibido por segurança)' : 'Não');

app.post('/api/chat', async (req, res) => {
  try {
    console.log('Recebendo requisição:', req.body);
    const { message } = req.body;
    console.log('Mensagem recebida:', message);

    // Escolhe o modelo do Gemini
   
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Gera o conteúdo com base na mensagem do usuário
    console.log('Enviando mensagem para a API do Gemini...');
    const result = await model.generateContent(message);
    console.log('Resposta recebida da API do Gemini');
    const response = await result.response;
    const text = response.text();
    console.log('Texto da resposta:', text.substring(0, 50) + '...');

    res.json({ reply: text });
  } catch (error) {
    console.error('Erro ao se comunicar com a API do Gemini:', error);
    console.error('Detalhes do erro:', JSON.stringify(error, null, 2));
    res.status(500).json({ error: 'Erro ao se comunicar com a API.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
