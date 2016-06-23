var React = require('react'),
    ReactDOM = require('react-dom');

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

var AnswerMultipleChoiceQuestion = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        choices: React.PropTypes.array.isRequired,
        onCompleted: React.PropTypes.func
    },
    getInitialState: function () {
        return {
            id: uniqueId('multiple-choice-'),
            value: this.props.value
        };
    },
    handleChanged: function (value) {
        this.setState({value: value});
        this.props.onCompleted(value);
    },
    renderChoices: function () {
        return this.props.choices.map(function (choice, i) {
            var radioProp = {
                id: "choice-" + i,
                name: this.state.id,
                label: choice,
                value: choice,
                checked: this.state.value === choice,
                onChange: this.handleChanged
            };
            return <AnswerRadioInput {...radioProp} />;
        }.bind(this));
    },
    render: function () {
        return (
            <div className="form-group">
                <label className="survey-item-label" htmlFor={this.state.id}>
                    {this.props.label}
                </label>
                <div className="survey-item-content">
                    {this.renderChoices()}
                </div>
            </div>
        );
    }
});

ReactDOM.render(<AnswerMultipleChoiceQuestion label="myMultipleChoices" 
    choices={['apple', 'bananna', 'orange']} value="apple"/>, 
    document.getElementById("mydiv"));
// ReactDOM.render(<AnswerRadioInput name = "test1" label="Option 1" value="test1" />, document.getElementById("mydiv"));
