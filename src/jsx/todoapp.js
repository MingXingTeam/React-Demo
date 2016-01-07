/**
"this.props" can ref the React Component Attr Object
"getInitialState" is default React method,which contains the state of React Component
"{}" is used to write React Program
**/

/**
how to bind event on DOM in React:

<input onChange={this.onChange} value={this.state.text}>
**/

import React from 'react';

React.createClass({
	render: () => {
		return (
			<ul>
				{
					this.props.items.map(item => {
						return <li key={item.id}>{item.text}</li>;
					})
				}
			</ul>
		);
	}
});

React.createClass({
	getInitialState: () => {
		return { items: [], text: '' };
	},
	onChange: e => {
		this.setState({
			text: e.target.value
		});
	},
	handleSubmit: e => {
		e.preventDefault();
		var nextItems = this.state.items.concat([{ text: this.state.text, id: Date().now() }]);
		var nextText = '';
		this.setState({
			items: nextItems, text: nextText
		});
	},
	render: () => {
		return '3';
	}
});
