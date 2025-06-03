const { program } = require('commander');
const fs = require('fs');
const chalk = require('chalk');

const file = 'tasks.json';

// Load tasks from file
function loadTasks() {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file));
}

// Save tasks to file
function saveTasks(tasks) {
  fs.writeFileSync(file, JSON.stringify(tasks, null, 2));
}

// Add task
program
  .command('add <description>')
  .description('Add a new task')
  .action((description) => {
    const tasks = loadTasks();
    const now = new Date().toISOString();
    const newTask = {
      id: tasks.length + 1,
      description,
      status: 'todo',
      createdAt: now,
      updatedAt: now
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(chalk.green(`Task added (ID: ${newTask.id})`));
  });

// List tasks
program
  .command('list [status]')
  .description('List all tasks or filter by status')
  .action((status) => {
    const tasks = loadTasks();
    const filtered = status ? tasks.filter(t => t.status === status) : tasks;
    if (filtered.length === 0) return console.log(chalk.yellow('No tasks found.'));
    filtered.forEach(t => {
      console.log(`${t.id}. [${t.status}] ${t.description} (Created: ${t.createdAt}) (Updated: ${t.updatedAt})`);
    });
  });

// Update task description
program
  .command('update <id> <description>')
  .description('Update the description of a task')
  .action((id, description) => {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id == id);
    if (!task) return console.log(chalk.red('Task not found.'));
    task.description = description;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(chalk.blue('Task updated.'));
  });

// Delete task
program
  .command('delete <id>')
  .description('Delete a task')
  .action((id) => {
    let tasks = loadTasks();
    const len = tasks.length;
    tasks = tasks.filter(t => t.id != id);
    if (tasks.length === len) return console.log(chalk.red('Task not found.'));
    saveTasks(tasks);
    console.log(chalk.red('Task deleted.'));
  });

// Mark as done
program
  .command('mark-done <id>')
  .description('Mark a task as done')
  .action((id) => {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id == id);
    if (!task) return console.log(chalk.red('Task not found.'));
    task.status = 'done';
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(chalk.green('Task marked as done.'));
  });

// Mark as in-progress
program
  .command('mark-in-progress <id>')
  .description('Mark a task as in progress')
  .action((id) => {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id == id);
    if (!task) return console.log(chalk.red('Task not found.'));
    task.status = 'in-progress';
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(chalk.cyan('Task marked as in progress.'));
  });

// Help command
program
  .command('help')
  .description('Show all available commands')
  .action(() => {
    console.log(`
Available commands:

  add "<text>"                - Add a new task
  update <id> "<text>"       - Update the description of a task
  delete <id>                - Delete a task
  mark-in-progress <id>      - Mark a task as "in progress"
  mark-done <id>             - Mark a task as done
  list                       - List all tasks
  list done                  - List only completed tasks
  list todo                  - List only pending tasks
  list in-progress           - List only tasks in progress
  help                       - Show this help message
    `);
  });

program.parse();
