import Mock from "../mock";

const database = {
  information: {
    name: 'Tyler Aldrich',
    aboutContent: "I am an inspiring Backend Developer. A father to a beautiful little girl. I am engaged to the love of my life. I am extremely motivated and inspired to make the best of this life, for me and my family.",
    age: 30,
    phone: '(814)651-1772',
    nationality: 'American',
    language: 'English',
    email: 'aldrich.ta.814@gmail.com',
    address: 'Erie, Pennsylvania',
    socialLinks: {
      facebook: 'https://www.facebook.com/tyler.aldrich1',
      linkedin: 'https://www.linkedin.com/in/TylerAlanAldrich',
      // dribbble: '',
      github: 'https://github.com/TylerAldrich814'
    },
    // brandImage: '/MyImages/headshot.jpg',
    // aboutImage: '/MyImages/headshot.jpg',
    // aboutImageLg: '/MyImages/headshot.jpg',
    brandImage: '/images/brand-image.jpg',
    aboutImage: '/images/about-image.jpg',
    aboutImageLg: '/images/about-image-lg.jpg',
    cvfile: '/files/Tyler_Aldrich_Resume2023.pdf'
  },
  services: [
    {
      title: "Web Design",
      icon: 'brush-alt',
      details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem tenetur ratione quod."
    },
    {
      title: "Web Development",
      icon: 'code',
      details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem tenetur ratione quod."
    },
    {
      title: "Mobile Application",
      icon: 'mobile',
      details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem tenetur ratione quod."
    }
  ],
  reviews: [
    {
      id: 1,
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita impedit nobis tempore quaerat quibusdam, aliquid maxime tempora.",
      author: {
        name: 'Burdette Turner',
        designation: 'Web Developer, Abc Company'
      }
    },
    {
      id: 2,
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita impedit nobis tempore quaerat quibusdam.",
      author: {
        name: 'Susan Yost',
        designation: 'Client'
      }
    },
    {
      id: 3,
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      author: {
        name: 'Irving Feeney',
        designation: 'Fiverr Client'
      }
    }
  ],
  skills: [
    {
      title: "HTML5",
      value: 95
    },
    {
      title: "CSS3",
      value: 90
    },
    {
      title: "Javascript",
      value: 70
    },
    {
      title: "jQuery",
      value: 85
    },
    {
      title: "ReactJS",
      value: 80
    },
    {
      title: "Photoshop",
      value: 65
    }
  ],
  portfolios: [
    {
      id: 1,
      title: "T-shirt Mockup",
      subtitle: "A beautiful t-shirt mockup.",
      imageUrl: "/images/portfolio-image-1.jpg",
      largeImageUrl: ["/images/portfolio-image-1-lg.jpg"],
      url: 'https://dribbble.com'
    },
  ],
  experience: {
    workingExperience: [
      {
        id: 1,
        year: "2023",
        position: "Software Engineer",
        company: "TBA",
        details: "Currently working towards landing my first position within the industry. After several years of full time self-study, I now feel as if I am ready to make my first move."
      },
    ],
    educationExperience: [
      // {
      //   id: 1,
      //   year: "2009 - 2012",
      //   graduation: "Master of Science",
      //   university: "Abc University",
      //   details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, magni mollitia, aspernatur consequatur accusamus vero eum facere exercitationem velit suscipit ipsam placeat libero. Deleniti exercitationem nostrum quasi. Molestiae, vel porro."
      // },
    ]
  },
  // blogs: [
  //   {
  //     id: 1,
  //     title: 'Markdown & Html supported blog.',
  //     featuredImage: '/images/blog-image-1.jpg',
  //     filesource: '../../blog/markdown-html-supported-blog.md',
  //     createDay: "20",
  //     createMonth: 'February',
  //     createYear: "2020"
  //   },
  // ],
  contactInfo: {
    phoneNumbers: ['[814]651-1772'],
    emailAddress: ['Aldrich.TA.814@icloud.com'],
    address: "Erie, Pennsylvania"
  }
}


Mock.onGet("/api/information").reply(config => {
  const response = database.information;
  return [200, response];
});

Mock.onGet("/api/services").reply(config => {
  const response = database.services;
  return [200, response];
});

Mock.onGet("/api/reviews").reply(config => {
  const response = database.reviews;
  return [200, response];
});

Mock.onGet("/api/skills").reply(config => {
  const response = database.skills;
  return [200, response];
});

Mock.onGet("/api/portfolios").reply(config => {
  const response = database.portfolios;
  return [200, response];
});

Mock.onGet("/api/experience").reply(config => {
  const response = database.experience;
  return [200, response];
});

Mock.onGet("/api/blog").reply(config => {
  const response = database.blogs;
  return [200, response];
});

Mock.onGet("/api/contactinfo").reply(config => {
  const response = database.contactInfo;
  return [200, response];
});
