import React, { useState } from 'react';
import { SampleCollection } from "../../api/collections/Sample";

export const UploadForm = () => {
    // const [text, setText] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        SampleCollection.insert({
            title: "titletext",
            author: "authortesxt",
            copies: 3,
            lastCheckedOut: new Date(),
            summary: "abfuwaofgauhwfw",
            // THIS SHOULD BE A METEOR METHOD INSTEAD, CALLED ON THE SERVER
        });

        // SAVE TO DEVICE/GDRIVE
    };

    return (
        <form className="upload-form" onSubmit={handleSubmit}>
            <input
                type="file"
            />

            <button type="submit">Add Task</button>
        </form>
    );
};