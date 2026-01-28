import styles from "./app.module.css";
import {useState, useRef, useEffect } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState(null);

  const onSubmitButtonRef = useRef(null);

  const onEmailChange = ({ target }) => {
    setEmail(target.value);
  };

  const onEmailBlur = ({ target }) => {
    const error = /^\S{2,}@\S{2,}\.[a-zA-Z]{2,10}$/.test(target.value) ? null : 'Адрес электронной почты указан неверно'
    setEmailError(error);
  }

  const onPasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const onPasswordBlur = ({ target }) => {
    const error = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(target.value) ? null : 'Пароль должен содержать минимум одну цифру, букву и спецсимвол, длина должна составлять минимум 8 символов.'
    setPasswordError(error)


  }

  const onPasswordConfirmChange = ({ target }) => {
    setPasswordConfirm(target.value);
    const error = password === target.value ? null : 'Пароли не совпадают'
    setPasswordConfirmError(error);
  }

  useEffect(() => {
    if (password === passwordConfirm && onSubmitButtonRef.current) {
      onSubmitButtonRef.current.focus();
    }
  }, [password, passwordConfirm]);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('email:', email, 'password:', password);
  }

  const isFormFilled =
      email.trim() &&
      password.trim() &&
      passwordConfirm.trim();

  const isFormValid =
      isFormFilled &&
      !emailError &&
      !passwordError &&
      !passwordConfirmError;

  return (
    <div className={styles.app}>
      <form className={styles.form} onSubmit={onSubmit}>
        {emailError && <div className={styles.error}>{emailError}</div>}
        <input
          className={styles["form-element"]}
          value={email}
          name="email"
          type="text"
          placeholder="Ваш email"
          onBlur={onEmailBlur}
          onChange={onEmailChange}
        />
        {passwordError && <div className={styles.error}>{passwordError}</div>}
        <input
          className={styles["form-element"]}
          value={password}
          name="password"
          type="password"
          placeholder="Ваш пароль"
          onChange={onPasswordChange}
          onBlur={onPasswordBlur}
        />
        {passwordConfirmError && <div className={styles.error}>{passwordConfirmError}</div>}
        <input
          className={styles["form-element"]}
          value={passwordConfirm}
          name="password confirm"
          type="password"
          placeholder="Повторите пароль"
          onChange={onPasswordConfirmChange}
        />
        <button className={styles.button} type="submit" ref={onSubmitButtonRef} disabled={!isFormValid}>Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default App;
