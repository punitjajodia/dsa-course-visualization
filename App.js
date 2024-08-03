import React, { useState, useEffect, useRef } from "react";
import "./App.css"; // Ensure this file is updated

const App = () => {
  const chapters = [
    {
      id: "chapter-1",
      name: "Introduction",
      lessons: [
        "Introduction to DSA",
        "Why Learn DSA?",
        "Prerequisites",
        "Best Practices",
      ],
    },
    {
      id: "chapter-2",
      name: "Sorting Algorithms",
      lessons: [
        "Bubble Sort",
        "Selection Sort",
        "Insertion Sort",
        "Merge Sort",
        "Quick Sort",
        "Counting Sort",
      ],
    },
    // Add remaining chapters here
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
                  {lessonIndex < chapter.lessons.length - 1 && (
                    <div
                      className={`traversal-icon ${
                        highlightedTraversal === lessonIndex + 1
                          ? "highlight-forward"
                          : ""
                      }`}
                    >
                      ➡️
                    </div>
                  )}
                  {lessonIndex > 0 && (
                    <div
                      className={`traversal-icon ${
                        highlightedTraversal === lessonIndex &&
                        traversalDirection === "backward"
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
