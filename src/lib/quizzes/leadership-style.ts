import type { QuizConfig } from "../types";

export const quiz: QuizConfig = {
  "slug": "leadership-style",
  "title": "What is Your Leadership Style?",
  "metaDescription": "Are you a Visionary, Coach, Commander, or Servant Leader?",
  "intro": {
    "headline": "What is Your Leadership Style?",
    "subheading": "Every leader has a natural style. Find yours.",
    "cta": "Discover My Style"
  },
  "outcomes": [
    {
      "id": "visionary",
      "name": "The Visionary",
      "tagline": "You lead with a picture of the future.",
      "description": "You inspire through possibility. People follow your vision.\n\nYou thrive in times of change.",
      "theme": {
        "accent": "#7C3AED",
        "gradient": "linear-gradient(135deg, #7C3AED 0%, #C4B5FD 100%)",
        "icon": "🌟"
      }
    },
    {
      "id": "coach",
      "name": "The Coach",
      "tagline": "You develop people.",
      "description": "Your leadership is rooted in growth.\n\nYou build loyal, high-performing teams.",
      "theme": {
        "accent": "#2563EB",
        "gradient": "linear-gradient(135deg, #2563EB 0%, #93C5FD 100%)",
        "icon": "🏃"
      }
    },
    {
      "id": "commander",
      "name": "The Commander",
      "tagline": "You decide fast.",
      "description": "You are decisive and action-oriented.\n\nYou thrive under high pressure.",
      "theme": {
        "accent": "#DC2626",
        "gradient": "linear-gradient(135deg, #DC2626 0%, #FCA5A5 100%)",
        "icon": "⚔️"
      }
    },
    {
      "id": "servant",
      "name": "The Servant Leader",
      "tagline": "You put others first.",
      "description": "You empower your team and build deep trust.\n\nYou create psychological safety.",
      "theme": {
        "accent": "#059669",
        "gradient": "linear-gradient(135deg, #059669 0%, #6EE7B7 100%)",
        "icon": "🤝"
      }
    },
    {
      "id": "democratic",
      "name": "The Democratic Leader",
      "tagline": "The best ideas win.",
      "description": "You lead through inclusion.\n\nYou build teams where everyone feels heard.",
      "theme": {
        "accent": "#D97706",
        "gradient": "linear-gradient(135deg, #D97706 0%, #FCD34D 100%)",
        "icon": "🗳️"
      }
    }
  ],
  "questions": [
    {
      "id": "q1",
      "text": "Team facing a challenge. What do you do first?",
      "answers": [
        {
          "label": "Paint a vision of success",
          "weights": {
            "visionary": 3
          }
        },
        {
          "label": "Check in with each member",
          "weights": {
            "coach": 3
          }
        },
        {
          "label": "Make a decisive call",
          "weights": {
            "commander": 3
          }
        },
        {
          "label": "Ask the team for input",
          "weights": {
            "servant": 3
          }
        },
        {
          "label": "Facilitate group discussion",
          "weights": {
            "democratic": 3
          }
        }
      ]
    },
    {
      "id": "q2",
      "text": "Your superpower as a leader?",
      "answers": [
        {
          "label": "Seeing opportunities early",
          "weights": {
            "visionary": 3
          }
        },
        {
          "label": "Developing people",
          "weights": {
            "coach": 3
          }
        },
        {
          "label": "Making tough calls fast",
          "weights": {
            "commander": 3
          }
        },
        {
          "label": "Making people feel safe",
          "weights": {
            "servant": 3
          }
        },
        {
          "label": "Building consensus",
          "weights": {
            "democratic": 3
          }
        }
      ]
    },
    {
      "id": "q3",
      "text": "How do you handle underperformance?",
      "answers": [
        {
          "label": "Reconnect to the vision",
          "weights": {
            "visionary": 3
          }
        },
        {
          "label": "Coaching conversation",
          "weights": {
            "coach": 3
          }
        },
        {
          "label": "Set clear expectations",
          "weights": {
            "commander": 3
          }
        },
        {
          "label": "Ask what they need",
          "weights": {
            "servant": 3
          }
        },
        {
          "label": "Involve the team",
          "weights": {
            "democratic": 3
          }
        }
      ]
    },
    {
      "id": "q4",
      "text": "What meetings do you run?",
      "answers": [
        {
          "label": "Vision-casting",
          "weights": {
            "visionary": 3
          }
        },
        {
          "label": "One-on-one development",
          "weights": {
            "coach": 3
          }
        },
        {
          "label": "Short stand-ups",
          "weights": {
            "commander": 3
          }
        },
        {
          "label": "Wellbeing check-ins",
          "weights": {
            "servant": 3
          }
        },
        {
          "label": "Open forums",
          "weights": {
            "democratic": 3
          }
        }
      ]
    },
    {
      "id": "q5",
      "text": "Your team describes you as...",
      "answers": [
        {
          "label": "Inspiring",
          "weights": {
            "visionary": 3
          }
        },
        {
          "label": "Supportive",
          "weights": {
            "coach": 3
          }
        },
        {
          "label": "Decisive",
          "weights": {
            "commander": 3
          }
        },
        {
          "label": "Humble",
          "weights": {
            "servant": 3
          }
        },
        {
          "label": "Collaborative",
          "weights": {
            "democratic": 3
          }
        }
      ]
    },
    {
      "id": "q6",
      "text": "A new project. You...",
      "answers": [
        {
          "label": "Share the big dream",
          "weights": {
            "visionary": 3
          }
        },
        {
          "label": "Understand each person",
          "weights": {
            "coach": 3
          }
        },
        {
          "label": "Define goals",
          "weights": {
            "commander": 3
          }
        },
        {
          "label": "Ask for their approach",
          "weights": {
            "servant": 3
          }
        },
        {
          "label": "Create a collaborative plan",
          "weights": {
            "democratic": 3
          }
        }
      ]
    },
    {
      "id": "q7",
      "text": "What motivates you most?",
      "answers": [
        {
          "label": "Building something game-changing",
          "weights": {
            "visionary": 3
          }
        },
        {
          "label": "Watching people grow",
          "weights": {
            "coach": 3
          }
        },
        {
          "label": "Achieving ambitious goals",
          "weights": {
            "commander": 3
          }
        },
        {
          "label": "Serving the team",
          "weights": {
            "servant": 3
          }
        },
        {
          "label": "Creating inclusive culture",
          "weights": {
            "democratic": 3
          }
        }
      ]
    },
    {
      "id": "q8",
      "text": "Pick a leadership model:",
      "answers": [
        {
          "label": "Bold vision and execution",
          "weights": {
            "visionary": 3
          }
        },
        {
          "label": "Vulnerability as strength",
          "weights": {
            "coach": 3
          }
        },
        {
          "label": "Uncompromising standards",
          "weights": {
            "commander": 3
          }
        },
        {
          "label": "Leading by example",
          "weights": {
            "servant": 3
          }
        },
        {
          "label": "Empathetic and inclusive",
          "weights": {
            "democratic": 3
          }
        }
      ]
    }
  ],
  "relatedSlugs": [
    "career-archetype",
    "communication-style",
    "personality-archetype"
  ]
};
