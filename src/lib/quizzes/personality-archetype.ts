import type { QuizConfig } from "../types";

export const quiz: QuizConfig = {
  "slug": "personality-archetype",
  "title": "What is Your Personality Archetype?",
  "metaDescription": "Are you a Sage, Explorer, Creator, or Guardian? Discover your core archetype.",
  "intro": {
    "headline": "What is Your Personality Archetype?",
    "subheading": "Every person embodies a core archetype that shapes how they see the world.",
    "cta": "Discover My Archetype"
  },
  "outcomes": [
    {
      "id": "sage",
      "name": "The Sage",
      "tagline": "Truth is your compass.",
      "description": "You are driven by a deep desire to understand the world. You are the friend people call for honest advice.\n\nThe Sage thrives in research, writing, consulting, teaching, and strategy.",
      "theme": {
        "accent": "#3B82F6",
        "gradient": "linear-gradient(135deg, #3B82F6 0%, #93C5FD 100%)",
        "icon": "🧙"
      }
    },
    {
      "id": "explorer",
      "name": "The Explorer",
      "tagline": "The horizon is calling.",
      "description": "You are restless in the best way. Routine feels like a cage.\n\nThe Explorer thrives in travel, entrepreneurship, journalism, and startups.",
      "theme": {
        "accent": "#F59E0B",
        "gradient": "linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)",
        "icon": "🌍"
      }
    },
    {
      "id": "creator",
      "name": "The Creator",
      "tagline": "You see blank canvases everywhere.",
      "description": "You are compelled to make things. You cannot resist bringing something new into existence.\n\nThe Creator thrives in design, engineering, film, music, and architecture.",
      "theme": {
        "accent": "#EC4899",
        "gradient": "linear-gradient(135deg, #EC4899 0%, #F9A8D4 100%)",
        "icon": "🎨"
      }
    },
    {
      "id": "guardian",
      "name": "The Guardian",
      "tagline": "You stand watch for others.",
      "description": "You are dependable, protective, and deeply loyal. People feel safe around you.\n\nThe Guardian thrives in management, healthcare, operations, and community leadership.",
      "theme": {
        "accent": "#10B981",
        "gradient": "linear-gradient(135deg, #10B981 0%, #6EE7B7 100%)",
        "icon": "🛡️"
      }
    },
    {
      "id": "rebel",
      "name": "The Rebel",
      "tagline": "Rules are suggestions.",
      "description": "You challenge the status quo because you see a better way. You are bold and energized by disruption.\n\nThe Rebel thrives in startups, activism, creative direction, and marketing.",
      "theme": {
        "accent": "#EF4444",
        "gradient": "linear-gradient(135deg, #EF4444 0%, #FCA5A5 100%)",
        "icon": "🔥"
      }
    }
  ],
  "questions": [
    {
      "id": "q1",
      "text": "What do you reach for first in a bookstore?",
      "answers": [
        {
          "label": "Non-fiction to learn something",
          "weights": {
            "sage": 3
          }
        },
        {
          "label": "Travel memoirs",
          "weights": {
            "explorer": 3
          }
        },
        {
          "label": "Art books or creative writing",
          "weights": {
            "creator": 3
          }
        },
        {
          "label": "Self-help or leadership",
          "weights": {
            "guardian": 3
          }
        },
        {
          "label": "Counter-culture essays",
          "weights": {
            "rebel": 3
          }
        }
      ]
    },
    {
      "id": "q2",
      "text": "You are stuck in traffic. What do you do?",
      "answers": [
        {
          "label": "Analyze traffic patterns",
          "weights": {
            "sage": 3
          }
        },
        {
          "label": "Put on a podcast",
          "weights": {
            "explorer": 3
          }
        },
        {
          "label": "Sketch ideas in your head",
          "weights": {
            "creator": 3
          }
        },
        {
          "label": "Stay calm and wait",
          "weights": {
            "guardian": 3
          }
        },
        {
          "label": "Find an unconventional shortcut",
          "weights": {
            "rebel": 3
          }
        }
      ]
    },
    {
      "id": "q3",
      "text": "Your role in your friend group?",
      "answers": [
        {
          "label": "The advisor",
          "weights": {
            "sage": 3
          }
        },
        {
          "label": "The planner",
          "weights": {
            "explorer": 3
          }
        },
        {
          "label": "The storyteller",
          "weights": {
            "creator": 3
          }
        },
        {
          "label": "The protector",
          "weights": {
            "guardian": 3
          }
        },
        {
          "label": "The instigator",
          "weights": {
            "rebel": 3
          }
        }
      ]
    },
    {
      "id": "q4",
      "text": "Which environment makes you most alive?",
      "answers": [
        {
          "label": "A library or quiet study",
          "weights": {
            "sage": 3
          }
        },
        {
          "label": "A new city",
          "weights": {
            "explorer": 3
          }
        },
        {
          "label": "A studio or workshop",
          "weights": {
            "creator": 3
          }
        },
        {
          "label": "A community gathering",
          "weights": {
            "guardian": 3
          }
        },
        {
          "label": "An alternative scene",
          "weights": {
            "rebel": 3
          }
        }
      ]
    },
    {
      "id": "q5",
      "text": "What is your biggest strength?",
      "answers": [
        {
          "label": "Insight",
          "weights": {
            "sage": 3
          }
        },
        {
          "label": "Adaptability",
          "weights": {
            "explorer": 3
          }
        },
        {
          "label": "Imagination",
          "weights": {
            "creator": 3
          }
        },
        {
          "label": "Reliability",
          "weights": {
            "guardian": 3
          }
        },
        {
          "label": "Courage",
          "weights": {
            "rebel": 3
          }
        }
      ]
    },
    {
      "id": "q6",
      "text": "How do you handle conflict?",
      "answers": [
        {
          "label": "Present the facts",
          "weights": {
            "sage": 3
          }
        },
        {
          "label": "Step away for perspective",
          "weights": {
            "explorer": 3
          }
        },
        {
          "label": "Express through creativity",
          "weights": {
            "creator": 3
          }
        },
        {
          "label": "Mediate between sides",
          "weights": {
            "guardian": 3
          }
        },
        {
          "label": "Confront it directly",
          "weights": {
            "rebel": 3
          }
        }
      ]
    },
    {
      "id": "q7",
      "text": "A free month. What do you do?",
      "answers": [
        {
          "label": "Read and take courses",
          "weights": {
            "sage": 3
          }
        },
        {
          "label": "Backpack somewhere new",
          "weights": {
            "explorer": 3
          }
        },
        {
          "label": "Launch a creative project",
          "weights": {
            "creator": 3
          }
        },
        {
          "label": "Volunteer in my community",
          "weights": {
            "guardian": 3
          }
        },
        {
          "label": "Start a challenging podcast",
          "weights": {
            "rebel": 3
          }
        }
      ]
    },
    {
      "id": "q8",
      "text": "What do you value in a partner?",
      "answers": [
        {
          "label": "Intellectual depth",
          "weights": {
            "sage": 3
          }
        },
        {
          "label": "Shared adventure",
          "weights": {
            "explorer": 3
          }
        },
        {
          "label": "Creative chemistry",
          "weights": {
            "creator": 3
          }
        },
        {
          "label": "Loyalty",
          "weights": {
            "guardian": 3
          }
        },
        {
          "label": "Authenticity",
          "weights": {
            "rebel": 3
          }
        }
      ]
    },
    {
      "id": "q9",
      "text": "Your ideal weekend:",
      "answers": [
        {
          "label": "Coffee and a museum",
          "weights": {
            "sage": 3
          }
        },
        {
          "label": "Spontaneous road trip",
          "weights": {
            "explorer": 3
          }
        },
        {
          "label": "Making something all day",
          "weights": {
            "creator": 3
          }
        },
        {
          "label": "Dinner with close friends",
          "weights": {
            "guardian": 3
          }
        },
        {
          "label": "Underground live show",
          "weights": {
            "rebel": 3
          }
        }
      ]
    },
    {
      "id": "q10",
      "text": "What legacy do you want to leave?",
      "answers": [
        {
          "label": "Lasting knowledge",
          "weights": {
            "sage": 3
          }
        },
        {
          "label": "Stories of exploration",
          "weights": {
            "explorer": 3
          }
        },
        {
          "label": "Inspiring works",
          "weights": {
            "creator": 3
          }
        },
        {
          "label": "Stronger community",
          "weights": {
            "guardian": 3
          }
        },
        {
          "label": "A movement",
          "weights": {
            "rebel": 3
          }
        }
      ]
    }
  ],
  "relatedSlugs": [
    "career-archetype",
    "communication-style",
    "which-creature"
  ]
};
