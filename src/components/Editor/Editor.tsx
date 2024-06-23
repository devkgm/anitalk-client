import './Editor.scss';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { uploadFile } from '@/api/FileAPI';
interface Props {
    uploadUrl: string;
    handleChange: Dispatch<SetStateAction<string>>;
    handleAttach(id: string): void;
}
function Editor({ uploadUrl, handleChange, handleAttach }: Props) {
    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        };
    }
    const customUploadAdapter = (loader) => {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    loader.file.then((file) => {
                        formData.append('attach', file);
                        uploadFile('boards', formData)
                            .then((data) => {
                                handleAttach(data.id);
                                resolve({ default: data.url });
                            })
                            .catch((e) => {
                                reject(e);
                            });
                    });
                });
            },
        };
    };

    return (
        <CKEditor
            editor={ClassicEditor}
            data=""
            config={{
                extraPlugins: [uploadPlugin],
                placeholder: '내용을 입력하세요.',
            }}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
                handleChange(editor.getData());
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
        />
    );
}

export default Editor;
