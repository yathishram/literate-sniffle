const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

// Middlewares
const createTaskValidation = require("./middleware/validationRules");
const updateTaskValidation = require("./middleware/updateValidationRules");
const priorityValidation = require("./middleware/priorityValidationRules");

// Controllers
const { 
    getAllTasks, 
    addTask, 
    getTaskById, 
    updateTask, 
    deleteTask, 
    getTaskByPriority 
} = require("./controllers/taskController");

const app = express();
const port = process.env.PORT || 5001;

// Middleware configurations
app.use(cors());
app.use(bodyParser.json());
app.set("trust proxy", true);

// Health check
app.get("/health", (req, res) => {
    res.status(200).send("Server is running");
});

// Routes
// Add a new task
app.post("/tasks", createTaskValidation, (req, res) => {
  try {
    const task = req.body;
    console.log(task);
    task.id = uuidv4();
    task.created_at = new Date().toISOString();
    if (!task.priority) {
      task.priority = "low";
    }
    if (!task.flag) { 
        task.flag = false;
    }
    addTask(task);
    res.status(201).json({
      message: "Task created successfully",
      task: task,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong while creating task",
      error: err.message,
    });
  }
});

// Fetch tasks with optional sorting and flag filters
app.get("/tasks", (req, res) => {
    try {
        let tasks = getAllTasks();

        if (req.query.flag !== undefined) {
            const flagValue = req.query.flag.toLowerCase() === 'true';
            tasks = tasks.filter(task => task.flag === flagValue);
        }

        if (req.query.sort === "asc") {
            // Sort tasks in ascending order based on created_at
            tasks.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        } else if (req.query.sort === "desc") {
            // Sort tasks in descending order based on created_at
            tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        res.status(200).json({
            message: 'Tasks fetched successfully',
            tasks: tasks
        });
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong while fetching tasks',
            error: err.message
        });
    }
})

// Fetch task by ID
app.get("/tasks/:id", (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "Task ID is required",
      });
    }
    const task = getTaskById(id);
    
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.status(200).json({
     message: "Task fetched successfully",
      task: task,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong while fetching task",
      error: err.message,
    });
  }
});

// Fetch tasks by priority
app.get("/tasks/priority/:priority", priorityValidation, (req, res) => {
    try {
        const priority = req.params.priority;
        if (!priority) {
            return res.status(400).json({
                message: "Priority is required",
            });
        }
        const task = getTaskByPriority(priority);
        
        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }
        res.status(200).json({
            message: "Task fetched successfully",
            task: task,
        });
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong while fetching task",
            error: err.message,
        });
    }
})



// Update task by ID
app.put("/tasks/:id", updateTaskValidation, (req, res) => {
    try{
        const id = req.params.id;
        const newTaskData = req.body;
        if(!id){
            return res.status(400).json({
                message: 'Task ID is required'
            });
        }

        const task = updateTask(id, newTaskData);
        res.status(200).json({
            message: 'Task updated successfully',
            task: task
        });

    }catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Something went wrong while updating task',
            error: err.message
        });
    }
})

// Delete task by ID
app.delete("/tasks/:id", (req, res) => {
    try{
        const id = req.params.id;
        if(!id){
            return res.status(400).json({
                message: 'Task ID is required'
            });
        }

        const task = deleteTask(id);
        res.status(200).json({
            message: 'Task deleted successfully',
            task: id
        });

    }catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Something went wrong while deleting task',
            error: err.message
        });
    }
})

// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
