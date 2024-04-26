import { useReducer } from 'react';
import './App.css'

const formReducer = (state, action) => {
  switch (action.type) {
    case 'email': return { ...state, email: action.payload };
    case 'password': return { ...state, password: action.payload };
    case 'submit': return { ...state, isSubmitted: true };
    case 'reset': return {email: '',password: '',isSubmitted: false};
    default: throw new Error('Invalid action type');
  }
};

// Component using useReducer
function App() {
  const [state, dispatch] = useReducer(formReducer, {email: '',password: '',isSubmitted: false});

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name, payload: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'submit' });
  };

  const handleReset = () => {
    dispatch({ type: 'reset' });
  };

  return (
    <div className='container'>
      <h1 style={{textAlign: 'center'}}>Login</h1>
      {!state.isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <div>User Email: {state.email}</div>
          <div>User Password: {state.password}</div>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
}

export default App;

