import React, { PureComponent } from 'react';
import Editor from 'react-umeditor';

export default class UmeditorIndex extends PureComponent {
    constructor(props) {
        super(props)
        this.getDefaultUploader = this.getDefaultUploader.bind(this)
    }
    getDefaultUploader() {
        return {
            url:'/api/upload',
            name:"file",
            request: "url"
        }
    }
    render() {
        const uploader = this.getDefaultUploader();
        const plugins = {
            image:{
                uploader:uploader
            }
        }
        return <Editor plugins={plugins} />
    }
}