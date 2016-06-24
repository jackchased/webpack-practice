var React = require('react'),
    ReactDOM = require('react-dom');

var Radio = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func
    },
    getInitialState: function () {
        return {
            // Uncontrolled interface: default value comes from defaultValue
            value: this.props.defaultValue
        }
    },

    handleChange: function (evt) {
        if (this.props.onChange)
            this.props.onChange(evt);
        
        this.setState({
            value: evt.target.value
        });
    },
    render: function () {
        var children = [],
            value = this.props.value || this.state.value;
        
        React.Children.forEach(this.props.children, function (child, i) {
            var label= (
                <label>
                    <input type="radio" name={this.props.name} value={child.props.value}
                           checked={child.props.value === value} onChange={this.handleChange}
                    />
                    {child.props.children}
                    <br />
                </label>
            );
            
            children.push(label);
        }.bind(this));
        return <div> {children} </div>;
    }
});

// uncontrolled
var MyForm = React.createClass({
    getInitialState: function () {
        return {
            my_radio: "B"
        };
    },
    handleChange: function (evt) {
        console.log(evt)
        this.setState({
            my_radio: evt.target.value
        });
    },
    submitHandler: function (evt) {
        evt.preventDefault();
        alert(this.state.my_radio);
    },
    render: function () {
        return (
            <form onSubmit={this.submitHandler}>
                <Radio name="my_radio" value={this.state.my_radio} onChange={this.handleChange}>
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                </Radio>
                <br />
                <button type="submit">Speak</button>
            </form>
        );
    }
});

ReactDOM.render(<MyForm />, 
    document.getElementById("mydiv"));


// uncontrolled
/*var MyForm = React.createClass({
    submitHandler: function (evt) {
        evt.preventDefault();
        alert(this.refs.radio.state.value);
        // not use this.refs.radio.getDOMNode(), since this DOMNode is <Radio>, not <input>
        // we've saved value to component's state, thus we just read this.refs.radio.state.value
    },
    render: function () {
        return (
            <form onSubmit={this.submitHandler}>
                <Radio ref="radio" name="my_radio" defaultValue="B">
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                </Radio>
                <br />
                <button type="submit">Speak</button>
            </form>
        );
    }
});*/

// use name attribute of a DOMNode
/*var MyForm = React.createClass({
    getInitialState: function () {
        return {
            given_name: "",
            family_name: ""
        };
    },
    handleChange: function (evt) {
        var newState = {};
        newState[evt.target.name] = evt.target.value
        this.setState(newState);
    },
    submitHandler: function (evt) {
        evt.preventDefault();

        var words = [
            "Hi,",
            this.state.given_name,
            this.state.family_name
        ];
        alert(words.join(" "));
    },
    render: function () {
        return (
            <form onSubmit={this.submitHandler}>
                <label htmlFor="given_name">
                    Given Name:
                </label>
                <input type="text" name="given_name"
                       value={this.state.given_name}
                       onChange={this.handleChange}
                />
                <br />
                <label htmlFor="family_name">
                    Family Name:
                </label>
                <input type="text" name="family_name"
                       value={this.state.family_name}
                       onChange={this.handleChange}
                />
                <br />
                <button type="submit">Speak</button>
            </form>
        );
    }
});*/


// .bind(this, ...)
/*var MyForm = React.createClass({
    getInitialState: function () {
        return {
            given_name: "",
            family_name: ""
        };
    },
    handleChange: function (name, evt) {
        var newState = {};
        newState[name] = evt.target.value
        this.setState(newState);
    },
    submitHandler: function (evt) {
        evt.preventDefault();

        var words = [
            "Hi,",
            this.state.given_name,
            this.state.family_name
        ];
        alert(words.join(" "));
    },
    render: function () {
        return (
            <form onSubmit={this.submitHandler}>
                <label htmlFor="given_name">
                    Given Name:
                </label>
                <input type="text" name="given_name"
                       value={this.state.given_name}
                       onChange={this.handleChange
                           .bind(this, 'given_name')}
                />
                <br />
                <label htmlFor="family_name">
                    Family Name:
                </label>
                <input type="text" name="family_name"
                       value={this.state.family_name}
                       onChange={this.handleChange
                           .bind(this, 'family_name')}
                />
                <br />
                <button type="submit">Speak</button>
            </form>
        );
    }
});*/

/*var MyForm = React.createClass({
    getInitialState: function () {
        return {
            radio: "B"
        };
    },
    handleChange: function (evt) {
        this.setState({
            radio: evt.target.value
        });
    },
    submitHandler: function (evt) {
        evt.preventDefault();
        alert(this.state.radio);
    },
    render: function () {
        return (
            <form onSubmit={this.submitHandler}>
                <input type="radio" 
                       value="A" 
                       name="OptionA"
                       checked={this.state.radio === 'A'}
                       onChange={this.handleChange}  /> A
                <br />
                <input type="radio" 
                       value="B" 
                       name="OptionB"
                       checked={this.state.radio === 'B'}
                       onChange={this.handleChange}  /> B
                <br />
                <input type="radio" 
                       value="C" 
                       name="OptionC"
                       checked={this.state.radio === 'C'}
                       onChange={this.handleChange} /> C
                <br />
                <button type="submit">Speak</button>
            </form>
        );
    }
});*/

/*var MyForm = React.createClass({
    submitHandler: function (evt) {
        evt.preventDefault();
        alert(this.refs.myChecked.checked);
    },
    render: function () {
        return (
            <form onSubmit={this.submitHandler}>
                <input ref="myChecked" type="checkbox" value="A" defaultChecked="true" />
                <br />
                <button type="submit">Speak</button>
            </form>
        );
    }
});*/

/*var MyForm = React.createClass({
    getInitialState: function () {
        return {
            opts: [ "B" ]
        };
    },
    handleChange: function (evt) {
        var checked = [];
        var sel = evt.target;

        for (var i = 0, len = sel.length; i < len; i++) {
            var option = sel.options[i];
            if (option.selected)
                checked.push(option.value);
        }

        this.setState({
            opts: checked
        });
    },
    submitHandler: function (evt) {
        evt.preventDefault();
        alert(this.state.opts);
    },
    render: function () {
        return (
            <form onSubmit={this.submitHandler}>
                <select multiple="true"
                        value={this.state.opts}
                        onChange={this.handleChange}>
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                </select>
                <br />
                <button type="submit">Speak</button>
            </form>
        );
    }
});*/

/*var MyForm = React.createClass({
    getInitialState: function () {
        return {
            helloTo: "Hello World!"
        };
    },
    handleChange: function (evt) {
        this.setState({
            helloTo: evt.target.value.toUpperCase()
        });
    },
    submitHandler: function (evt) {
        evt.preventDefault();
        alert(this.state.helloTo);
    },
    render: function () {
        return (
            <form onSubmit={this.submitHandler}>
                <input type="text" value={this.state.helloTo} onChange={this.handleChange} />
                <br />
                <button type="submit">Speak</button>
            </form>
        );
    }
});*/

/*var MyForm = React.createClass({
    submitHandler: function (evt) {
        evt.preventDefault();
        var helloTo = this.refs.helloTo.value;

        alert(helloTo);
    },
    render: function () {
        return (
            <form onSubmit={this.submitHandler}>
                <input ref="helloTo" type="text" defaultValue="Hello World!!!!" />
                <br />
                <button type="submit">Speak</button>
            </form>
        );
    }
});*/
