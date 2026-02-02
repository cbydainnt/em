import { useEffect, useState } from 'react';
import axios from 'axios';
import { IconBrandFacebook, IconBrandTiktok, IconBrandYoutube, IconBrandThreads } from '@tabler/icons-react';
import ZaloIcon from '../assets/icons8-zalo-color-32.png';

interface MSystem {
  id: number;
  param_key: string;
  param_name: string;
  param_value: string;
  category: string;
}

export default function ProfileInfo() {
  const [section, setSection] = useState<MSystem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const key = 'Profile';
        const response = await axios.get(`/api/msystem/${key}`);
        setSection(response.data);
      } catch (error) {
        console.error('Lỗi khi gọi API M_System:', error);
      }
    };
    fetchData();
  }, []);

  const getBgColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'facebook':
        return 'bg-[#1877F2] text-white'; // xanh Facebook
      case 'tiktok':
        return 'bg-black text-white'; // đen TikTok
      case 'youtube':
        return 'bg-[#FF0000] text-white'; // đỏ YouTube
      case 'threads':
        return 'bg-[#000000] text-white'; // đen Threads
      case 'zalo':
        return 'bg-[#0068FF] text-white'; // xanh Zalo
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Hàm trả về icon phù hợp
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'facebook':
        return <IconBrandFacebook size={22} stroke={1.5} />;
      case 'tiktok':
        return <IconBrandTiktok size={22} stroke={1.5} />;
      case 'youtube':
        return <IconBrandYoutube size={22} stroke={1.5} />;
      case 'threads':
        return <IconBrandThreads size={22} stroke={1.5} />;
      case 'zalo':
        return <img src={ZaloIcon} alt="Zalo" className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center gap-3 mt-3">
      {section.map((item) => (
        <a key={item.id} href={item.category} target="_blank" rel="noopener noreferrer" className={`w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition ${getBgColor(item.param_name)}`}>
          {getIcon(item.param_name)}
        </a>
      ))}
    </div>
  );
}
