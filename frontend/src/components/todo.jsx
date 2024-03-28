import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { Link } from "react-router-dom";

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
        `http://localhost:8080/todos/${id}`,
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
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a>
                    <span className="absolute inset-0 " />
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
