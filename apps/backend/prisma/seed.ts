import { PrismaClient } from '@prisma/client';
// import { addDays } from 'date-fns';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  errorFormat: 'colorless',
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

// prisma.$on('query', (event) => {
//   console.log(event);
// });

(async () => {
  try {
    await removeAllData();
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('Admin@123', salt);
    const admin = await prisma.user.upsert({
      where: {
        email: 'admin@gmail.com',
      },
      update: {
        name: 'admin@gmail.com',
      },
      create: {
        name: 'Admin',
        type: 'admin',
        email: 'admin@gmail.com',
        password,
        verified: true,
      },
    });
    await prisma.user.upsert({
      where: {
        email: 'user@gmail.com',
      },
      update: {
        name: 'user@gmail.com',
      },
      create: {
        name: 'User',
        type: 'user',
        email: 'user@gmail.com',
        password,
        verified: true,
      },
    });
    const systemData = [
      // Contact
      { key: '1', no: '1', name: 'Contact', value: 'CÔNG TY TNHH TIẾNG ANH CÔ THƯƠNG', category: 'Contact' },
      { key: '1', no: '2', name: 'Tax Code', value: '0110xxxxxx', category: 'Contact' },
      { key: '1', no: '3', name: 'Address', value: 'Cầu Giấy, Hà Nội', category: 'Contact' },
      { key: '1', no: '4', name: 'Email', value: 'hotro@ngoaingu24h.vn', category: 'Contact' },
      { key: '1', no: '5', name: 'Phone', value: '0955 xxx xxx', category: 'Contact' },

      // Community
      { key: '2', no: '1', name: 'Facebook Group', value: 'https://www.facebook.com/abc', category: 'Community' },
      { key: '2', no: '2', name: 'Zalo Group', value: 'https://example.com/zalo/join?code=FAKE12345', category: 'Community' },
      { key: '2', no: '3', name: 'Discord học viên', value: 'https://discord.com/channels/123456789', category: 'Community' },

      // Knowledge
      { key: '3', no: '1', name: 'Bài viết IELTS', value: '/knowledge/ielts', category: 'Knowledge' },
      { key: '3', no: '2', name: 'Ngữ pháp cơ bản', value: '/knowledge/grammar', category: 'Knowledge' },
      { key: '3', no: '3', name: 'Phát âm chuẩn', value: '/knowledge/pronunciation', category: 'Knowledge' },

      // Policy
      { key: '4', no: '1', name: 'Chính sách chung', value: '/GeneralPolicy', category: 'Policy' },
      { key: '4', no: '2', name: 'Chính sách bảo mật', value: '/PrivacyPolicy', category: 'Policy' },

      // Profiles
      { key: '5', no: '1', name: 'Zalo', value: 'https://zalo.me/0123456789', category: 'Profile' },
      { key: '5', no: '2', name: 'Facebook', value: 'https://facebook.com/EnglishMaster', category: 'Profile' },
      { key: '5', no: '3', name: 'TikTok', value: 'https://tiktok.com/@EnglishMaster', category: 'Profile' },
      { key: '5', no: '4', name: 'Youtube', value: 'https://youtube.com/EnglishMaster', category: 'Profile' },
      { key: '5', no: '5', name: 'Threads', value: 'https://threads.net/@EnglishMaster', category: 'Profile' },

      // Teacher Profiles
      { key: '6', no: '1', name: 'teacherName', value: 'Cô Thương ', category: 'teacherProfiles' },
      { key: '6', no: '2', name: 'avatar', value: 'https://i.pravatar.cc/50?img=5', category: 'teacherProfiles' },
      { key: '6', no: '3', name: 'verified', value: 'true', category: 'teacherProfiles' },
      { key: '6', no: '4', name: 'ielts', value: '8.0', category: 'teacherProfiles' },
      { key: '6', no: '5', name: 'toeic', value: '990', category: 'teacherProfiles' },
      { key: '6', no: '6', name: 'toeic_writing', value: '200', category: 'teacherProfiles' },

      // Theme setting
      { key: '7', no: '1', name: 'theme_event', value: 'default' },
    ];

    await Promise.all(
      systemData.map(({ key, no, name, value, category }) =>
        prisma.mSystem.upsert({
          where: { param_key_param_no: { param_key: key, param_no: no } },
          update: { param_name: name, param_value: value, category },
          create: { param_key: key, param_no: no, param_name: name, param_value: value, category },
        }),
      ),
    );

    const [, , users] = await Promise.all([seedCourses(), seedCategories(), seedUsers()]);
    await seedSections();
    await seedLessons();
    await seedComboAndCategoryCombo();
    await seedComboCourse();
    // await seedUserCourse();
    // const coursesReview = await seedCourseReview();
    // await Promise.all([seedComments(users), seedRatingSummary(coursesReview)]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();

// async function seedComments(users: any[]) {
//   const courses = await prisma.course.findMany();
//   const lessons = await prisma.lesson.findMany();

//   if (courses.length === 0 && lessons.length === 0) {
//     return;
//   }

//   const selectedCourses = courses.sort(() => 0.5 - Math.random()).slice(0, Math.min(15, courses.length));
//   const commentsData = ['Khóa học rất hay!', 'Cô dạy rất hay và có tâm nha các bạn.', 'em vẫn chưa hiểu danh từ đóng vai trò làm tân ngữ trực tiếp và tân ngữ gián tiếp ạ', 'Trong bài giảng có đa số từ tiếng anh e ko bt , e chỉ bt đc một số từ học ở khoá 48 ngày thì bây phải lm thế nào ạ', 'Hehe, làm đc đúng 1 câu, sai 24 câu.', 'tr ơi đó giờ em kh phân biệt được để xác định N trong bài đọc với tn giờ thì làm đúng gần hết luôn', 'Cảm ơn giáo viên!', 'Em check cmt trước của chị nhé', '1k Follow = 60k, nhận report, lấy lại facebook, làm tick xanh. Liên hệ :0901234567'];

//   let seedIndex = 0;
//   for (const course of selectedCourses) {
//     const createdComments: any[] = [];

//     // Bình luận gốc (5–6 cái mỗi khóa)
//     for (let i = 0; i < 6; i++) {
//       const seedTag = `seed_comment_${course.course_id}_${seedIndex++}`;

//       const comment = await prisma.comment.upsert({
//         where: { seed_tag: seedTag },
//         update: {},
//         create: {
//           seed_tag: seedTag,
//           content: commentsData[i % commentsData.length],
//           course_id: course.course_id,
//           user_id: users[i % users.length].id,
//           del_flg: false,
//         },
//       });

//       createdComments.push(comment);
//     }

//     // Bình luận trả lời (2–4 cái mỗi khóa)
//     for (let j = 0; j < 3; j++) {
//       const parent = createdComments[Math.floor(Math.random() * createdComments.length)];
//       const seedTag = `seed_reply_${course.course_id}_${seedIndex++}`;

//       await prisma.comment.upsert({
//         where: { seed_tag: seedTag },
//         update: {},
//         create: {
//           seed_tag: seedTag,
//           content: `${commentsData[(6 + j) % commentsData.length]}`,
//           course_id: parent.course_id,
//           parent_id: parent.comment_id,
//           user_id: users[j % users.length].id,
//           del_flg: false,
//         },
//       });
//     }
//   }

//   const selectedLessons = lessons.sort(() => 0.5 - Math.random()).slice(0, Math.min(20, lessons.length));

//   for (const lesson of selectedLessons) {
//     const createdComments: any[] = [];

//     for (let i = 0; i < 4; i++) {
//       const seedTag = `seed_comment_lesson_${lesson.lesson_id}_${seedIndex++}`;

//       const comment = await prisma.comment.upsert({
//         where: { seed_tag: seedTag },
//         update: {},
//         create: {
//           seed_tag: seedTag,
//           content: commentsData[i % commentsData.length],
//           lesson_id: lesson.lesson_id,
//           user_id: users[i % users.length].id,
//           del_flg: false,
//         },
//       });

//       createdComments.push(comment);
//     }

//     for (let j = 0; j < 2; j++) {
//       const parent = createdComments[Math.floor(Math.random() * createdComments.length)];
//       const seedTag = `seed_reply_lesson_${lesson.lesson_id}_${seedIndex++}`;

//       await prisma.comment.upsert({
//         where: { seed_tag: seedTag },
//         update: {},
//         create: {
//           seed_tag: seedTag,
//           content: `${commentsData[(4 + j) % commentsData.length]}`,
//           lesson_id: parent.lesson_id,
//           parent_id: parent.comment_id,
//           user_id: users[j % users.length].id,
//           del_flg: false,
//         },
//       });
//     }
//   }
// }
async function seedComboCourse() {
  const combosFromDB = await prisma.combo.findMany();
  const coursesFromDB = await prisma.course.findMany();
  await Promise.all(
    combosFromDB.map(async (combo) => {
      // Lấy ngẫu nhiên 3–5 khóa học cho mỗi combo
      const shuffled = [...coursesFromDB].sort(() => Math.random() - 0.5);
      const selectedCourses = shuffled.slice(0, Math.floor(Math.random() * 3) + 3);

      await Promise.all(
        selectedCourses.map(async (course) => {
          const exists = await prisma.comboCourse.findFirst({
            where: {
              combo_id: combo.combo_id,
              course_id: course.course_id,
            },
            select: { id: true },
          });

          if (!exists) {
            await prisma.comboCourse.create({
              data: {
                combo_id: combo.combo_id,
                course_id: course.course_id,
              },
            });
          }
        }),
      );
    }),
  );
}
async function seedComboAndCategoryCombo() {
  const combos = [
    // Category: "Bứt phá vào 10"
    { combo_name: 'Ngữ pháp thần tốc', category_title: 'Bứt phá vào 10', original_price: 499000, price: 299000 },
    { combo_name: 'Toán + Lý + Hóa siêu đỉnh', category_title: 'Bứt phá vào 10', original_price: 599000, price: 399000 },
    { combo_name: 'Reading & Writing Boost', category_title: 'Bứt phá vào 10', original_price: 399000, price: 249000 },

    // Category: "Đại học thần tốc"
    { combo_name: 'Luyện đề VIP', category_title: 'Đại học thần tốc', original_price: 699000, price: 499000 },
    { combo_name: 'Tips & Tricks Toán Học', category_title: 'Đại học thần tốc', original_price: 599000, price: 399000 },
    { combo_name: 'Ngữ văn đỉnh cao', category_title: 'Đại học thần tốc', original_price: 499000, price: 349000 },
    { combo_name: 'Siêu hack môn Lý', category_title: 'Đại học thần tốc', original_price: 499000, price: 349000 },

    // Category: "IELTS không sợ"
    { combo_name: 'Speaking + Listening Boost', category_title: 'IELTS không sợ', original_price: 699000, price: 499000 },
    { combo_name: 'Writing Masterclass', category_title: 'IELTS không sợ', original_price: 599000, price: 399000 },
    { combo_name: 'Vocabulary Ninja', category_title: 'IELTS không sợ', original_price: 399000, price: 249000 },
    { combo_name: 'Grammar Power-up', category_title: 'IELTS không sợ', original_price: 399000, price: 249000 },

    // Category: "SAT Challenge"
    { combo_name: 'SAT Math Hack', category_title: 'SAT Challenge', original_price: 699000, price: 499000 },
    { combo_name: 'SAT Reading & Writing', category_title: 'SAT Challenge', original_price: 599000, price: 399000 },
    { combo_name: 'SAT Vocabulary Blitz', category_title: 'SAT Challenge', original_price: 399000, price: 249000 },

    // Category: "TOEIC Boost"
    { combo_name: 'TOEIC Listening Fast-track', category_title: 'TOEIC Boost', original_price: 499000, price: 299000 },
    { combo_name: 'TOEIC Reading Mastery', category_title: 'TOEIC Boost', original_price: 499000, price: 299000 },
    { combo_name: 'TOEIC Full Combo', category_title: 'TOEIC Boost', original_price: 699000, price: 499000 },

    // Category: "Tiếng Anh cơ bản "
    { combo_name: 'Speaking Everyday', category_title: 'Tiếng Anh cơ bản', original_price: 399000, price: 249000 },
    { combo_name: 'Grammar & Vocabulary Starter', category_title: 'Tiếng Anh cơ bản', original_price: 399000, price: 249000 },
    { combo_name: 'Listening Fun', category_title: 'Tiếng Anh cơ bản', original_price: 299000, price: 199000 },
  ];

  for (const combo of combos) {
    //Seed combo
    const comboType = Math.random() < 0.5 ? 1 : 2;
    const comboRecord = await prisma.combo.upsert({
      where: { combo_name: combo.combo_name },
      update: {},
      create: {
        combo_name: combo.combo_name,
        original_price: combo.original_price,
        price: combo.price,
        combo_type: comboType,
      },
    });

    //Find category by category title (cause category_title is unique)
    const category = await prisma.category.findUnique({
      where: { title: combo.category_title.trim() },
    });

    if (category && comboRecord) {
      // Check xem CategoryCombo đã tồn tại chưa dựa trên cặp key [category_id,combo_id]
      const exists = await prisma.categoryCombo.findFirst({
        where: {
          category_id: category.category_id,
          combo_id: comboRecord.combo_id,
        },
      });

      // nếu chưa có thì Seed CategoryCombo
      if (!exists) {
        await prisma.categoryCombo.create({
          data: {
            category_id: category.category_id,
            combo_id: comboRecord.combo_id,
          },
        });
      }
    }
  }
}
async function seedCategories() {
  const categories = [{ title: 'Bứt phá vào 10' }, { title: 'Đại học thần tốc' }, { title: 'IELTS không sợ' }, { title: 'TOEIC Boost' }, { title: 'SAT Challenge' }, { title: 'Tiếng Anh cơ bản' }];

  //Seed category
  await Promise.all(
    categories.map((category) =>
      prisma.category.upsert({
        where: { title: category.title },
        update: {},
        create: category,
      }),
    ),
  );
}
async function seedCourses() {
  function randomTargets(min = 3, max = 8) {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffled = targetsPool.sort(() => 0.5 - Math.random());
    return shuffled
      .slice(0, count)
      .map((t) => `• ${t}`)
      .join('\n');
  }

  const targetsPool = [
    // Ngắn
    'Cải thiện phản xạ giao tiếp.',
    'Phát âm chuẩn hơn.',
    'Xây dựng nền tảng ngữ pháp vững chắc.',
    'Tăng vốn từ vựng thông dụng.',
    'Tự tin nói tiếng Anh hằng ngày.',
    'Nâng cao khả năng nghe trong hội thoại thực tế.',
    'Viết email tiếng Anh chuyên nghiệp.',
    'Cải thiện kỹ năng đọc hiểu nhanh.',
    'Học từ vựng theo chủ đề.',
    'Nắm vững các cụm từ giao tiếp phổ biến.',

    // Trung bình
    'Hiểu rõ cấu trúc câu và cách sử dụng trong tình huống giao tiếp.',
    'Luyện tập nói tiếng Anh qua các bài hội thoại mô phỏng đời sống.',
    'Tăng khả năng sử dụng tiếng Anh trong công việc, đặc biệt là môi trường văn phòng.',
    'Phát triển kỹ năng viết báo cáo, mô tả quy trình và trình bày thông tin bằng tiếng Anh.',
    'Cải thiện kỹ năng nghe qua podcast, video và audio theo cấp độ.',
    'Tối ưu hóa khả năng ghi nhớ từ vựng bằng phương pháp khoa học.',

    // Dài
    'Sau khóa học, học viên có thể giao tiếp tự tin trong các tình huống quen thuộc, diễn đạt ý tưởng rõ ràng và sử dụng được nhiều cấu trúc câu nâng cao.',
    'Khoá học giúp bạn hiểu sâu bản chất ngữ pháp, biết cách áp dụng linh hoạt vào nói – viết thay vì chỉ học lý thuyết khô khan.',
    'Học viên sẽ nắm được kỹ thuật phát âm chuẩn IPA, cách nối âm, nuốt âm, và nhấn trọng âm để nói tiếng Anh tự nhiên như người bản xứ.',
    'Trang bị đầy đủ kiến thức và chiến lược làm bài để đạt điểm cao trong các kỳ thi như IELTS hoặc TOEIC.',
    'Khóa học phù hợp cho người đi làm, giúp bạn tự tin sử dụng tiếng Anh trong họp, thuyết trình, gửi email và trao đổi với đồng nghiệp quốc tế.',
    'Bạn sẽ được luyện tập qua nhiều tình huống giao tiếp thực tế, giúp tăng tốc phản xạ và cải thiện khả năng nghe – nói một cách tự nhiên.',
  ];
  const courseStates = ['New', 'Sale', 'Best Seller', 'Highest Rated', 'Normal'];
  const courseThumbnails = [
    'https://img-c.udemycdn.com/course/750x422/5993822_2c2a_7.jpg',
    'https://img-c.udemycdn.com/course/240x135/6846135_3541.jpg',
    'https://img-c.udemycdn.com/course/240x135/6727737_4dd9_9.jpg',
    'https://img-c.udemycdn.com/course/750x422/5391834_7008_2.jpg',
    'https://img-c.udemycdn.com/course/750x422/4947234_f0db_5.jpg',
    'https://img-c.udemycdn.com/course/750x422/6532395_4a78.jpg',
    'https://img-c.udemycdn.com/course/750x422/6578739_e0d2_6.jpg',
    'https://img-c.udemycdn.com/course/750x422/6150079_96a3.jpg',
    'https://img-c.udemycdn.com/course/750x422/6570873_57b9.jpg',
    'https://img-c.udemycdn.com/course/750x422/5751944_e20a_3.jpg',
    'https://img-c.udemycdn.com/course/750x422/4343860_9b72_4.jpg',
    'https://img-c.udemycdn.com/course/750x422/6835465_5486_3.jpg',
    'https://img-c.udemycdn.com/course/750x422/6720134_bbb9.jpg',
    'https://img-c.udemycdn.com/course/750x422/6317887_3c8c_3.jpg',
    'https://img-c.udemycdn.com/course/750x422/5317218_543d.jpg',
    'https://img-c.udemycdn.com/course/750x422/2776760_f176_10.jpg',
    'https://img-c.udemycdn.com/course/750x422/6100015_1979_4.jpg',
  ];
  const subjects = ['Tiếng Anh', 'Tiếng Anh giao tiếp', 'IELTS', 'TOEIC', 'Ngữ pháp', 'Phát âm', 'Viết luận', 'Đọc hiểu', 'Giao tiếp công sở', 'Tiếng Anh du lịch'];
  const levels = ['Cơ bản', 'Nâng cao', 'Chuyên sâu', 'Cho người mất gốc', 'Cấp tốc', 'Trực tuyến', 'Tổng hợp'];
  const extras = ['2025', 'Online', 'Hiệu quả', 'Thực hành', 'Dễ hiểu', 'Tự học'];
  function random(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  const accessDurations = [6, 12, 18, 24, 30, 36];
  const courses = Array.from({ length: 30 }).map((_, i) => {
    const name = `${random(subjects)} ${random(levels)} ${Math.random() < 0.5 ? random(extras) : ''}`.trim();
    const coursePrice = Math.floor(Math.random() * (2000000 - 100000 + 1)) + 100000;
    const access_type = Math.random() < 0.5 ? 1 : 2;
    const access_duration_months = access_type === 1 ? accessDurations[Math.floor(Math.random() * accessDurations.length)] : null;
    return {
      course_name: name,
      state: courseStates[Math.floor(Math.random() * courseStates.length)],
      course_description: 'Khóa học giúp bạn cải thiện toàn diện kỹ năng tiếng Anh: ngữ pháp, phát âm, giao tiếp, và luyện thi chứng chỉ quốc tế.',
      course_price: coursePrice,
      course_original_price: coursePrice + 500000,
      thumbnail: random(courseThumbnails),
      access_type: access_type,
      access_duration_months: access_duration_months,
      target: randomTargets(),
    };
  });
  //Seed course
  await Promise.all(
    courses.map((course) =>
      prisma.course.upsert({
        where: { course_name: course.course_name },
        update: {},
        create: course,
      }),
    ),
  );
}
async function seedUsers() {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash('1', salt);
  const usersData = [
    {
      name: 'Nguyễn Thiện Thanh',
      email: 'thanhnt@gmail.com',
      type: 'student',
      avatar: 'https://i.pravatar.cc/150?img=1',
      verified: true,
    },
    {
      name: 'Phùng Công Thành',
      email: 'thanhpc@gmail.com',
      type: 'student',
      avatar: 'https://i.pravatar.cc/150?img=2',
      verified: true,
    },
    {
      name: 'Nguyễn Tiến Đạt',
      email: 'datnt@gmail.com',
      type: 'student',
      avatar: 'https://i.pravatar.cc/150?img=3',
      verified: true,
    },
    {
      name: 'Hồ Anh Phong',
      email: 'hoanhphong@gmail.com',
      type: 'teacher',
      avatar: 'https://i.pravatar.cc/150?img=4',
      verified: true,
    },
    {
      name: 'Nguyễn Hữu Việt',
      email: 'vietnh@gmail.com',
      type: 'student',
      avatar: 'https://i.pravatar.cc/150?img=5',
      verified: true,
    },
    {
      name: 'Lê Minh',
      email: 'minhlee@gmail.com',
      type: 'student',
      avatar: 'https://i.pravatar.cc/150?img=6',
      verified: true,
    },
    {
      name: 'Nguyễn Thị Hằng',
      email: 'hangnt@gmail.com',
      type: 'student',
      avatar: 'https://i.pravatar.cc/150?img=7',
      verified: true,
    },
  ];

  await Promise.all(
    usersData.map((u) =>
      prisma.user.upsert({
        where: { email: u.email },
        update: {},
        create: { ...u, password: password },
      }),
    ),
  );

  return await prisma.user.findMany({
    where: { email: { in: usersData.map((u) => u.email) } },
  });
}
async function seedSections() {
  const courses = await prisma.course.findMany();
  if (courses.length === 0) {
    return;
  }

  const sectionsData = [
    {
      section_title: 'Giới thiệu khóa học',
      description: 'Tổng quan về nội dung và mục tiêu của khóa học.',
    },
    {
      section_title: 'Ôn tập Ngữ pháp cơ bản',
      description: 'Hệ thống lại toàn bộ ngữ pháp nền tảng cho học sinh luyện thi đại học.',
    },
    {
      section_title: 'Chiến lược làm bài Đọc hiểu',
      description: 'Phân tích dạng đề, mẹo và kỹ năng xử lý bài đọc hiểu trong kỳ thi.',
    },
    {
      section_title: 'Từ vựng chuyên đề',
      description: 'Tổng hợp từ vựng theo chủ đề phổ biến trong đề thi tiếng Anh THPT.',
    },
    {
      section_title: 'Phát âm chuẩn Anh - Mỹ',
      description: 'Học cách phát âm chuẩn theo giọng Anh và Mỹ, luyện nối âm và ngữ điệu.',
    },
    {
      section_title: 'Luyện nghe tiếng Anh giao tiếp',
      description: 'Nghe hội thoại thực tế, luyện phản xạ tiếng Anh giao tiếp tự nhiên.',
    },
    {
      section_title: 'Viết luận và đoạn văn',
      description: 'Rèn kỹ năng viết đoạn văn và bài luận tiếng Anh theo cấu trúc chuẩn.',
    },
    {
      section_title: 'Ngữ pháp nâng cao',
      description: 'Phân tích sâu các cấu trúc ngữ pháp nâng cao thường gặp trong đề IELTS.',
    },
    {
      section_title: 'Chiến thuật Speaking IELTS',
      description: 'Rèn luyện phản xạ và cách triển khai ý tưởng trong phần Speaking IELTS.',
    },
    {
      section_title: 'Tổng ôn và luyện đề thi thử',
      description: 'Thực hành làm đề thi thật và thi thử để đánh giá năng lực cuối khóa.',
    },
  ];

  for (const course of courses) {
    const shuffled = [...sectionsData].sort(() => Math.random() - 0.5);
    const selectedSections = shuffled.slice(0, Math.floor(Math.random() * 3) + 4);

    await Promise.all(
      selectedSections.map(async (section) => {
        const exists = await prisma.section.findFirst({
          where: {
            section_title: section.section_title,
            course_id: course.course_id,
          },
        });

        if (!exists) {
          await prisma.section.create({
            data: {
              section_title: section.section_title,
              course_id: course.course_id,
            },
          });
        }
      }),
    );
  }
}
async function seedLessons() {
  const baseLessons = [
    {
      lesson_title: 'Giới thiệu khóa học tiếng Anh giao tiếp',
      lesson_video: 'englishmaster/lesson_videos/2558631-hd_1920_1080_25fps.mp4',
      minutes: 10,
      lesson_thumbnail: 'https://picsum.photos/seed/lesson1/400/200',
      documents: [
        {
          document_name: 'Tài liệu giới thiệu khóa học',
          document_url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
          extension: 'pdf',
          size: 1258291,
        },
        {
          document_name: 'Slide bài giảng',
          document_url: 'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.docx',
          extension: 'docx',
          size: 1258291,
        },
      ],
    },
    {
      lesson_title: 'Phát âm chuẩn 26 chữ cái tiếng Anh',
      lesson_video: 'englishmaster/lesson_videos/2766950-uhd_2560_1440_30fps.mp4',
      minutes: 8,
      lesson_thumbnail: 'https://picsum.photos/seed/lesson2/400/200',
      documents: [
        {
          document_name: 'Tài liệu giới thiệu khóa học',
          document_url: 'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.docx',
          extension: 'docx',
          size: 1258291,
        },
        {
          document_name: 'Tài liệu giới thiệu khóa học',
          document_url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
          extension: 'pdf',
          size: 1258291,
        },
      ],
    },
    {
      lesson_title: 'Ngữ pháp cơ bản - Thì hiện tại đơn',
      lesson_video: 'englishmaster/lesson_videos/855029-hd_1920_1080_30fps.mp4',
      minutes: 15,
      lesson_thumbnail: 'https://picsum.photos/seed/lesson3/400/200',
      documents: [
        {
          document_name: 'Tài liệu giới thiệu khóa học',
          document_url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
          extension: 'pdf',
          size: 1258291,
        },
        {
          document_name: 'Tài liệu giới thiệu khóa học',
          document_url: 'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.docx',
          extension: 'docx',
          size: 1258291,
        },
      ],
    },
    {
      lesson_title: 'Từ vựng chủ đề Gia đình',
      lesson_video: 'englishmaster/lesson_videos/2796077-uhd_2560_1440_25fps.mp4',
      minutes: 12,
      lesson_thumbnail: 'https://picsum.photos/seed/lesson4/400/200',
      documents: [
        {
          document_name: 'Tài liệu giới thiệu khóa học',
          document_url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
          extension: 'pdf',
          size: 1258291,
        },
        {
          document_name: 'Tài liệu giới thiệu khóa học',
          document_url: 'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.docx',
          extension: 'docx',
          size: 1258291,
        },
      ],
    },
    {
      lesson_title: 'Luyện nghe qua hội thoại cơ bản',
      lesson_video: 'englishmaster/lesson_videos/3191917-uhd_2560_1440_25fps.mp4',
      minutes: 9,
      lesson_thumbnail: 'https://picsum.photos/seed/lesson5/400/200',
      documents: [
        {
          document_name: 'Tài liệu giới thiệu khóa học',
          document_url: 'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.docx',
          extension: 'docx',
          size: 1258291,
        },
      ],
    },
    {
      lesson_title: 'Đọc hiểu đoạn văn ngắn',
      lesson_video: 'englishmaster/lesson_videos/4008670-sd_506_960_25fps.mp4',
      minutes: 11,
      lesson_thumbnail: 'https://picsum.photos/seed/lesson6/400/200',
      documents: [
        {
          document_name: 'Tài liệu giới thiệu khóa học',
          document_url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
          extension: 'pdf',
          size: 1258291,
        },
      ],
    },
    {
      lesson_title: 'Nghe và chọn đáp án đúng',
      lesson_video: 'englishmaster/lesson_videos/6265065-uhd_1440_2560_30fps.mp4',
      minutes: 7,
      lesson_thumbnail: 'https://picsum.photos/seed/lesson7/400/200',
      documents: [
        {
          document_name: 'Tài liệu giới thiệu khóa học',
          document_url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
          extension: 'pdf',
          size: 1258291,
        },
        {
          document_name: 'Tài liệu giới thiệu khóa học',
          document_url: 'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.docx',
          extension: 'docx',
          size: 1258291,
        },
      ],
    },
    {
      lesson_title: 'Luyện nói - Giới thiệu bản thân',
      lesson_video: 'englishmaster/lesson_videos/7492891-uhd_2560_1440_25fps.mp4',
      minutes: 6,
      lesson_thumbnail: 'https://picsum.photos/seed/lesson8/400/200',
      documents: [
        {
          document_name: 'Tài liệu giới thiệu khóa học',
          document_url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
          extension: 'pdf',
          size: 1258291,
        },
      ],
    },
    {
      lesson_title: 'Thì quá khứ đơn - Ôn tập',
      lesson_video: 'englishmaster/lesson_videos/7792635-uhd_2732_1440_25fps.mp4',
      minutes: 13,
      lesson_thumbnail: 'https://picsum.photos/seed/lesson9/400/200',
      documents: [
        {
          document_name: 'Tài liệu giới thiệu khóa học',
          document_url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
          extension: 'pdf',
          size: 1258291,
        },
      ],
    },
    {
      lesson_title: 'Quiz kiểm tra từ vựng tuần 1',
      lesson_video: 'englishmaster/lesson_videos/855029-hd_1920_1080_30fps.mp4',
      minutes: 5,
      lesson_thumbnail: 'https://picsum.photos/seed/lesson10/400/200',
      documents: [
        {
          document_name: 'Tài liệu giới thiệu khóa học',
          document_url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
          extension: 'pdf',
          size: 1258291,
        },
      ],
    },
  ];

  const sections = await prisma.section.findMany({
    select: { section_id: true, section_title: true },
  });

  if (sections.length === 0) {
    console.log('No section in db');
    return;
  }

  for (const section of sections) {
    const lessonCount = Math.floor(Math.random() * 4) + 1;

    const shuffled = [...baseLessons].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, lessonCount);

    for (let i = 0; i < selected.length; i++) {
      const l = selected[i];
      const existing = await prisma.lesson.findFirst({
        where: {
          section_id: section.section_id,
          lesson_title: l.lesson_title,
          lesson_video: l.lesson_video,
        },
      });

      if (existing) {
        continue;
      }

      const createdLesson = await prisma.lesson.create({
        data: {
          lesson_title: l.lesson_title,
          lesson_video: l.lesson_video,
          lesson_thumbnail: l.lesson_thumbnail,
          lesson_order: i + 1,
          minutes: l.minutes,
          section_id: section.section_id,
        },
      });

      // ➤ Seed documents thuộc bài học
      if (l.documents && l.documents.length > 0) {
        await Promise.all(
          l.documents.map((doc) =>
            prisma.document.create({
              data: {
                lesson_id: createdLesson.lesson_id,
                document_name: doc.document_name,
                document_url: doc.document_url,
                extension: doc.extension,
                size: doc.size,
              },
            }),
          ),
        );
      }
    }
  }
}
// async function seedCourseReview() {
//   const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
//   const randomItem = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
//   const sampleComments = ['Khóa học rất bổ ích và dễ hiểu!', 'Giảng viên dạy cuốn hút, nội dung chi tiết.', 'Học xong cảm thấy tự tin hơn nhiều.', 'Nên cải thiện phần bài tập thực hành thêm.', 'Video chất lượng, dễ theo dõi.', 'Rất hài lòng, cảm ơn EnglishMaster!', 'Nội dung phù hợp với người mới bắt đầu.', 'Bài giảng logic và có ví dụ cụ thể.', 'Một số phần hơi nhanh, mong có phụ đề.', 'Đáng tiền, mình đã học hết khóa!'];

//   const userCourses = await prisma.userCourse.findMany();

//   // Gom user theo course_id
//   const courseToUsers: Record<string, string[]> = {};
//   userCourses.forEach((uc) => {
//     if (!courseToUsers[uc.course_id]) courseToUsers[uc.course_id] = [];
//     courseToUsers[uc.course_id].push(uc.user_id);
//   });

//   const courseReviewData: {
//     course_id: string;
//     user_id: string;
//     rating: number;
//     comment: string;
//   }[] = [];

//   await Promise.all(
//     Object.entries(courseToUsers).map(async ([courseId, userIds]) => {
//       const numReviews = randomInt(2, Math.min(10, userIds.length));
//       const selectedUsers = [...userIds].sort(() => Math.random() - 0.5).slice(0, numReviews);

//       selectedUsers.forEach((userId) =>
//         courseReviewData.push({
//           course_id: courseId,
//           user_id: userId,
//           rating: randomInt(1, 5),
//           comment: randomItem(sampleComments),
//         }),
//       );
//     }),
//   );

//   await prisma.courseReview.createMany({
//     data: courseReviewData,
//   });

//   return courseReviewData;
// }
// async function seedRatingSummary(courseReviewData: any[]) {
//   const grouped: Record<string, number[]> = {};
//   courseReviewData.forEach((r) => {
//     if (!grouped[r.course_id]) grouped[r.course_id] = [];
//     grouped[r.course_id].push(r.rating);
//   });

//   // Tạo danh sách summaries
//   const summaries = Object.entries(grouped).map(([courseId, ratings]) => {
//     const total = ratings.length;
//     const avg = ratings.reduce((a, b) => a + b, 0) / total;
//     const counts = [1, 2, 3, 4, 5].map((n) => ratings.filter((r) => r === n).length);

//     return {
//       course_id: courseId,
//       avg_rating: parseFloat(avg.toFixed(2)),
//       total_reviews: total,
//       rating_1_count: counts[0],
//       rating_2_count: counts[1],
//       rating_3_count: counts[2],
//       rating_4_count: counts[3],
//       rating_5_count: counts[4],
//       updated_at: new Date(),
//     };
//   });

//   // Upsert song song
//   await Promise.all(
//     summaries.map((s) =>
//       prisma.ratingSummary.upsert({
//         where: { course_id: s.course_id },
//         update: s,
//         create: s,
//       }),
//     ),
//   );
// }
// async function seedUserCourse() {
//   const [users, courses] = await Promise.all([prisma.user.findMany(), prisma.course.findMany()]);
//   const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
//   if (!users.length || !courses.length) {
//     return [];
//   }

//   const userCoursesData: { user_id: string; course_id: string; enrolled_at: Date; expired_date: Date; status: number }[] = [];

//   await Promise.all(
//     courses.map(async (course) => {
//       const numStudents = randomInt(5, 20);
//       const selectedUsers = [...users].sort(() => Math.random() - 0.5).slice(0, numStudents);

//       selectedUsers.forEach((user) => {
//         const enrolledAt = new Date();
//         const expiredDate = addDays(enrolledAt, 180);

//         userCoursesData.push({
//           user_id: user.id,
//           course_id: course.course_id,
//           enrolled_at: enrolledAt,
//           expired_date: expiredDate,
//           status: 1, // INACTIVE
//         });
//       });
//     }),
//   );

//   await prisma.userCourse.createMany({
//     data: userCoursesData,
//   });

//   return userCoursesData;
// }
async function removeAllData() {
  // Remove child table
  await prisma.comment.deleteMany({
    where: { parent_id: { not: null } }, // remove child comment
  });
  await prisma.comment.deleteMany({
    where: { parent_id: null }, // remove parent comment
  });
  await Promise.all([
    prisma.userCourse.deleteMany(),
    prisma.comboCourse.deleteMany(),
    prisma.categoryCombo.deleteMany(),
    prisma.courseReview.deleteMany(),
    prisma.ratingSummary.deleteMany(),
    prisma.lesson.deleteMany(),
    prisma.cartItem.deleteMany(),
    prisma.orderItem.deleteMany(),
    prisma.mSystem.deleteMany(), //other table
  ]);

  // Remove parent table
  await prisma.order.deleteMany();
  await prisma.section.deleteMany();
  await prisma.course.deleteMany();
  await prisma.combo.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.updateMany({
    data: {
      updated_by_id: null,
      created_by_id: null,
    },
  });
  await prisma.user.deleteMany();
}
