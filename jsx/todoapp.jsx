/*
TODO APP
*/
/**
"this.props" can ref the React Component Attr Object
"getInitialState" is default React method,which contains the state of React Component
"{}" is used to write React Program
**/

/**
how to bind event on DOM in React:

<input onChange={this.onChange} value={this.state.text}>
**/


var ToDoList = React.createClass({
	
	render:function(){
		var createItem = function(item){
			return <li key={item.id}>{item.text}</li>
		}
		return (
			<ul>
				{
					this.props.items.map(creatItem)
				}
			</ul>
		)
	}
})

var ToDoApp = React.createClass({
	getInitialState:function(){
		return {items:[],text:""}
	},
	onChange:function(e){
		this.setState({
			text:e.target.value
		});
	},
	handleSubmit:function(e){
		e.preventDefault();
		var nextItems = this.state.items.concat([{text:this.state.text,id:Date().now()}]);
		var nextText = "";
		this.setState({
			items:nextItems,text:nextText
		})
	},
	render:function(){
			return (
					<div>
						<h3>TODO APP</h3>	
						<ToDoList items={this.state.items} />
						<form onSubmit={this.handleSubmit}>
							<input onChange={this.onChange} value={this.state.text}>
							<button>{'add #'+this.state.items.length + 1}</button>
						</form>
					</div>
				)
	}
})