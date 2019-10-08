import React from 'react'
import config from '../config'
import ApiContext from '../ApiContext'
import './AddFolder.css';

export default class AddFolder extends React.Component {
    
    static contextType = ApiContext;

    state = {folder: {value: '', touched: false}};
    
    setFolder(value) {
        this.setState({folder: {value: value, touched: true}});
    }

    formSubmit(e) {
        e.preventDefault();
        let newFolderName = this.state.folder.value;
        
        fetch(`${config.API_ENDPOINT}/folders`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${config.API_KEY}`
          },
          body: JSON.stringify({
              name: newFolderName
          })
        })
          .then(res => {
            if (!res.ok) {
              throw new Error(res.statusText);
            }
            this.setState({folder: {value: ''}});
            return res.json()
          })
          .then((data) => {
            console.log(data)
            this.context.addFolder(data)
          })
          .catch(error => {
            console.log({ error })
          })
    }
    

    validateFolderName() {
      let folderName = this.state.folder.value;
      let name = folderName.trim();
      if (name.length === 0) {
        return 'Folder name has to be more than 0 characters long';
      }
      if (name.length < 2) {
        return 'Folder name has to be at least 2 characters long';
      }
    }

    render() {
       //console.log(this.context);

        return (
            <form 
            onSubmit={e => this.formSubmit(e)}
            className="addFolderForm">
                <label htmlFor="folderName">Folder Name</label>
                <input 
                  value={this.state.folder.value} 
                  onChange={e => this.setFolder(e.target.value)} 
                  type="text" 
                  id="folderName"></input>
                {this.state.folder.touched === true && <p>{this.validateFolderName()}</p> }
                <input 
                  type="submit" 
                  disabled={this.validateFolderName()}
                  value="submit"></input>
            </form>
        )
    }
}


