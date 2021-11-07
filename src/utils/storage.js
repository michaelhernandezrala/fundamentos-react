const storage = {
    get(key) {
      const value = localStorage.getItem(key);
      if (!value) {
        return null;
      }
      return JSON.parse(value);
    },
  
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
  
    remove(key) {
      localStorage.removeItem(key);
    },

    getSessionStorage(key) {
      const value = sessionStorage.getItem(key);
      if (!value) {
        return null;
      }
      return JSON.parse(value);
    },
  
    setSessionStorage(key, value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
  
    removeSessionStorage(key) {
      sessionStorage.removeItem(key);
    },
  };
  
  export default storage;
  