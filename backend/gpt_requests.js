import OpenAI from "openai";
import { Climbs, training } from "./prompt.js";

const openai = new OpenAI();

export async function gpt(msg, type) {
  let t
  if (type == "Boulder"){
    t = training(Climbs.Boulder);
  }
  else if (type == "Sport"){
    t = training(Climbs.Sport);
  }
  else if (type == "Trad"){
    t = training(Climbs.Trad);
  }
  else if (type == "TopRope"){
    t = training(Climbs.TopRope);
  }
   
  console.log(type);
  let req = {
    "role": "user",
    "content": msg
  };
  t.push(req);

  const completion = await openai.chat.completions.create({
    messages: t,
    model: "gpt-4o-mini",
  });

  return completion.choices[0];
}


