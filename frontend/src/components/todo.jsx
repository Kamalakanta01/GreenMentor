import { Fragment,useEffect,useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { Link } from "react-router-dom";
import { Dialog } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TodoItems({ Data }) {
  const updatePriority = async (id, priority) => {
    try {
      await axios.put(
        `https://task-backend-blush.vercel.app/todos/${id}`,
        { priority },
        {
          headers: {
            auth: localStorage.getItem("token"),
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://task-backend-blush.vercel.app/todos/${id}`,
        { status },
        {
          headers: {
            auth: localStorage.getItem("token"),
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const EditPopup = ({ open, setOpen, cancelButtonRef, ID, Title, objective }) => {
    const [editedTitle, setEditedTitle] = useState(Title); // State for edited title
    const [editedObjective, setEditedObjective] = useState(objective); // State for edited objective
    console.log(Title)

    const handleSubmit = async() =>{
      try {
        await axios.put(
          `https://task-backend-blush.vercel.app/todos/${ID}`,
          { 
            title:editedTitle,
            objective:editedObjective
           },
          {
            headers: {
              auth: localStorage.getItem("token"),
            },
          }
        );
        window.location.reload()
      } catch (error) {
        console.error("Error updating priority:", error);
      }
    }
    return (
      <div className={`fixed inset-0 ${open ? 'block' : 'hidden'} overflow-y-auto`}>
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Task</h3>
                  <div className="mt-2">
                    <div className="mb-4">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        placeholder="Enter task title"
                        defaultValue={editedTitle}
                        onChange={(e)=>{setEditedTitle(e.target.value)}}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="objective" className="block text-sm font-medium text-gray-700">
                        Objective
                      </label>
                      <textarea
                        id="objective"
                        name="objective"
                        rows="3"
                        className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        placeholder="Enter task objective"
                        defaultValue={editedObjective}
                        onChange={(e)=>{setEditedObjective(e.target.value)}}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => {handleSubmit();setOpen(false)}}
              >
                Save
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={() => setOpen(false)}
                ref={cancelButtonRef}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [editArticleId, setEditArticleId] = useState(null);
  const [editArticleTitle, setEditArticleTitle] = useState("");
  const [editArticleObj, setEditArticleObj] = useState("");

  const handleEditClick = (articleId,ArticleTitle,ArticleObj) => {
    setEditArticleId(articleId);
    setEditArticleTitle(ArticleTitle);
    setEditArticleObj(ArticleObj)
    
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setEditArticleId(null);
    setEditArticleTitle("");
    setEditArticleObj("")
  };
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Data.map((post) => (
            <article
              key={post._id}
              className="flex max-w-xl flex-col items-start justify-between shadow-sm"
            >
              <div className="group relative ml">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 relative">
                  <a>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {post.objective}
                </p>
              </div>

              <div className="relative mt-8 flex items-center gap-x-4">
                <div className="flex items-center gap-x-4 text-xs mb-5 ml-2 mr-2">
                  <time dateTime={post.createdAt} className="text-gray-500">
                    {post.createdAt}
                  </time>
                  <div>
                    {/* Edit Button */}
                    <button
                      onClick={()=>{handleEditClick(post._id,post.title,post.objective)}}
                      className="mb-3 top-0 right-0 mt-3 mr-3 px-2 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                    >
                      Edit
                    </button>

                    {/* Edit Popup (Modal) */}
                    {isEditOpen && (
                      <EditPopup
                        open={isEditOpen}
                        setOpen={handleCloseEdit}
                        cancelButtonRef={cancelButtonRef}
                        ID={editArticleId}
                        Title={editArticleTitle}
                        objective={editArticleObj}
                      />
                    )}
                  </div>
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          post.priority === "low"
                            ? "bg-green-50 text-green-700 ring-green-600/20"
                            : post.priority === "medium"
                            ? "bg-blue-50 text-blue-700 ring-blue-700/10"
                            : "bg-red-50 text-red-700 ring-red-600/10"
                        }`}
                      >
                        {post.priority}
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                                onClick={() => updatePriority(post._id, "low")}
                              >
                                low
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                                onClick={() =>
                                  updatePriority(post._id, "medium")
                                }
                              >
                                medium
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                                onClick={() => updatePriority(post._id, "high")}
                              >
                                high
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          post.status === "pending"
                            ? "bg-red-50 text-red-700 ring-red-600/10"
                            : post.status === "in-progress"
                            ? "bg-blue-50 text-blue-700 ring-blue-700/10"
                            : "bg-green-50 text-green-700 ring-green-600/20"
                        }`}
                      >
                        {post.status}
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                                onClick={() =>
                                  updateStatus(post._id, "pending")
                                }
                              >
                                pending
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                                onClick={() =>
                                  updateStatus(post._id, "in-progress")
                                }
                              >
                                in-progress
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                                onClick={() =>
                                  updateStatus(post._id, "completed")
                                }
                              >
                                completed
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  {/* <a
                    className={`relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 ${
                      post.priority === "low"
                        ? "text-pink-700 ring-1 ring-inset ring-pink-700/10"
                        : post.priority === "medium"
                        ? "text-blue-700 ring-1 ring-inset ring-blue-700/10"
                        : "text-green-700 ring-1 ring-inset ring-green-600/20"
                    }`}
                  >
                    {post.priority}
                  </a> */}
                  {/* <a
                    className={`relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 ${
                      post.priority === "completed"
                        ? "text-pink-700 ring-1 ring-inset ring-pink-700/10"
                        : post.priority === "in-progress"
                        ? "text-blue-700 ring-1 ring-inset ring-blue-700/10"
                        : "text-green-700 ring-1 ring-inset ring-green-600/20"
                    }`}
                  >
                    {post.status}
                  </a> */}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
