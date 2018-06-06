import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

function uploadImageCallBack(file) {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
        xhr.open('POST', '/api/file/imgUploadArt');
        const data = new FormData(); // eslint-disable-line no-undef
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          const data = {data: {link: response.data}};
          resolve(data);
        });
        xhr.addEventListener('error', () => {
          console.log('fail')
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      },
    );
  }

  
class ControlledEditor extends Component {
  constructor(props) {
    super(props);
    const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.printOut = this.printOut.bind(this)
  }

  onEditorStateChange (editorState) {
    this.setState({
      editorState,
    });
  };

  printOut () {
    const outString = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    // console.log(outString)
    alert(outString)
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
            toolbarClassName="rdw-storybook-toolbar"
            wrapperClassName="rdw-storybook-wrapper"
            editorClassName="rdw-storybook-editor"
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            localization={{ locale: 'zh',}}
            toolbar={{
              inline: { inDropdown: true },
              image: {
                className: '图片',
                uploadCallback: uploadImageCallBack,
                previewImage: true,
                alt: { present: true, mandatory: false },
              },
              
            }}
            
        />
        <button onClick={this.printOut}>输出</button>
      </div>
    )
  }
}

export default ControlledEditor;

