import React, { Component } from "react";
import { Outlet, Link } from "react-router-dom";



import './App.css';


class Layout extends Component 
{
  constructor (props)
  {
    super (props);

    this.onClickMenu = this.onClickMenu.bind(this);
  }

  onClickMenu ()
  {
    if (this.props.focuscb)
      this.props.focuscb ();
  }
  render ()
  {
      return (
        <div className='main_div'>

          <header>
            <div className='pure-g'>
              <div className="pure-u-1-5 divblack"></div>
              <div className='pure-u-3-5 '>
                <div className="pure-menu pure-menu-horizontal menu_font" role={'presentation'} >
                <a href="https://www.braillerap.org" target="_blank"><span className="pure-menu-headi">BrailleRAP</span></a>
                  <nav>
                    <ul className="pure-menu-list" >
                      <li className="pure-menu-item ">
                        <Link to="/" className="pure-menu-link" 
                          onClick={this.onClickMenu}
                          
                          >
                          Saisie
                        </Link>

                      </li>

                      <li className="pure-menu-item">
                        <Link to="/impression" className="pure-menu-link" onClick={this.onClickMenu}>
                          Impression
                        </Link>
                      </li>
                      <li className="pure-menu-item">  
                        <Link to="/parametre" className="pure-menu-link" onClick={this.onClickMenu}>
                          Paramètres
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="pure-u-1-5 divblack"></div>
            </div>
          </header>

          <main>
            <div className="pure-g main_layout">
              <div className="pure-u-1-5 divblack"></div>

              <div className="pure-u-3-5 divwhite">
                <div aria-live={"polite"} aria-atomic={false} role={"log"} aria-relevant={"all"}>
                <Outlet />
              </div>
              </div>
              <div className="pure-u-1-5 divblack"></div>
              
            </div>

          </main>
        
        
        </div >
      )
  }
}

export default Layout;