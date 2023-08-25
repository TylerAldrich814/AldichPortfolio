import Mock from "../mock";
import { getContactInfo, getExperienceInfo, getInformation, getSkillsInfo, getPortfolio, getSocialLinks, getProjectStructure, getPortfolioData} from "./firestore.js"

const ImageUrls = {
  Images: {
    brandImage:   'images/brand-image.jpg',
    aboutImage:   'images/about-image.jpg',
    aboutImageLg: 'images/about-image-lg.jpg',
    aboutImagePlaceHolder: 'images/about-image-placeholder.png',
    portfolioPlaceHolder: 'images/portfolio-image-placeholder.png',
  },
}

const database = {
  information: {
    name: 'Tyler Aldrich',
    // aboutContent: "I am an inspiring Backend Developer. A father to a beautiful little girl. I am engaged to the love of my life. I am extremely motivated and inspired to make the best of this life, for me and my family.",
    aboutShort: "I am Backend Developer with a passion for learning new technologies and the drive to become the best developer than I can.",
    aboutContent: "I am an aspiring Backend Developer with a passion for learning new technologies and the drive to become the best developer that I can. Through rigorous self-study and hands-on experience, I have honed my expertise in Go, Rust, Google Cloud, Docker, and Kubernetes. My commitment to continuous growth reflects my readiness to adapt to the ever-evolving field of technology. On a personal note, I'm a devoted father to a wonderful little girl and engaged to the love of my life. My family is my inspiration, motivating me to pursue excellence in my career and make the most of life's opportunities.",
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
    brandImage: '/images/brand-image.jpg',  // Need to load in a different way
    aboutImage: '/images/about-image.jpg',  // Need to load in a different way
    aboutImageLg: '/images/about-image-lg.jpg',  // Need to load in a different way
    cvfile: '/files/Tyler_Aldrich_Resume2023.pdf'  // Need to load in a different way
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
      sourcecode: "https://github.com/TylerAldrich814/chronicles",
      techIcons: "https://skillicons.dev/icons?i=golang,gcp,kubernetes",
      directory: {
        "services": {
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
      sourcecode: "https://github.com/TylerAldrich814/chronicles",
      techIcons: "https://skillicons.dev/icons?i=golang,gcp,kubernetes",
      directory: {
        "src": {
          "testDirectory": {
            files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go",],
            "testSub": {
              files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"],
              "testSub": {
                files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"],
                "testSub": {
                  files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"],
                },
              },
            },
          },
          "testdir": {
            files: ["test1.go", "test1.go"],
            "testSub": {
              files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"],
            }
          },
          "testdir": {
            files: ["test1.go", "test1.go"],
            "testSub": {
              files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"],
            }
          },
          "testdir": {
            files: ["test1.go", "test1.go"],
            "testSub": {
              files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"],
            }
          },
          "testdir": {
            files: ["test1.go", "test1.go"],
            "testSub": {
              files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"]
            }
          },
        }
      },
    },
    {
      id: 3,
      projectName: "Chronicles",
      description: "Chronicles is a Virtual Table Top RPG which allows players to connect over the internet and play RPG Action Role Games. With real time audio, real time messaging(user->room, user->user).",
      sourcecode: "https://github.com/TylerAldrich814/chronicles",
      techIcons: "https://skillicons.dev/icons?i=golang,gcp,kubernetes",
      directory: {
        "services": {
          files: ["File1.go"],
          "userManagement": {
            files: ["userSignup.go", "userDeletion.go", "userGet.go"]
          }
        }
      },
    },
    {
      id: 4,
      projectName: "TestProject",
      description: "Chronicles is a Virtual Table Top RPG which allows players to connect over the internet and play RPG Action Role Games. With real time audio, real time messaging(user->room, user->user).",
      sourcecode: "https://github.com/TylerAldrich814/chronicles",
      techIcons: "https://skillicons.dev/icons?i=golang,gcp,kubernetes",
      directory: {
        "src": {
          "testDirectory": {
            files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go",],
            "testSub": {
              files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"],
              "testSub": {
                files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"],
                "testSub": {
                  files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"],
                },
              },
            },
          },
          "testdir": {
            files: ["test1.go", "test1.go"],
            "testSub": {
              files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"],
            }
          },
          "testdir": {
            files: ["test1.go", "test1.go"],
            "testSub": {
              files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"],
            }
          },
          "testdir": {
            files: ["test1.go", "test1.go"],
            "testSub": {
              files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"],
            }
          },
          "testdir": {
            files: ["test1.go", "test1.go"],
            "testSub": {
              files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"]
            }
          },
        }
      },
    },
    {
      id: 5,
      projectName: "Chronicles",
      description: "Chronicles is a Virtual Table Top RPG which allows players to connect over the internet and play RPG Action Role Games. With real time audio, real time messaging(user->room, user->user).",
      sourcecode: "https://github.com/TylerAldrich814/chronicles",
      techIcons: "https://skillicons.dev/icons?i=golang,gcp,kubernetes",
      directory: {
        "services": {
          files: ["File1.go"],
          "userManagement": {
            files: ["userSignup.go", "userDeletion.go", "userGet.go"]
          }
        }
      },
    },
    {
      id: 6,
      projectName: "TestProject",
      description: "Chronicles is a Virtual Table Top RPG which allows players to connect over the internet and play RPG Action Role Games. With real time audio, real time messaging(user->room, user->user).",
      sourcecode: "https://github.com/TylerAldrich814/chronicles",
      techIcons: "https://skillicons.dev/icons?i=golang,gcp,kubernetes",
      directory: {
        "src": {
          "testDirectory": {
            files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go",],
            "testSub": {
              files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"],
              "testSub": {
                files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"],
                "testSub": {
                  files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"],
                },
              },
            },
          },
          "testdir": {
            files: ["test1.go", "test1.go"],
            "testSub": {
              files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"],
            }
          },
          "testdir": {
            files: ["test1.go", "test1.go"],
            "testSub": {
              files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"],
            }
          },
          "testdir": {
            files: ["test1.go", "test1.go"],
            "testSub": {
              files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"],
            }
          },
          "testdir": {
            files: ["test1.go", "test1.go"],
            "testSub": {
              files: ["deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go","deeper1.go", "deeper2.go"]
            }
          },
        }
      },
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

// Firebase Connections
Mock.onGet("/api/contactinfo").reply(async _ => {
  const response = await getContactInfo();
  return [200, response];
});
Mock.onGet("/api/information").reply(async _ => {
  const response = await getInformation()
  return [200, response];
});

Mock.onGet("/api/skills").reply(async _ => {
  const response = await getSkillsInfo();
  return [200, response];
});

Mock.onGet("/api/experience").reply(async _ => {
  const response = await getExperienceInfo();
  return [200, response];
});

Mock.onGet("/api/experience").reply(async _ => {
  const response = await getExperienceInfo();
  return [200, response];
});

Mock.onGet("/api/socialLinks").reply(async _ => {
  const response = await getSocialLinks();
  return [200, response];
})

Mock.onGet("/api/images").reply(_ => {
  const response = ImageUrls;
  return [200, response];
})

Mock.onGet("/api/projectsData").reply(async _ => {
  const response = await getPortfolioData();
  return [200, response];
})

// tyleraldrich.dev/projects?projectId={project-name}
Mock.onGet(`/api/projects`).reply(async config => {
  const url = new URL(config.url);
  const projectId = url.searchParams.get('projectId');

  const response = getProjectStructure(projectId);
  return [200, response]
})

Mock.onGet('/api/projectFile').reply(async config => {
  const url = new URL(config.url);
  const projectId = url.searchParams.get('projectId');
  const filePath = url.searchParams.get('filePath');

  const response = getProjectFileContents(projectId, filePath);
  return [200, response];
})

