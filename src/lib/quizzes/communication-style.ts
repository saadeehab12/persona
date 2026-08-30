import type { QuizConfig } from "../types";

export const quiz: QuizConfig = {
  "slug": "communication-style",
  "title": "What is Your Communication Style?",
  "metaDescription": "Are you a Direct Communicator, Empathetic Listener, or Strategic Persuader? Find your style.",
  "intro": {
    "headline": "What is Your Communication Style?",
    "subheading": "How you communicate shapes your relationships and influence.",
    "cta": "Find My Style"
  },
  "outcomes": [
    {
      "id": "direct",
      "name": "The Direct Communicator",
      "tagline": "Say what you mean.",
      "description": "You value clarity above all. You strip away fluff and get to the point.\n\nYour strength is speed and decisiveness.",
      "theme": {
        "accent": "#2563EB",
        "gradient": "linear-gradient(135deg, #2563EB 0%, #93C5FD 100%)",
        "icon": "💡"
      }
    },
    {
      "id": "empathetic",
      "name": "The Empathetic Listener",
      "tagline": "You hear what is not being said.",
      "description": "You read between the lines. People feel deeply understood around you.\n\nYour strength is connection and trust.",
      "theme": {
        "accent": "#D946EF",
        "gradient": "linear-gradient(135deg, #D946EF 0%, #F0ABFC 100%)",
        "icon": "👂"
      }
    },
    {
      "id": "persuader",
      "name": "The Strategic Persuader",
      "tagline": "You know how to move people.",
      "description": "You are a natural influence artist. You frame messages to resonate.\n\nYour strength is influence and negotiation.",
      "theme": {
        "accent": "#059669",
        "gradient": "linear-gradient(135deg, #059669 0%, #6EE7B7 100%)",
        "icon": "🎯"
      }
    },
    {
      "id": "storyteller",
      "name": "The Storyteller",
      "tagline": "Every point is a story.",
      "description": "You communicate through narrative and vivid imagery.\n\nYour strength is engagement and memorability.",
      "theme": {
        "accent": "#DC2626",
        "gradient": "linear-gradient(135deg, #DC2626 0%, #FCA5A5 100%)",
        "icon": "📖"
      }
    }
  ],
  "questions": [
    {
      "id": "q1",
      "text": "A friend is upset. What do you do first?",
      "answers": [
        {
          "label": "Ask directly what is wrong",
          "weights": {
            "direct": 3
          }
        },
        {
          "label": "Listen without judgment",
          "weights": {
            "empathetic": 3
          }
        },
        {
          "label": "Gauge and choose approach",
          "weights": {
            "persuader": 3
          }
        },
        {
          "label": "Share a similar experience",
          "weights": {
            "storyteller": 3
          }
        }
      ]
    },
    {
      "id": "q2",
      "text": "In a meeting you typically...",
      "answers": [
        {
          "label": "Speak up with a clear point",
          "weights": {
            "direct": 3
          }
        },
        {
          "label": "Draw in the quiet people",
          "weights": {
            "empathetic": 3
          }
        },
        {
          "label": "Frame ideas for buy-in",
          "weights": {
            "persuader": 3
          }
        },
        {
          "label": "Use an analogy or story",
          "weights": {
            "storyteller": 3
          }
        }
      ]
    },
    {
      "id": "q3",
      "text": "What do people compliment you on?",
      "answers": [
        {
          "label": "Honesty and clarity",
          "weights": {
            "direct": 3
          }
        },
        {
          "label": "Listening and understanding",
          "weights": {
            "empathetic": 3
          }
        },
        {
          "label": "Convincing and inspiring",
          "weights": {
            "persuader": 3
          }
        },
        {
          "label": "Making things interesting",
          "weights": {
            "storyteller": 3
          }
        }
      ]
    },
    {
      "id": "q4",
      "text": "You disagree with your boss. What do you do?",
      "answers": [
        {
          "label": "Tell them directly",
          "weights": {
            "direct": 3
          }
        },
        {
          "label": "Find a private moment",
          "weights": {
            "empathetic": 3
          }
        },
        {
          "label": "Frame it as a recommendation",
          "weights": {
            "persuader": 3
          }
        },
        {
          "label": "Use an example to illustrate",
          "weights": {
            "storyteller": 3
          }
        }
      ]
    },
    {
      "id": "q5",
      "text": "Your texting style is most like...",
      "answers": [
        {
          "label": "Short and to the point",
          "weights": {
            "direct": 3
          }
        },
        {
          "label": "Warm with emoji",
          "weights": {
            "empathetic": 3
          }
        },
        {
          "label": "Calculated and purposeful",
          "weights": {
            "persuader": 3
          }
        },
        {
          "label": "Long narrative messages",
          "weights": {
            "storyteller": 3
          }
        }
      ]
    },
    {
      "id": "q6",
      "text": "When giving feedback you...",
      "answers": [
        {
          "label": "Are straightforward",
          "weights": {
            "direct": 3
          }
        },
        {
          "label": "Start with positives",
          "weights": {
            "empathetic": 3
          }
        },
        {
          "label": "Frame it around goals",
          "weights": {
            "persuader": 3
          }
        },
        {
          "label": "Use an example",
          "weights": {
            "storyteller": 3
          }
        }
      ]
    },
    {
      "id": "q7",
      "text": "What frustrates you in conversations?",
      "answers": [
        {
          "label": "Beating around the bush",
          "weights": {
            "direct": 3
          }
        },
        {
          "label": "People being dismissed",
          "weights": {
            "empathetic": 3
          }
        },
        {
          "label": "Missed consensus",
          "weights": {
            "persuader": 3
          }
        },
        {
          "label": "Boring delivery",
          "weights": {
            "storyteller": 3
          }
        }
      ]
    },
    {
      "id": "q8",
      "text": "What do you want people to remember?",
      "answers": [
        {
          "label": "I was clear and honest",
          "weights": {
            "direct": 3
          }
        },
        {
          "label": "I truly listened",
          "weights": {
            "empathetic": 3
          }
        },
        {
          "label": "I inspired them",
          "weights": {
            "persuader": 3
          }
        },
        {
          "label": "I made them think and feel",
          "weights": {
            "storyteller": 3
          }
        }
      ]
    }
  ],
  "relatedSlugs": [
    "career-archetype",
    "personality-archetype",
    "leadership-style"
  ]
};
