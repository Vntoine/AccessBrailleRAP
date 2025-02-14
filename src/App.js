import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './layout'
import BrailleView from './pages/brailleview';
import Home from './pages/home'
import TextInput from './pages/textinput'
import BrailleTable from './pages/BrailleTable'
import Parameters from "./pages/parameters";

import './App.css';

import { eel } from "./eel.js";

import AppOption from "./pages/components/AppOption";
import Modal from "react-modal"



class App extends Component {
    constructor(props)
    {
        super(props);
        eel.set_host("ws://localhost:8888");
        //eel.hello();
        this.state= (
            {
                logstr : '',
                srctxt : '',
                options : AppOption,
                serialstatus:0
            }
        );
        this.LogCallBack = this.LogCallBack.bind(this);
        this.SetText = this.SetText.bind(this);
        this.SetNbLine = this.SetNbLine.bind(this);
        this.SetNbCol = this.SetNbCol.bind(this);
        this.SetComPort = this.SetComPort.bind(this);
        this.SetOption = this.SetOption.bind(this);
        this.onMenuClick = this.onMenuClick.bind (this);    

        this.focusReference = React.createRef();
    }

    async componentDidMount ()
    {
        let option = await eel.gcode_get_parameters ()();
        let params = JSON.parse(option);
        
        this.setState ({options:params})
    }

    onMenuClick ()
    {
        if (this.focusReference)
          this.focusReference.current.focus ();
    }

    SetText (str)
    {
      this.setState ({srctxt :str});
    }
    SetNbLine (nbline)
    {
      this.setState ({nbline :nbline});
    }
    SetNbCol (nbcol)
    {
      this.setState ({nbcol:nbcol});
    }
    SetComPort (comport)
    {
      this.setState ({comport:comport});
    }
    SetOption (opt)
    {
      this.setState ({option:opt});
      eel.gcode_set_parameters(opt);
    }
    SetStatus (status)
    {
      this.setState({serialstatus: status})
    }
    LogCallBack (str)
    {
      this.setState ({logstr : this.state.logstr + str + '\r\n'});

    }
    render ()
    {
      return (
      <BrowserRouter>
            <Routes >
              <Route path="/" element={<Layout focuscb={this.onMenuClick} status={this.state.serialstatus}/>}>
                <Route index element={<TextInput logger={this.LogCallBack} src={this.state.srctxt} textcb={this.SetText} options={this.state.options} focusref={this.focusReference}/> } />
                <Route path="/impression" element={<BrailleView logger={this.LogCallBack} src={this.state.srctxt} options={this.state.options} focusref={this.focusReference} statuscb={this.SetStatus}/>} />
                <Route path="/parametre" element={<Parameters logger={this.LogCallBack} src={this.state.srctxt} 
                   options={this.state.options} nblinecb={this.SetNbLine} nbcolcb={this.SetNbCol} comportcb={this.SetComPort} optioncb={this.SetOption} focusref={this.focusReference}/> } />

                <Route path="*" element={<TextInput logger={this.LogCallBack} src={this.state.srctxt} textcb={this.SetText} options={this.state.options} focusref={this.focusReference}/>} />
              </Route>
            </Routes>
          </BrowserRouter>
      );
    }
}

export default App;
