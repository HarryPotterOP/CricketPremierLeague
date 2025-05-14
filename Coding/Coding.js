const lessonList = document.getElementById('lesson-list');
const lessonContent = document.getElementById('lesson-content');
const codeEditor = document.getElementById('code-editor');
const livePreview = document.getElementById('live-preview');

const lessons = {
    lesson1: {
        title: "Introduction to HTML",
        content: "<p>HTML (HyperText Markup Language) is the standard language for creating web pages.</p>"
    },
    lesson2: {
        title: "CSS Basics",
        content: "<p>CSS (Cascading Style Sheets) is used to style and layout web pages.</p>"
    },
    lesson3: {
        title: "JavaScript Intro",
        content: "<p>JavaScript is a programming language that allows you to implement complex features on web pages.</p>"
    },
    lesson4: {
        title: "Python Basics",
        content: "<p>Python is a versatile programming language known for its simplicity and readability.</p>"
    },
    lesson5: {
        title: "C++ Fundamentals",
        content: "<p>C++ is a powerful programming language used for system/software development and game programming.</p>"
    }
};

lessonList.addEventListener('click', (event) => {
    const lessonKey = event.target.dataset.lesson;
    if (lessonKey && lessons[lessonKey]) {
        const lesson = lessons[lessonKey];
        lessonContent.innerHTML = `<h1>${lesson.title}</h1>${lesson.content}`;
    }
});

codeEditor.addEventListener('input', () => {
    const code = codeEditor.value;
    livePreview.srcdoc = code;
});
