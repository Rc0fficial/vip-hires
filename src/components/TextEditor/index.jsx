'use client'
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

// Dynamically import the editor to avoid SSR
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [convertedContent, setConvertedContent] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // Wait until component mounts to avoid SSR issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    const currentContent = editorState.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(currentContent));
    setConvertedContent(htmlContent);
  };

  if (!isMounted) {
    return (
      <div className="mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border border-gray-300 p-3 min-h-[200px]">
          Loading editor...
        </div>
      </div>
    );
  }

  return (
    <div className="  ">
      <div className=" mx-auto bg-white rounded-lg shadow-md overflow-hidden">
       
        
      <div className="border-b">
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class border border-gray-300 p-3 min-h-[200px]"
          toolbarClassName="toolbar-class border-t-0 border-l-0 border-r-0"
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'emoji', 'image', 'remove', 'history'],
          }}
        />
      </div>
        
        {/* <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">HTML Output:</h2>
          <div className="p-3 bg-gray-100 rounded-md min-h-[100px] border border-gray-300">
            {convertedContent || "Your HTML content will appear here..."}
          </div>
        </div> */}
        
        {/* <div className="p-4 bg-gray-50 border-t">
          <button
            onClick={() => {
              console.log(convertedContent);
              alert('Check console for HTML output');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Get HTML Content
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default TextEditor;