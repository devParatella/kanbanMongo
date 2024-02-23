document.addEventListener('DOMContentLoaded', async () => {
    const app = new Vue({
        el: '#app',
        data: {
            tasks: {
                todo: [],
                doing: [],
                done: []
            }
        },
        mounted() {
            this.fetchTasks();
        },
        methods: {
            async fetchTasks() {
                const response = await fetch('/tasks');
                const tasks = await response.json();
                tasks.forEach(task => {
                    if (task.status === 'Para fazer') {
                        this.tasks.todo.push(task);
                    } else if (task.status === 'Fazendo') {
                        this.tasks.doing.push(task);
                    } else if (task.status === 'Feito') {
                        this.tasks.done.push(task);
                    }
                });
            }
        }
    });
});
