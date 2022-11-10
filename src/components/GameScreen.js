import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';

class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      number: 0,
      loading: true,
      selectedAnswer: false,
      timerRunning: false,
    };
  }

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(URL);
    const data = await response.json();
    const errorCode = 3;
    if (data.response_code === errorCode) {
      localStorage.removeItem('token');
      history.push('/');
    }
    const questions = data.results.map((question) => {
      const answers = this
        .randomizeQuestions(question.correct_answer, ...question.incorrect_answers);
      const obj = { ...question, answers };
      return obj;
    });
    this.setState({
      questions,
      loading: false,
      timerRunning: true,
    });
  }

  // Fisher–Yates shuffle
  randomizeQuestions = (...questions) => {
    const result = [];
    let originalArray = questions.map((question, i) => ({
      testId: i === 0 ? 'correct-answer' : `wrong-answer-${i - 1}`,
      question,
    }));
    while (originalArray.length > 0) {
      const index = Math.floor(Math.random() * originalArray.length);
      result.push(originalArray[index]);
      originalArray = originalArray.filter((_elements, i) => i !== index);
    }
    return result;
  };

  selectAnswer = () => {
    this.setState({ selectedAnswer: true });
  };

  timeOut = () => this.setState({ timerRunning: false, selectedAnswer: true });

  render() {
    const { questions, number, loading, selectedAnswer, timerRunning } = this.state;
    const { history } = this.props;
    if (loading) {
      return (<div>...Loading</div>);
    }
    const respostas = questions[number].answers;

    return (
      <div>
        {
          timerRunning
            ? <Timer timeOut={ this.timeOut } />
            : <p>Tempo Esgotado!</p>

        }
        <p
          data-testid="question-category"
        >
          {questions[number].category}
        </p>
        <p
          data-testid="question-text"
        >
          {questions[number].question}
        </p>
        <div data-testid="answer-options">
          {respostas.map(({ testId, question }, i) => {
            let style = {};
            if (selectedAnswer) {
              const color = testId.includes('correct') ? 'rgb(6, 240, 15)' : 'red';
              style = { border: `3px solid ${color}` };
            }
            return (
              <button
                style={ style }
                key={ `Q${i}` }
                type="button"
                data-testid={ testId }
                onClick={ this.selectAnswer }
                disabled={ !timerRunning }
              >
                {question}
              </button>
            );
          })}
        </div>
        {selectedAnswer && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => {
              const lastQuestion = 4;
              if (number === lastQuestion) {
                return history.push('/feedback');
              }

              this.setState({
                number: number + 1,
                selectedAnswer: false,
                timerRunning: true,
              });
            } }
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

GameScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default GameScreen;
