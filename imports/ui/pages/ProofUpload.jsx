import React from 'react';
import { Helmet } from 'react-helmet';
import { UploadForm } from "../components/UploadForm";



export const ProofUpload = () => (
    <>
        <Helmet>
            <title>SkillTree - 404: Upload Proof</title>
        </Helmet>
        <div className="flex items-center justify-center h-screen">
            <div><h1 className="text-8xl font-bold text-gray-400">Upload Proof</h1></div>

            <div>
                {/*<p>Upload New File:</p>*/}
                {/*/!*<input type="file" id="file-input" disabled={false}*!/*/}
                {/*/!*       onChange={uploadIt()}/>*!/*/}

                {/*<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload*/}
                {/*    file</label>*/}
                {/*<input*/}
                {/*    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"*/}
                {/*    aria-describedby="file_input_help" id="file_input" type="file" onChange={uploadIt}/>*/}
                {/*<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF*/}
                {/*    (MAX. 800x400px).</p>*/}
                <UploadForm/>
            </div>
        </div>
    </>
);

const uploadIt = (event) => {
    console.log('uploadit')
    // Access the input value using event.target.value
    const newValue = event.target.value;
    // Update the component's state or perform other actions
    console.log(newValue);
    console.log(event.target.files[0]);
}

