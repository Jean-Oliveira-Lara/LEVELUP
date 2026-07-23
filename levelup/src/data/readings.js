const readings = [
  {
    id: 1,
    title: "My Daily Routine",
    level: "A1",
    estimatedTime: "2 min",
    text: `
Every morning I wake up at seven o'clock.

I brush my teeth and have breakfast.

After breakfast, I study English for one hour.

In the afternoon, I work on my computer.

At night, I read a book and go to bed at ten o'clock.
`,
    questions: [
      {
        question: "What time does the person wake up?",
        options: [
          "6:00",
          "7:00",
          "8:00",
          "9:00",
        ],
        answer: 1,
      },
      {
        question: "What does the person do after breakfast?",
        options: [
          "Go to work",
          "Watch TV",
          "Study English",
          "Sleep",
        ],
        answer: 2,
      },
    ],
    xp: 40,
  },
];

export default readings;