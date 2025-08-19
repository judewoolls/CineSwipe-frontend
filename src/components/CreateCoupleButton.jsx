async function createCouple() {
    try {
        const response = await fetch('http://localhost:8000/api/create-couple', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ /* data to create couple */ })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Couple created successfully:', data);
    } catch (error) {
        console.error('Error creating couple:', error);
    }
}

function CreateCoupleButton() {
    return <button className="create-couple-button" onClick={createCouple}>
        Create Couple
    </button>;
}

export default CreateCoupleButton;
export { createCouple };