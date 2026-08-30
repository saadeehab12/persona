import type { QuizConfig } from "../types";

export const quiz: QuizConfig = {
  "slug": "creative-dna",
  "title": "What is Your Creative DNA?",
  "metaDescription": "Are you an Innovator, Artist, Strategist, or Connector?",
  "intro": {
    "headline": "What is Your Creative DNA?",
    "subheading": "Everyone is creative, but not everyone creates the same way.",
    "cta": "Unlock My Creative DNA"
  },
  "outcomes": [
    {
      "id": "innovator",
      "name": "The Innovator",
      "tagline": "You start trends.",
      "description": "You combine unlikely ideas into something new.\n\nYou thrive in startups, R&D, and product design.",
      "theme": {
        "accent": "#8B5CF6",
        "gradient": "linear-gradient(135deg, #8B5CF6 0%, #C4B5FD 100%)",
        "icon": "💡"
      }
    },
    {
      "id": "artist",
      "name": "The Artist",
      "tagline": "You turn feeling into form.",
      "description": "Your creativity is deeply personal.\n\nYou thrive in galleries, studios, and agencies.",
      "theme": {
        "accent": "#F43F5E",
        "gradient": "linear-gradient(135deg, #F43F5E 0%, #FDA4AF 100%)",
        "icon": "🎨"
      }
    },
    {
      "id": "strategist",
      "name": "The Strategist",
      "tagline": "You create with purpose.",
      "description": "Your creativity is methodical and results-oriented.\n\nYou thrive in boardrooms, agencies, and consulting.",
      "theme": {
        "accent": "#0D9488",
        "gradient": "linear-gradient(135deg, #0D9488 0%, #5EEAD4 100%)",
        "icon": "📊"
      }
    },
    {
      "id": "connector",
      "name": "The Connector",
      "tagline": "You create through people.",
      "description": "Your creativity emerges in collaboration.\n\nYou thrive in co-working spaces, nonprofits, and teams.",
      "theme": {
        "accent": "#F59E0B",
        "gradient": "linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)",
        "icon": "🤝"
      }
    }
  ],
  "questions": [
    {
      "id": "q1",
      "text": "Where do your best ideas come from?",
      "answers": [
        {
          "label": "Combining unrelated concepts",
          "weights": {
            "innovator": 3
          }
        },
        {
          "label": "Deep personal experience",
          "weights": {
            "artist": 3
          }
        },
        {
          "label": "Analyzing problems",
          "weights": {
            "strategist": 3
          }
        },
        {
          "label": "Conversations with others",
          "weights": {
            "connector": 3
          }
        }
      ]
    },
    {
      "id": "q2",
      "text": "Your ideal creative project?",
      "answers": [
        {
          "label": "Something never done before",
          "weights": {
            "innovator": 3
          }
        },
        {
          "label": "Art that moves people",
          "weights": {
            "artist": 3
          }
        },
        {
          "label": "A plan that solves a problem",
          "weights": {
            "strategist": 3
          }
        },
        {
          "label": "A collaboration",
          "weights": {
            "connector": 3
          }
        }
      ]
    },
    {
      "id": "q3",
      "text": "Where do you find inspiration?",
      "answers": [
        {
          "label": "Tech blogs and science",
          "weights": {
            "innovator": 3
          }
        },
        {
          "label": "Art museums and music",
          "weights": {
            "artist": 3
          }
        },
        {
          "label": "Business case studies",
          "weights": {
            "strategist": 3
          }
        },
        {
          "label": "Conferences and meetups",
          "weights": {
            "connector": 3
          }
        }
      ]
    },
    {
      "id": "q4",
      "text": "Creative block? What do you do?",
      "answers": [
        {
          "label": "Tinker with something different",
          "weights": {
            "innovator": 3
          }
        },
        {
          "label": "Feel it out",
          "weights": {
            "artist": 3
          }
        },
        {
          "label": "Break the problem down",
          "weights": {
            "strategist": 3
          }
        },
        {
          "label": "Talk it through",
          "weights": {
            "connector": 3
          }
        }
      ]
    },
    {
      "id": "q5",
      "text": "What makes you proud of your work?",
      "answers": [
        {
          "label": "It is genuinely new",
          "weights": {
            "innovator": 3
          }
        },
        {
          "label": "It is beautiful",
          "weights": {
            "artist": 3
          }
        },
        {
          "label": "It delivered results",
          "weights": {
            "strategist": 3
          }
        },
        {
          "label": "It brought people together",
          "weights": {
            "connector": 3
          }
        }
      ]
    },
    {
      "id": "q6",
      "text": "Pick a creative tool:",
      "answers": [
        {
          "label": "Code editor",
          "weights": {
            "innovator": 3
          }
        },
        {
          "label": "Sketchbook",
          "weights": {
            "artist": 3
          }
        },
        {
          "label": "Spreadsheet",
          "weights": {
            "strategist": 3
          }
        },
        {
          "label": "Messaging app",
          "weights": {
            "connector": 3
          }
        }
      ]
    },
    {
      "id": "q7",
      "text": "Your role in a creative team?",
      "answers": [
        {
          "label": "Wild idea pitcher",
          "weights": {
            "innovator": 3
          }
        },
        {
          "label": "Aesthetic setter",
          "weights": {
            "artist": 3
          }
        },
        {
          "label": "On-track enforcer",
          "weights": {
            "strategist": 3
          }
        },
        {
          "label": "Coordinator",
          "weights": {
            "connector": 3
          }
        }
      ]
    },
    {
      "id": "q8",
      "text": "What does creativity mean to you?",
      "answers": [
        {
          "label": "Invention",
          "weights": {
            "innovator": 3
          }
        },
        {
          "label": "Expression",
          "weights": {
            "artist": 3
          }
        },
        {
          "label": "Problem-solving",
          "weights": {
            "strategist": 3
          }
        },
        {
          "label": "Collaboration",
          "weights": {
            "connector": 3
          }
        }
      ]
    }
  ],
  "relatedSlugs": [
    "career-archetype",
    "personality-archetype",
    "which-creature"
  ]
};
