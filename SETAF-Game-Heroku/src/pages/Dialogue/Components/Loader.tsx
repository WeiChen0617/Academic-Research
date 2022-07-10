import React from "react";
import {Upload, Button, message, Input} from "antd";
import {InboxOutlined} from '@ant-design/icons';

const {Dragger} = Upload;
const {TextArea} = Input;

interface IProps {
    File: { name: string, content: string }
    setFile: Function,
    hideDrawer: Function,
}

const Loader: React.FunctionComponent<IProps> = (pprops) => {
    const {File, setFile, hideDrawer} = pprops;
    const props = {
        name: 'file',
        multiple: false,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        showUploadList: false,
        beforeUpload(file: any, list: any) {
            if (window.FileReader) {
                let filename = file.name;
                var reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function () {
                    // console.log('reading', this.result);
                    setFile({
                        name: filename,
                        content: reader.result,
                    })
                };
            }
            return false;
        },

        onChange(info: any) {
            const {status} = info.file;
            if (status !== 'uploading') {
                // console.log(info.file, info.fileList);
            }
            message.success(`${info.file.name} file uploaded successfully.`);
        },
        onDrop(e: any) {
            // console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        File.name.length === 0 ? (
                <Dragger  {...props} >
                    <div>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined/>
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </div>
                </Dragger>
            )
            :
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <p className='ant-upload-text'>{File.name}</p>
                <TextArea disabled style={{height: '220px'}} value={File.content ? File.content.toString() : ''}/>
                <Button style={{marginTop: '20px', width: '100px'}} onClick={() => hideDrawer()}>Done</Button>
            </div>
    )
};
export default Loader
