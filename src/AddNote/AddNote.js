import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config'
import './AddNote.css'

class Note extends React.Component {

  static contextType = ApiContext;

  state = {
    name: {
      value: '',
      touched: false
    },
    content: {
      value: '',
      touched: false
    },
    folderId: {
      value: undefined,
      touched: false
    }
  }

  setName(e) {
    this.setState({ name: { value: e.target.value, touched: true} });
  }

  setContent(e) {
    this.setState({ content: { value: e.target.value, touched: true } });
  }

  setFolderId(e) {
    this.setState({ folderId: { value: e.target.value, touched: true } });
  }

  validateName() {
    let name = this.state.name.value.trim();
    if (name.length === 0) {
      return 'Note name has to be more than 0 characters long';
    }
    if (name.length < 2) {
      return 'Note name has to be at least 2 characters long';
    }
  }

  validateFolder() {
    if (!this.state.folderId.value) {
      return 1
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const time = new Date();

    console.log(e.target.select);

    const newNoteObj = {
      name: this.state.name.value,
      content: this.state.content.value,
      folderId: this.state.folderId.value,
      modified: time.toISOString()
    }

    console.log(newNoteObj);

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNoteObj)
    })
      .then(res => {
        if(!res.ok){
          throw new Error(res.statusText)
        }
        return res.json();
      })
      .then(note => {
        this.context.addNote(note);
      })
      .catch( e => {
        console.log(`error: {e}`);
      })
  }

  render() {

    return (
      <form
        className="addNoteForm"
        onSubmit={e => this.handleSubmit(e)}>
        <label htmlFor='noteNameInput'>Name</label>
        <input
          type='text'
          id='noteNameInput'
          value={this.state.name.value}
          onChange={e => this.setName(e)} />
          {this.state.name.touched && <p>{this.validateName()}</p>}

        <label htmlFor='noteContentInput'>Content</label>
        <textarea
          id='noteContentInput'
          value={this.state.content.value}
          onChange={e => this.setContent(e)} 
          maxLength={180}/>

        <select
          value={this.state.folderId.value}
          onChange={e => this.setFolderId(e)}>
          <option value=''>Select a Folder</option>

          {this.context.folders.map(folder => {
            return (<option key={folder.id} value={folder.id}>{folder.name}</option>)
          })}
        </select>

        <input 
          type='submit' 
          value='submit'
          disabled={this.validateName() || this.validateFolder()}></input>
      </form>
    );
  }
}

export default Note;