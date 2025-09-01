import { createIdGenerator } from "ai";

const VISITOR_ID_KEY = "desker-visitor-ai";
const generateVisitorId = createIdGenerator({ prefix: "visitor" });

export const getOrSetVisitorId = () => {
  const existingId = localStorage.getItem(VISITOR_ID_KEY);

  if (existingId) {
    return existingId;
  }

  const newVisitorId = generateVisitorId();
  localStorage.setItem(VISITOR_ID_KEY, newVisitorId);

  return newVisitorId;
};
