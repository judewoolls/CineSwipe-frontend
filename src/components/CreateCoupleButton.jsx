import { useState } from "react";
import "../css/CreateCoupleButton.css"; 

function CreateCoupleButton({refreshCouple}) {
    async function createCouple() {
        try {
            const response = await fetch('http://localhost:8000/api/create-couple/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
                },
                body: JSON.stringify({ /* data to create couple */ })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Couple created successfully:', data);

            //trigger parent component to refresh the couple list
            if (refreshCouple) {
                refreshCouple();
            }
        } catch (error) {
            console.error('Error creating couple:', error);
        }
      }
    return <button className="create-couple-button" onClick={ createCouple }>
        Create Couple
    </button>;
}

export default CreateCoupleButton;