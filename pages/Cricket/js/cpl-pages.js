(function() {
    function initCPLPages() {
        const pageType = document.body.getAttribute('data-cpl-page');
        switch(pageType) {
            case 'players':
                initPlayersPage();
                break;
            case 'scorecard':
                initScorecardPage();
                break;
            case 'tournament':
                initTournamentPage();
                break;
        }
    }
    function initPlayersPage() {
        const data = CPL_CONTENT.mergePlayersUniverse(CPL_CONTENT.defaultPlayersUniverse());
        const titleEl = document.querySelector('[data-players-page-title]');
        const leadEl = document.querySelector('[data-players-page-lead]');
        if (titleEl) titleEl.textContent = data.pageTitle;
        if (leadEl) leadEl.textContent = data.pageLead;
        const container = document.querySelector('[data-players-root]');
        if (container) {
            container.innerHTML = '';
            container.style.cssText = `
                display: flex !important;
                gap: 1.5rem !important;
                padding: 2rem !important;
                justify-content: center !important;
                align-items: stretch !important;
                overflow-x: auto !important;
            `;
            data.cards.forEach((player) => {
                const card = createPlayerCard(player);
                container.appendChild(card);
            });
        }
    }
    function createPlayerCard(player) {
        const article = document.createElement('article');
        article.className = 'player-card player-card--featured hover-lift';
        article.setAttribute('data-reveal', '');
        article.style.cssText = `
            background: linear-gradient(145deg, #0f172a 0%, #1e3a8a 50%, #3b82f6 100%) !important;
            border: none !important;
            border-radius: 20px !important;
            overflow: hidden !important;
            box-shadow: 0 20px 60px rgba(15, 23, 42, 0.3), 0 0 0 0 0 0 rgba(59, 130, 246, 0.1) !important;
            position: relative !important;
            transition: all 0.3s ease-out !important;
            flex: 1 !important;
            min-width: 350px !important;
        `;
        article.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 35px 80px rgba(15, 23, 42, 0.4), 0 0 0 0 0 0 rgba(59, 130, 246, 0.2)';
        });
        article.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 20px 60px rgba(15, 23, 42, 0.3), 0 0 0 0 0 0 rgba(59, 130, 246, 0.1)';
        });
        const liveData = CPL_CONTENT.mergeCricketLive(CPL_CONTENT.defaultCricketLive());
        const playerStats = liveData.players[player.id] || { score: '0', balls: '0', wickets: '0', runsProvided: '0' };
        const strikeRate = playerStats.balls > 0 ? Math.round((parseInt(playerStats.score) / parseInt(playerStats.balls)) * 100) : 0;
        let strikeRateColor = '#fff';
        if (strikeRate >= 130) strikeRateColor = '#4ade80';
        else if (strikeRate >= 110) strikeRateColor = '#fbbf24';
        else strikeRateColor = '#f87171';
        const roleBadgeClass = player.role.toLowerCase().replace(/\s+/g, '-');
        article.innerHTML = `
            <div class="player-card__image" style="position: relative; width: 100%; height: 400px; overflow: hidden; border-radius: 20px;">
                <img src="${player.image}" alt="${player.name}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; object-position: center top; transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);">
                <div class="player-card__badge ${roleBadgeClass}" style="position: absolute; top: 20px; right: 20px; background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(20px); color: #fff; padding: 10px 18px; border-radius: 30px; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; border: 1px solid rgba(255, 255, 255, 0.2); z-index: 10; transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);">${player.role}</div>
            </div>
            <div class="player-card__content" style="padding: 2rem; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(20px);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
                    <h3 class="player-card__name" style="margin: 0; color: #fff; font-size: 1.8rem; font-weight: 700; line-height: 1.2; letter-spacing: -0.5px;">${player.name}</h3>
                    <div class="player-card__rating" style="background: linear-gradient(135deg, #3b82f6, #60a5fa); color: #fff; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4); transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);">${player.rating}</div>
                </div>
                <p class="player-card__specialty" style="margin: 0 0 1rem 0; color: #fff; font-size: 0.95rem; font-weight: 500; font-style: italic; opacity: 0.9;">${player.specialty}</p>
                <div class="player-card__stats" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; padding: 1.5rem 0; background: rgba(0, 0, 0, 0.3); border-radius: 16px; backdrop-filter: blur(10px);">
                    <div style="text-align: center;">
                        <div style="font-size: 2.5rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);">${playerStats.score}</div>
                        <div style="font-size: 0.9rem; color: rgba(255, 255, 255, 0.7); margin-bottom: 0.3rem;">RUNS</div>
                        <div style="font-size: 1rem; color: rgba(255, 255, 255, 0.6);">(${playerStats.balls} balls)</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2.5rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);">${playerStats.wickets}</div>
                        <div style="font-size: 0.9rem; color: rgba(255, 255, 255, 0.7); margin-bottom: 0.3rem;">WICKETS</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2.5rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);">${strikeRate}</div>
                        <div style="font-size: 0.9rem; color: rgba(255, 255, 255, 0.7); margin-bottom: 0.3rem;">STRIKE RATE</div>
                        <div style="font-size: 1.2rem; color: ${strikeRateColor}; font-weight: 600; text-shadow: 0 2px 4px rgba(74, 222, 128, 0.3);">${strikeRate}%</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2.5rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);">${playerStats.runsProvided}</div>
                        <div style="font-size: 0.9rem; color: rgba(255, 255, 255, 0.7); margin-bottom: 0.3rem;">RUNS PROVIDED</div>
                    </div>
                </div>
                <p class="player-card__bio" style="margin-top: 1.5rem; padding: 1.5rem; background: rgba(255, 255, 255, 0.05); border-radius: 12px; font-size: 0.95rem; line-height: 1.6; color: rgba(255, 255, 255, 0.8); font-style: italic; backdrop-filter: blur(5px); border: 1px solid rgba(255, 255, 255, 0.1);">${player.bio}</p>
            </div>
        `;
        return article;
    }
    function initScorecardPage() {
        const data = CPL_CONTENT.mergeScorecardPage(CPL_CONTENT.defaultScorecardPage());
        const eyebrowEl = document.querySelector('[data-scorecard-eyebrow]');
        const titleEl = document.querySelector('[data-scorecard-title]');
        const leadEl = document.querySelector('[data-scorecard-lead]');
        const bengalLabelEl = document.querySelector('[data-scorecard-bengal-label]');
        const moonLabelEl = document.querySelector('[data-scorecard-moon-label]');
        if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;
        if (titleEl) titleEl.textContent = data.title;
        if (leadEl) leadEl.textContent = data.lead;
        if (bengalLabelEl) bengalLabelEl.textContent = data.bengalLabel;
        if (moonLabelEl) moonLabelEl.textContent = data.moonLabel;
        const bengalTbody = document.querySelector('[data-scorecard-bengal-tbody]');
        const moonTbody = document.querySelector('[data-scorecard-moon-tbody]');
        if (bengalTbody) {
            bengalTbody.innerHTML = '';
            data.bengalRows.forEach(row => {
                bengalTbody.appendChild(createScorecardRow(row));
            });
        }
        if (moonTbody) {
            moonTbody.innerHTML = '';
            data.moonRows.forEach(row => {
                moonTbody.appendChild(createScorecardRow(row));
            });
        }
    }
    function createScorecardRow(row) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.player}</td>
            <td>${row.r}</td>
            <td>${row.b}</td>
            <td>${row.sr}</td>
        `;
        return tr;
    }
    function initTournamentPage() {
        const data = CPL_CONTENT.mergeTournamentPage(CPL_CONTENT.defaultTournamentPage());
        const heroTitleEl = document.querySelector('[data-tournament-hero-title]');
        const heroLeadEl = document.querySelector('[data-tournament-hero-lead]');
        if (heroTitleEl) heroTitleEl.textContent = data.heroTitle;
        if (heroLeadEl) heroLeadEl.textContent = data.heroLead;
        const tbody = document.querySelector('[data-tournament-tbody]');
        if (tbody) {
            tbody.innerHTML = '';
            data.teams.forEach(team => {
                tbody.appendChild(createTournamentRow(team));
            });
        }
    }
    function createTournamentRow(team) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${team.rank}</td>
            <td>${team.team}</td>
            <td>${team.played}</td>
            <td>${team.won}</td>
            <td>${team.lost}</td>
            <td><strong>${team.pts}</strong></td>
        `;
        return tr;
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCPLPages);
    } else {
        initCPLPages();
    }
})();
