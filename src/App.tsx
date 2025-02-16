import { useState } from 'react';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';

function App() {
  const [isOpen, open] = useState(false);
  return (
    <main className="p-4 flex flex-col gap-3">
      <h1 className='text-3xl'>Пользователи</h1>

      <UserList />
      {isOpen && <UserForm />}
    </main>
  );
}

export default App;
