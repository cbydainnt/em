import { useEffect, useState } from 'react';
import axios from 'axios';

interface MSystem {
  id: number;
  param_key: string;
  param_name: string;
  param_value: string;
}

export default function CommunityInfo() {
  const [section, setSection] = useState<MSystem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const key = 'Community';
        const response = await axios.get(`/api/msystem/${key}`);
        const items = response.data;
        setSection(items);
      } catch (error) {
        console.error('Lỗi khi gọi API M_System:', error);
      }
    };

    fetchData();
  }, []);

  // const getDisplayName = (url: string) => {
  //   if (url.includes('facebook')) return 'Facebook';
  //   if (url.includes('zalo')) return 'Zalo';
  //   if (url.includes('discord')) return 'Discord';
  // };

  return (
    <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-200">
      {section.map((item) => (
        <li key={item.id}>
          <a href={item.param_value} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 transition-colors">
            {item.param_name}
          </a>
        </li>
      ))}
    </ul>
  );
}
