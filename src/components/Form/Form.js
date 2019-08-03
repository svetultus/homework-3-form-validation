import React from 'react';
import image from './assets/bond_approve.jpg';
import './Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.validateForm = this.validateForm.bind(this);
    this.changeInputHandler = this.changeInputHandler.bind(this);
    this.clearInputs = this.clearInputs.bind(this);
    this.allInputsAreValid = this.allInputsAreValid.bind(this);

    this.state = {
      formState: {
        firstname: {
          status: null,
          errorMsg: ''
        },
        lastname: {
          status: null,
          errorMsg: ''
        },
        password: {
          status: null,
          errorMsg: ''
        }
      },
      isLogged: false
    };
    this.map = {
      firstname: {
        index: 0,
        valueCorrect: 'james',
        errorMsgEmpty: 'Нужно указать имя',
        errorMsgIncorrect: 'Имя указано не верно'
      },
      lastname: {
        index: 1,
        valueCorrect: 'bond',
        errorMsgEmpty: 'Нужно указать фамилию',
        errorMsgIncorrect: 'Фамилия указана не верно'
      },
      password: {
        index: 2,
        valueCorrect: '007',
        errorMsgEmpty: 'Нужно указать пароль',
        errorMsgIncorrect: 'Пароль указан не верно'
      }
    };
  }
  validateForm(e) {
    e.preventDefault();

    let form = e.target;

    for (const key in this.map) {
      const state = Object.assign(this.state.formState);
      const elem = form.querySelector('.t-input-' + key);

      if (!(form[key] && elem.value)) {
        state[key]['errorMsg'] = this.map[key]['errorMsgEmpty'];
        state[key]['status'] = '';
      } else if (
        form[key] &&
        form[key].value !== this.map[key]['valueCorrect']
      ) {
        state[key]['errorMsg'] = this.map[key]['errorMsgIncorrect'];
        state[key]['status'] = '';
      } else {
        state[key]['errorMsg'] = '';
        state[key]['status'] = 'validated';
      }
      this.setState({ formState: state });
    }

    this.setState({ isLogged: this.allInputsAreValid() });
  }

  allInputsAreValid() {
    let count = 0,
      countValidated = 0;
    const state = Object.assign(this.state.formState);

    for (const key in state) {
      count++;
      if (state[key]['status'] === 'validated') {
        countValidated++;
      }
    }
    return count === countValidated;
  }

  changeInputHandler(e) {
    this.clearInputs();
  }

  clearInputs() {
    const state = Object.assign(this.state.formState);
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        const elem = state[key];

        elem.errorMsg = '';
        elem.status = null;
      }
    }

    this.setState({ formState: state });
  }

  render() {
    const state = Object.assign(this.state.formState);

    if (this.state.isLogged) {
      return <Profile />;
    } else {
      return (
        <div className="app-container">
          <form className="form" onSubmit={this.validateForm}>
            <h1>Введите свои данные, агент</h1>
            <Input
              key="firstname"
              inputName="firstname"
              inputLabel="Имя"
              inputValue=""
              valueCorrect="james"
              errorMsg={state['firstname']['errorMsg']}
              changeInputHandler={this.changeInputHandler}
            />
            <Input
              key="lastname"
              inputName="lastname"
              inputLabel="Фамилия"
              inputValue=""
              valueCorrect="bond"
              errorMsg={state['lastname']['errorMsg']}
              changeInputHandler={this.changeInputHandler}
            />
            <Input
              key="password"
              inputName="password"
              inputLabel="Пароль"
              inputValue=""
              valueCorrect="007"
              errorMsg={state['password']['errorMsg']}
              changeInputHandler={this.changeInputHandler}
            />
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
