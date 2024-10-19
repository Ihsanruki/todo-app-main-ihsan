import React, { useState } from 'react';
import { DatePicker, Button, Modal, Tooltip, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const TodoDashboard = () => {
  const [todos, setTodos] = useState([
    { id: 1, task: 'Tugas Pertemuan 1 Miss Nia', startDate: moment('22-05-2024', 'DD-MM-YYYY'), endDate: moment('23-05-2024', 'DD-MM-YYYY'), status: 'Selesai' },
    { id: 2, task: 'Task 1', startDate: moment('21-05-2024', 'DD-MM-YYYY'), endDate: moment('24-05-2024', 'DD-MM-YYYY'), status: 'Belum selesai' },
    { id: 3, task: 'Task 2', startDate: moment('19-06-2024', 'DD-MM-YYYY'), endDate: moment('10-07-2024', 'DD-MM-YYYY'), status: 'Selesai' },
  ]);

  const [newTask, setNewTask] = useState({ task: '', startDate: null, endDate: null });
  const [editing, setEditing] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddTodo = () => {
    // Check if startDate and endDate are valid
    if (!newTask.startDate || !newTask.endDate || newTask.startDate.isAfter(newTask.endDate)) {
      message.error('Tanggal mulai harus lebih awal dari tanggal selesai!');
      return;
    }

    const todoToAdd = {
      id: todos.length + 1,
      task: newTask.task,
      startDate: newTask.startDate,
      endDate: newTask.endDate,
      status: 'Belum selesai'
    };

    if (editing) {
      setTodos(todos.map(todo => (todo.id === editing ? { ...todo, ...newTask } : todo)));
      setEditing(null);
    } else {
      setTodos([...todos, todoToAdd]);
    }

    setNewTask({ task: '', startDate: null, endDate: null });
    setIsModalVisible(false);
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    setNewTask({
      task: todoToEdit.task,
      startDate: moment(todoToEdit.startDate), // Convert to moment object
      endDate: moment(todoToEdit.endDate), // Convert to moment object
    });
    setEditing(id);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">HALAMAN DASBOR ADMIN</h1>
      
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Input Todo</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Task:</label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded shadow-sm"
            value={newTask.task}
            onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
            placeholder="Masukkan tugas"
          />
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block mb-1 font-medium">Dimulai:</label>
            <DatePicker
              format="DD-MM-YYYY"
              value={newTask.startDate}
              onChange={(date) => setNewTask({ ...newTask, startDate: date })}
              className="w-full rounded border border-gray-300 shadow-sm"
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 font-medium">Selesai:</label>
            <DatePicker
              format="DD-MM-YYYY"
              value={newTask.endDate}
              onChange={(date) => setNewTask({ ...newTask, endDate: date })}
              className="w-full rounded border border-gray-300 shadow-sm"
            />
          </div>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" onClick={handleAddTodo}>
          {editing ? 'Update' : 'Proses'}
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">List Pekerjaan</h2>
        <table className="table-auto w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-2">No</th>
              <th className="border px-2 py-2">Task</th>
              <th className="border px-2 py-2">Start Date</th>
              <th className="border px-2 py-2">End Date</th>
              <th className="border px-2 py-2">Status</th>
              <th className="border px-2 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={todo.id} className="hover:bg-gray-100">
                <td className="border px-2 py-2 text-center">{index + 1}</td>
                <td className="border px-2 py-2">
                  <Tooltip title={todo.task} placement="top">
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap" style={{ maxWidth: '150px' }}>
                      {todo.task}
                    </div>
                  </Tooltip>
                </td>
                <td className="border px-2 py-2 text-center">{todo.startDate.format('DD-MM-YYYY')}</td>
                <td className="border px-2 py-2 text-center">{todo.endDate.format('DD-MM-YYYY')}</td>
                <td className="border px-2 py-2 text-center">{todo.status}</td>
                <td className="border px-2 py-2 flex justify-center space-x-2">
                  <Button 
                    type="primary" 
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(todo.id)}
                    size="small"
                  >
                    Edit
                  </Button>
                  <Button 
                    type="danger" 
                    style={{ backgroundColor: '#FF4D4F', borderColor: '#FF4D4F', color: 'white' }} 
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(todo.id)}
                    size="small"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal untuk mengedit tugas */}
      <Modal
        title="Edit Task"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)} // Menutup modal
        onOk={handleAddTodo} // Menyimpan perubahan
      >
        <div className="mb-4">
          <label className="block mb-1 font-medium">Task:</label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded shadow-sm"
            value={newTask.task}
            onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
            placeholder="Masukkan tugas"
          />
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block mb-1 font-medium">Dimulai:</label>
            <DatePicker
              format="DD-MM-YYYY"
              value={newTask.startDate}
              onChange={(date) => setNewTask({ ...newTask, startDate: date })}
              className="w-full rounded border border-gray-300 shadow-sm"
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 font-medium">Selesai:</label>
            <DatePicker
              format="DD-MM-YYYY"
              value={newTask.endDate}
              onChange={(date) => setNewTask({ ...newTask, endDate: date })}
              className="w-full rounded border border-gray-300 shadow-sm"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TodoDashboard;
