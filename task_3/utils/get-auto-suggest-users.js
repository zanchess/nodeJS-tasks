const getAutoSuggestUsers = (loginSubstring, limit, users) => {
  const sortedByLoginData = users.sort((a, b) => a.login.toLowerCase().localeCompare(b.login.toLowerCase()));

  const filteredByLoginSubstring = sortedByLoginData.filter((user) => user.login.includes(loginSubstring));

  const limetedUsersCollection = filteredByLoginSubstring.slice(0, Number(limit));
  return limetedUsersCollection;
};

export default getAutoSuggestUsers;
