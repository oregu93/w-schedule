document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('calendar');
    const timeSlotsEl = document.getElementById('time-slots');
  
    const now = new Date();
    const daysToShow = 8; // Показать расписание до одного дня после следующей недели
    const timeSlots = {
      'morning': ['11:30'],
      'day': ['16:00', '16:30', '17:00', '17:30'],
      'evening': ['18:00', '18:30', '19:00', '19:30', '20:00']
    };
    let scheduleData = {}; // Здесь будут данные о занятых слотах, загружаемые позже

    // let scheduleData = {
    //     '2024-10-29': ['11:30', '16:30'], // Пример забронированного времени
    //     '2024-10-30': ['17:00', '18:00']
    //   };
      
  
    function createCalendar() {
      for (let i = 0; i < daysToShow; i++) {
        const day = new Date(now);
        day.setDate(day.getDate() + i);
        const dayEl = document.createElement('div');
        dayEl.className = 'day';
        dayEl.textContent = `${day.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric' })}`;
        dayEl.dataset.date = day.toISOString().split('T')[0];
        dayEl.addEventListener('click', () => selectDate(dayEl.dataset.date));
        calendarEl.appendChild(dayEl);
      }
    }
  
    function selectDate(date) {
      document.querySelectorAll('.day').forEach(el => el.classList.remove('selected'));
      document.querySelector(`[data-date='${date}']`).classList.add('selected');
      displayTimeSlots(date);
    }
  
    function displayTimeSlots(date) {
      timeSlotsEl.innerHTML = ''; // Очищаем старые слоты перед отображением новых
      for (const [key, slots] of Object.entries(timeSlots)) {
        slots.forEach(slot => {
          const slotEl = document.createElement('div');
          slotEl.className = 'time-slot';
          slotEl.textContent = slot;
          if (scheduleData[date] && scheduleData[date].includes(slot)) {
            slotEl.classList.add('disabled');
          }
          timeSlotsEl.appendChild(slotEl);
        });
      }
    }
  
    createCalendar(); // Создаем календарь при загрузке страницы
  });
  