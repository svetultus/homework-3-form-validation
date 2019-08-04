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
          value: '',
          status: null,
          errorMsg: ''
        },
        lastname: {
          value: '',
          status: null,
          errorMsg: ''
        },
        password: {
          value: '',
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

    const form = e.target;

    for (const key in this.map) {
      const state = Object.assign(this.state.formState);

      if (!(form[key] && state[key].value)) {
        state[key]['errorMsg'] = this.map[key]['errorMsgEmpty'];
        state[key]['status'] = '';
      } else if (
        form[key] &&
        state[key].value !== this.map[key]['valueCorrect']
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
    let allInputsAreValid = true;
    const state = Object.assign(this.state.formState);

    for (const key in state) {
      if (state[key]['status'] !== 'validated') {
        allInputsAreValid = false;
      }
    }
    return allInputsAreValid;
  }

  changeInputHandler(e) {
    this.clearInputs();
    const state = Object.assign(this.state.formState);

    state[e.target.name].value = e.target.value;

    this.setState({ formState: state });
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
              inputName="firstname"
              inputLabel="Имя"
              inputValue={state['firstname']['value']}
              errorMsg={state['firstname']['errorMsg']}
              changeInputHandler={this.changeInputHandler}
            />
            <Input
              inputName="lastname"
              inputLabel="Фамилия"
              inputValue={state['lastname']['value']}
              errorMsg={state['lastname']['errorMsg']}
              changeInputHandler={this.changeInputHandler}
            />
            <Input
              inputName="password"
              inputLabel="Пароль"
              inputValue={state['password']['value']}
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
