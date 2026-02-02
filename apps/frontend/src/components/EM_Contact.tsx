import { useEffect, useState } from 'react';
import axios from 'axios';

interface MSystem {
  id: number;
  param_key: string;
  param_value: string;
}

export default function ContactInfo() {
  const [section, setSection] = useState<MSystem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const key = 'Contact';
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
      {/* {section.map((item, idx) => (
          <li key={idx}>{item.param_value }</li>
        ))} */}
      {section && section.map((item) => <li key={item.id}>{item.param_value}</li>)}
    </ul>
  );
}
