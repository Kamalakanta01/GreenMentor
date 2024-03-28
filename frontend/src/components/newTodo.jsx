import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTodo = () => {
  const [Task, setTask] = useState({
    userId: localStorage.getItem("userID"),
    title: "",
    objective: "",
    status: "pending", // New field for status
    priority: "medium", // New field for priority
  });

  const navigate = useNavigate();

  const handleSubmission = () => {
    axios
      .post("https://task-backend-blush.vercel.app/todos/create", Task, {
        headers: {
          auth: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success('Item Added Successfully');
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error('Unable to Add Item');
        console.log(err);
      });
  };

  const handleChange = (event) => {
    setTask({
      ...Task,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value)
  };

  return (
    <div className="relative">
      {/* Background effect */}
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      {/* End of Background effect */}
      <div className="max-w-md mx-auto mt-8">
        <form
          onSubmit={handleSubmission}
          className="bg-transparent rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="title"
              type="text"
              name="title"
              value={Task.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="objective"
            >
              Objective
            </label>
            <textarea
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="objective"
              name="objective"
              value={Task.objective}
              onChange={handleChange}
              placeholder="Enter task objective"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="status"
            >
              Status
            </label>
            <select
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="status"
              name="status"
              value={Task.status}
              onChange={handleChange}
            >
              <option value="">Select status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="priority"
            >
              Priority
            </label>
            <select
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="priority"
              name="priority"
              value={Task.priority}
              onChange={handleChange}
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <button
              className="block w-50 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Dashboard
            </button>
            <button
              className="block w-50 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold inline-flex items-center bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
              type="submit"
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
