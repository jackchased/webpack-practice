var uniqueId = function(prefix){
    return prefix + Math.floor(Math.random() * 1000);
};

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
