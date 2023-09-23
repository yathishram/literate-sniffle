const fs = require("fs");
const path = require("path");

const taskFilePath = path.join(__dirname, "..", "data", "tasks.json");

const readFromTaskFile = () => {
    try {
        const rawData = fs.readFileSync(taskFilePath, "utf-8");
        return JSON.parse(rawData);
    } catch (err) {
        throw new Error(err);
    }
};

const addTask = (task) => {
    try {
        const data = readFromTaskFile();
        data.tasks.push(task);
        fs.writeFileSync(taskFilePath, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        throw new Error(err);
    }
};

const getAllTasks = () => {
    try {
        const data = readFromTaskFile();
        return data.tasks;
    } catch (err) {
        throw new Error(err);
    }
};

const getTaskById = (id) => {
    try {
        const data = readFromTaskFile();
        return data.tasks.find(task => task.id === id);
    } catch (err) {
        throw new Error(err);
    }
};

const getTaskByPriority = (priority) => {
    try {
        const data = readFromTaskFile();
        return data.tasks.filter(task => task.priority === priority);
    } catch (err) {
        throw new Error(err);
    }
};

const updateTask = (id, newTaskData) => {
    try {
        const data = readFromTaskFile();
        const task = data.tasks.find(task => task.id === id);

        if (!task) {
            throw new Error('Task not found');
        }

        const { title, description, priority, flag } = newTaskData;
        Object.assign(task, {
            title: title || task.title,
            description: description || task.description,
            priority: priority || task.priority,
            flag: flag !== undefined ? flag : task.flag
        });

        fs.writeFileSync(taskFilePath, JSON.stringify(data, null, 2));
        return task;
    } catch (err) {
        throw new Error(err);
    }
};

const deleteTask = (id) => {
    try {
        const data = readFromTaskFile();
        const taskIndex = data.tasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
            throw new Error('Task not found');
        }

        data.tasks.splice(taskIndex, 1);
        fs.writeFileSync(taskFilePath, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    addTask,
    getAllTasks,
    getTaskById,
    getTaskByPriority,
    updateTask,
    deleteTask
};
