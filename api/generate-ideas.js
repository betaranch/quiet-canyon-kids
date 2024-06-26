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
        content: `Families are attending a neighborhood entrepreneurial event with 10 other families and are looking for fun and creative products their children can sell to neighbors. Each product should be unique, handmade, and suitable for children to make and sell, with a price range of $1 - $5 using single bills. The value of the products sold can slightly surpass the selling price but should remain affordable. Examples of items sold by other families include handmade bracelets, beach bags, lemonade, and cookies. Generate 10 creative entrepreneurial product ideas that a ${age}-year-old child interested in ${interests} would enjoy creating and selling at the event. Each idea should be a short sentence without numbering or special characters, followed by a second sentence with an estimated cost per unit and a recommended sale price to assist parents. Try to creatively combine interests for some fun and unique products but dont force it. Ensure the ideas are age-appropriate, engaging, and something the child would be proud to make and sell.`
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
