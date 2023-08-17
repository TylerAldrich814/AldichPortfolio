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
      title: "Rust",
      value: 70
    },
    {
      title: "Go",
      value: 70
    },
    {
      title: "Google Cloud",
      value: 60
    },
    {
      title: "Python",
      value: 70
    },
    {
      title: "Kubernetes",
      value: 50
    },
    {
      title: "Linux",
      value: 75
    }
  ],
  portfolio: [
    {
      id: 1,
      projectName: "Chronicles",
      description: "Chronicles is a Virtual Table Top RPG which allows players to connect over the internet and play RPG Action Role Games. With real time audio, real time messaging(user->room, user->user).",
      directory: {
        "servicers": {
          "userManagement": {
            files: ["userSignup.go", "userDeletion.go", "userGet.go"]
          }
        }
      },
    },
    {
      id: 2,
      projectName: "TestProject",
      description: "Chronicles is a Virtual Table Top RPG which allows players to connect over the internet and play RPG Action Role Games. With real time audio, real time messaging(user->room, user->user).",
      directory: {
        "src": {
          "testdir": {
            files: ["test1.go", "test1.go"],
            "testSub": {
              files: ["deeper1.go", "deeper2.go"]
            }
          }
        }
      },
    },
  ],
  // directory: [
    //   {
      //     id: 1,
      //     filename: "userSignup.go",
      //     path: "/projects/services/userManagement/userSignup.go",
      //   },
    //   {
      //     id: 2,
      //     filename: "userDeletion.go",
      //     path: "/projects/services/userManagement/userDeletion.go",
      //   },
    //   {
      //     id: 3,
      //     filename: "userGet.go",
      //     path: "/projects/services/userManagement/userGet.go",
      //   },
    // ]
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

Mock.onGet("/api/portfolio").reply(config => {
  const response = database.portfolio;
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
