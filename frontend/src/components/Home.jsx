import { useEffect, useState } from "react";
import { useTokenContext } from "../context/TokenContext";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const { isLogout, token } = useTokenContext();
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(null);
  const [editTask, setEditTask] = useState("");


  const addTask = async () => {
    try {
      const res = await fetch(`https://todo-tawny-beta-13.vercel.app/api/todo/createTodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ text: task }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Task added successfully`);
        setTask("");
        getTask();
      } else {
        toast.error(`Failed to add task`);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const getTask = async () => {
    try {
      const res = await fetch(`https://todo-tawny-beta-13.vercel.app/api/todo/getTodos`, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });
      const result = await res.json();
      const sortedTasks = result.data.sort((a, b) => a.completed - b.completed);
      setTasks(sortedTasks);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTask();
  }, [token]);


  const deleteTask = async (id) => {
    try {
      const res = await fetch(
        `https://todo-tawny-beta-13.vercel.app/api/todo/deleteTodo/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success(`Task deleted successfully`);
        getTask();
      } else {
        toast.error(`Failed to delete task`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, updateText) => {
    const res = await fetch(`https://todo-tawny-beta-13.vercel.app/api/todo/updateTodo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ text: updateText }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success(`Task updated successfully`);
      setTaskId(null);
      setEditTask("");
      getTask();
    }
  };

  const handleEdit = (id, text) => {
    setTaskId(id);
    setEditTask(text);
  };


  const cancelEdit = () => {
    setTaskId(null);
    setEditTask("");
  };

  const toggleCompletion = async (id, completed) => {
    try {
      const res = await fetch(
        `https://todo-tawny-beta-13.vercel.app/api/todo/updateTodoCompletion/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ completed: !completed }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success(`Task completion status updated`);
        getTask();
      } else {
        toast.error(`Failed to update completion status`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Todo List</h1>
          {isLogout ? (
            <Navigate to="/login" />
          ) : (
            <Link
              to="/logout"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
            >
              Logout
            </Link>
          )}
        </div>
        <div className="mb-6">
          <input
            type="text"
            value={task}
            required
            placeholder="Enter task"
            onChange={(e) => setTask(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="w-full mt-2 bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
          >
            Add
          </button>
        </div>
        <ul className="space-y-4">
          {tasks.map((item, index) => {
            const { _id, text, completed } = item;
            return (
              <li
                key={index}
                className={`flex items-center justify-between bg-gray-200 p-4 rounded-md shadow ${
                  completed ? "line-through text-gray-500" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => toggleCompletion(_id, completed)}
                  className="w-5 h-5 mr-2"
                />

                {taskId === _id ? (
                  <div className="flex-1 flex items-center space-x-2">
                    <input
                      type="text"
                      value={editTask}
                      onChange={(e) => setEditTask(e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => updateTask(_id, editTask)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="flex-1">{text}</span>
                    <div className="space-x-2">
                      <button
                        onClick={() => deleteTask(_id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEdit(_id, text)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
