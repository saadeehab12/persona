import type { QuizConfig } from "../types";

export const quiz: QuizConfig = {
  "slug": "which-creature",
  "title": "Which Creature Are You?",
  "metaDescription": "Are you a wise owl, a bold lion, or a clever fox? Discover your spirit creature.",
  "intro": {
    "headline": "Which Creature Are You?",
    "subheading": "Every personality has a creature counterpart. Find yours.",
    "cta": "Find My Creature"
  },
  "outcomes": [
    {
      "id": "owl",
      "name": "The Owl",
      "tagline": "Silent, watchful, wise.",
      "description": "You are the quiet observer who misses nothing. You value depth over breadth.\n\nLike an owl, you are most productive in stillness.",
      "theme": {
        "accent": "#7C3AED",
        "gradient": "linear-gradient(135deg, #7C3AED 0%, #C4B5FD 100%)",
        "icon": "🦉"
      }
    },
    {
      "id": "lion",
      "name": "The Lion",
      "tagline": "Born to lead.",
      "description": "You walk into a room and energy shifts. You are bold, decisive, and magnetic.\n\nLike a lion, you thrive in the heat of the moment.",
      "theme": {
        "accent": "#DC2626",
        "gradient": "linear-gradient(135deg, #DC2626 0%, #FCA5A5 100%)",
        "icon": "🦁"
      }
    },
    {
      "id": "dolphin",
      "name": "The Dolphin",
      "tagline": "Joyful and curious.",
      "description": "You bring warmth to every interaction. People are drawn to your playful energy.\n\nLike a dolphin, you make learning feel like play.",
      "theme": {
        "accent": "#0EA5E9",
        "gradient": "linear-gradient(135deg, #0EA5E9 0%, #7DD3FC 100%)",
        "icon": "🐬"
      }
    },
    {
      "id": "wolf",
      "name": "The Wolf",
      "tagline": "Loyal to the pack.",
      "description": "You are fiercely independent but deeply loyal. You move through life with quiet intensity.\n\nLike a wolf, you are most powerful with your pack.",
      "theme": {
        "accent": "#64748B",
        "gradient": "linear-gradient(135deg, #64748B 0%, #CBD5E1 100%)",
        "icon": "🐺"
      }
    },
    {
      "id": "fox",
      "name": "The Fox",
      "tagline": "Clever and adaptable.",
      "description": "You are quick-witted and impossible to outsmart. You always find a way.\n\nLike a fox, you thrive where others see obstacles.",
      "theme": {
        "accent": "#EA580C",
        "gradient": "linear-gradient(135deg, #EA580C 0%, #FDBA74 100%)",
        "icon": "🦊"
      }
    },
    {
      "id": "bear",
      "name": "The Bear",
      "tagline": "Gentle giant with depth.",
      "description": "Calm and warm on the surface. Beneath is a depth of strength.\n\nLike a bear, you know when to be still and when to move mountains.",
      "theme": {
        "accent": "#92400E",
        "gradient": "linear-gradient(135deg, #92400E 0%, #D97706 100%)",
        "icon": "🐻"
      }
    }
  ],
  "questions": [
    {
      "id": "q1",
      "text": "How do your friends describe you?",
      "answers": [
        {
          "label": "Thoughtful and observant",
          "weights": {
            "owl": 3
          }
        },
        {
          "label": "Confident and bold",
          "weights": {
            "lion": 3
          }
        },
        {
          "label": "Fun and easygoing",
          "weights": {
            "dolphin": 3
          }
        },
        {
          "label": "Loyal and intense",
          "weights": {
            "wolf": 3
          }
        },
        {
          "label": "Witty and charming",
          "weights": {
            "fox": 3
          }
        },
        {
          "label": "Calm and dependable",
          "weights": {
            "bear": 3
          }
        }
      ]
    },
    {
      "id": "q2",
      "text": "Your ideal Friday night?",
      "answers": [
        {
          "label": "Reading or learning",
          "weights": {
            "owl": 3
          }
        },
        {
          "label": "Hosting a party",
          "weights": {
            "lion": 3
          }
        },
        {
          "label": "Out with a big group",
          "weights": {
            "dolphin": 3
          }
        },
        {
          "label": "Small gathering with closest people",
          "weights": {
            "wolf": 3
          }
        },
        {
          "label": "Exploring a new place",
          "weights": {
            "fox": 3
          }
        },
        {
          "label": "Staying in",
          "weights": {
            "bear": 3
          }
        }
      ]
    },
    {
      "id": "q3",
      "text": "You find a mysterious map. What do you do?",
      "answers": [
        {
          "label": "Study it carefully first",
          "weights": {
            "owl": 3
          }
        },
        {
          "label": "Lead the expedition",
          "weights": {
            "lion": 3
          }
        },
        {
          "label": "Start the adventure",
          "weights": {
            "dolphin": 3
          }
        },
        {
          "label": "Go alone",
          "weights": {
            "wolf": 3
          }
        },
        {
          "label": "Find a shortcut",
          "weights": {
            "fox": 3
          }
        },
        {
          "label": "Pack supplies first",
          "weights": {
            "bear": 3
          }
        }
      ]
    },
    {
      "id": "q4",
      "text": "Your greatest fear?",
      "answers": [
        {
          "label": "Being misunderstood",
          "weights": {
            "owl": 3
          }
        },
        {
          "label": "Losing independence",
          "weights": {
            "lion": 3
          }
        },
        {
          "label": "Being cut off from loved ones",
          "weights": {
            "dolphin": 3
          }
        },
        {
          "label": "Betrayal",
          "weights": {
            "wolf": 3
          }
        },
        {
          "label": "Being trapped in boredom",
          "weights": {
            "fox": 3
          }
        },
        {
          "label": "Losing peace",
          "weights": {
            "bear": 3
          }
        }
      ]
    },
    {
      "id": "q5",
      "text": "Which power would you choose?",
      "answers": [
        {
          "label": "X-ray vision",
          "weights": {
            "owl": 3
          }
        },
        {
          "label": "Super strength",
          "weights": {
            "lion": 3
          }
        },
        {
          "label": "Telepathy",
          "weights": {
            "dolphin": 3
          }
        },
        {
          "label": "Invisibility",
          "weights": {
            "wolf": 3
          }
        },
        {
          "label": "Shapeshifting",
          "weights": {
            "fox": 3
          }
        },
        {
          "label": "Healing",
          "weights": {
            "bear": 3
          }
        }
      ]
    },
    {
      "id": "q6",
      "text": "Which element resonates with you?",
      "answers": [
        {
          "label": "Air",
          "weights": {
            "owl": 3
          }
        },
        {
          "label": "Fire",
          "weights": {
            "lion": 3
          }
        },
        {
          "label": "Water",
          "weights": {
            "dolphin": 3
          }
        },
        {
          "label": "Earth",
          "weights": {
            "wolf": 3
          }
        },
        {
          "label": "Wind",
          "weights": {
            "fox": 3
          }
        },
        {
          "label": "Stone",
          "weights": {
            "bear": 3
          }
        }
      ]
    },
    {
      "id": "q7",
      "text": "Your leadership style?",
      "answers": [
        {
          "label": "By expertise",
          "weights": {
            "owl": 3
          }
        },
        {
          "label": "By charisma",
          "weights": {
            "lion": 3
          }
        },
        {
          "label": "By bringing people together",
          "weights": {
            "dolphin": 3
          }
        },
        {
          "label": "By protecting the team",
          "weights": {
            "wolf": 3
          }
        },
        {
          "label": "By outmaneuvering",
          "weights": {
            "fox": 3
          }
        },
        {
          "label": "By example",
          "weights": {
            "bear": 3
          }
        }
      ]
    },
    {
      "id": "q8",
      "text": "Pick a season:",
      "answers": [
        {
          "label": "Winter",
          "weights": {
            "owl": 3
          }
        },
        {
          "label": "Summer",
          "weights": {
            "lion": 3
          }
        },
        {
          "label": "Spring",
          "weights": {
            "dolphin": 3
          }
        },
        {
          "label": "Autumn",
          "weights": {
            "wolf": 3
          }
        },
        {
          "label": "Any - I adapt",
          "weights": {
            "fox": 3
          }
        },
        {
          "label": "Late autumn",
          "weights": {
            "bear": 3
          }
        }
      ]
    },
    {
      "id": "q9",
      "text": "What movies do you like?",
      "answers": [
        {
          "label": "Mystery thriller",
          "weights": {
            "owl": 3
          }
        },
        {
          "label": "Action epic",
          "weights": {
            "lion": 3
          }
        },
        {
          "label": "Feel-good comedy",
          "weights": {
            "dolphin": 3
          }
        },
        {
          "label": "Gritty drama",
          "weights": {
            "wolf": 3
          }
        },
        {
          "label": "Heist story",
          "weights": {
            "fox": 3
          }
        },
        {
          "label": "Heartwarming indie",
          "weights": {
            "bear": 3
          }
        }
      ]
    },
    {
      "id": "q10",
      "text": "What word resonates most?",
      "answers": [
        {
          "label": "Wisdom",
          "weights": {
            "owl": 3
          }
        },
        {
          "label": "Courage",
          "weights": {
            "lion": 3
          }
        },
        {
          "label": "Joy",
          "weights": {
            "dolphin": 3
          }
        },
        {
          "label": "Loyalty",
          "weights": {
            "wolf": 3
          }
        },
        {
          "label": "Cleverness",
          "weights": {
            "fox": 3
          }
        },
        {
          "label": "Peace",
          "weights": {
            "bear": 3
          }
        }
      ]
    }
  ],
  "relatedSlugs": [
    "personality-archetype",
    "career-archetype",
    "creative-dna"
  ]
};
