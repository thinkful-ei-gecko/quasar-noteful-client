import React, { Component } from 'react'
import config from '../config'
import ApiContext from '../ApiContext'

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
            'content-type': 'application/json'
          },
          body: JSON.stringify({
              name: newFolderName
          })
        })
          .then(res => {
            return res.json()
          })
          .then((data) => {
            console.log(data)
            this.context.addFolder(data)
            //console.log(this.context.addFolder(data));
          })
          .catch(error => {
            console.error({ error })
          })
    }
    

    validateFolderName(folderName) {
   
    }

    render() {
       //console.log(this.context);

        return (
            <form onSubmit={e => this.formSubmit(e)}>
                <label htmlFor="folderName">Folder Name</label>
                <input value={this.state.folder.value} onChange={e => this.setFolder(e.target.value)} type="text" id="folderName"></input>
                {this.validateFolderName }
                <input type="submit" value="sumbit"></input>
            </form>
        )
    }
}


