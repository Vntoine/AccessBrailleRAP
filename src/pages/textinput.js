
import React from 'react';
import speech from './speech.js';


class TextInput extends React.Component {
    
    constructor(props) {

      super(props);
      
      this.state = {
        txt: this.props.src
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) 
    {
      
    }
    
    handleChange(event) 
    {
      //console.log (event.target.value)
      this.setState({txt: event.target.value});
      this.props.textcb (event.target.value);
    }
    componentDidMount ()
    {
        if(this.props.focusref)
            this.props.focusref.current.focus ();
        speech();
    }
    render ()
    {
      //console.log (this.props.options);
      if (! this.props.options)
      {
        return (
        <div aria-label='Formulaire de saisie du texte'>
        
        <h1 aria-label='Formulaire de saisie du texte'>Saisie du texte</h1>
        
        <form onSubmit={this.handleSubmit} >
          <textarea  aria-label='zone de saisie du texte pour transcription' value={this.state.txt} onChange={this.handleChange} 
          rows={21} cols={27} className="BrailleInput">{this.state.txt}</textarea>
      
        </form>
        </div>
      );
      
      }
      else
      return (
            <div>
                <h1>Formulaire de saisie du texte</h1>
                <form onSubmit={this.handleSubmit} >
                    <textarea  aria-label='zone de saisie du texte pour transcription' 
                    value={this.state.txt} 
                    onChange={this.handleChange} 
                    rows={this.props.options.nbline} 
                    cols={this.props.options.nbcol} 
                    ref={this.props.focusref}
                    className="BrailleInput">{this.state.txt}</textarea>
                </form>
                <button id="speechBtn">Lancer la reconnaissance</button>
            </div>
        );
    }
  }
  
  export default TextInput;