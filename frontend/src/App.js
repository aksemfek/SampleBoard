import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Spring Boot의 API 호출
    axios.get('http://localhost:8080/api/hello')
        .then(response => {
          setMessage(response.data); // 받은 데이터를 상태에 저장
        })
        .catch(error => {
          console.error('There was an error fetching the data!', error);
        });
  }, []);

  return (
      <div>
        <h1>Message from Spring Boot:</h1>
        <p>{message}</p>
      </div>
  );
}

export default App;
