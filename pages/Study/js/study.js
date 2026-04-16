let timerInterval;
let timeLeft = 25 * 60;
let isRunning = false;
let currentMode = 'pomodoro';
let focusTimeThisSession = 0;
let currentUserUid = null;
function getStorageKey(key) {
  if (currentUserUid) return key + '_' + currentUserUid;
  return key;
}
let tasks = [];
let sounds = {
  rain: new Audio('https://www.soundjay.com/nature/rain-07.mp3'),
  lofi: new Audio('https://www.soundjay.com/misc/sounds/wind-chime-1.mp3'),
  library: new Audio('https://www.soundjay.com/ambient/sounds/library-1.mp3')
};
Object.values(sounds).forEach(s => {
  s.loop = true;
  s.volume = 0.5;
});
function loadUserTasks() {
  try {
    tasks = JSON.parse(localStorage.getItem(getStorageKey('study-tasks'))) || [];
  } catch {
    tasks = [];
  }
}
function updateTimerDisplay() {
  const timerDisplay = document.getElementById('timer-display');
  if (!timerDisplay) return;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  const circle = document.querySelector('.timer-ring');
  if (circle) {
    const total = currentMode === 'pomodoro' ? 25 * 60 : (currentMode === 'short' ? 5 * 60 : 15 * 60);
    const percent = timeLeft / total;
    const circumference = 1272;
    circle.style.strokeDashoffset = circumference - (percent * circumference);
  }
}
function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      focusTimeThisSession++;
      updateTimerDisplay();
      updateSessionStats();
    } else {
      clearInterval(timerInterval);
      isRunning = false;
      playNotification();
      saveFocusStats();
    }
  }, 1000);
}
function saveFocusStats() {
  const key = getStorageKey('total-focus-time');
  const totalFocus = parseInt(localStorage.getItem(key) || '0');
  localStorage.setItem(key, totalFocus + focusTimeThisSession);
}
function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}
function resetTimer() {
  pauseTimer();
  setMode(currentMode);
}
function setMode(mode) {
  currentMode = mode;
  timeLeft = mode === 'pomodoro' ? 25 * 60 : (mode === 'short' ? 5 * 60 : 15 * 60);
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  updateTimerDisplay();
}
function updateSessionStats() {
  const statEl = document.getElementById('session-focus-time');
  if (statEl) {
    const mins = Math.floor(focusTimeThisSession / 60);
    statEl.textContent = `${mins}m focused`;
  }
}
function addTask() {
  const input = document.getElementById('task-input');
  const taskText = input.value.trim();
  if (!taskText) return;
  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
  input.value = '';
}
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}
function saveTasks() {
  localStorage.setItem(getStorageKey('study-tasks'), JSON.stringify(tasks));
}
function renderTasks() {
  const taskList = document.getElementById('task-list');
  if (!taskList) return;
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.className = `task-item flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 mb-3 ${task.completed ? 'completed opacity-50' : ''}`;
    taskItem.innerHTML = `
      <div class="flex items-center gap-4">
        <div class="task-checkbox cursor-pointer ${task.completed ? 'bg-[#A8E6CF] border-[#A8E6CF]' : 'border-white/20'}" onclick="toggleTask(${task.id})">
          ${task.completed ? '<svg class="w-3 h-3 text-[#0a0a0c]" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg>' : ''}
        </div>
        <span class="task-text ${task.completed ? 'line-through text-white/40' : ''}">${task.text}</span>
      </div>
      <button onclick="deleteTask(${task.id})" class="text-white/20 hover:text-red-400 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
      </button>
    `;
    taskList.appendChild(taskItem);
  });
  updateProgressRing();
}
function updateProgressRing() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const ring = document.getElementById('daily-goal-ring');
  const text = document.getElementById('progress-percent');
  if (ring && text) {
    const circumference = 452.4;
    const offset = circumference - (percent / 100) * circumference;
    ring.style.strokeDashoffset = offset;
    text.textContent = `${percent}%`;
  }
}
function toggleGhostMode() {
  const body = document.body;
  const timerContainer = document.getElementById('timer-container');
  if (body.classList.contains('ghost-active')) {
    body.classList.remove('ghost-active');
    document.querySelectorAll('.ghost-hidden').forEach(el => el.classList.remove('ghost-mode-active'));
    timerContainer?.classList.remove('ghost-mode-visible');
  } else {
    body.classList.add('ghost-active');
    document.querySelectorAll('.ghost-hidden').forEach(el => el.classList.add('ghost-mode-active'));
    timerContainer?.classList.add('ghost-mode-visible');
  }
}
function toggleSound(type) {
  const sound = sounds[type];
  if (!sound) return;
  const btn = document.querySelector(`[data-sound="${type}"]`);
  if (sound.paused) {
    Object.values(sounds).forEach(s => s.pause());
    document.querySelectorAll('.sound-btn').forEach(b => b.classList.remove('active'));
    sound.play().catch(() => {});
    btn.classList.add('active');
  } else {
    sound.pause();
    btn.classList.remove('active');
  }
}
function playNotification() {
  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
  audio.play().catch(() => {});
}
document.addEventListener('DOMContentLoaded', async () => {
  const ring = document.getElementById('daily-goal-ring');
  if (ring) {
    ring.style.strokeDasharray = "452.4";
    ring.style.strokeDashoffset = "452.4";
  }
  if (typeof AUTH !== 'undefined') {
    const user = await AUTH.getCurrentUser();
    if (user) {
      currentUserUid = user.uid;
      const nameDisplay = document.getElementById('user-display-name');
      if (nameDisplay) nameDisplay.textContent = user.displayName || 'Student';
    }
  }
  loadUserTasks();
  renderTasks();
  updateTimerDisplay();
  const notes = document.getElementById('study-notes');
  if (notes) {
    notes.value = localStorage.getItem(getStorageKey('study-notes')) || '';
    notes.addEventListener('input', (e) => {
      localStorage.setItem(getStorageKey('study-notes'), e.target.value);
    });
  }
});
