import OpenAI from "openai";
import { Climbs, training } from "./prompt.js";

const openai = new OpenAI();

export async function gpt(msg, type) {
  let t
  if (type == "Boulder"){
    t = training(Climbs.Boulder);
  }
  if (type == "Sport"){
    t = training(Climbs.Sport);
  }
  if (type == "Trad"){
    t = training(Climbs.Trad);
  }
   
  console.log(type);
  let req = {
    "role": "user",
    "content": msg
  };
  t.push(req);

  const completion = await openai.chat.completions.create({
    messages: t,
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0];
}


