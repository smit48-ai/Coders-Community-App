import React from "react";
import { useRef } from "react";

const TextEditor = ({ formdata, setfromdata }) => {
  const textarea = useRef(null);
  //Toolbar effects
  function boldeffect() {
    var newtext = formdata.Content + "****";
    setfromdata({ ...formdata, Content: newtext });
    textarea.selectionEnd = textarea.selectionEnd - 2;
  }

  function codeblock() {
    var newtext = formdata.Content + "``````";
    setfromdata({ ...formdata, Content: newtext });
    textarea.selectionEnd = textarea.selectionEnd - 3;
  }

  function bulletedList() {
    var newtext = formdata.Content + "- item";
    setfromdata({ ...formdata, Content: newtext });
  }

  function numberedList() {
    var newtext =
      formdata.Content + "write like itemNo. space item Example: 1. item";
    setfromdata({ ...formdata, Content: newtext });
  }

  function italiceffect() {
    var newtext = formdata.Content + "**";
    setfromdata({ ...formdata, Content: newtext });
    textarea.selectionEnd = textarea.selectionEnd - 1;
  }

  function urleffect() {
    var newtext = formdata.Content + "[enter Link name](enter link url)";
    setfromdata({ ...formdata, Content: newtext });
  }
  return (
    <>
      <div className="w-full border border-gray-200 rounded-lg bg-gray-50 font-Poppins">
        <div className="px-3 py-2 border-b border-gray-200">
          <div className="flex flex-wrap items-center">
            <button
              id="toggleBoldButton"
              data-tooltip-target="tooltip-bold"
              type="button"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100"
              onClick={boldeffect}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 5h4.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0-7H6m2 7h6.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0 0H6"
                />
              </svg>
              <span className="sr-only">Bold</span>
            </button>
            <div
              id="tooltip-bold"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip"
            >
              Toggle bold
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>

            {/* Italic Button */}
            <button
              id="toggleItalicButton"
              data-tooltip-target="tooltip-italic"
              type="button"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100"
              onClick={italiceffect}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m8.874 19 6.143-14M6 19h6.33m-.66-14H18"
                />
              </svg>
              <span className="sr-only">Italic</span>
            </button>
            <div
              id="tooltip-italic"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Toggle italic
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>

            {/* Code Button */}
            <button
              id="toggleCodeButton"
              type="button"
              data-tooltip-target="tooltip-code"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={codeblock}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14"
                />
              </svg>
              <span className="sr-only">Code</span>
            </button>
            <div
              id="tooltip-code"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Format code
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>

            {/* Link Button */}
            <button
              id="toggleLinkButton"
              data-tooltip-target="tooltip-link"
              type="button"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={urleffect}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
                />
              </svg>
              <span className="sr-only">Link</span>
            </button>
            <div
              id="tooltip-link"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Add link
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>

            {/* Unordered List Button */}
            <button
              id="toggleListButton"
              type="button"
              data-tooltip-target="tooltip-list"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={bulletedList}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"
                />
              </svg>
              <span className="sr-only">Toggle list</span>
            </button>
            <div
              id="tooltip-list"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Toggle list
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>

            {/* Ordered List Button */}
            <button
              id="toggleOrderedListButton"
              type="button"
              data-tooltip-target="tooltip-ordered-list"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={numberedList}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4"
                />
              </svg>
              <span className="sr-only">Toggle ordered list</span>
            </button>
            <div
              id="tooltip-ordered-list"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Toggle ordered list
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-4 py-2 bg-white rounded-b-lg min-h-full">
          <textarea
            ref={textarea}
            required={true}
            placeholder="Transfer Your knowledge...."
            value={formdata.Content}
            name="Content"
            onChange={(e) =>
              setfromdata({ ...formdata, Content: e.target.value })
            }
            className="w-full px-0 py-0 text-sm text-gray-800 bg-white border-0 h-[350px] leading-tight border-none outline-none focus:outline-none focus:ring-0 resize-none"
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default TextEditor;
