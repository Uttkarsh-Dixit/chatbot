

document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (!userInput) return;

    
    displayMessage(userInput, 'user');

    
    document.getElementById('user-input').value = '';

    
    document.getElementById('send-btn').disabled = true;

    
    try {
        const botReply = await getBotResponse(userInput);
        displayMessage(botReply, 'bot');
    } catch (error) {
        displayMessage('Sorry, something went wrong. Please try again later.', 'bot');
    }

    
    document.getElementById('send-btn').disabled = false;
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-msg' : 'bot-msg');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotResponse(userInput) {
    const apiKey =sk-proj-x6IG0MY0IA8ETXc2D5FAI1vx9b0M7-Z-ry8C1Ap5Pzi8eM2aEYYKiq2yxuQohoQWe3wDThGSlT3BlbkFJLtd0dnMC4XB3YlVvIKrr2_tIDFs5Lmc_g6TW4QE9-9KFJZrTtZTp1hxsuVUdaNDZSIWCdCkHYA; // Replace with your OpenAI API key

    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-4",
            prompt: userInput,
            max_tokens: 150,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch from OpenAI');
    }

    const data = await response.json();
    return data.choices[0].text.trim();
}
