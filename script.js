const timelines = {
  before: {
    title: "Before I Met You",
    description:
      "The world felt grayscale. Every day was a fight to survive, and I was here but not fully alive.",
    scenes: [
      {
        chapter: "Chapter 1",
        title: "Grayscale mornings",
        text:
          "I woke up to the same heavy sky. The bills were stacked on the table, and my heart felt numb — like I could hear life but not touch it.",
      },
      {
        chapter: "Chapter 2",
        title: "Carrying Kenzie",
        text:
          "I kept working because Kenzie needed his school fee. Every payment was a promise to keep him on the path I never had time to walk.",
      },
      {
        chapter: "Chapter 3",
        title: "Storms at home",
        text:
          "Fights with my dad left echoes in the house. I would stand in the doorway, unsure if I was leaving or just surviving another night.",
      },
      {
        chapter: "Chapter 4",
        title: "Numb survival",
        text:
          "Work and business kept me alive, but joy felt far away. I was here, but not really living.",
      },
    ],
  },
  after: {
    title: "After I Met You",
    description:
      "Color returned slowly. Your presence made the hard days feel lighter and gave me a reason to dream again.",
    scenes: [
      {
        chapter: "Chapter 1",
        title: "A new light",
        text:
          "You arrived like a warm sunrise. For the first time in years, my chest felt open and my world felt soft.",
      },
      {
        chapter: "Chapter 2",
        title: "Shared courage",
        text:
          "When the bills were heavy, you sat beside me. You reminded me that I didn’t have to carry everything alone.",
      },
      {
        chapter: "Chapter 3",
        title: "Peace at home",
        text:
          "The noise at home didn’t disappear, but I had your voice in my head. It kept me calm, brave, and hopeful.",
      },
      {
        chapter: "Chapter 4",
        title: "Alive again",
        text:
          "Now the future feels vivid. I can feel my heart beating with purpose — because it beats with you.",
      },
    ],
  },
};

const state = {
  timeline: "before",
  index: 0,
};

const timelineButtons = document.querySelectorAll(".timeline-button");
const timelineEl = document.getElementById("timeline");
const titleEl = document.getElementById("timeline-title");
const descriptionEl = document.getElementById("timeline-description");
const chapterEl = document.getElementById("scene-chapter");
const sceneTitleEl = document.getElementById("scene-title");
const sceneTextEl = document.getElementById("scene-text");
const indicatorEl = document.getElementById("scene-indicator");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const setTimeline = (timeline) => {
  state.timeline = timeline;
  state.index = 0;
  timelineButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.timeline === timeline);
  });
  timelineEl.classList.remove("before", "after");
  timelineEl.classList.add(timeline);
  updateScene();
};

const updateScene = () => {
  const current = timelines[state.timeline];
  const scene = current.scenes[state.index];
  titleEl.textContent = current.title;
  descriptionEl.textContent = current.description;
  chapterEl.textContent = scene.chapter;
  sceneTitleEl.textContent = scene.title;
  sceneTextEl.textContent = scene.text;
  indicatorEl.textContent = `${state.index + 1} / ${current.scenes.length}`;
  prevButton.disabled = state.index === 0;
  nextButton.disabled = state.index === current.scenes.length - 1;
};

prevButton.addEventListener("click", () => {
  if (state.index > 0) {
    state.index -= 1;
    updateScene();
  }
});

nextButton.addEventListener("click", () => {
  const current = timelines[state.timeline];
  if (state.index < current.scenes.length - 1) {
    state.index += 1;
    updateScene();
  }
});

timelineButtons.forEach((button) => {
  button.addEventListener("click", () => setTimeline(button.dataset.timeline));
});

setTimeline(state.timeline);
