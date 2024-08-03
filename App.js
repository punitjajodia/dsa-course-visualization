import React, { useState, useEffect, useRef } from "react";
import "./App.css"; // Ensure this file is updated

const App = () => {
  const chapters = [
    {
      id: "chapter-1",
      lessons: [
        "Introduction to DSA",
        "Why Learn DSA?",
        "Prerequisites",
        "Best Practices",
      ],
    },
    {
      id: "chapter-2",
      lessons: [
        "Bubble Sort",
        "Selection Sort",
        "Insertion Sort",
        "Merge Sort",
        "Quick Sort",
        "Counting Sort",
      ],
    },
    {
      id: "chapter-3",
      lessons: ["Linear Search", "Binary Search"],
    },
    {
      id: "chapter-4",
      lessons: [
        "Linked List",
        "Linked List Operations",
        "Examples: Linked List",
      ],
    },
    {
      id: "chapter-5",
      lessons: [
        "Introduction to Circular Linked List",
        "Circular Linked List Operations",
        "Examples: Circular Linked List",
      ],
    },
    {
      id: "chapter-6",
      lessons: [
        "Introduction to Doubly Linked List",
        "Doubly Linked List Operations",
        "Examples: Doubly Linked List",
      ],
    },
    {
      id: "chapter-7",
      lessons: ["Stack", "Queue", "Double Ended Queue (Deque)"],
    },
    {
      id: "chapter-8",
      lessons: [
        "Introduction to Hashing",
        "Hashing Techniques",
        "Hash Collision",
        "Hash Collision Resolution",
        "Hash Functions",
        "Additional Topics",
      ],
    },
    {
      id: "chapter-9",
      lessons: [
        "Introduction",
        "Brute Force Method",
        "Rabin-Karp String Matching Algorithm",
        "Knuth-Morris-Pratt (KMP) Algorithm",
      ],
    },
    {
      id: "chapter-10",
      lessons: [
        "Nonlinear Data Structure",
        "Tree Data Structure",
        "Implementation of Trees",
        "Tree Traversal",
      ],
    },
    {
      id: "chapter-11",
      lessons: [
        "Introduction to Binary Trees",
        "Properties of Binary Trees",
        "Implementation of Binary Trees",
        "Traversal of Binary Tree",
        "Types of Binary Trees",
        "Example: Huffman Coding",
        "Example: Binary Search Tree",
      ],
    },
    {
      id: "chapter-12",
      lessons: [
        "Array Representation of Binary Tree",
        "Introduction to Heaps",
        "Heapify & Heap Operations",
        "Heap Sort",
        "Heap as a Priority Queue",
      ],
    },
    {
      id: "chapter-13",
      lessons: [
        "Introduction to Greedy Algorithms",
        "Classroom Scheduling Problem",
        "Coin Change Problem",
        "The Fractional Knapsack Problem",
        "0-1 Knapsack Problem",
      ],
    },
    {
      id: "chapter-14",
      lessons: [
        "Graph Data Structure",
        "Graph Terminologies",
        "Adjacency Matrix",
        "Adjacency List",
        "Graph Traversal With DFS Algorithm",
        "BFS Algorithm",
      ],
    },
    {
      id: "chapter-15",
      lessons: [
        "Graph Connectivity",
        "Touring a Graph",
        "Graph Comparisons and Special Properties",
        "Types of Graph",
      ],
    },
    {
      id: "chapter-16",
      lessons: [
        "Graph Based Algorithms",
        "Topological Sorting",
        "Dijkstra's Algorithm",
        "Ford–Fulkerson Algorithm",
        "Spanning Trees",
        "Kruskal's Algorithm",
        "Prim's Algorithm",
      ],
    },
    {
      id: "chapter-17",
      lessons: [
        "Additional Sorting Techniques",
        "Bucket Sort",
        "Radix Sort",
        "Shell Sort",
      ],
    },
    {
      id: "chapter-18",
      lessons: [
        "Introduction to Balanced Trees",
        "AVL Trees",
        "Red-Black Trees",
      ],
    },
    {
      id: "chapter-19",
      lessons: ["What's Next?"],
    },
  ];

  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [highlightedTraversal, setHighlightedTraversal] = useState(null); // Track highlighted traversal
  const [traversalDirection, setTraversalDirection] = useState(null); // Track traversal direction
  const courseContentRef = useRef(null);

  const updateHighlightedTraversal = (targetLessonIndex, direction) => {
    setHighlightedTraversal(targetLessonIndex);
    setTraversalDirection(direction);
    setTimeout(() => {
      setHighlightedTraversal(null);
      setTraversalDirection(null);
    }, 500); // Highlight for 0.5 seconds
  };

  const goRight = () => {
    const lessons = chapters[currentChapter].lessons;
    if (currentLesson < lessons.length - 1) {
      const nextLesson = currentLesson + 1;
      setCurrentLesson(nextLesson);
      updateHighlightedTraversal(nextLesson, "forward");
    }
  };

  const goLeft = () => {
    if (currentLesson > 0) {
      const previousLesson = currentLesson - 1;
      setCurrentLesson(previousLesson);
      updateHighlightedTraversal(previousLesson, "backward");
    }
  };

  const goDown = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setCurrentLesson(0);
      setHighlightedTraversal(null); // Clear highlighted traversal when changing chapters
    }
  };

  const goUp = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
      setCurrentLesson(0);
      setHighlightedTraversal(null); // Clear highlighted traversal when changing chapters
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowRight":
          goRight();
          break;
        case "ArrowLeft":
          goLeft();
          break;
        case "ArrowDown":
          goDown();
          break;
        case "ArrowUp":
          goUp();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentChapter, currentLesson]);

  return (
    <div className="course-container">
      <div className="navigation-buttons">
        <button onClick={goUp} className="nav-button">
          ⬆️
        </button>
        <button onClick={goLeft} className="nav-button">
          ⬅️
        </button>
        <button onClick={goRight} className="nav-button">
          ➡️
        </button>
        <button onClick={goDown} className="nav-button">
          ⬇️
        </button>
      </div>
      <div className="course-content" ref={courseContentRef}>
        {chapters.map((chapter, chapterIndex) => (
          <div
            key={chapter.id}
            className={`chapter-container ${
              chapterIndex === currentChapter ? "active" : ""
            }`}
          >
            <div className="chapter-name">{chapter.name}</div>
            <div className="lessons">
              {chapter.lessons.map((lesson, lessonIndex) => (
                <React.Fragment key={lessonIndex}>
                  <div
                    className={`lesson ${
                      lessonIndex === currentLesson &&
                      chapterIndex === currentChapter
                        ? "active"
                        : ""
                    }`}
                  >
                    {lesson}
                  </div>
                  {lessonIndex < chapter.lessons.length - 1 &&
                    chapterIndex === currentChapter && (
                      <div
                        className={`traversal-icon ${
                          highlightedTraversal === lessonIndex + 1 &&
                          traversalDirection === "forward" &&
                          chapterIndex === currentChapter
                            ? "highlight-forward"
                            : ""
                        }`}
                      >
                        ➡️
                      </div>
                    )}
                  {lessonIndex < chapter.lessons.length - 1 &&
                    lessonIndex >= 0 &&
                    chapterIndex === currentChapter && (
                      <div
                        className={`traversal-icon ${
                          highlightedTraversal === lessonIndex &&
                          traversalDirection === "backward" &&
                          chapterIndex === currentChapter
                            ? "highlight-backward"
                            : ""
                        }`}
                      >
                        ⬅️
                      </div>
                    )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
