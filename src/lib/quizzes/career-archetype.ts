import type { QuizConfig } from "../types";

export const quiz: QuizConfig = {
  "slug": "career-archetype",
  "title": "What's Your Career Archetype?",
  "metaDescription": "Discover your career archetype. Are you a Builder, Visionary, Healer, or Performer? Take this free personality quiz.",
  "intro": {
    "headline": "What's Your Career Archetype?",
    "subheading": "Your work personality says a lot about where you thrive. Answer 10 quick questions.",
    "cta": "Find My Archetype"
  },
  "outcomes": [
    {
      "id": "builder",
      "name": "The Builder",
      "tagline": "You construct the future, one system at a time.",
      "description": "You are a natural systems thinker who finds deep satisfaction in creating things that last. You thrive when given autonomy and a clear problem to solve.\n\nCareers that suit The Builder include engineering, product management, architecture, and entrepreneurship.",
      "theme": {
        "accent": "#E85D3A",
        "gradient": "linear-gradient(135deg, #E85D3A 0%, #F4A261 100%)",
        "icon": "🔧"
      }
    },
    {
      "id": "visionary",
      "name": "The Visionary",
      "tagline": "You see what others cannot yet.",
      "description": "You are a big-picture thinker who is constantly scanning the horizon for what is next. You come alive in brainstorming sessions and strategy meetings.\n\nCareers that suit The Visionary include strategy consulting, venture capital, and creative direction.",
      "theme": {
        "accent": "#6C63FF",
        "gradient": "linear-gradient(135deg, #6C63FF 0%, #A78BFA 100%)",
        "icon": "🔮"
      }
    },
    {
      "id": "healer",
      "name": "The Healer",
      "tagline": "You make the world work better for people.",
      "description": "Your greatest strength is empathy. You naturally understand what people need and you are drawn to work that helps others grow.\n\nCareers that suit The Healer include counseling, education, healthcare, HR, and social impact.",
      "theme": {
        "accent": "#2EC4B6",
        "gradient": "linear-gradient(135deg, #2EC4B6 0%, #69D2C5 100%)",
        "icon": "💚"
      }
    },
    {
      "id": "performer",
      "name": "The Performer",
      "tagline": "You light up the room.",
      "description": "You are energized by people and the thrill of live moments. You have a natural magnetism that draws people in.\n\nCareers that suit The Performer include sales, marketing, public relations, and media.",
      "theme": {
        "accent": "#FF6B6B",
        "gradient": "linear-gradient(135deg, #FF6B6B 0%, #FFB4A2 100%)",
        "icon": "🎭"
      }
    },
    {
      "id": "scholar",
      "name": "The Scholar",
      "tagline": "You turn knowledge into clarity.",
      "description": "You are a deep thinker who loves understanding how things work. Research and mastery give you a sense of purpose.\n\nCareers that suit The Scholar include data science, research, writing, consulting, and academia.",
      "theme": {
        "accent": "#4A90D9",
        "gradient": "linear-gradient(135deg, #4A90D9 0%, #7EB8E8 100%)",
        "icon": "📚"
      }
    }
  ],
  "questions": [
    {
      "id": "q1",
      "text": "It is Saturday morning. What do you gravitate toward?",
      "answers": [
        {
          "label": "Working on a personal project",
          "weights": {
            "builder": 3,
            "visionary": 1
          }
        },
        {
          "label": "Reading about a new trend",
          "weights": {
            "visionary": 3,
            "scholar": 2
          }
        },
        {
          "label": "Calling a friend to hang out",
          "weights": {
            "healer": 3,
            "performer": 1
          }
        },
        {
          "label": "Going somewhere with people",
          "weights": {
            "performer": 3
          }
        },
        {
          "label": "Diving into a book or course",
          "weights": {
            "scholar": 3,
            "builder": 1
          }
        }
      ]
    },
    {
      "id": "q2",
      "text": "In a group project, which role do you take?",
      "answers": [
        {
          "label": "Building the prototype",
          "weights": {
            "builder": 3
          }
        },
        {
          "label": "Pitching the big idea",
          "weights": {
            "visionary": 3
          }
        },
        {
          "label": "Checking in on everyone",
          "weights": {
            "healer": 3
          }
        },
        {
          "label": "Presenting the final result",
          "weights": {
            "performer": 3
          }
        },
        {
          "label": "Researching and fact-checking",
          "weights": {
            "scholar": 3
          }
        }
      ]
    },
    {
      "id": "q3",
      "text": "Which compliment means most to you?",
      "answers": [
        {
          "label": "You built something amazing.",
          "weights": {
            "builder": 3
          }
        },
        {
          "label": "You saw what no one else could.",
          "weights": {
            "visionary": 3
          }
        },
        {
          "label": "You really understood me.",
          "weights": {
            "healer": 3
          }
        },
        {
          "label": "You were incredible up there.",
          "weights": {
            "performer": 3
          }
        },
        {
          "label": "You know more about this than anyone.",
          "weights": {
            "scholar": 3
          }
        }
      ]
    },
    {
      "id": "q4",
      "text": "What is your biggest workplace frustration?",
      "answers": [
        {
          "label": "Meetings instead of building",
          "weights": {
            "builder": 3
          }
        },
        {
          "label": "Being told that is not how we do things",
          "weights": {
            "visionary": 3
          }
        },
        {
          "label": "Colleagues burning out",
          "weights": {
            "healer": 3
          }
        },
        {
          "label": "Working behind the scenes without recognition",
          "weights": {
            "performer": 3
          }
        },
        {
          "label": "Decisions made without data",
          "weights": {
            "scholar": 3
          }
        }
      ]
    },
    {
      "id": "q5",
      "text": "Pick a superpower:",
      "answers": [
        {
          "label": "Super speed",
          "weights": {
            "builder": 3
          }
        },
        {
          "label": "Precognition",
          "weights": {
            "visionary": 3
          }
        },
        {
          "label": "Healing touch",
          "weights": {
            "healer": 3
          }
        },
        {
          "label": "Mind control",
          "weights": {
            "performer": 3
          }
        },
        {
          "label": "Total recall",
          "weights": {
            "scholar": 3
          }
        }
      ]
    },
    {
      "id": "q6",
      "text": "How do you prefer to receive feedback?",
      "answers": [
        {
          "label": "Show me the bug report",
          "weights": {
            "builder": 3
          }
        },
        {
          "label": "Tell me the vision",
          "weights": {
            "visionary": 3
          }
        },
        {
          "label": "Be honest but kind",
          "weights": {
            "healer": 3
          }
        },
        {
          "label": "Give me the stage",
          "weights": {
            "performer": 3
          }
        },
        {
          "label": "Back it up with data",
          "weights": {
            "scholar": 3
          }
        }
      ]
    },
    {
      "id": "q7",
      "text": "Your ideal manager would be someone who...",
      "answers": [
        {
          "label": "Gives me a problem and gets out of the way",
          "weights": {
            "builder": 3
          }
        },
        {
          "label": "Shares a bold vision",
          "weights": {
            "visionary": 3
          }
        },
        {
          "label": "Genuinely cares about my growth",
          "weights": {
            "healer": 3
          }
        },
        {
          "label": "Puts me in front of audiences",
          "weights": {
            "performer": 3
          }
        },
        {
          "label": "Respects deep expertise",
          "weights": {
            "scholar": 3
          }
        }
      ]
    },
    {
      "id": "q8",
      "text": "What energizes you after work?",
      "answers": [
        {
          "label": "Tinkering with a project",
          "weights": {
            "builder": 3
          }
        },
        {
          "label": "Journaling ideas for the future",
          "weights": {
            "visionary": 3
          }
        },
        {
          "label": "Talking with someone I care about",
          "weights": {
            "healer": 3
          }
        },
        {
          "label": "Going out and being around energy",
          "weights": {
            "performer": 3
          }
        },
        {
          "label": "Taking an online course",
          "weights": {
            "scholar": 3
          }
        }
      ]
    },
    {
      "id": "q9",
      "text": "If you wrote a book, what genre?",
      "answers": [
        {
          "label": "A how-to guide",
          "weights": {
            "builder": 3
          }
        },
        {
          "label": "A manifesto for a better future",
          "weights": {
            "visionary": 3
          }
        },
        {
          "label": "A memoir about human connection",
          "weights": {
            "healer": 3
          }
        },
        {
          "label": "A thriller",
          "weights": {
            "performer": 3
          }
        },
        {
          "label": "A deep-dive into a subject",
          "weights": {
            "scholar": 3
          }
        }
      ]
    },
    {
      "id": "q10",
      "text": "What legacy do you want to leave?",
      "answers": [
        {
          "label": "Something I built that stands",
          "weights": {
            "builder": 3
          }
        },
        {
          "label": "An idea that changed thinking",
          "weights": {
            "visionary": 3
          }
        },
        {
          "label": "The lives I touched",
          "weights": {
            "healer": 3
          }
        },
        {
          "label": "Moments where I inspired action",
          "weights": {
            "performer": 3
          }
        },
        {
          "label": "Knowledge I uncovered",
          "weights": {
            "scholar": 3
          }
        }
      ]
    }
  ],
  "relatedSlugs": [
    "personality-archetype",
    "leadership-style",
    "creative-dna"
  ]
};
