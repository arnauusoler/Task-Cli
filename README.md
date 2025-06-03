# Task-Cli
This is a simple command-line interface (CLI) task manager built with Node.js. It allows users to create, update, delete, and manage tasks directly from the terminal. Tasks are stored persistently in a JSON file on the local filesystem, enabling users to keep track of their to-dos easily without the need for any external database.


## Description
The Task Manager CLI supports the following features:

Add new tasks with a unique ID, description, status, and timestamps.

Update existing tasks, including changing their description and status.

Delete tasks by ID.

List tasks filtered by status (all, todo, in-progress, done).

Persist task data in a JSON file (tasks.json), ensuring tasks are saved between sessions.

Each task contains the following properties:

id: A unique identifier.

description: A short description of the task.

status: Current status (todo, in-progress, or done).

createdAt: Timestamp of when the task was created.

updatedAt: Timestamp of the last update to the task.

## Installation & Usage
Prerequisites
Node.js (v12 or higher)

npm (Node package manager)

## Setup
Clone the repository:


git clone https://github.com/yourusername/task-manager-cli.git
cd task-manager-cli
Install dependencies:


npm install
Run the CLI:


node index.js [command] [options]

##Commands
add <description>: Add a new task.

list [status]: List tasks filtered by status (all, todo, in-progress, done). Default is all.

update <id> --description <newDescription>: Update task description.

update <id> --status <newStatus>: Update task status.

delete <id>: Delete a task by ID.

## Example Usage

node index.js add "Finish project report"
node index.js list todo
node index.js update 3 --status done
node index.js delete 2
