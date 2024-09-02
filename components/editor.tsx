"use client"

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useTheme } from "next-themes";

interface EditorProps {
    onChange: (value: string) => void,
    initialContent?: string | any[];
    editable?: boolean;
}
 const Editor = ({onChange, initialContent, editable}: EditorProps) => {
    const { resolvedTheme } = useTheme();


    const editor: BlockNoteEditor = useBlockNote({
        editable,
        initialContent: initialContent ? initialContent as PartialBlock[] : undefined,
        onEditorContentChange: (editor) => {
            onChange(editor.topLevelBlocks, null, 2)
        }
    })

    return (
        <div className="md:max-w-2xl lg:max-w-3xl">
            <BlockNoteView editor={editor} theme={resolvedTheme === "dark" ? "dark" : "light"} />
        </div>
    )
}
export default Editor