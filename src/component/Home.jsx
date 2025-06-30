import { useEffect, useState } from "react"
import axios from "axios"

function Home() {
    const API = 'https://task-back-end-blue.vercel.app/cart';
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
            if (error.response?.status === 403) {
                alert('you are not an admin')
            } else {
                alert('sdfasdfasdfasdf')
            }
        }
    };

    const startEdit = (task) => {
        setEditTask({ ...task })
        setTask({ title: task.title, description: task.description, status: task.status })
        setTask({ title: '', description: '', status: 'pending' })
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
            alert('Something went wrong')
        }
        // if (error.response?.status === 403) {
        //     alert('you are not an admin')
        //     setTask({ title: '', description: '', status: 'pending' })}
    };

    return (
        <section className="w-full min-h-screen py-5 bg-[#201E43]">
            <div className="container mx-auto">
                <h1 className="text-[30px] flex justify-center pt-4 pb-7 font-bold text-[#508C9B]">Tasks</h1>
                <div className="flex flex-col lg:flex-row items-center gap-7 pb-10 justify-center">
                    <input type="text" placeholder="Title"
                        className="bg-[#EEEEEE] p-1 rounded text-[#201E43] w-[250px] outline-none text-[20px]"
                        value={editTask ? editTask.title : task.title}
                        onChange={(e) => editTask ?
                            setEditTask({ ...editTask, title: e.target.value }) :
                            setTask({ ...task, title: e.target.value })
                        }
                    />
                    <input type="text" placeholder="Description"
                        className="bg-[#EEEEEE] p-1 rounded text-[#201E43] w-[250px] outline-none text-[20px]"
                        value={editTask ? editTask.description : task.description}
                        onChange={(e) => editTask ?
                            setEditTask({ ...editTask, description: e.target.value }) :
                            setTask({ ...task, description: e.target.value })
                        }
                    />
                    <select className="bg-[#EEEEEE] p-1 rounded text-[#201E43] w-[250px] outline-none text-[20px]"
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
                                <button onClick={handleUpdate} className="bg-[#5cb85c] py-2 px-4 rounded text-[20px] font-semibold transition-all duration-400 hover:bg-[#47b347] hover:shadow-lg hover:shadow-[#47b347] lg:w-fit w-[250px]">Save Changes</button>
                                <button onClick={() => setEditTask(null)} className="bg-[#ca2f2f] py-2 px-4 rounded text-[20px] font-semibold transition-all duration-400 hover:bg-[#ba0e0e] hover:shadow-lg hover:shadow-[#ba0e0e] lg:w-fit w-[250px]">Cancel</button>
                            </> :
                            <button onClick={handleAdd} className="bg-[#5cb85c] py-2 px-4 rounded text-[20px] font-semibold transition-all duration-400 hover:bg-[#47b347] hover:shadow-lg hover:shadow-[#47b347] lg:w-fit w-[250px]">Add</button>
                    }
                </div>
                {loading ? (<p>Loading tasks...</p>)
                    : error ? (<p>Something Went Wrong</p>)
                        : showData.length === 0 ?
                            (<p>No tasks available. Add your first task!</p>) :
                            (
                                <div className="">
                                    {showData.map((item) => (
                                        <div key={item._id} className="bg-[#EEEEEE] mb-4 flex flex-col lg:flex-row py-3 px-6 rounded justify-start lg:justify-between lg:items-center">
                                            <div>
                                                <h3 className="text-[23px] text-[#201E43] font-bold">{item.title}</h3>
                                                <p className="text-[20px] text-[#201E43]">{item.description}</p>
                                                <p className="text-[20px] text-[#201E43]">Status: {item.status}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleDelete(item._id)} className="bg-[#ca2f2f] py-2 px-4 rounded text-[20px] font-semibold transition-all duration-400 hover:bg-[#ba0e0e] hover:shadow-lg hover:shadow-[#ba0e0e]">delete</button>
                                                <button onClick={() => startEdit(item)} className="bg-[#5cb85c] py-2 px-4 rounded text-[20px] font-semibold transition-all duration-400 hover:bg-[#47b347] hover:shadow-lg hover:shadow-[#47b347]">update</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                }
            </div>
        </section>
    )
}

export default Home