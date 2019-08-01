import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.validateForm = this.validateForm.bind(this);
    this.changeInputHandler = this.changeInputHandler.bind(this);

    this.state = {
      formState: [
        {
          inputName: 'firstname',
          inputLabel: '',
          value: '',
          valueCorrect: 'James',
          status: null,
          errorMsg: ''
        },
        {
          inputName: 'lastname',
          inputLabel: '',
          value: '',
          valueCorrect: 'Bond',
          status: null,
          errorMsg: ''
        },
        {
          inputName: 'password',
          inputLabel: '',
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
      let state = this.state.formState;

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

    const formIsValidated = this.state.formState.every(elem => {
      return elem.status === 'validated';
    });

    this.setState({ isLogged: formIsValidated });
  }

  changeInputHandler(e) {
    let index = this.map[e.target.name]['index'];
    let state = this.state.formState;
    let value = e.target.value;

    state[index].value = value;

    this.setState({ formState: state });
  }

  render() {
    let state = this.state.formState;

    if (this.state.isLogged) return <Profile />;

    return (
      <form onSubmit={this.validateForm}>
        <h1>Введите свои данные, агент</h1>
        {state.map(elem => {
          console.log(elem);
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
          <input type="submit" className="button t-submit" value="Проверить" />
        </div>
      </form>
    );
  }
}

class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const errorClass =
      'field__error field-error t-error-' + this.props.inputName;
    const inputClass =
      'field__input field-input t-input-' + this.props.inputName;

    return (
      <p className="field">
        <label className="field__label" htmlFor={this.props.inputName}>
          <span className="field-label">{this.props.inputLabel}</span>
        </label>
        <input
          className={inputClass}
          type="text"
          name={this.props.inputName}
          value={this.props.inputValue}
          onChange={this.props.changeInputHandler}
        />
        <span className={errorClass}>{this.props.errorMsg}</span>
      </p>
    );
  }
}

function Profile(props) {
  return (
    <div class="app-container">
      <img
        src="/static/media/bond_approve.9943a33d.jpg"
        alt="bond approve"
        className="t-bond-image"
      />
    </div>
  );
}
export default Form;
