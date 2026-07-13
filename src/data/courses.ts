export interface Lesson {
  id: string
  title: string
  duration: string
  content: string
}

export interface Course {
  id: string
  title: string
  code: string
  tagline: string
  description: string
  lessons: Array<Lesson>
}

const courses: Array<Course> = [
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
