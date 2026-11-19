/*construisons un composant TodoList simple permettant d'ajouter des tâches à une liste et de les afficher à l'écran.

    📝 Nouvel état (useState) : cette fois, l'état principal ne sera plus une chaîne de texte, mais un tableau de tâches (par exemple const [tasks, setTasks] = useState([])), accompagné d'un état pour le texte de la nouvelle tâche (const [newTask, setNewTask] = useState("")).

    ➕ Ajout sans mutation : en React, on évite de modifier le tableau existant directement avec .push() ; on crée plutôt un nouveau tableau (par exemple [...tasks, newTask]).

    📋 Affichage de liste : pour transformer un tableau de données en éléments JSX (<li>), on utilise la méthode .map() avec une prop key unique.

Pour démarrer ce composant TodoList, comment déclarerais-tu les deux états tasks (tableau vide au départ) et newTask (chaîne vide au départ) avec useState ?*/
import { useState } from "react"
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';


export default function TodoList() {
//State
    const [task, setTask] = useState([])
    const [newTask, setNewTask] = useState("")

//Comportements
    const handleChange = (event) => {
        setNewTask(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const taskCopy = [...task];
        const cleanedTask = newTask.trim();

        if(cleanedTask.length < 3){
            return
        }
        taskCopy.push({cleanedTask})
        setTask(taskCopy);
        setNewTask("")
    }
    
    const handleDelete = (indexDelete) =>{
      const taskCopy = [...task]
      const taskCopyUpdated = taskCopy.filter((tasks,idx) => idx !== indexDelete );
      setTask(taskCopyUpdated);
    }

    const handleToogle = () =>{

    }
// Affichage ( render)
    return(
        <>
        <h1>Ma TodoList</h1>
        <img src="https://thumb.canalplus.pro/http/unsafe/1440x810/filters:quality(80)/media.prod.hawc.canal.aws.io-cplus.net/8f6f191ca6a0b317083b7f295cf0e4e1.jpg" alt="" />
        <ul>{task.map((tasks, index) =>{
            return<li className="liste" key={index}>{tasks.cleanedTask}
            <Button className="reussi" variant="contained" color="success">Réussi</Button>
            <Button className="supprimer" variant="contained" startIcon={<DeleteIcon />} onClick={() => handleDelete (index)} color ="error">Supprimer</Button></li>
        })}</ul>

        <form action="submit" onSubmit={handleSubmit} className="form">
        <input className="task" type="text" name="newTask" value={newTask} onChange={handleChange} placeholder="Veuillez rentrer votre nouvelle tâche" />
        <Button className="submit" type="submit" variant="contained" endIcon={<SendIcon />} color="primary">Ajouter</Button>
        
        </form>
        
            
        </>
    )
}