import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface MSystem {
  id: number;
  param_key: string;
  param_name: string;
  param_value: string;
}

export default function KnowledgeInfo() {
  const [section, setSection] = useState<MSystem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const key = 'Knowledge';
        const response = await axios.get(`/api/msystem/${key}`);
        const items = response.data;
        setSection(items);
      } catch (error) {
        console.error('Lỗi khi gọi API M_System:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-200">
      {section.map((item) => (
        <li key={item.id}>
          <button onClick={() => navigate(item.param_value)} className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 transition-colors">
            {item.param_name}
          </button>
        </li>
      ))}
    </ul>
  );
}
