"use client";

import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Edit, Loader2, Monitor, Save } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { updateCoverLetter } from "@/actions/cover-letter";

type PreviewType = 'preview' | 'edit';

const CoverLetterPreview = ({ id, content }: { id: string, content: string | undefined }) => {
    const [resumeMode, setResumeMode] = useState<PreviewType>("preview");
    const [previewContent, setPreviewContent] = useState(content);

    const {
        loading: isSaving,
        fn: updateCoverLetterFn,
        data: saveResult,
        error: saveError,
    } = useFetch(updateCoverLetter);

    useEffect(() => {
        setPreviewContent(content);
    }, [content]);

    const onSubmit = async (data: any) => {
        try {
            await updateCoverLetterFn(id, previewContent);
        } catch (error) {
            console.error("Save error:", error);
        }
    };

    return (
        <div className="py-4">
            <div className="flex justify-between items-center mb-4">
                <Button
                    variant="link"
                    type="button"
                    className="mb-2"
                    onClick={() =>
                        setResumeMode(resumeMode === "preview" ? "edit" : "preview")
                    }
                >
                    {resumeMode === "preview" ? (
                        <>
                            <Edit className="h-4 w-4" />
                            Edit Resume
                        </>
                    ) : (
                        <>
                            <Monitor className="h-4 w-4" />
                            Show Preview
                        </>
                    )}
                </Button>


                <Button
                    onClick={onSubmit}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4" />
                            Save
                        </>
                    )}
                </Button>

            </div>
            <MDEditor
                value={previewContent}
                onChange={setPreviewContent}
                height={800}
                preview={resumeMode}
            />
        </div>
    );
};

export default CoverLetterPreview;