export interface Lesson {
  id: string
  title: string
  duration: string
  content: string
}

export interface StudyMaterial {
  id: string
  title: string
  format: string
}

export interface Course {
  id: string
  title: string
  code: string
  tagline: string
  description: string
  materials?: Array<StudyMaterial>
  lessons: Array<Lesson>
}

const courses: Array<Course> = [
{
  "id": "bio-102",
  "code": "BIO 102",
  "title": "Biology",
  "tagline": "Past questions, objective practice, and explained answers.",
  "description": "Past questions, objective practice, and explained answers. Sign in with your paid account to download the original study documents.",
  "lessons": [],
  "materials": [
    {
      "id": "bio-102-1.pdf",
      "title": "2019–2020 past questions",
      "format": "PDF"
    },
    {
      "id": "bio-102-2.pdf",
      "title": "Biology study material by Obafemi",
      "format": "PDF"
    },
    {
      "id": "bio-102-3.pdf",
      "title": "Biology practice questions — set 1",
      "format": "PDF"
    },
    {
      "id": "bio-102-4.pdf",
      "title": "Biology practice questions — set 2",
      "format": "PDF"
    },
    {
      "id": "bio-102-5.pdf",
      "title": "Biology questions with explanations",
      "format": "PDF"
    },
    {
      "id": "bio-102-6.pdf",
      "title": "Objective questions explained",
      "format": "PDF"
    },
    {
      "id": "bio-102-7.pdf",
      "title": "Biology past questions — COSMAS 01",
      "format": "PDF"
    }
  ]
},
{
  "id": "chm-102",
  "code": "CHM 102",
  "title": "Chemistry",
  "tagline": "Past papers, test preparation, and practice questions with answers.",
  "description": "Past papers, test preparation, and practice questions with answers. Sign in with your paid account to download the original study documents.",
  "lessons": [],
  "materials": [
    {
      "id": "chm-102-1.pdf",
      "title": "Chemistry past questions — collection 1",
      "format": "PDF"
    },
    {
      "id": "chm-102-2.pdf",
      "title": "Chemistry past questions — collection 2",
      "format": "PDF"
    },
    {
      "id": "chm-102-3.docx",
      "title": "Practice questions and answers",
      "format": "DOCX"
    },
    {
      "id": "chm-102-4.pdf",
      "title": "Test practice — set 1",
      "format": "PDF"
    },
    {
      "id": "chm-102-5.pdf",
      "title": "Test practice — set 2",
      "format": "PDF"
    },
    {
      "id": "chm-102-6.pdf",
      "title": "Chemistry questions — COSMAS 01",
      "format": "PDF"
    },
    {
      "id": "chm-102-7.pdf",
      "title": "Chemistry revision — COSMAS 01",
      "format": "PDF"
    },
    {
      "id": "chm-102-8.pdf",
      "title": "Chemistry test past questions — COSMAS 01",
      "format": "PDF"
    }
  ]
},
{
  "id": "chm-108",
  "code": "CHM 108",
  "title": "Practical Chemistry",
  "tagline": "Preparation questions for your chemistry practical.",
  "description": "Preparation questions for your chemistry practical. Sign in with your paid account to download the original study documents.",
  "lessons": [],
  "materials": [
    {
      "id": "chm-108-1.pdf",
      "title": "Practical preparation questions",
      "format": "PDF"
    }
  ]
},
{
  "id": "phy-106",
  "code": "PHY 106",
  "title": "Physics",
  "tagline": "Revise with 50 past questions and answers.",
  "description": "Revise with 50 past questions and answers. Sign in with your paid account to download the original study documents.",
  "lessons": [],
  "materials": [
    {
      "id": "phy-106-1.pdf",
      "title": "50 physics past questions and answers",
      "format": "PDF"
    }
  ]
},
{
  "id": "gst-114",
  "code": "GST 114",
  "title": "General Studies",
  "tagline": "Past-question collections for GST 114 revision.",
  "description": "Past-question collections for GST 114 revision. Sign in with your paid account to download the original study documents.",
  "lessons": [],
  "materials": [
    {
      "id": "gst-114-1.pdf",
      "title": "GST 114 past questions — part 3",
      "format": "PDF"
    },
    {
      "id": "gst-114-2.pdf",
      "title": "GST 114 past questions — part 4",
      "format": "PDF"
    }
  ]
},
{
  "id": "exam-resources",
  "code": "STUDENT RESOURCES",
  "title": "Exam Resources",
  "tagline": "An uploaded exam timetable to support your study planning. Check current dates with your department.",
  "description": "An uploaded exam timetable to support your study planning. Check current dates with your department. Sign in with your paid account to download the original study documents.",
  "lessons": [],
  "materials": [
    {
      "id": "exam-resources-1.docx",
      "title": "Exam timetable — uploaded reference",
      "format": "DOCX"
    }
  ]
},
  {
    id: 'peoples-and-culture',
    title: 'Peoples and Culture',
    code: 'GST 112',
    tagline: 'History, values, and civic life across the regions.',
    description:
      'A structured walkthrough of the peoples, history, and cultural values covered in the general studies syllabus, broken into short lessons with practice questions.',
    lessons: [
      {
        id: 'origins',
        title: 'Origins and early settlement',
        duration: '12 min',
        content:
          'Covers the major migration theories, early kingdoms, and how geography shaped settlement patterns.',
      },
      {
        id: 'culture-values',
        title: 'Culture, values, and norms',
        duration: '15 min',
        content:
          'Explains shared value systems, rites of passage, and how culture is transmitted across generations.',
      },
      {
        id: 'governance',
        title: 'Traditional governance systems',
        duration: '10 min',
        content:
          'Compares centralized and decentralized traditional political systems and their modern legacies.',
      },
    ],
  },
  {
    id: 'library-and-study-skills',
    title: 'Library and Study Skills',
    code: 'GST 116',
    tagline: 'Research methods, referencing, and effective study habits.',
    description:
      'Practical training on using library resources, evaluating sources, and building study habits that hold up under exam pressure.',
    lessons: [
      {
        id: 'library-resources',
        title: 'Navigating library resources',
        duration: '9 min',
        content:
          'Introduces classification systems, catalog searches, and how to locate physical and digital resources quickly.',
      },
      {
        id: 'research-skills',
        title: 'Research and source evaluation',
        duration: '14 min',
        content:
          'Covers how to evaluate credibility, cross-reference claims, and avoid common citation mistakes.',
      },
      {
        id: 'study-techniques',
        title: 'Study techniques that stick',
        duration: '11 min',
        content:
          'Spaced repetition, active recall, and scheduling techniques suited to a full course load.',
      },
    ],
  },
  {
    id: 'communication-skills',
    title: 'Use of English and Communication Skills',
    code: 'GST 111',
    tagline: 'Grammar, comprehension, and academic writing.',
    description:
      'A refresher on grammar fundamentals, comprehension strategies, and structuring clear academic writing.',
    lessons: [
      {
        id: 'grammar-refresher',
        title: 'Grammar refresher',
        duration: '13 min',
        content:
          'Reviews sentence structure, common grammatical errors, and how to self-edit effectively.',
      },
      {
        id: 'comprehension',
        title: 'Comprehension strategies',
        duration: '10 min',
        content:
          'Techniques for extracting key ideas quickly from dense academic passages.',
      },
      {
        id: 'academic-writing',
        title: 'Academic writing structure',
        duration: '16 min',
        content:
          'Covers thesis statements, paragraph structure, and building a coherent argument across an essay.',
      },
    ],
  },
]

export default courses
