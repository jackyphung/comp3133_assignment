import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from 'App';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

global.UID = {
  _current: 0,
  getNew: function() {
    this._current++;
    return this._current;
  }
};

HTMLElement.prototype.pseudoStyle = function(element,prop,value) {
	let _this = this;
	let _sheetId = "pseudoStyles";
	let _head = document.head || document.getElementsByTagName('head')[0];
	let _sheet = document.getElementById(_sheetId) || document.createElement('style');
	_sheet.id = _sheetId;
	let className = "pseudoStyle" + UID.getNew();
	
	_this.className +=  " "+className; 
	
	_sheet.innerHTML += " ."+className+":"+element+"{"+prop+":"+value+"}";
	_head.appendChild(_sheet);
	return this;
};

if (module.hot) {
  module.hot.accept();
}