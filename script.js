const timelines = {
  before: {
    title: "Before We Met",
    mood: "Monochrome",
    leftName: "Me",
    rightName: "Empty",
    chapters: [
      {
        title: "The Days Felt Gray",
        speaker: "Me",
        text:
          "My world was black and white. Every morning was a fight with gravity, and every night ended in the same silence. I was here, but I wasn’t alive.",
        highlight:
          "I carried the weight of Kenzie’s school fees, the arguments with my dad, and the pressure to work and build a business just to survive.",
        choices: [
          "Keep moving, even when it hurts.",
          "Remember the moment I promised to protect Kenzie.",
        ],
        memory: [
          "The day I took on Kenzie’s school fees.",
          "The night I told myself I could handle everything alone.",
        ],
      },
      {
        title: "Numb but Breathing",
        speaker: "Me",
        text:
          "I was working and hustling, yet nothing felt like mine. It was survival, not living — like my heart had gone quiet.",
        highlight:
          "Every plan felt heavy, every dream paused. Still, I kept going because I had to.",
        choices: [
          "Share how you felt unseen.",
          "Recall the fight that broke the silence at home.",
        ],
        memory: [
          "The first business step that didn’t feel like victory.",
          "The quiet ride home after another fight.",
        ],
      },
    ],
  },
  after: {
    title: "After We Met",
    mood: "Warm & Alive",
    leftName: "Me",
    rightName: "Her",
    chapters: [
      {
        title: "You Brought the Color",
        speaker: "Her",
        text:
          "Then you appeared, and everything softened. You made the world feel warm again — like the light had finally found me.",
        highlight:
          "You listened to my chaos and made it feel safe. You turned my tired days into something worth coming home to.",
        choices: [
          "Describe the first time you made me laugh again.",
          "Write about the moment I knew I was falling for you.",
        ],
        memory: [
          "The first message that felt like sunshine.",
          "The moment I realized I wasn’t alone anymore.",
        ],
      },
      {
        title: "Still Us, But Brighter",
        speaker: "Me",
        text:
          "Life didn’t stop being hard, but with you it felt possible. You turned my struggle into a story with hope.",
        highlight:
          "Now I want to build a life where we both can breathe — where we stay soft, even when the world is rough.",
        choices: [
          "Add the date you want to remember forever.",
          "Share what you want our future to feel like.",
        ],
        memory: [
          "Our first plan for the future.",
          "The promise I made to always choose you.",
        ],
      },
    ],
  },
};

const body = document.body;
const timelineTitle = document.getElementById("timeline-title");
const storyChapter = document.getElementById("story-chapter");
const storyMood = document.getElementById("story-mood");
const storyTitle = document.getElementById("story-title");
const storyText = document.getElementById("story-text");
const storyHighlight = document.getElementById("story-highlight");
const choicesContainer = document.getElementById("choices");
const memoryList = document.getElementById("memory-list");
const leftName = document.getElementById("left-name");
const rightName = document.getElementById("right-name");
const leftChar = document.getElementById("char-left");
const rightChar = document.getElementById("char-right");
const toggleButtons = document.querySelectorAll(".toggle-btn");

let currentTimeline = "before";
let currentChapter = 0;

const renderChoices = (choices) => {
  choicesContainer.innerHTML = "";
  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-btn";
    button.textContent = choice;
    button.addEventListener("click", () => {
      currentChapter = (currentChapter + 1) % timelines[currentTimeline].chapters.length;
      renderStory();
    });
    choicesContainer.appendChild(button);
  });
};

const renderMemory = (memory) => {
  memoryList.innerHTML = "";
  memory.forEach((note) => {
    const item = document.createElement("li");
    item.textContent = note;
    memoryList.appendChild(item);
  });
};

const setSpeakerFocus = (speaker) => {
  if (speaker === "Her") {
    rightChar.style.transform = "translateY(-6px) scale(1.03)";
    leftChar.style.transform = "translateY(0) scale(0.97)";
    rightChar.style.opacity = "1";
    leftChar.style.opacity = "0.6";
  } else {
    leftChar.style.transform = "translateY(-6px) scale(1.03)";
    rightChar.style.transform = "translateY(0) scale(0.97)";
    leftChar.style.opacity = "1";
    rightChar.style.opacity = currentTimeline === "before" ? "0.2" : "0.6";
  }
};

const renderStory = () => {
  const timeline = timelines[currentTimeline];
  const chapter = timeline.chapters[currentChapter];

  timelineTitle.textContent = timeline.title;
  storyChapter.textContent = `Chapter ${currentChapter + 1}`;
  storyMood.textContent = timeline.mood;
  storyTitle.textContent = chapter.title;
  storyText.textContent = chapter.text;
  storyHighlight.querySelector("p").textContent = chapter.highlight;
  leftName.textContent = timeline.leftName;
  rightName.textContent = timeline.rightName;
  renderChoices(chapter.choices);
  renderMemory(chapter.memory);
  setSpeakerFocus(chapter.speaker);
};

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    toggleButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    currentTimeline = button.dataset.timeline;
    currentChapter = 0;
    body.classList.toggle("after", currentTimeline === "after");
    renderStory();
  });
});

renderStory();
