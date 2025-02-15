import { useState } from 'react';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';

function App() {
  const [isOpen, open] = useState(false);
  return (
    <main>
      <div>
        <button>Добавить котика</button>
      </div>
      <UserList />
      {isOpen && <UserForm />}
    </main>
  );
}

export default App;
