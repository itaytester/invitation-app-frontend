import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function useFetchUsers(url) {
  const [status, setStatus] = useState("");
  const [users, setUsers ] = useState(null);

  
  const fetch = async () => {
    try {
      const res = await axios.get(url);
      setStatus("finished");
      setUsers(res.data);
    } catch (error) {
      setStatus("failed");
    }
  };

  const execute = useCallback(() => {
    fetch();
  },[url]);

  useEffect(() => {
    fetch();
  }, [url]);

  return [execute, users, status ];
}

export default useFetchUsers;
