
class FootballStadium {
    constructor() {
        this.namedPlayers = [
            { id: 'blackadam', name: 'Black Adam', number: 9, imagePath: '../../assets/images/Boruto.jpg', position: 'Forward', role: 'st', isNamed: true },
            { id: 'kingkohli', name: 'King Kohli', number: 7, imagePath: '../../assets/images/ViratKohli.jpg', position: 'Midfielder', role: 'cam', isNamed: true },
            { id: 'gamingelite', name: 'Gaming Elite', number: 5, imagePath: '../../assets/images/Elite.jpg', position: 'Forward', role: 'lw', isNamed: true }
        ];
        this.playerPool = [
            { id: 'gk', name: 'GK', number: 1, position: 'Goalkeeper', color: '#FFD700', letter: 'G', role: 'gk' },
            { id: 'lb', name: 'LB', number: 2, position: 'Defender', color: '#6CABDD', letter: 'D', role: 'lb' },
            { id: 'rb', name: 'RB', number: 3, position: 'Defender', color: '#6CABDD', letter: 'D', role: 'rb' },
            { id: 'cb1', name: 'CB', number: 4, position: 'Defender', color: '#6CABDD', letter: 'D', role: 'cb' },
            { id: 'cb2', name: 'CB', number: 5, position: 'Defender', color: '#6CABDD', letter: 'D', role: 'cb' },
            { id: 'cb3', name: 'CB', number: 6, position: 'Defender', color: '#6CABDD', letter: 'D', role: 'cb' },
            { id: 'cdm', name: 'CDM', number: 7, position: 'Midfielder', color: '#90EE90', letter: 'M', role: 'cdm' },
            { id: 'cm1', name: 'CM', number: 8, position: 'Midfielder', color: '#90EE90', letter: 'M', role: 'cm' },
            { id: 'cm2', name: 'CM', number: 9, position: 'Midfielder', color: '#90EE90', letter: 'M', role: 'cm' },
            { id: 'cam', name: 'CAM', number: 10, position: 'Midfielder', color: '#90EE90', letter: 'M', role: 'cam' },
            { id: 'lw', name: 'LW', number: 11, position: 'Forward', color: '#FF6B6B', letter: 'F', role: 'lw' },
            { id: 'rw', name: 'RW', number: 12, position: 'Forward', color: '#FF6B6B', letter: 'F', role: 'rw' },
            { id: 'st1', name: 'ST', number: 13, position: 'Forward', color: '#FF6B6B', letter: 'F', role: 'st' }
        ];
        this.playerPool2 = [
            { id: 'gk2', name: 'GK', number: 22, position: 'Goalkeeper', color: '#FFD700', letter: 'G', role: 'gk' },
            { id: 'lb2', name: 'LB', number: 23, position: 'Defender', color: '#6CABDD', letter: 'D', role: 'lb' },
            { id: 'rb2', name: 'RB', number: 24, position: 'Defender', color: '#6CABDD', letter: 'D', role: 'rb' },
            { id: 'cb4', name: 'CB', number: 25, position: 'Defender', color: '#6CABDD', letter: 'D', role: 'cb' },
            { id: 'cb5', name: 'CB', number: 26, position: 'Defender', color: '#6CABDD', letter: 'D', role: 'cb' },
            { id: 'cb6', name: 'CB', number: 27, position: 'Defender', color: '#6CABDD', letter: 'D', role: 'cb' },
            { id: 'cdm2', name: 'CDM', number: 28, position: 'Midfielder', color: '#90EE90', letter: 'M', role: 'cdm' },
            { id: 'cm3', name: 'CM', number: 29, position: 'Midfielder', color: '#90EE90', letter: 'M', role: 'cm' },
            { id: 'cm4', name: 'CM', number: 30, position: 'Midfielder', color: '#90EE90', letter: 'M', role: 'cm' },
            { id: 'cam2', name: 'CAM', number: 31, position: 'Midfielder', color: '#90EE90', letter: 'M', role: 'cam' },
            { id: 'lw2', name: 'LW', number: 32, position: 'Forward', color: '#FF6B6B', letter: 'F', role: 'lw' },
            { id: 'rw2', name: 'RW', number: 33, position: 'Forward', color: '#FF6B6B', letter: 'F', role: 'rw' },
            { id: 'st2', name: 'ST', number: 34, position: 'Forward', color: '#FF6B6B', letter: 'F', role: 'st' }
        ];
        this.formations = {
            '4-3-3': [
                { role: 'gk', x: 80, y: 400 },
                { role: 'lb', x: 250, y: 200 },
                { role: 'cb', x: 250, y: 350 },
                { role: 'cb2', x: 250, y: 450 },
                { role: 'rb', x: 250, y: 600 },
                { role: 'cm', x: 450, y: 300 },
                { role: 'cdm', x: 450, y: 400 },
                { role: 'cm2', x: 450, y: 500 },
                { role: 'lw', x: 650, y: 250 },
                { role: 'st', x: 650, y: 400 },
                { role: 'rw', x: 650, y: 550 }
            ],
            '4-4-2': [
                { role: 'gk', x: 80, y: 400 },
                { role: 'lb', x: 250, y: 200 },
                { role: 'cb', x: 250, y: 350 },
                { role: 'cb2', x: 250, y: 450 },
                { role: 'rb', x: 250, y: 600 },
                { role: 'lw', x: 450, y: 180 },
                { role: 'cm', x: 450, y: 320 },
                { role: 'cm2', x: 450, y: 480 },
                { role: 'rw', x: 450, y: 620 },
                { role: 'st', x: 650, y: 350 },
                { role: 'cam', x: 650, y: 450 }
            ],
            '4-1-2-1-2': [
                { role: 'gk', x: 80, y: 400 },
                { role: 'lb', x: 250, y: 200 },
                { role: 'cb', x: 250, y: 350 },
                { role: 'cb2', x: 250, y: 450 },
                { role: 'rb', x: 250, y: 600 },
                { role: 'cdm', x: 400, y: 400 },
                { role: 'cm', x: 500, y: 280 },
                { role: 'cm2', x: 500, y: 520 },
                { role: 'cam', x: 600, y: 400 },
                { role: 'st', x: 720, y: 350 },
                { role: 'lw', x: 720, y: 450 }
            ],
            '3-5-2': [
                { role: 'gk', x: 80, y: 400 },
                { role: 'cb', x: 220, y: 300 },
                { role: 'cb2', x: 220, y: 400 },
                { role: 'cb3', x: 220, y: 500 },
                { role: 'lw', x: 380, y: 150 },
                { role: 'cm', x: 380, y: 280 },
                { role: 'cdm', x: 380, y: 400 },
                { role: 'cm2', x: 380, y: 520 },
                { role: 'rw', x: 380, y: 650 },
                { role: 'st', x: 600, y: 350 },
                { role: 'cam', x: 600, y: 450 }
            ],
            '5-3-2': [
                { role: 'gk', x: 80, y: 400 },
                { role: 'lb', x: 220, y: 150 },
                { role: 'cb', x: 220, y: 280 },
                { role: 'cb2', x: 220, y: 400 },
                { role: 'cb3', x: 220, y: 520 },
                { role: 'rb', x: 220, y: 650 },
                { role: 'cm', x: 450, y: 300 },
                { role: 'cdm', x: 450, y: 400 },
                { role: 'cm2', x: 450, y: 500 },
                { role: 'st', x: 650, y: 350 },
                { role: 'lw', x: 650, y: 450 }
            ],
            '4-2-3-1': [
                { role: 'gk', x: 80, y: 400 },
                { role: 'lb', x: 250, y: 200 },
                { role: 'cb', x: 250, y: 350 },
                { role: 'cb2', x: 250, y: 450 },
                { role: 'rb', x: 250, y: 600 },
                { role: 'cdm', x: 400, y: 320 },
                { role: 'cm', x: 400, y: 480 },
                { role: 'lw', x: 580, y: 200 },
                { role: 'cam', x: 580, y: 400 },
                { role: 'rw', x: 580, y: 600 },
                { role: 'st', x: 720, y: 400 }
            ],
            '3-4-3': [
                { role: 'gk', x: 80, y: 400 },
                { role: 'cb', x: 220, y: 300 },
                { role: 'cb2', x: 220, y: 400 },
                { role: 'cb3', x: 220, y: 500 },
                { role: 'lw', x: 450, y: 180 },
                { role: 'cm', x: 450, y: 320 },
                { role: 'cm2', x: 450, y: 480 },
                { role: 'rw', x: 450, y: 620 },
                { role: 'st', x: 650, y: 250 },
                { role: 'cam', x: 650, y: 400 },
                { role: 'cdm', x: 650, y: 550 }
            ]
        };
        this.currentFormation = '4-3-3';
        this.activePlayers = [];
        this.dummyPlayers = [];
        this.draggedPlayer = null;
        this.offsetX = 0;
        this.offsetY = 0;
        this.storageKey = 'football-formation-v4';
        this.init();
    }
    init() {
        this.loadState();
        this.setupFormationSelector();
        this.renderAll();
    }
    getPositionForRole(role) {
        const formation = this.formations[this.currentFormation];
        const slot = formation.find(s => s.role === role);
        return slot || { x: 400, y: 400 };
    }
    renderAll() {
        this.renderPlayers();
        this.renderPlayerPool();
    }
    renderPlayerPool() {
        const pool = document.getElementById('player-pool');
        if (!pool) return;
        pool.innerHTML = '';
        const usedIds = this.dummyPlayers.map(p => p.id.split('-')[0]);
        const available = this.playerPool.filter(p => !usedIds.includes(p.id));
        available.forEach(player => {
            const token = document.createElement('div');
            token.className = 'pool-token';
            token.dataset.id = player.id;
            token.style.background = player.color;
            token.innerHTML = `
                <span class="pool-letter">${player.letter}</span>
                <span class="pool-number">${player.number}</span>
                <span class="pool-name">${player.name}</span>
            `;
            token.addEventListener('click', () => this.addDummyPlayer(player.id));
            pool.appendChild(token);
        });
        const available2 = this.playerPool2.filter(p => !usedIds.includes(p.id));
        if (available.length > 0 && available2.length > 0) {
            const divider = document.createElement('div');
            divider.className = 'pool-divider';
            divider.style.cssText = 'width: 100%; height: 1px; background: rgba(108, 171, 221, 0.3); margin: 10px 0;';
            pool.appendChild(divider);
        }
        available2.forEach(player => {
            const token = document.createElement('div');
            token.className = 'pool-token';
            token.dataset.id = player.id;
            token.style.background = player.color;
            token.innerHTML = `
                <span class="pool-letter">${player.letter}</span>
                <span class="pool-number">${player.number}</span>
                <span class="pool-name">${player.name}</span>
            `;
            token.addEventListener('click', () => this.addDummyPlayer(player.id, true));
            pool.appendChild(token);
        });
    }
    addDummyPlayer(poolId, isRow2 = false) {
        const sourcePool = isRow2 ? this.playerPool2 : this.playerPool;
        const template = sourcePool.find(p => p.id === poolId);
        if (!template) return;
        const pos = this.getPositionForRole(template.role);
        const newPlayer = {
            ...template,
            id: `${template.id}-${Date.now()}`,
            currentX: pos.x,
            currentY: pos.y
        };
        this.dummyPlayers.push(newPlayer);
        this.saveState();
        this.renderAll();
    }
    removePlayer(playerId) {
        if (this.namedPlayers.find(p => p.id === playerId)) return;
        this.dummyPlayers = this.dummyPlayers.filter(p => p.id !== playerId);
        this.saveState();
        this.renderAll();
    }
    applyFormation(formationName) {
        if (!this.formations[formationName]) return;
        this.currentFormation = formationName;
        this.namedPlayers.forEach(player => {
            const pos = this.getPositionForRole(player.role);
            player.currentX = pos.x;
            player.currentY = pos.y;
        });
        this.dummyPlayers.forEach(player => {
            const pos = this.getPositionForRole(player.role);
            player.currentX = pos.x;
            player.currentY = pos.y;
        });
        this.saveState();
        this.renderAll();
        const note = document.getElementById('stadium-formation-note');
        if (note) note.textContent = `Formation: ${formationName}`;
    }
    renderPlayers() {
        const container = document.getElementById('stadium-players');
        if (!container) return;
        container.innerHTML = '';
        const allPlayers = [...this.namedPlayers, ...this.dummyPlayers];
        allPlayers.forEach(player => {
            const playerEl = document.createElement('div');
            playerEl.className = 'player-on-pitch';
            playerEl.dataset.playerId = player.id;
            playerEl.style.left = player.currentX + 'px';
            playerEl.style.top = player.currentY + 'px';
            if (player.isNamed) {
                const roleLabel = player.role.toUpperCase();
                playerEl.innerHTML = `
                    <div class="player-token named-player">
                        <div class="player-image-circle">
                            <img src="${player.imagePath}" alt="${player.name}">
                        </div>
                        <div class="player-label">${player.name}</div>
                        <div class="player-position">${roleLabel}</div>
                    </div>
                `;
            } else {
                playerEl.innerHTML = `
                    <div class="player-token dummy-player" style="--player-color: ${player.color}">
                        <button class="remove-player-btn" data-player-id="${player.id}" title="Remove">×</button>
                        <div class="player-circle" style="background: ${player.color}">
                            <span class="player-initial">${player.letter}</span>
                        </div>
                        <div class="player-label">${player.name}</div>
                    </div>
                `;
                const removeBtn = playerEl.querySelector('.remove-player-btn');
                removeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.removePlayer(player.id);
                });
            }
            playerEl.addEventListener('mousedown', (e) => this.startDrag(e, player));
            container.appendChild(playerEl);
        });
    }
    setupFormationSelector() {
        const selector = document.getElementById('formation-selector');
        if (selector) {
            selector.value = this.currentFormation;
            selector.addEventListener('change', (e) => {
                this.applyFormation(e.target.value);
            });
        }
    }
    startDrag(e, player) {
        if (e.target.classList.contains('remove-player-btn')) return;
        e.preventDefault();
        this.draggedPlayer = player;
        this.isDragging = true;
        const pitchWrap = document.querySelector('.stadium-pitch-wrap');
        const rect = pitchWrap.getBoundingClientRect();
        this.offsetX = e.clientX - rect.left - player.currentX;
        this.offsetY = e.clientY - rect.top - player.currentY;
        this.boundDrag = (e) => this.drag(e);
        this.boundStopDrag = () => this.stopDrag();
        document.addEventListener('mousemove', this.boundDrag);
        document.addEventListener('mouseup', this.boundStopDrag);
        const playerEl = document.querySelector(`[data-player-id="${player.id}"]`);
        if (playerEl) playerEl.classList.add('dragging');
    }
    drag(e) {
        if (!this.draggedPlayer || !this.isDragging) return;
        e.preventDefault();
        const pitchWrap = document.querySelector('.stadium-pitch-wrap');
        const rect = pitchWrap.getBoundingClientRect();
        let x = e.clientX - rect.left - this.offsetX;
        let y = e.clientY - rect.top - this.offsetY;
        x = Math.max(20, Math.min(x, rect.width - 80));
        y = Math.max(20, Math.min(y, rect.height - 100));
        this.draggedPlayer.currentX = x;
        this.draggedPlayer.currentY = y;
        const playerEl = document.querySelector(`[data-player-id="${this.draggedPlayer.id}"]`);
        if (playerEl) {
            playerEl.style.left = x + 'px';
            playerEl.style.top = y + 'px';
        }
    }
    stopDrag() {
        this.isDragging = false;
        if (this.draggedPlayer) {
            const playerEl = document.querySelector(`[data-player-id="${this.draggedPlayer.id}"]`);
            if (playerEl) playerEl.classList.remove('dragging');
            this.saveState();
            this.draggedPlayer = null;
        }
        document.removeEventListener('mousemove', this.boundDrag);
        document.removeEventListener('mouseup', this.boundStopDrag);
    }
    saveState() {
        const state = {
            formation: this.currentFormation,
            namedPositions: this.namedPlayers.map(p => ({ id: p.id, x: p.currentX, y: p.currentY })),
            dummyPlayers: this.dummyPlayers.map(p => ({
                id: p.id,
                poolId: p.id.split('-')[0],
                role: p.role,
                x: p.currentX,
                y: p.currentY
            }))
        };
        localStorage.setItem(this.storageKey, JSON.stringify(state));
    }
    loadState() {
        this.namedPlayers.forEach(p => {
            const pos = this.getPositionForRole(p.role);
            p.currentX = pos.x;
            p.currentY = pos.y;
        });
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                const state = JSON.parse(saved);
                this.currentFormation = state.formation || '4-3-3';
                if (state.namedPositions) {
                    state.namedPositions.forEach(saved => {
                        const player = this.namedPlayers.find(p => p.id === saved.id);
                        if (player) {
                            player.currentX = saved.x;
                            player.currentY = saved.y;
                        }
                    });
                }
                this.dummyPlayers = (state.dummyPlayers || []).map(saved => {
                    let template = this.playerPool.find(p => p.id === saved.poolId);
                    if (!template) {
                        template = this.playerPool2.find(p => p.id === saved.poolId);
                    }
                    if (template) {
                        return {
                            ...template,
                            id: saved.id,
                            currentX: saved.x,
                            currentY: saved.y
                        };
                    }
                    return null;
                }).filter(Boolean);
            } catch (e) {
                this.dummyPlayers = [];
            }
        } else {
            this.dummyPlayers = [];
        }
    }
    resetToDefaults() {
        this.dummyPlayers = [];
        this.namedPlayers.forEach(p => {
            const pos = this.getPositionForRole(p.role);
            p.currentX = pos.x;
            p.currentY = pos.y;
        });
        this.saveState();
        this.renderAll();
    }
}
class MobileStadium extends FootballStadium {
    startDrag(e, player) {
        if (e.target.classList.contains('remove-player-btn')) return;
        e.preventDefault();
        const touch = e.touches ? e.touches[0] : e;
        this.draggedPlayer = player;
        this.isDragging = true;
        const pitchWrap = document.querySelector('.stadium-pitch-wrap');
        const rect = pitchWrap.getBoundingClientRect();
        this.offsetX = touch.clientX - rect.left - player.currentX;
        this.offsetY = touch.clientY - rect.top - player.currentY;
        const playerEl = document.querySelector(`[data-player-id="${player.id}"]`);
        if (playerEl) playerEl.classList.add('dragging');
        this.boundDrag = (e) => this.drag(e);
        this.boundStopDrag = () => this.stopDrag();
        if (e.touches) {
            document.addEventListener('touchmove', this.boundDrag, { passive: false });
            document.addEventListener('touchend', this.boundStopDrag);
        } else {
            document.addEventListener('mousemove', this.boundDrag);
            document.addEventListener('mouseup', this.boundStopDrag);
        }
    }
    drag(e) {
        if (!this.draggedPlayer || !this.isDragging) return;
        e.preventDefault();
        const touch = e.touches ? e.touches[0] : e;
        const pitchWrap = document.querySelector('.stadium-pitch-wrap');
        const rect = pitchWrap.getBoundingClientRect();
        let x = touch.clientX - rect.left - this.offsetX;
        let y = touch.clientY - rect.top - this.offsetY;
        x = Math.max(20, Math.min(x, rect.width - 80));
        y = Math.max(20, Math.min(y, rect.height - 100));
        this.draggedPlayer.currentX = x;
        this.draggedPlayer.currentY = y;
        const playerEl = document.querySelector(`[data-player-id="${this.draggedPlayer.id}"]`);
        if (playerEl) {
            playerEl.style.left = x + 'px';
            playerEl.style.top = y + 'px';
        }
    }
    stopDrag() {
        this.isDragging = false;
        if (this.draggedPlayer) {
            const playerEl = document.querySelector(`[data-player-id="${this.draggedPlayer.id}"]`);
            if (playerEl) playerEl.classList.remove('dragging');
            this.saveState();
            this.draggedPlayer = null;
        }
        document.removeEventListener('touchmove', this.boundDrag);
        document.removeEventListener('touchend', this.boundStopDrag);
        document.removeEventListener('mousemove', this.boundDrag);
        document.removeEventListener('mouseup', this.boundStopDrag);
    }
}
let stadium;
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    stadium = isMobile ? new MobileStadium() : new FootballStadium();
});
function resetFormation() {
    if (stadium) {
        stadium.resetToDefaults();
    }
}
