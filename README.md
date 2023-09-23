
# Task Manager API

A simple RESTful API for managing tasks. It supports operations like adding tasks, fetching tasks, updating them, and deleting them.

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## API Reference

#### Health Check

```http
  GET /health
```

| Parameter | Type     | Description                | Response |
| :-------- | :------- | :------------------------- | ---------|
|  |  |  | Server is running |

#### Create a Task

```http
  POST /tasks
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. title of the task |
| `description`      | `string` | **Required**. description of the task |
| `priority`      | `string` | **Optional**. priority of the task "low", "medium", "high" |

Response:

```http
{
    "message": "Task created successfully",
    "task": {
        "id": "generated_task_id",
        "title": "Sample Task",
        "description": "This is a sample task",
        "priority": "medium",
        "created_at": "timestamp"
    }
}
```

#### Get All Tasks

```http
  GET /tasks
```

| Query Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `flag`      | `string` | **Optional**. Filter tasks based on flag value. Either true or false. |
| `sort`      | `string` | **Optional**. Sort tasks based on created_at. Either "asc or "desc" |

Response:

```http
{
    "message": "Tasks fetched successfully",
    "tasks": [
        {...},
        ...
    ]
}
```

#### Get Task by ID

```http
  GET /tasks/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the Task |

Response:

```http
{
    "message": "Task fetched successfully",
    "task": {...}
}
```

#### Get Tasks by Priority

```http
  GET /tasks/priority/:priority
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `priority`      | `string` | **Required**. priority of the task "low", "medium", "high" |

Response:

```http
{
    "message": "Task fetched successfully",
    "task": [...]
}
```

#### Update a Task

```http
  PUT /tasks/:id
```

Params:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the task |

Body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Optional**. title of the task |
| `description`      | `string` | **Optional**. description of the task |
| `priority`      | `string` | **Optional**. priority of the task "low", "medium", "high" |
| `flag`      | `boolean` | **Required**. Status of the task |

Response:

```http
{
    "message": "Task updated successfully",
    "task": {
        ....
    }
}
```

#### Delete a Task

```http
  DELETE /tasks/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the task |

Response:

```http
{
    "message": "Task deleted successfully",
    task: id
}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
