//para que se agrupen por fecha evitamos la duplicidad
export const uniqueDates = (tasks) => {
  const unique = [];

  tasks.forEach((task) => {
    if (!unique.includes(task.dateFormat)) unique.push(task.dateFormat);
  });

  return unique;
};


//cuando se crea una nueva tarea con una fecha inferior contra una ya creada
export const orderDates = (dates) => {
  return dates.sort((a, b) => {
    const firstDate = moment(a, 'DD/MM/YYYY');
    const secondDate = moment(b, 'DD/MM/YYYY');
    return firstDate - secondDate;
  });
};
