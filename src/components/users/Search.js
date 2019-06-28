import React, { useState, useContext } from 'react';
import GithubContext from '../context/github/githubContext';
import AlertContext from '../context/alert/alertContext';

const Search = props => {
  const { searchUsers, clearUsers, users } = useContext(GithubContext);
  const { showAlert } = useContext(AlertContext);

  const [text, setText] = useState('');

  const onChangeHandler = event => setText(event.target.value);

  const onSubmitHandler = event => {
    event.preventDefault();
    if (text === '') {
      showAlert('Please enter something', 'light');
    } else {
      searchUsers(text);
      setText('');
    }
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmitHandler}>
        <input
          type="text"
          name="text"
          placeholder="Search users.."
          value={text}
          onChange={onChangeHandler}
        />
        <input
          type="submit"
          value="search"
          className="btn btn-dark btn-block"
        />
      </form>
      {users.length > 0 && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {};

export default Search;
