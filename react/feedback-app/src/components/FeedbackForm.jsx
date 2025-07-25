import { useState } from 'react';
import FeedbackItem from './FeedbackItem'
import './css/FeedbackForm.css'
import FeedbackList from './FeedbackList';

function FeedbackForm()
{
    const [name, setName] = useState("");
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");
    const [ratingFilter, setRatingFilter] = useState(null);
    const [feedbacks, setFeedback] = useState([]);

    // This function will be called when the form is submitted
    // Here, we create a new feedback object and add it to the feedbacks state (array)
    function handleSubmit(event) {
        event.preventDefault();

        // There was an error here because e.target.value returns a string.
        // So, when constructing the filteredFeedbacks array,
        // 2 !== "2" when comparing 2 (value in feedbacks array) === "2" (value of ratingFilter),
        // The filter was not working.
        const newFeedback = {
            name: name, 
            rating: parseInt(rating), // Correction: convert rating to integer
            comment: comment
        };

        // Update the feedbacks state with the new feedback if all fields are filled
        if(!newFeedback.name || !newFeedback.comment || !newFeedback.rating) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
        else {
            setFeedback([...feedbacks, newFeedback]);
            console.log(newFeedback);
            console.log(feedbacks);
            
            // Reset the form fields
            setName("");
            setRating(1);
            setComment("");
        }
    }
    
    // If ratingFilter is null, we show all feedbacks
    // If ratingFilter is set, we filter the feedbacks by the selected rating
    const filteredFeedbacks = ratingFilter
        ? feedbacks.filter(f => f.rating === ratingFilter)
        : feedbacks;

    return(
        <>

            <h1 style={{marginBottom: '0px'}}>Avalie!</h1>
            <h2>Aqui você pode checar avaliações já feitas, ordernar por nota e avaliar!</h2>
            {feedbacks.length === 0 && <p>Nenhum feedback enviado ainda.</p>}
            {feedbacks.length === 1 && <p>Você já enviou {feedbacks.length} feedback.</p>}
            {feedbacks.length > 1 && <p>Você já enviou {feedbacks.length} feedbacks.</p>}

            {/* Using onChange to update the state each time the user types in the input fields. */}
            <form className="feedback-form" onSubmit={handleSubmit}>
                <label>Nome</label>
                <input 
                  type="text"
                  placeholder="Digite o seu nome"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />

                <label>Nota</label>
                <input 
                  type="number"
                  min="1"
                  max="5" 
                  placeholder="Digite a sua nota"
                  value={rating}
                  onChange = {e=> setRating(e.target.value)}
                />

                <label>Comentário</label>
                <textarea 
                  placeholder="Escreva o seu comentário"
                  value={comment}
                  onChange={e => setComment(e.target.value)}   
                />

                <button type="submit">Enviar</button>
            </form>

            {/* Display the feedbacks rendering a div for each feedback item. */}
            <FeedbackList feedbacks={filteredFeedbacks} />

            {feedbacks.length > 1 && (
                <div className="filtro">
                    <p>Filtrar por nota:</p>
                    {[1, 2, 3, 4, 5].map(nota => (
                        <button
                            key={nota}
                            onClick={() => setRatingFilter(nota)}
                            style={{
                                margin: '0 5px',
                                backgroundColor: ratingFilter === nota ? '#007bff' : '#e0e0e0',
                                color: ratingFilter === nota ? 'white' : 'black',
                            }}
                        >
                            {nota}
                        </button>
                    ))}
                    {ratingFilter && (
                        <button
                            onClick={() => setRatingFilter(null)}
                            style={{
                                backgroundColor: 'gray',
                                color: 'white',
                                display:'flex',
                                marginTop: '10px'
                            }}
                        >
                            Limpar filtro
                        </button>
                    )}
                </div>
            )}

        </>
    );
}

export default FeedbackForm;