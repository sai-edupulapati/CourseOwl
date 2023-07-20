import React, { useState } from 'react';

const ChatRoomSelector = () => {
  const [selectedRoom, setSelectedRoom] = useState('');
  const availableRooms = ['General', 'Tech', 'Random']; // Add more rooms as needed

  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
  };

  const handleJoinRoom = () => {
    // Implement the logic to join the selected room
    // For now, let's just log the selected room to the console
    console.log('Joined room:', selectedRoom);
  };

  return (
    <div>
      <h2>Select a Chat Room</h2>
      <select value={selectedRoom} onChange={handleRoomChange}>
        <option value="">Select a room</option>
        {availableRooms.map((room) => (
          <option key={room} value={room}>
            {room}
          </option>
        ))}
      </select>
      <button onClick={handleJoinRoom} disabled={!selectedRoom}>
        Join Room
      </button>
    </div>
  );
};

export default ChatRoomSelector;
