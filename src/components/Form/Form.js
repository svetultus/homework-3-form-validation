import React from 'react';
import image from './assets/bond_approve.jpg';
import './Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.validateForm = this.validateForm.bind(this);
    this.changeInputHandler = this.changeInputHandler.bind(this);
    this.clearInputs = this.clearInputs.bind(this);

    this.state = {
      formState: [
        {
          inputName: 'firstname',
          inputLabel: 'Имя',
          value: '',
          valueCorrect: 'james',
          status: null,
          errorMsg: ''
        },
        {
          inputName: 'lastname',
          inputLabel: 'Фамилия',
          value: '',
          valueCorrect: 'bond',
          status: null,
          errorMsg: ''
        },
        {
          inputName: 'password',
          inputLabel: 'Пароль',
          value: '',
          valueCorrect: '007',
          status: null,
          errorMsg: ''
        }
      ],
      isLogged: false
    };
    this.map = {
      firstname: {
        index: 0,
        errorMsgEmpty: 'Нужно указать имя',
        errorMsgIncorrect: 'Имя указано не верно'
      },
      lastname: {
        index: 1,
        errorMsgEmpty: 'Нужно указать фамилию',
        errorMsgIncorrect: 'Фамилия указана не верно'
      },
      password: {
        index: 2,
        errorMsgEmpty: 'Нужно указать пароль',
        errorMsgIncorrect: 'Пароль указан не верно'
      }
    };
  }
  validateForm(e) {
    e.preventDefault();

    let form = e.target;

    for (let key in this.map) {
      let index = this.map[key]['index'];
      let currentElement = this.state.formState[index];
      let state = this.state.formState.slice();

      if (
        !(
          form[currentElement.inputName] && form[currentElement.inputName].value
        )
      ) {
        state[index]['errorMsg'] = this.map[key]['errorMsgEmpty'];
        state[index]['status'] = '';
      } else if (
        form[currentElement.inputName] &&
        form[currentElement.inputName].value !== currentElement.valueCorrect
      ) {
        state[index]['errorMsg'] = this.map[key]['errorMsgIncorrect'];
        state[index]['status'] = '';
      } else {
        state[index]['errorMsg'] = '';
        state[index]['status'] = 'validated';
      }
      this.setState({ formState: state });
    }

    let formIsValidated = this.state.formState.every(elem => {
      return elem.status === 'validated';
    });

    this.setState({ isLogged: formIsValidated });
  }

  changeInputHandler(e) {
    let index = this.map[e.target.name]['index'];
    let state = this.state.formState.slice();
    let value = e.target.value;

    state[index].value = value;
    this.clearInputs();

    this.setState({ formState: state });
  }

  clearInputs() {
    let state = this.state.formState.slice();

    state.forEach(elem => {
      elem.errorMsg = '';
      elem.status = null;
    });

    this.setState({ formState: state });
  }

  render() {
    let state = this.state.formState.slice();

    if (this.state.isLogged) {
      return <Profile />;
    } else {
      return (
        <div className="app-container">
          <form className="form" onSubmit={this.validateForm}>
            <h1>Введите свои данные, агент</h1>
            {state.map(elem => {
              return (
                <Input
                  key={elem.inputName}
                  inputName={elem.inputName}
                  inputLabel={elem.inputLabel}
                  inputValue={elem.value}
                  errorMsg={elem.errorMsg}
                  changeInputHandler={this.changeInputHandler}
                />
              );
            })}
            <div className="form__buttons">
              <input
                type="submit"
                className="button t-submit"
                value="Проверить"
              />
            </div>
          </form>
        </div>
      );
    }
  }
}

function Input(props) {
  return (
    <p className="field">
      <label className="field__label" htmlFor={props.inputName}>
        <span className="field-label">{props.inputLabel}</span>
      </label>
      <input
        className={'field__input field-input t-input-' + props.inputName}
        type="text"
        name={props.inputName}
        value={props.inputValue}
        onChange={props.changeInputHandler}
      />
      <span className={'field__error field-error t-error-' + props.inputName}>
        {props.errorMsg}
      </span>
    </p>
  );
}

function Profile() {
  return (
    <div className="app-container">
      <img src={image} alt="bond approve" className="t-bond-image" />
    </div>
  );
}

export default Form;
