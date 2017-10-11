import React, { Component } from 'react'
const { ipcRenderer } = window.require('electron')

class App extends Component {
  handleClick () {
    ipcRenderer.send('CHROME/LAUNCH', {
      commands: {
        scenarios: [
          {
            goto: [
              'https://www.google.co.jp/'
            ]
          },
          {
            screenshot: {
              path: `.temp/sample1.png`,
              fullPage: true
            }
          }
        ]
      }
    })
  }
  componentDidMount () {
    ipcRenderer.on('CHROME/PATH', (event, arg) => {
      console.log(arg)
    })
  }
  render () {
    return (
      <div>
        <header>
          <h1>Chrocoma</h1>
        </header>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias autem vero iusto nulla commodi necessitatibus placeat iure dolorem eum, voluptate culpa quidem blanditiis repellendus, numquam, facere cumque eligendi adipisci fugit.
        </p>
        <div>
          <button onClick={this.handleClick}>
            Executor
          </button>
        </div>
      </div>
    )
  }
}

export default App
