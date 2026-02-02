import { useEffect, useState } from 'react';
import axios from 'axios';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import ToeicIcon from '../assets/toeic-ic.svg';
import IeltsIcon from '../assets/ielts.svg';

interface TeacherProfileData {
  teacherName: string;
  avatar: string;
  ielts: string;
  toeic: string;
  toeic_writing: string;
}

export default function TeacherProfile() {
  const [profile, setProfile] = useState<TeacherProfileData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const key = 'TeacherProfiles';
      const res = await axios.get(`api/msystem/${key}`);

      // Convert DB array → object
      const obj: any = {};
      res.data.forEach((item: any) => {
        obj[item.param_name] = item.param_value;
      });

      setProfile(obj);
    }

    fetchData();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      {/* Profile */}
      <div className="flex items-center gap-1 text-center">
        <img src={profile.avatar} alt={profile.teacherName} className="w-12 h-12 rounded-full border border-gray-300 object-cover flex-shrink-0" />

        <div className="flex flex-col items-start text-left flex-shrink-0">
          <div className="font-semibold text-sm text-gray-800 dark:text-gray-200 flex items-center gap-1">
            {profile.teacherName}
            <IconCircleCheckFilled size={16} color="#0099FF" />
          </div>
        </div>
      </div>

      {/* Khung điểm */}
      <div className="mt-3 space-y-2">
        <div className="flex justify-center gap-2">
          {/* IELTS */}
          {profile.ielts && (
            <div className="flex items-center justify-center bg-pink-50 dark:bg-pink-1000/20 border border-pink-200 dark:border-pink-1000/20 rounded-lg px-2 py-0 text-sm font-semibold text-pink-600 dark:text-pink-600">
              <img src={IeltsIcon} alt="IELTS" className="w-10 h-10 mr-1" />
              {profile.ielts}
            </div>
          )}

          {/* TOEIC */}
          {profile.toeic && (
            <div className="flex items-center justify-center bg-pink-50 dark:bg-pink-1000/20 border border-pink-200 dark:border-pink-1000/20 rounded-lg px-2 py-0 text-sm font-semibold text-pink-600 dark:text-pink-600">
              <img src={ToeicIcon} alt="TOEIC" className="w-10 h-10 mr-1" />
              {profile.toeic}/990
            </div>
          )}
        </div>

        {/* TOEIC WRITING */}
        {profile.toeic_writing && (
          <div className="flex justify-center">
            <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-600 border border-gray-200 dark:border-gray-700 dark:text-gray-100 rounded-lg px-3 py-2 text-sm font-semibold text-blue-700">TOEIC WRITING {profile.toeic_writing}/200</div>
          </div>
        )}
      </div>
    </div>
  );
}
