
import React from 'react';
import { AssessmentArea, SuccessProfile } from './types';

export const ASSESSMENT_AREAS: AssessmentArea[] = [
  {
    area: "Career Personality",
    analysis: "Self-Understanding: We assess your most dominant preferences—from how you focus your energy to how you make decisions based on logic.",
    benefit: "Aligns You: Expand your career options in alignment with your unique personality for a more rewarding career choice."
  },
  {
    area: "Career Interest Types",
    analysis: "Occupational Interest: We identify your top interest patterns (e.g., detail-oriented work with data, or analytical problem-solving).",
    benefit: "Finds Your Fit: Identifies a clear career focus directly linked to occupations you'll enjoy."
  },
  {
    area: "Career Motivator Types",
    analysis: "Core Values: We find what you value most in a career, like working independently or enjoying work routine.",
    benefit: "Ensures Fulfillment: A career in line with your core beliefs is more likely to be a lasting and positive choice."
  },
  {
    area: "Skills & Abilities",
    analysis: "Talent Mapping: We score your strengths (e.g., Excellent Verbal Ability and Good Logical Ability) and areas needing development (like Mechanical or Social Skills).",
    benefit: "Strategic Development: Helps you identify different ways to reshape your career direction and focus on skills that give you a career advantage."
  },
  {
    area: "Learning Style",
    analysis: "Optimal Learning: For instance, the report shows a high preference for Auditory Learning (50%).",
    benefit: "Boosts Academics: Provides concrete strategies to maximize your study efficiency and exam scores."
  }
];

export const SUCCESS_PROFILES: SuccessProfile[] = [
  {
    name: "Arushi Ahuja",
    category: "Class 6-7",
    description: "Next Genius Scholar & Top 25 finalist in Viksit Bharat Challenge. Presented Quantum Computing research at CodeVerse.",
    image: "https://picsum.photos/seed/arushi/200/200"
  },
  {
    name: "Himani Gurwani",
    category: "Class 8-10",
    description: "National-Level Olympiad winner and 92% scorer in Grade 10 Boards. Passionate about technology-driven ventures.",
    image: "https://picsum.photos/seed/himani/200/200"
  },
  {
    name: "Ishanti Rajput",
    category: "Class 11 & 12",
    description: "Built AI Voice Agents and a 10,000+ sample prescription-transcription model for Bajaj Insurance.",
    image: "https://picsum.photos/seed/ishanti/200/200"
  },
  {
    name: "Hiteshree Sharma",
    category: "Graduate",
    description: "90th percentile in CUET, won school excellence awards 7 years in a row. Professional Kathak dancer.",
    image: "https://picsum.photos/seed/hiteshree/200/200"
  }
];

export const STUDY_ABROAD_COUNTRIES = ["UK", "USA", "CANADA", "GERMANY", "FRANCE", "AUSTRALIA", "IRELAND", "SPAIN", "NEW ZEALAND", "SWITZERLAND"];

export const SCIENTIFIC_DOMAINS = [
  "Business & Economics", "Health & Medical Sciences", "Engineering & Technology", "Education",
  "Social Sciences & Humanities", "Physical & Life Sciences", "Interdisciplinary & Emerging Fields",
  "Mathematics & Data Science", "Arts, Culture & Communication", "Agriculture & Food Sciences",
  "Sports & Physical Education"
];
