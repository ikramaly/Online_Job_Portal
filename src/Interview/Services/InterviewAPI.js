export const getQuestions = async () => {
  // Temporary static data (replace with backend later)
  return [
    {
      question: "What is React?",
      options: ["Library", "Framework", "Language"],
      correctAnswer: "Library",
    },
    {
      question: "What is useState?",
      options: ["Hook", "API", "Library"],
      correctAnswer: "Hook",
    },
    {
  
    question: "Which of the following is used in React.js to increase performance?",
    options: ["Original DOM", "Virtual DOM", "Both A and B", "None of the above"],
    answer: "Virtual DOM",
    category: "React"
  },
  {
 
    question: "What is the time complexity of searching an element in a Binary Search Tree (Balanced)?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"],
    answer: "O(log n)",
    category: "Data Structures"
  },
  {
      
      question: "What is the primary purpose of the Virtual DOM in React?",
      options: ["Direct manipulation of the browser DOM", "To increase performance by minimizing real DOM updates", "To store global state", "To handle server-side routing"],
      correctAnswer: "To increase performance by minimizing real DOM updates",
      category: "React"
    },
    {
  
      question: "Which hook is used to perform side effects in a functional component?",
      options: ["useState", "useMemo", "useEffect", "useContext"],
      correctAnswer: "useEffect",
      category: "React"
    },
    {
     
      question: "In CSS Flexbox, which property is used to align items along the main axis?",
      options: ["align-items", "justify-content", "align-content", "flex-direction"],
      correctAnswer: "justify-content",
      category: "CSS"
    },
    {
     
      question: "What is the correct way to pass a ref to a child component in React?",
      options: ["Using the 'ref' prop directly", "Using React.forwardRef", "Using useImperativeHandle", "Refs cannot be passed to children"],
      correctAnswer: "Using React.forwardRef",
      category: "React"
    },
    {
      
      question: "Which JavaScript method is used to create a new array with all elements that pass a test?",
      options: ["map()", "forEach()", "filter()", "reduce()"],
      correctAnswer: "filter()",
      category: "JavaScript"
    },
    {
     
      question: "What is 'Closure' in JavaScript?",
      options: ["A way to close a browser tab", "A function bundled with its lexical environment", "A private class variable", "A method to end a loop"],
      correctAnswer: "A function bundled with its lexical environment",
      category: "JavaScript"
    },

    // --- DATA STRUCTURES & ALGORITHMS (7 Questions) ---
    {
     
      question: "What is the time complexity of searching an element in a Balanced Binary Search Tree?",
      options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"],
      correctAnswer: "O(log n)",
      category: "DSA"
    },
    {
      
      question: "Which data structure follows the LIFO (Last In First Out) principle?",
      options: ["Queue", "Linked List", "Stack", "Array"],
      correctAnswer: "Stack",
      category: "DSA"
    },
    {
      
      question: "What is the worst-case time complexity of QuickSort?",
      options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
      correctAnswer: "O(n^2)",
      category: "Algorithms"
    },
    {
      
      question: "Which algorithm is used to find the shortest path in a weighted graph with no negative edges?",
      options: ["Prim's Algorithm", "Kruskal's Algorithm", "Dijkstra's Algorithm", "Breadth First Search"],
      correctAnswer: "Dijkstra's Algorithm",
      category: "Algorithms"
    },
    {
      
      question: "What is a 'Hash Collision'?",
      options: ["When a database crashes", "When two different keys produce the same hash value", "When memory limit is exceeded", "When an array index is negative"],
      correctAnswer: "When two different keys produce the same hash value",
      category: "DSA"
    },
    {
      
      question: "In a Singly Linked List, what is the time complexity to delete a node at the end?",
      options: ["O(1)", "O(n)", "O(log n)", "O(1) if tail is given"],
      correctAnswer: "O(n)",
      category: "DSA"
    },
    {
      
      question: "Which traversal of a BST (Binary Search Tree) yields sorted order?",
      options: ["Pre-order", "Post-order", "In-order", "Level-order"],
      correctAnswer: "In-order",
      category: "DSA"
    },

    // --- BACKEND & DATABASE (6 Questions) ---
    {
      
      question: "In a relational database, what is a 'Foreign Key'?",
      options: ["A key used by foreigners", "A column that creates a link between two tables", "The main unique ID of a table", "A hidden encrypted key"],
      correctAnswer: "A column that creates a link between two tables",
      category: "Database"
    },
    {
      
      question: "What does the 'A' in ACID properties of a database stand for?",
      options: ["Availability", "Atomicity", "Accuracy", "Authentication"],
      correctAnswer: "Atomicity",
      category: "Database"
    },
    {
      
      question: "Which HTTP status code represents 'Internal Server Error'?",
      options: ["404", "200", "500", "403"],
      correctAnswer: "500",
      category: "Backend"
    },
    {
      
      question: "What is the purpose of Middleware in Express.js?",
      options: ["To style the frontend", "To execute code between request and response", "To connect to a printer", "To minify JavaScript files"],
      correctAnswer: "To execute code between request and response",
      category: "NodeJS"
    },
    {
      
      question: "Which command is used to remove all records from a table without deleting the table structure?",
      options: ["DELETE", "REMOVE", "TRUNCATE", "DROP"],
      correctAnswer: "TRUNCATE",
      category: "SQL"
    },
    {
      
      question: "What is JWT used for in web development?",
      options: ["Database backup", "Securely transmitting information as a JSON object", "Server-side rendering", "Managing CSS transitions"],
      correctAnswer: "Securely transmitting information as a JSON object",
      category: "Security"
    },

    // --- CORE CS & SOFT SKILLS (6 Questions) ---
    {
      
      question: "What is 'Deadlock' in an Operating System?",
      options: ["A computer virus", "A situation where processes are waiting for each other to release resources", "When a hard drive fails", "When a user forgets their password"],
      correctAnswer: "A situation where processes are waiting for each other to release resources",
      category: "OS"
    },
    {
     
      question: "Which layer of the OSI model is responsible for routing packets?",
      options: ["Data Link Layer", "Transport Layer", "Network Layer", "Physical Layer"],
      correctAnswer: "Network Layer",
      category: "Networking"
    },
    {
     
      question: "In Object-Oriented Programming, what is 'Encapsulation'?",
      options: ["Inheriting from a parent class", "Wrapping data and methods into a single unit", "Creating multiple forms of a function", "Accessing private variables directly"],
      correctAnswer: "Wrapping data and methods into a single unit",
      category: "OOP"
    },
    {
      
      question: "What is the purpose of 'Git Merge'?",
      options: ["To delete a branch", "To combine multiple histories into one", "To upload code to GitHub", "To create a new repository"],
      correctAnswer: "To combine multiple histories into one",
      category: "Git"
    },
    {
      
      question: "If a coworker is struggling with a deadline, what is the most 'JiViKa' professional response?",
      options: ["Ignore it and do your work", "Tell the manager immediately", "Offer assistance if your workload allows", "Tell them to work faster"],
      correctAnswer: "Offer assistance if your workload allows",
      category: "Soft Skills"
    },
    {
     
      question: "Which of the following is an Agile methodology?",
      options: ["Waterfall", "Scrum", "V-Model", "Spiral"],
      correctAnswer: "Scrum",
      category: "Project Management"
    },
    {
      question: "Before starting the project which thing is very important.",
      optionss : ["Feasiblity", "Maintenance", "Requirement analysis", "Implementation"],
      correctAnswer: "Feasiblity",
      category : "Project Management"
    }
  ];
};