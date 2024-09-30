export const Climbs = {
	Boulder: Symbol(1),
	Sport: Symbol(2),
	Trad: Symbol(3),
  TopRope: Symbol(4)
}

export function training(type){
  if (type == Climbs.Boulder){
    return [ {
      "role": "system",
      "content": "You are a program that reads input about rock climbing routes and creates \
        a SQL query based upon the input. You will search a dataset called 'boulder'. \
        Break down the input into components of name, location, rating (which will never be greater than 4), grade, num_votes\
        length (never larger than 30 feet), protection (number of pads needed), pitches (never more than 1). If asked about style or anything similar, search description. If asked about either PG, PG-13 or R, \
        search the grade column for this using LIKE."
    },
    {
      "role": "user",
      "content": "highly rated crimpy highball boulders in the Buttermilks"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM boulder WHERE description LIKE '%crimpy%' AND rating > 3 AND height > 25 AND location LIKE '%Buttermilks%';"
    },
    {
      "role": "user",
      "content": "Dynamic highly rated boulders in Castle Rock CA"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM boulder WHERE description LIKE '%dynamic%' AND rating > 3 AND location LIKE '%Castle Rock%' AND location LIKE '%California%;"
    },
    
    {
      "role": "user",
      "content": "Bouldering problems with lots of pockets in Hueco Tanks"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM boulder WHERE description LIKE '%pockets%' AND location LIKE '%Hueco Tanks%';"
    },
    {
      "role": "user",
      "content": "Most popular climbs in Joshua Tree"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM boulder WHERE num_votes > 50 AND location LIKE '%Joshua Tree%';"
    },
    ];
  }else if (type == Climbs.Sport){
    return [ {
      "role": "system",
      "content": "You are a program that reads input about sport climbing routes and creates \
        a SQL query based upon the input. You will search a dataset called 'sport'. \
        If a user queries about anything other than routes, return an error. Break down the input into components of location, rating (which will never be greater than 4), grade, num_votes\
        height, pitches, protection, and keywords to search the climbs description for."
    },
    {
      "role": "user",
      "content": "Beginner-friendly sport climbs in Smith Rock"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM sport WHERE grade LIKE '5.6%' OR grade LIKE '5.7%' OR grade LIKE '5.8%' AND location LIKE '%Smith Rock%';"
    },
    {
      "role": "user",
      "content": "Overhung sport routes in Pinnacles"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM sport WHERE description LIKE '%overhung%' AND location LIKE '%Pinnacles%';"
    },
    {
      "role": "user",
      "content" : "sport crack climbs in owens river gorge"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM sport WHERE description LIKE '%crack%' AND location LIKE '%Owens River Gorge%';"
    }]
  }else if (type == Climbs.Trad){
    return [ {
      "role": "system",
      "content": "You are a program that reads input about trad climbing routes and creates \
        a SQL query based upon the input. You will search a dataset called 'trad'. \
        If a user queries about anything other than routes, return an error. Break down the input into components of location, rating (which will never be greater than 4), grade, num_votes\
        height, pitches, protection, and keywords to search the climbs description for."
    },
    {
      "role": "user",
      "content": "Long multi-pitch trad routes in Red River Gorge"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM trad WHERE pitches > 4 AND location LIKE '%Red River Gorge%';"
    },
    {
      "role": "user",
      "content": "> 3.5 stars trad slab climbs in Yosemite"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM trad WHERE description LIKE '%slab%' AND rating > 3.5 AND location LIKE '%Yosemite%';"
    }]
  }else if (type == Climbs.TopRope){
    return [ {
      "role": "system",
      "content": "You are a program that reads input about top rope climbing routes and creates \
        a SQL query based upon the input. You will search a dataset called 'toprope'. \
        If a user queries about anything other than routes, return an error. Break down the input into components of location, rating (which will never be greater than 4), grade, num_votes\
        height, pitches, protection, and keywords to search the description column for to search the climbs description for."
    },
    {
      "role": "user",
      "content": "Best top ropes in the eastern sierra"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM toprope WHERE rating > 3.5 AND location LIKE '%Sierra Eastside%';"
    },
      {"role": "user",
      "content": "crack top ropes in california"
    },
    {
      "role": "assistant",
      "content": "SELECT * FROM toprope WHERE location LIKE '%California%' AND description LIKE '%crack%'"
    }
  ]
  }
}







