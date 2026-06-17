export type Prompt = {
  id: string;
  user_id: string;

  prompt: string;
  result: string;

  likes: number;

  researches: string[];

  tools: string[];

  conversion_type: string;
  sphere_id: string;
};