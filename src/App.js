import React from 'react';
import TodoDashboard from './components/TodoDashboard'; // Pastikan path-nya benar

function App() {
  return (
    <div className="p-10">
      <TodoDashboard /> {/* Memanggil komponen TodoDashboard */}
    </div>
  );
}

export default App;
