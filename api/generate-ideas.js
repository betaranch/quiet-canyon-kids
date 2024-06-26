const axios = require('axios');

module.exports = async (req, res) => {
  const { age, interests } = req.body;
  const OPENAI_API_KEY = process.env.key;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4o",
      messages: [{
        role: "system",
        content: "You are a helpful assistant that generates entrepreneurial ideas for children."
      }, {
        role: "user",
        content: `Generate 10 creative entrepreneurial ideas for a ${age}-year-old child interested in ${interests}. Provide each idea as a short sentence.`
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
