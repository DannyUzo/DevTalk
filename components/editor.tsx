"use client"

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
    onChange: (value: string) => void,
    initialContent?: string | any[];
    editable?: boolean;
}
 const Editor = ({onChange, initialContent, editable}: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        });

        return response.url;
    }

    const editor: BlockNoteEditor = useBlockNote({
        editable,
        initialContent: initialContent ? initialContent as PartialBlock[] : undefined,
        onEditorContentChange: (editor) => {
            onChange(editor.topLevelBlocks, null, 2)
        },
        uploadFile: handleUpload
    })

    return (
        <div className="md:max-w-2xl lg:max-w-3xl">
            <BlockNoteView editor={editor} theme={resolvedTheme === "dark" ? "dark" : "light"} />
        </div>
    )
}
export default Editor