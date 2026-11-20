/*construisons un composant TodoList simple permettant d'ajouter des tâches à une liste et de les afficher à l'écran.

    📝 Nouvel état (useState) : cette fois, l'état principal ne sera plus une chaîne de texte, mais un tableau de tâches (par exemple const [tasks, setTasks] = useState([])), accompagné d'un état pour le texte de la nouvelle tâche (const [newTask, setNewTask] = useState("")).

    ➕ Ajout sans mutation : en React, on évite de modifier le tableau existant directement avec .push() ; on crée plutôt un nouveau tableau (par exemple [...tasks, newTask]).

    📋 Affichage de liste : pour transformer un tableau de données en éléments JSX (<li>), on utilise la méthode .map() avec une prop key unique.

Pour démarrer ce composant TodoList, comment déclarerais-tu les deux états tasks (tableau vide au départ) et newTask (chaîne vide au départ) avec useState ?*/

// Dépendances externes ( React & Material UI)
import { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

// Correspondance entre la note (de 0.5 à 5) et le libellé affiché
const labels = {
  0.5: "Sert à rien",
  1: "Sert à rien+",
  1.5: "Pas Mal",
  2: "Pas Mal+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "GodTier",
  5: "GodTier+",
};

// Génère un texte accessible (ex. pour les lecteurs d'écran) selon la note sélectionnée
function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function TodoList() {
  // États (state) pour le composant de notation (Rating)
  const [value, setValue] = React.useState(2); // Note sélectionnée par défaut
  const [hover, setHover] = React.useState(-1); // Note survolée (-1 = aucun survol)

  // États principaux de la To-Do List
  const [task, setTask] = useState([]); // Tableau contenant toutes les tâches
  const [newTask, setNewTask] = useState(""); // Valeur actuelle du champ texte d'ajout

  // Met à jour newTask à chaque frappe dans l'input à l'aide de setter
  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  // Ajoute une nouvelle tâche lors de la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    const cleanedTask = newTask.trim(); // Supprime les espaces inutiles au début et à la fin

    // Ignore l'ajout si la tâche fait moins de 3 caractères
    if (cleanedTask.length < 3) {
      return;
    }

    // Ajoute la nouvelle tâche à la liste existante sans muter le tableau directement
    setTask([...task, { cleanedTask, isDone: false, rating: 0 }]);
    setNewTask(""); // Réinitialise le champ de saisie
  };

  // Supprime une tâche selon son index dans le tableau (copier le state, manipuler le state, maodifier le state avec le setter)
  const handleDelete = (indexDelete) => {
    const taskCopy = [...task] //destructuring [...];
    const taskCopyUpdated = taskCopy.filter((_, idx) => idx !== indexDelete);
    setTask(taskCopyUpdated);
  };

  // Bascule l'état "terminé / non terminé" (isDone) d'une tâche ciblée
  const handleToggle = (indexToggle) => {
    const taskCopy = [...task];
    const taskCopyUpdated = taskCopy.map((item, idx) => {
      if (idx === indexToggle) {
        return { ...item, isDone: !item.isDone };
      }
      return item;
    });
    setTask(taskCopyUpdated);
  };
  
  // Met à jour la note (rating) d'une tâche ciblée sans muter le tableau d'origine
    const handleRatingChange = (indexRating, newValue) => {
    const taskCopyUpdated = task.map((item, idx) => {
      if (idx === indexRating) {
        return { ...item, rating: newValue ?? 0 };
      }
      return item;
    });
    setTask(taskCopyUpdated);
  };

  // Rendu JSX du composant
  return (
    <>
      <h1>̠̠ʍǟ ȶօɖօʟɨֆȶ </h1>

      {/* Bannière illustrée */}
      <img
        src="https://thumb.canalplus.pro/http/unsafe/1440x810/filters:quality(80)/media.prod.hawc.canal.aws.io-cplus.net/8f6f191ca6a0b317083b7f295cf0e4e1.jpg"
        alt="Illustration de la TodoList"
      />

      {/* Liste des tâches */}
      <ul>
        {task.map((tasks, index) => {
          // Style par défaut d'une tâche non terminée
          let itemStyle = {
            backgroundColor: "transparent",
            textDecoration: "none",
          };

          // Style appliqué lorsque la tâche est marquée comme réussie
          if (tasks.isDone) {
            itemStyle = {
              backgroundColor: "#16d626",
              textDecoration: "line-through",
            };
          }

          return (
            <li className="liste" key={index} style={itemStyle}>
              {tasks.cleanedTask}

              {/* Bouton pour marquer la tâche comme réussie ou non */}
              <Button
                className="reussi"
                variant="contained"
                color="success"
                onClick={() => handleToggle(index)}
              >
                Réussi
              </Button>

              {/* Bouton pour supprimer la tâche */}
              <Button
                className="supprimer"
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(index)}
                color="error"
              >
                Supprimer
              </Button>

              {/* Système de notation par étoiles */}
               <Box sx={{ width: 220, display: "flex", alignItems: "center" }}>
                <Rating
                  name={`rating-${index}`}
                  value={tasks.rating}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    handleRatingChange(index, newValue);
                  }}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                {tasks.rating !== null && (
                  <Box sx={{ ml: 2 }}>{labels[tasks.rating]}</Box>
                )}
              </Box>
            </li>
          );
        })}
      </ul>

      {/* Formulaire d'ajout d'une nouvelle tâche */}
      <form onSubmit={handleSubmit} className="form">
        <input
          className="task"
          type="text"
          name="newTask"
          value={newTask}
          onChange={handleChange}
          placeholder="Veuillez rentrer votre nouvelle tâche"
        />
        <Button
          className="submit"
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          color="primary"
        >
          Ajouter
        </Button>
      </form>
    </>
  );
}