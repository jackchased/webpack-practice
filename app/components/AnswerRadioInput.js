var uniqueId = function(prefix){
    return prefix + Math.floor(Math.random() * 1000);
};

var AnswerRadioInput = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        value: React.PropTypes.string.isRequired,
        checked: React.PropTypes.bool,
        onChange: React.PropTypes.func.isRequired
    },
    getDefaultProps: function () {
        // optional props
        return {
            id: null,
            checked: false
        };
    },
    getInitialState: function () {
        var id = this.props.id ? this.props.id : uniqueId('radio-');
        return {
            id: id,
            name: id,
            checked: !!this.props.checked
        };
    },
    handleClick: function(evt) {
        this.setState({
            checked: !this.state.checked
        });
    },
    handleChanged: function (evt) {
        var checked = evt.target.checked;
        
        if (checked)
            this.props.onChange(this.props.value);
    },
    render: function () {
        return (
            <div>
                <label htmlFor={this.state.id}>
                    <input type="radio" 
                        name={this.props.name}
                        id={this.state.id}
                        value={this.props.value}
                        checked={this.props.checked} 
                        // onClick={this.handleClick} 
                        onChange={this.handleChanged} />
                    {this.props.label}
                </label>
            </div>
        );
    }
});

// ReactDOM.render(<AnswerRadioInput name = "test1" label="Option 1" value="test1" />, document.getElementById("mydiv"));

