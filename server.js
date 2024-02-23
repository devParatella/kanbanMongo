const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/kanban', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir o modelo do quadro Kanban
const Task = mongoose.model('Task', {
    title: String,
    description: String,
    status: String
});

app.use(bodyParser.json());

// Rota para obter todas as tarefas
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Rota para criar uma nova tarefa
app.post('/tasks', async (req, res) => {
    const { title, description, status } = req.body;
    const newTask = new Task({ title, description, status });
    await newTask.save();
    res.json(newTask);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
