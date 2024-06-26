const axios = require('axios');

module.exports = async (req, res) => {
  const { age, interests } = req.body;
  const OPENAI_API_KEY = process.env.KEY;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4o",
      messages: [{
        role: "system",
        content: "You are a helpful assistant that generates entrepreneurial ideas for children."
      }, {
        role: "user",
        content: `Families are showing up to a neighborhood entreprenurial event with 10 other families and are looking for a fun and creative product they can sell to the neighbors that attend the event. All are to be sold between $1 - $5 dollars using single bills. Value of the products sold can slightly surpass sell price but hopefully not by much. Examples of items being sold by other families are bracelets, beach bags, lemonade, cookies. Generate 10 creative entrepreneurial product ideas that a ${age}-year-old child interested in ${interests} would enjoy creating and selling for the event. Provide each idea as a short sentence without numbering or special characters. Have a second sentence with an estimated cost per unit and a recommended sale price to make things easier on the parent.`
      }],
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const ideas = response.data.choices[0].message.content.split('\n').filter(idea => idea.trim() !== '');
    res.status(200).json(ideas);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate ideas' });
  }
};
