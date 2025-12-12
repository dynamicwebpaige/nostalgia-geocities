import React, { useState } from 'react';
import { UserData } from '../types';

interface UserInfoFormProps {
  onSubmit: (data: Omit<UserData, 'rawImage'>) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    music: '',
    interests: '',
    quote: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.handle) {
      onSubmit(formData);
    } else {
      alert("Please fill in your Name and Handle!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="win95-box p-1 max-w-lg w-full bg-[#c0c0c0]">
        <div className="bg-[#000080] text-white px-2 py-1 font-bold mb-4">
          Registration Form.html
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 font-['MS_Sans_Serif']">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Real Name:</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              className="win95-inset px-2 py-1 font-['Courier_New'] text-black"
              placeholder="John Doe"
              maxLength={30}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Screen Name / Handle:</label>
            <div className="flex items-center gap-1">
              <span className="text-gray-600">~</span>
              <input 
                type="text" 
                name="handle" 
                value={formData.handle} 
                onChange={handleChange}
                className="win95-inset px-2 py-1 font-['Courier_New'] flex-1 text-black"
                placeholder="xX_CyberPunk_Xx"
                maxLength={20}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Favorite Music / Band:</label>
            <input 
              type="text" 
              name="music" 
              value={formData.music} 
              onChange={handleChange}
              className="win95-inset px-2 py-1 font-['Courier_New'] text-black"
              placeholder="Backstreet Boys, Limp Bizkit..."
              maxLength={40}
            />
          </div>
          
           <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Interests / Hobbies:</label>
            <input 
              type="text" 
              name="interests" 
              value={formData.interests} 
              onChange={handleChange}
              className="win95-inset px-2 py-1 font-['Courier_New'] text-black"
              placeholder="Skateboarding, Coding, Pokémon"
              maxLength={50}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Favorite Quote / Status:</label>
            <textarea 
              name="quote" 
              value={formData.quote} 
              onChange={handleChange}
              className="win95-inset px-2 py-1 font-['Courier_New'] h-20 resize-none text-black"
              placeholder="All your base are belong to us..."
              maxLength={100}
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-400 mt-4">
            <button type="submit" className="win95-btn px-6 py-1 font-bold text-black">
              Sign Up!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfoForm;