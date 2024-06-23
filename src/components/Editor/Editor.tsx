import styles from './Editor.module.scss';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRef, useState } from 'react';
import { uploadFile } from '@/api/FileAPI';
interface Props {
    uploadUrl?: string;
}
function Editor({ uploadUrl }: Props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
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
                        console.log(file);
                        formData.append('attach', file);
                        console.log(formData.get('attach'));
                        console.log(formData);
                        uploadFile('boards', formData)
                            .then((data) => {
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
        <div className={styles.container}>
            <div className={styles.title}>
                <input type="text" placeholder="제목을 입력하세요." value={title} onChange={handleChangeTitle} />
            </div>
            <div className={styles.editorContainer}>
                <CKEditor
                    editor={ClassicEditor}
                    data=""
                    config={{ extraPlugins: [uploadPlugin] }}
                    onReady={(editor) => {
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        setContent(editor.getData());
                        // console.log({ event, editor, content });
                    }}
                    onBlur={(event, editor) => {
                        // console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        // console.log('Focus.', editor);
                    }}
                />
            </div>
        </div>
    );
}

export default Editor;
