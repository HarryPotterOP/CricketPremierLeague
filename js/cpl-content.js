const CPL_CONTENT = {
  SCOREBOARD_KEY: 'cpl_scoreboard_matches_v1',
  CRICKET_LIVE_KEY: 'cpl_cricket_live_v1',
  SCORECARD_PAGE_KEY: 'cpl_scorecard_page_v1',
  TOURNAMENT_PAGE_KEY: 'cpl_tournament_page_v1',
  PLAYERS_PAGE_KEY: 'cpl_players_universe_v1',
  ARCHIVE_PAGE_KEY: 'cpl_archive_page_v1',
  FOOTBALL_GOALS_KEY: 'cpl_football_goals_v1',
  FOOTBALL_ROSTER_KEY: 'cpl_football_roster_v1',
  _clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  mergeScoreboard(base) {
    try {
      const raw = localStorage.getItem(this.SCOREBOARD_KEY);
      if (!raw) return this._clone(base);
      const stored = JSON.parse(raw);
      if (!stored || typeof stored !== 'object') return this._clone(base);
      const out = this._clone(base);
      Object.keys(stored).forEach((k) => {
        if (Array.isArray(stored[k])) out[k] = stored[k];
      });
      return out;
    } catch {
      return this._clone(base);
    }
  },
  async saveScoreboard(data) {
    try {
      localStorage.setItem(this.SCOREBOARD_KEY, JSON.stringify(data));
      return { ok: true };
    } catch (e) {
      return { ok: false, message: String(e.message || e) };
    }
  },
  defaultCricketLive() {
    return {
      players: {
        'gaming-elite': { score: '0', balls: '0', wickets: '0', runsProvided: '0', note: 'Elite Player' },
        'king-kohli': { score: '0', balls: '0', wickets: '0', runsProvided: '0', note: 'Captain' },
        'black-adam': { score: '0', balls: '0', wickets: '0', runsProvided: '0', note: 'Power Player' },
      },
     teams: { bengalWins: 0, moonWins: 0 },
    };
  },
  mergeCricketLive(base) {
    try {
      const raw = localStorage.getItem(this.CRICKET_LIVE_KEY);
      if (!raw) return this._clone(base);
      const stored = JSON.parse(raw);
      return this._deepMerge(this._clone(base), stored);
    } catch {
      return this._clone(base);
    }
  },
  _deepMerge(target, src) {
    if (!src || typeof src !== 'object') return target;
    Object.keys(src).forEach((k) => {
      if (src[k] && typeof src[k] === 'object' && !Array.isArray(src[k]) && typeof target[k] === 'object') {
        this._deepMerge(target[k], src[k]);
      } else {
        target[k] = src[k];
      }
    });
    return target;
  },
  async saveCricketLive(data) {
    try {
      localStorage.setItem(this.CRICKET_LIVE_KEY, JSON.stringify(data));
      return { ok: true };
    } catch (e) {
      return { ok: false, message: String(e.message || e) };
    }
  },
  defaultFootballGoals() {
    return {
      'gaming-elite': 0,
      'king-kohli': 0,
      'black-adam': 0,
    };
  },
  mergeFootballGoals(base) {
    try {
      const raw = localStorage.getItem(this.FOOTBALL_GOALS_KEY);
      if (!raw) return this._clone(base);
      const stored = JSON.parse(raw);
      return { ...base, ...stored };
    } catch {
      return this._clone(base);
    }
  },
  async saveFootballGoals(data) {
    try {
      localStorage.setItem(this.FOOTBALL_GOALS_KEY, JSON.stringify(data));
      return { ok: true };
    } catch (e) {
      return { ok: false, message: String(e.message || e) };
    }
  },
  async resetScoreboard() {
    localStorage.removeItem(this.SCOREBOARD_KEY);
    return { ok: true };
  },
  async resetCricketLive() {
    localStorage.removeItem(this.CRICKET_LIVE_KEY);
    return { ok: true };
  },
  defaultScorecardPage() {
    return {
      eyebrow: 'Match completed',
      title: 'Bengal Challengers vs Moon Knight',
      lead: 'CPL 2026 - Final Scorecard',
      bengalLabel: 'Bengal Challengers batting',
      moonLabel: 'Moon Knight batting',
      bengalRows: [
        { player: 'King Kohli', r: '0', b: '0', sr: '0.0' },
        { player: 'Gaming Elite', r: '0', b: '0', sr: '0.0' },
        { player: '', r: '', b: '', sr: '' },
      ],
      moonRows: [
        { player: 'Black Adam', r: '0', b: '0', sr: '0.0' },
        { player: '', r: '', b: '', sr: '' },
        { player: '', r: '', b: '', sr: '' },
      ],
    };
  },
  mergeScorecardPage(base) {
    try {
      const raw = localStorage.getItem(this.SCORECARD_PAGE_KEY);
      if (!raw) return this._clone(base);
      const stored = JSON.parse(raw);
      return this._deepMerge(this._clone(base), stored);
    } catch {
      return this._clone(base);
    }
  },
  async saveScorecardPage(data) {
    try {
      localStorage.setItem(this.SCORECARD_PAGE_KEY, JSON.stringify(data));
      return { ok: true };
    } catch (e) {
      return { ok: false, message: String(e.message || e) };
    }
  },
  async resetScorecardPage() {
    localStorage.removeItem(this.SCORECARD_PAGE_KEY);
    return { ok: true };
  },
  defaultTournamentPage() {
    return {
      heroTitle: 'Tournament center',
      heroLead:
        'CPL 2026 Standings and Points Table - Live Updates',
      teams: [
        { rank: 1, team: 'Bengal Challengers', played: 0, won: 0, lost: 0, pts: 0 },
        { rank: 2, team: 'Moon Knight', played: 0, won: 0, lost: 0, pts: 0 },
      ],
    };
  },
  mergeTournamentPage(base) {
    try {
      const raw = localStorage.getItem(this.TOURNAMENT_PAGE_KEY);
      if (!raw) return this._clone(base);
      const stored = JSON.parse(raw);
      return this._deepMerge(this._clone(base), stored);
    } catch {
      return this._clone(base);
    }
  },
  async saveTournamentPage(data) {
    try {
      localStorage.setItem(this.TOURNAMENT_PAGE_KEY, JSON.stringify(data));
      return { ok: true };
    } catch (e) {
      return { ok: false, message: String(e.message || e) };
    }
  },
  async resetTournamentPage() {
    localStorage.removeItem(this.TOURNAMENT_PAGE_KEY);
    return { ok: true };
  },
  defaultPlayersUniverse() {
    return {
      pageTitle: 'Elite Performers',
      pageLead: 'CPL roster spotlight — power ratings and roles.',
      cards: [
        {
          id: 'black-adam',
          name: 'Black Adam',
          rating: '94.5',
          role: 'Power Finisher',
          image: '../../../assets/images/Boruto.jpg',
          bio: 'Explosive hitter with match-winning ability.',
          specialty: 'Moon Knight',
        },
        {
          id: 'king-kohli',
          name: 'King Kohli',
          rating: '95.0',
          role: 'Master Batter',
          image: '../../../assets/images/ViratKohli.jpg',
          bio: 'Classical technique with consistent run-scoring.',
          specialty: 'Bengal Challengers',
        },
        {
          id: 'gaming-elite',
          name: 'Gaming Elite',
          rating: '95.8',
          role: 'All-Rounder',
          image: '../../../assets/images/Elite.jpg',
          bio: 'Complete player with both bat and ball skills.',
          specialty: 'Bengal Challengers',
        },
      ],
    };
  },
  mergePlayersUniverse(base) {
    try {
      const raw = localStorage.getItem(this.PLAYERS_PAGE_KEY);
      if (!raw) return this._clone(base);
      const stored = JSON.parse(raw);
      return this._deepMerge(this._clone(base), stored);
    } catch {
      return this._clone(base);
    }
  },
  async savePlayersUniverse(data) {
    try {
      localStorage.setItem(this.PLAYERS_PAGE_KEY, JSON.stringify(data));
      return { ok: true };
    } catch (e) {
      return { ok: false, message: String(e.message || e) };
    }
  },
  async resetPlayersUniverse() {
    localStorage.removeItem(this.PLAYERS_PAGE_KEY);
    return { ok: true };
  },
  defaultArchivePage() {
    return {
      pageTitle: 'Cricket Premier League Archive',
      pageLead: 'Season summaries and player logs.',
      season: {
        year: '2026',
        winner: 'TBD',
        motm: 'TBD',
        note: 'Season in progress - All player statistics tracked',
      },
      archiveTable: [
        { player: 'Gaming Elite', image: '../../assets/images/Elite.jpg', score: '0', wickets: '0', runsProvided: '0' },
        { player: 'King Kohli', image: '../../assets/images/ViratKohli.jpg', score: '0', wickets: '0', runsProvided: '0' },
        { player: 'Black Adam', image: '../../assets/images/Boruto.jpg', score: '0', wickets: '0', runsProvided: '0' },
        { player: 'Kalki', image: '../../assets/images/Kalki.webp', score: '0', wickets: '0', runsProvided: '0' },
        { player: 'Thala', image: '../../assets/images/MoonKnight.jpg', score: '0', wickets: '0', runsProvided: '0' },
        { player: 'Arise', image: '../../assets/images/Bengali.jpg', score: '0', wickets: '0', runsProvided: '0' },
      ],
      matches: [
        {
          id: 'match1',
          date: '2024-03-15',
          teams: 'Bengal Challengers vs Moon Knight',
          result: 'Bengal Challengers won by 5 wickets',
          highlight: 'Thrilling last over finish',
          players: [
            { name: 'King Kohli', image: '../../assets/images/ViratKohli.jpg', role: 'Batsman', runs: 45, wickets: 2, catches: 3 },
            { name: 'Gaming Elite', image: '../../assets/images/Elite.jpg', role: 'All-rounder', runs: 32, wickets: 4, catches: 2 },
            { name: 'Black Adam', image: '../../assets/images/Boruto.jpg', role: 'Bowler', runs: 15, wickets: 6, catches: 1 }
          ]
        },
        {
          id: 'match2',
          date: '2024-03-10',
          teams: 'Moon Knight vs Gaming Elite',
          result: 'Moon Knight won by 3 runs',
          highlight: 'Captain knock by Thala',
          players: [
            { name: 'Black Adam', image: '../../assets/images/Boruto.jpg', role: 'Batsman', runs: 67, wickets: 1, catches: 2 },
            { name: 'Thala', image: '../../assets/images/MoonKnight.jpg', role: 'All-rounder', runs: 28, wickets: 3, catches: 4 },
            { name: 'Kalki', image: '../../assets/images/Kalki.webp', role: 'Wicket Keeper', runs: 12, wickets: 0, catches: 5 }
          ]
        },
        {
          id: 'match3',
          date: '2024-03-05',
          teams: 'Gaming Elite vs Bengal Challengers',
          result: 'Gaming Elite won by 4 wickets',
          highlight: 'Super over spell',
          players: [
            { name: 'Gaming Elite', image: '../../assets/images/Elite.jpg', role: 'Bowler', runs: 18, wickets: 5, catches: 1 },
            { name: 'King Kohli', image: '../../assets/images/ViratKohli.jpg', role: 'Batsman', runs: 52, wickets: 0, catches: 2 },
            { name: 'Arise', image: '../../assets/images/Bengali.jpg', role: 'All-rounder', runs: 22, wickets: 2, catches: 3 }
          ]
        }
      ],
    };
  },
  mergeArchivePage(base) {
    try {
      const raw = localStorage.getItem(this.ARCHIVE_PAGE_KEY);
      if (!raw) return this._clone(base);
      const stored = JSON.parse(raw);
      return this._deepMerge(this._clone(base), stored);
    } catch {
      return this._clone(base);
    }
  },
  async saveArchivePage(data) {
    try {
      localStorage.setItem(this.ARCHIVE_PAGE_KEY, JSON.stringify(data));
      return { ok: true };
    } catch (e) {
      return { ok: false, message: String(e.message || e) };
    }
  },
  async resetArchivePage() {
    localStorage.removeItem(this.ARCHIVE_PAGE_KEY);
    return { ok: true };
  },
  async resetFootballGoals() {
    localStorage.removeItem(this.FOOTBALL_GOALS_KEY);
    return { ok: true };
  },
  defaultFootballRoster() {
    return {
      pageTitle: 'Living Legends',
      pageLead: 'Elite football squad showcasing talent and teamwork.',
      players: [
        {
          id: 'gaming-elite',
          name: 'Gaming Elite',
          number: '7',
          position: 'Forward',
          image: '../../assets/images/Elite.jpg',
          bio: 'Elite striker with exceptional goal-scoring ability.',
        },
        {
          id: 'king-kohli',
          name: 'King Kohli',
          number: '18',
          position: 'Midfielder',
          image: '../../assets/images/ViratKohli.jpg',
          bio: 'Creative playmaker with vision and passing range.',
        },
        {
          id: 'black-adam',
          name: 'Black Adam',
          number: '1',
          position: 'Goalkeeper',
          image: '../../assets/images/Boruto.jpg',
          bio: 'Reliable last line of defense with quick reflexes.',
        },
      ],
    };
  },
  mergeFootballRoster(base) {
    try {
      const raw = localStorage.getItem(this.FOOTBALL_ROSTER_KEY);
      if (!raw) return this._clone(base);
      const stored = JSON.parse(raw);
      return this._deepMerge(this._clone(base), stored);
    } catch {
      return this._clone(base);
    }
  },
  async saveFootballRoster(data) {
    try {
      localStorage.setItem(this.FOOTBALL_ROSTER_KEY, JSON.stringify(data));
      return { ok: true };
    } catch (e) {
      return { ok: false, message: String(e.message || e) };
    }
  },
  async resetFootballRoster() {
    localStorage.removeItem(this.FOOTBALL_ROSTER_KEY);
    return { ok: true };
  },
  defaultNewsAndHighlights() {
    return {
      pageTitle: 'News & Highlights',
      pageLead: 'Latest updates and exciting moments from the tournament.',
      items: [
        {
          id: 'news1',
          type: 'news',
          title: 'Tournament Kicks Off',
          date: '2024-03-01',
          content: 'The much-awaited CPL tournament begins with opening ceremony.',
        },
        {
          id: 'highlight1',
          type: 'highlight',
          title: 'Match of the Day',
          date: '2024-03-15',
          content: 'Thrilling contest between Bengal Challengers and Moon Knight.',
        },
      ],
    };
  },
  mergeNewsAndHighlights(base) {
    try {
      const raw = localStorage.getItem(this.NEWS_HIGHLIGHTS_KEY);
      if (!raw) return this._clone(base);
      const stored = JSON.parse(raw);
      return this._deepMerge(this._clone(base), stored);
    } catch {
      return this._clone(base);
    }
  },
  async saveNewsAndHighlights(data) {
    try {
      localStorage.setItem(this.NEWS_HIGHLIGHTS_KEY, JSON.stringify(data));
      return { ok: true };
    } catch (e) {
      return { ok: false, message: String(e.message || e) };
    }
  },
  async resetNewsAndHighlights() {
    localStorage.removeItem(this.NEWS_HIGHLIGHTS_KEY);
    return { ok: true };
  },
};
