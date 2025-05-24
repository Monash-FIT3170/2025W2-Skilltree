import React from 'react';
import { FileInput, Label } from 'flowbite-react';

export const Dropzone = ({ onChangeFunc }) => {
  return (
    <>
      {/* File Input Dropzone */}
      {/* Note: App currently seems to be stuck in dark mode, so i replaced all 'dark:' with 'light:' to get it back to a light-looking display */}
      {/* Code from Flowbite https://flowbite-react.com/docs/forms/file-input#dropzone with fix from https://github.com/themesberg/flowbite/issues/447#issuecomment-1460270937 */}
      <div className="flex w-full items-center justify-center">
        <Label
          htmlFor="dropzone-file"
          className="relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-gray-100 light:border-gray-600 light:bg-gray-700 light:hover:border-gray-500 light:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 light:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 light:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 light:text-gray-400">
              Any image/video files accepted (MAX. 30MB)
            </p>
          </div>
          <FileInput
            id="dropzone-file"
            name="file"
            className=" absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*,video/*"
            onChange={onChangeFunc}
          />
        </Label>
      </div>
    </>
  );
};
