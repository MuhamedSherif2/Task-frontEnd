import { useEffect, useState } from "react"
import axios from "axios"

function Task() {
    const API = 'https://task-back-end-two.vercel.app/cart';
    const [task, setTask] = useState({
        title: '', description: '', status: 'pending'
    })
    const [showData, setShowData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [editTask, setEditTask] = useState(null)

    useEffect(() => {
        fetchTask();
    }, [])

    const handleAdd = async () => {
        if (!task.description || !task.status || !task.title) return;
        try {
            await axios.post(API, task, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            })
            setTask({ title: '', description: '', status: 'pending' })
            fetchTask();
        } catch (error) {
            setError('Failed to add task')
        }
    }

    const fetchTask = async () => {
        setLoading(true)
        try {
            const response = await axios.get(API, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = response.data;
            const tasksArray = Array.isArray(data) ? data :
                data.data ? data.data :
                    data.tasks ? data.tasks :
                        [];
            setShowData(tasksArray)
        } catch (error) {
            setError('Failed to fetch tasks')
        } finally {
            setLoading(false)
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchTask();
        } catch (error) {
            console.error("Delete error:", error);
            setError('Failed to delete task');
        }
    };

    const startEdit = (task) => {
        setEditTask({ ...task })
        setTask({ title: task.title, description: task.description, status: task.status })
    }

    const handleUpdate = async () => {
        if (!editTask) return;
        try {
            const response = await axios.put(
                `${API}/${editTask._id}`,
                {
                    title: editTask.title,
                    description: editTask.description,
                    status: editTask.status
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            fetchTask();
            setEditTask(null)
            setTask({ title: '', description: '', status: 'pending' })
        } catch (error) {
            console.error("Update error:", error);
            setError('Failed to delete task');
        }
    };

    return (
        <section>
            <h1>Tasks</h1>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={editTask ? editTask.title : task.title}
                    onChange={(e) => editTask ?
                        setEditTask({ ...editTask, title: e.target.value }) :
                        setTask({ ...task, title: e.target.value })
                    }
                />
                <input type="text"
                    placeholder="Description"
                    value={editTask ? editTask.description : task.description}
                    onChange={(e) => editTask ?
                        setEditTask({ ...editTask, description: e.target.value }) :
                        setTask({ ...task, description: e.target.value })
                    }
                />
                <select
                    value={editTask ? editTask.status : task.status}
                    onChange={(e) => editTask ?
                        setEditTask({ ...editTask, status: e.target.value }) :
                        setTask({ ...task, status: e.target.value })
                    }
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                {
                    editTask ?
                        <>
                            <button onClick={handleUpdate}>Save Changes</button>
                            <button onClick={() => setEditTask(null)}>Cancel</button>
                        </> :
                        <button onClick={handleAdd}>Add</button>
                }
            </div>
            {/* {editTask && (
                <div>
                    <h2>Edit Task</h2>
                    <div>
                        <input
                            value={editTask.title}
                            onChange={(e) => }
                            placeholder="Title"
                        />
                        <input
                            value={editTask.description}
                            onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                            placeholder="Description"
                        />
                        <select
                            value={editTask.status}
                            onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <button onClick={handleUpdate}>Save Changes</button>
                        <button onClick={() => setEditTask(null)}>Cancel</button>
                    </div>
                </div>
            )} */}

            {loading ? (<p>Loading tasks...</p>)
                : error ? (<p>Something Went Wrong</p>)
                    : showData.length === 0 ?
                        (<p>No tasks available. Add your first task!</p>) :
                        (
                            <div className="bg-slate-400">
                                {showData.map((item) => (
                                    <div key={item._id}>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                        <p>Status: {item.status}</p>
                                        <button onClick={() => handleDelete(item._id)} className="bg-red-700">delete</button>
                                        <button onClick={() => startEdit(item)} className="bg-green-700">update</button>
                                    </div>
                                ))}
                            </div>
                        )
            }
        </section>
    )
}

export default Task