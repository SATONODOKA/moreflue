document.addEventListener('DOMContentLoaded', function() {
    const screens = document.querySelectorAll('.screen');
    const navItems = document.querySelectorAll('.bottom-nav-item');
    const projectTabs = document.querySelectorAll('.project-tab');

    const btnCreateFromDashboard = document.getElementById('btnCreateFromDashboard');
    const fabCreate = document.getElementById('fabCreate');
    const btnCreateBack = document.getElementById('btnCreateBack');
    const btnCancelCreate = document.getElementById('btnCancelCreate');
    const btnSaveDraft = document.getElementById('btnSaveDraft');
    const projectForm = document.getElementById('projectForm');

    const projectsList = document.getElementById('projects-list');
    const badgeAll = document.getElementById('badge-all');
    const badgeOpen = document.getElementById('badge-open');
    const badgeDraft = document.getElementById('badge-draft');
    const badgeNegotiating = document.getElementById('badge-negotiating');
    const badgeDone = document.getElementById('badge-done');

    const statActiveProjects = document.getElementById('stat-active-projects');
    const dashboardProjectsList = document.getElementById('dashboard-projects-list');

    const toast = document.getElementById('toast');

    // 画面切り替え
    function showScreen(screenId) {
      screens.forEach(screen => screen.classList.remove('active'));
      const activeScreen = document.getElementById(screenId);
      if (activeScreen) activeScreen.classList.add('active');

      navItems.forEach(item => item.classList.remove('active'));
      const activeNavItem = document.querySelector(`.bottom-nav-item[data-screen="${screenId}"]`);
      if(activeNavItem) activeNavItem.classList.add('active');

      // ★ スクロール位置を必ずリセット（上の謎余白対策）
      const scroller = document.querySelector('main.flex-1.overflow-y-auto') || document.querySelector('main');
      if (scroller) scroller.scrollTop = 0;
    }

    // トースト
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 1800);
    }

    // ナビゲーション
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const screenId = this.dataset.screen;
            showScreen(screenId);
        });
    });

    // タブ切り替え（簡易フィルタ）
    projectTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            projectTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            [...projectsList.children].forEach(card => {
                if (!card.classList.contains('bg-white')) return; // 念のため
                const status = card.getAttribute('data-status') || '下書き';
                card.style.display = (filter === 'all' || filter === status) ? '' : 'none';
            });
        });
    });

    // 案件作成画面へ遷移
    function gotoCreate() {
        // フォーム初期化
        projectForm.reset();
        showScreen('project-create');
    }
    btnCreateFromDashboard.addEventListener('click', gotoCreate);
    fabCreate.addEventListener('click', gotoCreate);

    // 戻る / キャンセル
    function backFromCreate() {
        window.history.length > 1 ? showScreen('dashboard') : showScreen('projects');
    }
    btnCreateBack.addEventListener('click', backFromCreate);
    btnCancelCreate.addEventListener('click', backFromCreate);

    // カードDOM生成
    function makeProjectCard({ title, media, quota, status }) {
        const statusStyle = {
            '募集中': 'text-yellow-500 bg-yellow-100',
            '調整中': 'text-blue-500 bg-blue-100',
            '完了':   'text-green-500 bg-green-100',
            '下書き': 'text-gray-600 bg-gray-100'
        }[status] || 'text-gray-600 bg-gray-100';

        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow p-4 space-y-3';
        card.setAttribute('data-status', status);
        card.innerHTML = `
            <div class="flex items-start">
              <div class="flex-1 min-w-0 mr-2">
                <h3 class="font-bold text-sub-2 break-words">${escapeHtml(title)}</h3>
              </div>
              <span class="text-xs font-bold ${statusStyle} px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">${status}</span>
            </div>
            <div class="grid grid-cols-3 gap-2 text-center">
                <div><p class="text-xs text-gray-500">応募</p><p class="font-bold text-lg text-sub-2">0</p></div>
                <div><p class="text-xs text-gray-500">採用</p><p class="font-bold text-lg text-sub-2">0 / <span class="text-sm">${quota}</span></p></div>
                <div><p class="text-xs text-gray-500">成果(来店)</p><p class="font-bold text-lg text-main">0</p></div>
            </div>
            <div class="flex items-center justify-between text-xs text-gray-500">
                <span>媒体：${escapeHtml(media)}</span>
                <button class="px-3 py-1 bg-main text-white rounded-lg font-bold hover:bg-opacity-90 text-sm">詳細を見る</button>
            </div>
        `;
        return card;
    }

    // ダッシュボードにミニ行を追加
    function addToDashboardList(title) {
        const wrap = document.createElement('div');
        wrap.className = 'p-3 border rounded-lg';
        wrap.innerHTML = `
            <p class="font-bold text-sm">${escapeHtml(title)}</p>
            <div class="flex justify-between items-center mt-2">
                <div class="flex -space-x-2">
                    <img class="h-8 w-8 rounded-full object-cover border-2 border-white" src="https://placehold.co/80x80/FFC0CB/000000?text=N" alt="N">
                    <img class="h-8 w-8 rounded-full object-cover border-2 border-white" src="https://placehold.co/80x80/ADD8E6/000000?text=E" alt="E">
                </div>
                <span class="text-xs text-gray-500">募集開始</span>
                <a href="#" class="px-3 py-1 text-xs bg-main text-white rounded-full">詳細</a>
            </div>
        `;
        dashboardProjectsList.prepend(wrap);
    }

    // バッジと件数更新
    function updateBadges() {
        const allCards = projectsList.querySelectorAll('.bg-white.rounded-lg.shadow.p-4.space-y-3');
        const counts = { '募集中': 0, '調整中': 0, '完了': 0, '下書き': 0 };
        allCards.forEach(c => {
            const st = c.getAttribute('data-status') || '下書き';
            if (counts[st] != null) counts[st] += 1;
        });
        const total = Object.values(counts).reduce((a,b)=>a+b, 0);

        badgeAll.textContent = total;
        badgeOpen.textContent = counts['募集中'];
        badgeDraft.textContent = counts['下書き'];
        badgeNegotiating.textContent = counts['調整中'];
        badgeDone.textContent = counts['完了'];

        // 進行中（=募集中+調整中）をダッシュボードに反映（簡易定義）
        statActiveProjects.textContent = counts['募集中'] + counts['調整中'];
    }

    // XSS簡易対策
    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, s => ({
            '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
        }[s]));
    }

    // 下書き保存
    btnSaveDraft.addEventListener('click', () => {
        const formData = new FormData(projectForm);
        const title = formData.get('title')?.trim();
        const media = formData.get('media');
        const quota = formData.get('quota') || 0;
        if (!title || !media) {
            showToast('必須項目を入力してください');
            return;
        }
        const card = makeProjectCard({ title, media, quota, status: '下書き' });
        projectsList.prepend(card);
        updateBadges();
        showToast('下書きとして保存しました');
        showScreen('projects');
    });

    // 公開して募集（submit）
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(projectForm);
        const title  = (formData.get('title') || '').trim();
        const media  = formData.get('media');
        const quota  = parseInt(formData.get('quota'), 10) || 0; // 数値化
        const method = formData.get('method'); // '公募' or 'スカウト'
        const desc   = (formData.get('desc') || '').trim();

        // 必須チェック
        if (!title || !media || !quota || !method || !desc) {
            showToast('必須項目を入力してください');
            return;
        }
        // 期間チェック（簡易）
        const sd = projectForm.startDate.value;
        const ed = projectForm.endDate.value;
        if (sd && ed && sd > ed) {
            showToast('終了日は開始日以降を指定してください');
            return;
        }

        if (method === 'スカウト') {
            // 公開せずに「下書き」として保存し、スカウト開始へ
            const card = makeProjectCard({ title, media, quota, status: '下書き' });
            projectsList.prepend(card);
            updateBadges();

            // 直近の下書き案件を検索画面で使いたい場合に備えて保持（任意）
            window.currentDraftProject = { title, media, quota, method, desc };

            showToast('下書きを作成しました。スカウト先を選びましょう');
            showScreen('influencer-search');

            // （任意）案件管理を「下書き」フィルタ表示に合わせたい場合は次の3行を使う
            projectTabs.forEach(t => t.classList.toggle('active', t.dataset.filter === '下書き'));
            [...projectsList.children].forEach(c => {
                const st = c.getAttribute('data-status') || '下書き';
                c.style.display = (st === '下書き') ? '' : 'none';
            });
            return; // ★ 公開しないのでここで終了
        }

        // 公募（公開）
        const card = makeProjectCard({ title, media, quota, status: '募集中' });
        projectsList.prepend(card);
        updateBadges();
        addToDashboardList(title);

        showToast('案件を公開しました');
        showScreen('projects');

        // 「募集中」タブをハイライトして表示を揃える
        projectTabs.forEach(t => {
            t.classList.toggle('active', t.dataset.filter === '募集中');
        });
        [...projectsList.children].forEach(c => {
            const st = c.getAttribute('data-status') || '下書き';
            c.style.display = (st === '募集中') ? '' : 'none';
        });
    });

    // 初期画面
    showScreen('dashboard');

    // グラフ
    const ctx = document.getElementById('analyticsChartMobile')?.getContext('2d');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['7/12', '7/17', '7/22', '7/27', '8/1', '8/6', '8/11'],
                datasets: [{
                    label: '来店数',
                    data: [12, 19, 15, 25, 22, 30, 48],
                    borderColor: '#FF6F61',
                    backgroundColor: 'rgba(255, 111, 97, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, ticks: { font: { size: 10 } } },
                    x: { ticks: { font: { size: 10 } } }
                }
            }
        });
    }

    // 初期バッジ計算
    updateBadges();

    /* =========================
       Scout Templates
       ========================= */

    // テンプレ定義（必要に応じて増減OK）
    const SCOUT_TEMPLATES = [
        {
            id: 'simple_greeting',
            name: '基本あいさつ',
            body: `{{influencer}} 様\nはじめまして、{{project}}を担当しております。弊店の施策にてご紹介のご相談です。\n{{due}} までのご対応をご検討いただけますと幸いです。ご不明点あればご連絡ください。`
        },
        {
            id: 'new_menu',
            name: '新メニュー紹介',
            body: `{{influencer}} 様\n新メニューの認知拡大で、{{project}} のご協力をお願いしたくご連絡しました。\n{{due}} 目処で1投稿のご対応はご検討可能でしょうか。内容は柔軟に相談させてください。`
        },
        {
            id: 'limited_campaign',
            name: '期間限定キャンペーン',
            body: `{{influencer}} 様\n期間限定キャンペーンに伴い、{{project}} のPRをご相談です。\n{{due}} までのご対応可否と、気になる点があれば教えてください。`
        },
        {
            id: 'reservation_lead',
            name: '予約送客向け',
            body: `{{influencer}} 様\n予約送客の強化で {{project}} を計画中です。\n{{due}} までに1本投稿いただけないかと考えております。内容・条件はご希望に合わせて調整します。`
        }
    ];

    const templateSelect = document.getElementById('templateSelect');
    const templateInsert = document.getElementById('templateInsert');
    const scoutMessage   = document.getElementById('scoutMessage');
    let currentInfluencerName = ''; // openScoutSheetでセット
    let currentProjectTitle   = ''; // セレクト変更時にセット

    // テンプレのセレクトを描画
    function renderTemplateOptions() {
        if (!templateSelect) return;
        templateSelect.innerHTML = '';
        SCOUT_TEMPLATES.forEach(t => {
            const opt = document.createElement('option');
            opt.value = t.id;
            opt.textContent = t.name;
            templateSelect.appendChild(opt);
        });
    }

    // プレースホルダ置換
    function fillTemplate(body) {
        const due = document.getElementById('scoutDue')?.value || '';
        const projSel = document.getElementById('scoutProjectSelect');
        const projTitle = currentProjectTitle || (projSel?.value || '');
        return body
            .replaceAll('{{influencer}}', currentInfluencerName || 'インフルエンサー様')
            .replaceAll('{{project}}', projTitle || '当店案件')
            .replaceAll('{{due}}', due || 'ご都合の良い日程');
    }

    // 挿入ボタン
    templateInsert?.addEventListener('click', () => {
        const id = templateSelect?.value;
        const tpl = SCOUT_TEMPLATES.find(t => t.id === id);
        if (!tpl) return;
        const filled = fillTemplate(tpl.body);
        // 既存文の末尾に追記ではなく、置き換えたい場合は下行を = に
        scoutMessage.value = (scoutMessage.value ? (scoutMessage.value + '\n\n') : '') + filled;
    });

    /* =========================
       Scout Sheet 開閉（既存の関数を活用）
       ========================= */

    const scoutSheet   = document.getElementById('scoutSheet');
    const scoutOverlay = document.getElementById('scoutOverlay');
    const scoutClose   = document.getElementById('scoutClose');
    const scoutCancel  = document.getElementById('scoutCancel');
    const scoutSend    = document.getElementById('scoutSend');

    const scoutAvatar  = document.getElementById('scoutAvatar');
    const scoutNameEl  = document.getElementById('scoutName');
    const scoutMetaEl  = document.getElementById('scoutMeta');

    const scoutProjectSelect = document.getElementById('scoutProjectSelect');
    const scoutDue     = document.getElementById('scoutDue');

    function openScoutSheet(influencer) {
        // インフルエンサー情報
        scoutAvatar.src = influencer.avatar || '';
        scoutAvatar.alt = influencer.name || 'avatar';
        scoutNameEl.textContent = influencer.name || 'インフルエンサー';
        scoutMetaEl.textContent = `フォロワー: ${influencer.followers || '-'} ／ マッチ度: ${influencer.match || '-'}%`;
        currentInfluencerName = influencer.name || '';

        // 案件選択肢
        buildProjectOptions();

        // 希望納期 初期値 = +10日
        const today = new Date();
        const tenDays = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10);
        scoutDue.value = tenDays.toISOString().slice(0,10);

        // メッセージ初期化 & テンプレセレクト描画
        scoutMessage.value = '';
        renderTemplateOptions();

        // 初期プロジェクトタイトル保存
        currentProjectTitle = (function getSelectedTitle(){
            const val = scoutProjectSelect.value;
            if (val === '__CREATE_NEW__') return 'スカウト案件（新規下書き）';
            if (val === '__CURRENT_DRAFT__' && window.currentDraftProject?.title) return window.currentDraftProject.title;
            return val;
        })();

        scoutSheet.classList.remove('hidden');
    }

    function closeScoutSheet() {
        scoutSheet.classList.add('hidden');
    }

    scoutOverlay.addEventListener('click', closeScoutSheet);
    scoutClose.addEventListener('click', closeScoutSheet);
    scoutCancel.addEventListener('click', closeScoutSheet);

    // プロジェクト変更時にタイトルを保持
    scoutProjectSelect.addEventListener('change', () => {
        const val = scoutProjectSelect.value;
        if (val === '__CREATE_NEW__') {
            currentProjectTitle = 'スカウト案件（新規下書き）';
        } else if (val === '__CURRENT_DRAFT__' && window.currentDraftProject?.title) {
            currentProjectTitle = window.currentDraftProject.title;
        } else {
            currentProjectTitle = val;
        }
    });

    /* =========================
       「探す」画面のスカウトボタン押下 → シート表示（イベント委譲）
       ========================= */

    document.getElementById('influencer-search').addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        if (btn.textContent.trim() !== 'スカウト') return;

        const card = btn.closest('.bg-white.rounded-lg.shadow');
        if (!card) return;

        const avatar = card.querySelector('img')?.src || '';
        const name   = card.querySelector('p.font-bold.text-sub-2')?.textContent?.trim() || 'インフルエンサー';
        const followersText = card.querySelector('.text-xs.text-gray-500')?.textContent?.trim() || 'フォロワー: -';
        const matchText     = card.querySelector('.text-xs.font-bold.text-green-600')?.textContent?.trim() || 'マッチ度: -%';
        const followers = followersText.replace('フォロワー:', '').trim();
        const match = matchText.replace('マッチ度:', '').replace('%','').trim();

        openScoutSheet({ avatar, name, followers, match });
    });

    // プロジェクト候補の生成
    function buildProjectOptions() {
        // 既存カードから「募集中」「下書き」を抽出
        const cards = [...projectsList.querySelectorAll('.bg-white.rounded-lg.shadow.p-4.space-y-3')];
        const options = [];

        cards.forEach(card => {
            const status = card.getAttribute('data-status') || '';
            if (status === '募集中' || status === '下書き') {
                const title = card.querySelector('h3')?.textContent?.trim() || '無題';
                options.push({ title, status });
            }
        });

        // セレクトを再構築
        scoutProjectSelect.innerHTML = '';
        // currentDraftProject があれば先頭に
        if (window.currentDraftProject?.title) {
            const opt = document.createElement('option');
            opt.value = `__CURRENT_DRAFT__`;
            opt.textContent = `下書き: ${window.currentDraftProject.title}`;
            scoutProjectSelect.appendChild(opt);
        }

        options.forEach(o => {
            const opt = document.createElement('option');
            opt.value = o.title;
            opt.textContent = `${o.status}: ${o.title}`;
            scoutProjectSelect.appendChild(opt);
        });

        // 仕上げに「新規下書き案件を作成」
        const optNew = document.createElement('option');
        optNew.value = '__CREATE_NEW__';
        optNew.textContent = '＋ 新規下書き案件を作成';
        scoutProjectSelect.appendChild(optNew);
    }

    // プロジェクトカード検索（タイトル一致）
    function findProjectCardByTitle(title) {
        const cards = [...projectsList.querySelectorAll('.bg-white.rounded-lg.shadow.p-4.space-y-3')];
        return cards.find(c => (c.querySelector('h3')?.textContent?.trim() || '') === title);
    }

    // 新規の下書きカードを作る（簡易）
    function createQuickDraft(titleHint = 'スカウト案件') {
        const today = new Date();
        const nice = `${titleHint} (${today.getMonth()+1}/${today.getDate()})`;
        const media = 'Instagram';
        const quota = 1;
        const card = makeProjectCard({ title: nice, media, quota, status: '下書き' });
        projectsList.prepend(card);
        updateBadges();
        return nice;
    }

    /* =========================
       送信：案件にひもづけ → ステータス「調整中」 → 遷移（従来ロジック）
       ========================= */

    scoutSend.addEventListener('click', () => {
        const selectVal = scoutProjectSelect.value;
        let projectTitle = null;

        // プロジェクト決定（既存の関数を利用）
        if (selectVal === '__CREATE_NEW__') {
            projectTitle = createQuickDraft('スカウト案件');
        } else if (selectVal === '__CURRENT_DRAFT__') {
            projectTitle = window.currentDraftProject?.title;
            if (!findProjectCardByTitle(projectTitle)) {
                const media = window.currentDraftProject?.media || 'Instagram';
                const quota = window.currentDraftProject?.quota || 1;
                const card = makeProjectCard({ title: projectTitle, media, quota, status: '下書き' });
                projectsList.prepend(card);
                updateBadges();
            }
        } else {
            projectTitle = selectVal;
        }

        if (!projectTitle) {
            showToast('案件の選択に失敗しました');
            return;
        }

        // メッセージと納期の軽いバリデーション
        if (!scoutMessage.value.trim()) {
            showToast('メッセージを入力してください');
            return;
        }
        if (!scoutDue.value) {
            showToast('希望納期を選択してください');
            return;
        }

        // ステータス更新（調整中）
        const card = findProjectCardByTitle(projectTitle);
        if (card) {
            card.setAttribute('data-status', '調整中');
            const badge = card.querySelector('span.text-xs.font-bold');
            if (badge) {
                badge.className = 'text-xs font-bold text-blue-500 bg-blue-100 px-2 py-1 rounded-full';
                badge.textContent = '調整中';
            }
            if (!card.querySelector('[data-scouted="1"]')) {
                const infoRow = card.querySelector('.flex.items-center.justify-between.text-xs.text-gray-500');
                if (infoRow) {
                    const mark = document.createElement('span');
                    mark.setAttribute('data-scouted', '1');
                    mark.className = 'ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-600';
                    mark.textContent = 'スカウト送信済';
                    infoRow.prepend(mark);
                }
            }
        }

        updateBadges();
        
        // ★スカウト内容をチャットへ自動投稿
        appendScoutMessageToChat({
            name: currentInfluencerName,
            avatar: scoutAvatar?.src || '',
            projectTitle,
            messageText: scoutMessage.value.trim()
        });
        
        showToast('スカウトを送信しました');
        closeScoutSheet();

        // 案件管理 → 調整中タブ表示
        showScreen('projects');
        projectTabs.forEach(t => t.classList.toggle('active', t.dataset.filter === '調整中'));
        [...projectsList.children].forEach(c => {
            const st = c.getAttribute('data-status') || '下書き';
            c.style.display = (st === '調整中') ? '' : 'none';
        });
    });

    /* =========================
       Chat Functionality（リスト＋詳細）
       ========================= */

    const chatListView   = document.getElementById('chat-list-view');
    const chatDetailView = document.getElementById('chat-detail-view');
    const chatListEl     = document.getElementById('chatList');
    const chatSearch     = document.getElementById('chatSearch');

    const chatMessages = document.getElementById('chatMessages');
    const chatInput    = document.getElementById('chatInput');
    const chatSend     = document.getElementById('chatSend');
    const chatBack     = document.getElementById('chatBack');

    const chatAvatar   = document.getElementById('chatAvatar');
    const chatNameEl   = document.getElementById('chatName');
    const chatSubtitle = document.getElementById('chatSubtitle');

    // デモ用会話データ（必要に応じてAPI接続に置換可）
    let conversations = [
        {
            id: 'conv-i',
            name: 'お散歩カフェI',
            avatar: 'https://placehold.co/80x80/FFDAB9/000000?text=I',
            project: '夏の新メニュー「情熱のマンゴーパフェ」PR',
            unread: 1,
            lastAt: '10:21',
            messages: [
                { role: 'them', text: '初めまして！案件内容を拝見しました。詳細教えていただけますか？', time: '10:21' },
                { role: 'me', text: 'ご連絡ありがとうございます。8/20までにInstagram投稿をお願いしたいです。', time: '10:22' }
            ]
        },
        {
            id: 'conv-g',
            name: 'グルメ日記G',
            avatar: 'https://placehold.co/80x80/FF69B4/000000?text=G',
            project: '平日限定ランチセットの認知度向上',
            unread: 0,
            lastAt: '昨日',
            messages: [
                { role: 'them', text: '平日ランチ、実食レビューの可否を確認したいです。', time: '昨日' }
            ]
        },
        {
            id: 'conv-h',
            name: 'ランチ研究所H',
            avatar: 'https://placehold.co/80x80/BA55D3/000000?text=H',
            project: 'オープン1周年記念キャンペーン',
            unread: 0,
            lastAt: '8/10',
            messages: [
                { role: 'me', text: '当日の投稿で大丈夫です。よろしくお願いします！', time: '8/10' }
            ]
        }
    ];

    let currentChatId = null;

    /* ---------- リスト描画 ---------- */
    function renderChatList(filterText = '') {
        chatListEl.innerHTML = '';
        const q = filterText.trim().toLowerCase();

        conversations
            // 並び順：未読優先 → 最終更新が新しい順（簡易）
            .slice()
            .sort((a, b) => (b.unread - a.unread) || (new Date('2025/08/13 ' + (b.lastAt || '00:00')) - new Date('2025/08/13 ' + (a.lastAt || '00:00'))))
            // フィルタ
            .filter(c => {
                if (!q) return true;
                return (c.name + ' ' + c.project).toLowerCase().includes(q);
            })
            // レンダリング
            .forEach(c => {
                const last = c.messages[c.messages.length - 1];
                const li = document.createElement('li');
                li.innerHTML = `
                    <button class="w-full flex items-center gap-3 p-3 bg-white hover:bg-gray-50">
                      <img src="${c.avatar}" alt="${c.name}" class="w-12 h-12 rounded-full object-cover">
                      <div class="flex-1 min-w-0 text-left">
                        <div class="flex items-center justify-between">
                          <p class="font-bold text-sub-2 truncate">${escapeHtml(c.name)}</p>
                          <span class="text-xs text-gray-400 ml-2 whitespace-nowrap">${escapeHtml(c.lastAt || '')}</span>
                        </div>
                        <p class="text-xs text-gray-500 truncate">${escapeHtml(c.project)}</p>
                        <p class="text-xs text-gray-600 truncate">${escapeHtml(last?.text || '')}</p>
                      </div>
                      ${c.unread ? `<span class="ml-2 px-2 py-0.5 text-xs rounded-full bg-main text-white">未読 ${c.unread}</span>` : ''}
                    </button>
                `;
                li.querySelector('button').addEventListener('click', () => openChatById(c.id));
                chatListEl.appendChild(li);
            });
    }

    chatSearch?.addEventListener('input', (e) => renderChatList(e.target.value));

    /* ---------- 詳細表示を開く ---------- */
    function openChatById(id) {
        const c = conversations.find(v => v.id === id);
        if (!c) return;
        currentChatId = id;

        // ヘッダー情報
        chatAvatar.src = c.avatar;
        chatAvatar.alt = c.name;
        chatNameEl.textContent = c.name;
        chatSubtitle.textContent = c.project;

        // 未読クリア
        c.unread = 0;

        // メッセージ描画
        renderMessages(c);

        // 画面切り替え
        chatListView.classList.add('hidden');
        chatDetailView.classList.remove('hidden');

        // 一番下へ
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    /* ---------- メッセージ描画 ---------- */
    function renderMessages(convo) {
        chatMessages.innerHTML = '';
        // 日付区切り（簡易）
        const divider = document.createElement('div');
        divider.className = 'text-center text-xs text-gray-400';
        divider.textContent = '2025/08/13';
        chatMessages.appendChild(divider);

        convo.messages.forEach(m => {
            if (m.kind === 'scout') {
                const wrap = document.createElement('div');
                wrap.className = 'flex items-start justify-end space-x-2';
                wrap.innerHTML = `
                    <div class="max-w-[70%] space-y-2">
                      <div class="bg-main text-white rounded-lg p-3 shadow text-sm">${escapeHtml(m.text)}</div>
                      <button class="open-project-detail w-full px-3 py-2 rounded-lg border border-sub-2 text-sub-2 bg-white text-sm font-bold"
                              data-project-title="${escapeHtml(m.projectTitle || '')}">
                        案件詳細を見る
                      </button>
                    </div>
                    <img src="https://placehold.co/80x80/F4B95F/3D4F75?text=店" class="w-8 h-8 rounded-full object-cover mt-1" alt="自分">
                `;
                chatMessages.appendChild(wrap);
            } else if (m.role === 'them') {
                const wrap = document.createElement('div');
                wrap.className = 'flex items-start space-x-2';
                wrap.innerHTML = `
                    <img src="${convo.avatar}" class="w-8 h-8 rounded-full object-cover mt-1" alt="${convo.name}">
                    <div class="bg-white rounded-lg p-3 shadow text-sm max-w-[70%]">${escapeHtml(m.text)}</div>
                `;
                chatMessages.appendChild(wrap);
            } else {
                const wrap = document.createElement('div');
                wrap.className = 'flex items-start justify-end space-x-2';
                wrap.innerHTML = `
                    <div class="bg-main text-white rounded-lg p-3 shadow text-sm max-w-[70%]">${escapeHtml(m.text)}</div>
                    <img src="https://placehold.co/80x80/F4B95F/3D4F75?text=店" class="w-8 h-8 rounded-full object-cover mt-1" alt="自分">
                `;
                chatMessages.appendChild(wrap);
            }
        });
    }

    /* ---------- 送信 ---------- */
    chatSend?.addEventListener('click', sendCurrentChat);
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendCurrentChat();
    });

    function sendCurrentChat() {
        const text = chatInput.value.trim();
        if (!text || !currentChatId) return;

        const c = conversations.find(v => v.id === currentChatId);
        if (!c) return;

        // 追加
        const nowLabel = new Date().toTimeString().slice(0,5);
        c.messages.push({ role: 'me', text, time: nowLabel });
        c.lastAt = nowLabel;

        // 再描画
        renderMessages(c);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // リストも更新（スニペット・時間）
        renderChatList(chatSearch?.value || '');
    }

    /* ---------- 戻る（詳細→リスト） ---------- */
    chatBack?.addEventListener('click', () => {
        chatDetailView.classList.add('hidden');
        chatListView.classList.remove('hidden');
        // リストを最新化
        renderChatList(chatSearch?.value || '');
    });

    /* ---------- 画面初期化 ---------- */
    // 「チャット」タブに来たらリストが見えるよう、初期レンダリング
    renderChatList();

    // チャット内CTA（案件詳細） → 案件詳細画面を開く
    chatMessages?.addEventListener('click', (e) => {
        const btn = e.target.closest('.open-project-detail');
        if (!btn) return;
        const title = btn.dataset.projectTitle || '案件詳細';
        openProjectDetail({ title, status: '調整中' }); // 既存の関数を利用
    });

    function slugIdFromName(name) {
        return 'conv-' + String(name || '').toLowerCase().replace(/\s+/g,'-').replace(/[^\w-]/g,'');
    }

    function ensureConversationForInfluencer({ name, avatar, projectTitle }) {
        const id = slugIdFromName(name);
        let c = conversations.find(v => v.id === id);
        if (!c) {
            c = { id, name, avatar, project: projectTitle || '', unread: 0, lastAt: '', messages: [] };
            conversations.unshift(c);
        } else if (projectTitle) {
            c.project = projectTitle; // 直近案件名を更新
        }
        return c;
    }

    function appendScoutMessageToChat({ name, avatar, projectTitle, messageText }) {
        const c = ensureConversationForInfluencer({ name, avatar, projectTitle });
        const nowLabel = new Date().toTimeString().slice(0,5);
        c.messages.push({ role: 'me', kind: 'scout', text: messageText, projectTitle, time: nowLabel });
        c.lastAt = nowLabel;
        // リストを最新化（スニペット＆時刻）
        renderChatList(chatSearch?.value || '');
    }

    /* =========================
       案件詳細：イベント委譲＆描画
       ========================= */
    const projectDetailScreen = document.getElementById('project-detail');
    const pdTitle   = document.getElementById('project-detail-title');
    const pdStatus  = document.getElementById('project-detail-status');
    const pdMedia   = document.getElementById('pd-media');
    const pdQuota   = document.getElementById('pd-quota');
    const pdMethod  = document.getElementById('pd-method');
    const pdPeriod  = document.getElementById('pd-period');
    const pdComp    = document.getElementById('pd-comp');
    const pdPaytype = document.getElementById('pd-paytype');
    const pdPayval  = document.getElementById('pd-payval');

    const pdApplicants = document.getElementById('pd-applicants');
    const pdHired      = document.getElementById('pd-hired');
    const pdVisits     = document.getElementById('pd-visits');
    const pdBookings   = document.getElementById('pd-bookings');
    const pdRevenue    = document.getElementById('pd-revenue');
    const pdCoupon     = document.getElementById('pd-coupon');

    const pdPeople = document.getElementById('pd-people');
    const pdCopyUrlBtn = document.getElementById('pd-copy-url');
    const pdOpenChatBtn = document.getElementById('pd-open-chat');
    const projectDetailBack = document.getElementById('projectDetailBack');

    // 画面切替のヘルパー（既存 showScreen を流用）
    function showProjectDetail() {
        // 他のscreenを非表示に
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        projectDetailScreen.classList.add('active'); // displayはclass制御に統一

        // ★ 案件詳細表示直後にスクロールを最上部へ
        const scroller = document.querySelector('main.flex-1.overflow-y-auto') || document.querySelector('main');
        if (scroller) scroller.scrollTop = 0;
    }
    function hideProjectDetail() {
        projectDetailScreen.classList.remove('active'); // inline styleは使わない
    }

    // ダッシュボード側の「詳細」リンク（委譲）
    dashboardProjectsList?.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        if (link.textContent.trim() !== '詳細') return;

        const wrap = link.closest('.p-3.border.rounded-lg');
        if (!wrap) return;
        const title = wrap.querySelector('p.font-bold')?.textContent?.trim() || '案件詳細';
        // 状態は不明なので「募集中」扱いで開く（カードから推測不可のため）
        openProjectDetail({ title, status: '募集中' });
        e.preventDefault();
    });

    // 案件一覧側の「詳細を見る」ボタン（委譲）
    projectsList?.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        if (btn.textContent.trim() !== '詳細を見る') return;

        const card = btn.closest('.bg-white.rounded-lg.shadow.p-4.space-y-3');
        if (!card) return;
        const title = card.querySelector('h3')?.textContent?.trim() || '案件詳細';
        const status = card.getAttribute('data-status') || '下書き';
        // 媒体・枠はカード内表記から取得
        const infoRow = card.querySelector('.flex.items-center.justify-between.text-xs.text-gray-500');
        const mediaText = infoRow?.querySelector('span')?.textContent?.replace('媒体：','').trim() || '—';
        const quota = infoRow?.querySelector('span + button') ? (card.querySelectorAll('.grid .text-sub-2 span.text-sm')[0]?.textContent || '—') : (card.querySelectorAll('.grid .text-sub-2 span.text-sm')[0]?.textContent || '—');
        openProjectDetail({ title, status, media: mediaText, quota });
    });

    // 戻る
    projectDetailBack?.addEventListener('click', () => {
        hideProjectDetail();
        // 案件管理へ戻す
        const target = document.getElementById('projects');
        if (target) {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            target.classList.add('active');
        }
    });

    // クリップボード
    pdCopyUrlBtn?.addEventListener('click', async () => {
        const inp = document.getElementById('pd-track-url');
        try {
            await navigator.clipboard.writeText(inp.value);
            // 既存のtoastを流用
            const toast = document.getElementById('toast');
            if (toast) {
                toast.textContent = 'リンクをコピーしました';
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 1500);
            }
        } catch {}
    });

    // デモ用：応募者/採用者の例
    function renderPeople(listEl, people = []) {
        listEl.innerHTML = '';
        people.forEach(p => {
            const li = document.createElement('li');
            li.className = 'py-3 flex items-center gap-3';
            li.innerHTML = `
              <img src="${p.avatar}" class="w-10 h-10 rounded-full object-cover" alt="${p.name}">
              <div class="flex-1 min-w-0">
                <p class="font-bold text-sub-2 truncate">${escapeHtml(p.name)}</p>
                <p class="text-xs text-gray-500 truncate">${escapeHtml(p.note || '')}</p>
              </div>
              <span class="text-xs px-2 py-0.5 rounded-full ${p.badgeClass || 'bg-blue-50 text-blue-600'}">${p.badge || '進行中'}</span>
            `;
            listEl.appendChild(li);
        });
    }

    // Chart.js：成果トレンド
    let pdChartRef = null;
    function renderPdChart(data) {
        const ctx = document.getElementById('pdChart')?.getContext('2d');
        if (!ctx) return;
        if (pdChartRef) { pdChartRef.destroy(); }
        pdChartRef = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    { label: '来店', data: data.visits, borderColor: '#FF6F61', backgroundColor: 'rgba(255,111,97,0.1)', tension: 0.4, fill: true },
                    { label: '予約', data: data.bookings, borderColor: '#3D4F75', backgroundColor: 'rgba(61,79,117,0.08)', tension: 0.4, fill: true }
                ]
            },
            options: { responsive: true, plugins: { legend: { display: true } }, scales: { y: { beginAtZero: true } } }
        });
    }

    // メイン：案件詳細を開く
    function openProjectDetail(seed = {}) {
        // データ（カードから拾えない値は一旦ダミー or 未設定）
        const data = {
            title:  seed.title  || '案件詳細',
            status: seed.status || '下書き',
            media:  seed.media  || 'Youtube',
            quota:  seed.quota  || '2名',
            method: seed.method || '公募 / スカウト',
            period: seed.period || '2025/9/1~2025/9/30',
            comp:   seed.comp   || '有り',            // 無償提供の有無
            paytype:seed.paytype|| '予約1人あたり', // 成果報酬タイプ
            payval: seed.payval || '500円',
            // KPI（ダミー）
            applicants: seed.applicants ?? 15,
            hired:      seed.hired ?? 1,
            visits:     seed.visits ?? 28,
            bookings:   seed.bookings ?? 9,
            revenue:    seed.revenue ?? '¥120,000',
            coupon:     seed.coupon ?? '18%'
        };

        // ヘッダー
        pdTitle.textContent = data.title;
        pdStatus.textContent = data.status;
        pdStatus.className = 'text-xs font-bold px-2 py-1 rounded-full ' + ({
            '募集中':'text-yellow-600 bg-yellow-100',
            '調整中':'text-blue-600 bg-blue-100',
            '完了':'text-green-600 bg-green-100',
            '下書き':'text-gray-600 bg-gray-100'
        }[data.status] || 'text-gray-600 bg-gray-100');

        // 概要
        pdMedia.textContent  = data.media;
        pdQuota.textContent  = data.quota;
        pdMethod.textContent = data.method;
        pdPeriod.textContent = data.period;
        pdComp.textContent   = data.comp;
        pdPaytype.textContent= data.paytype;
        pdPayval.textContent = data.payval;

        // KPI
        pdApplicants.textContent = data.applicants;
        pdHired.textContent      = data.hired + (data.quota && data.quota !== '—' ? ` / ${data.quota}` : '');
        pdVisits.textContent     = data.visits;
        pdBookings.textContent   = data.bookings;
        pdRevenue.textContent    = data.revenue;
        pdCoupon.textContent     = data.coupon;

        // People（例）
        renderPeople(pdPeople, [
            { name:'お散歩カフェI', avatar:'https://placehold.co/80x80/FFDAB9/000000?text=I', note:'採用 / 納期 8/20', badge:'採用', badgeClass:'bg-green-50 text-green-600' },
            { name:'グルメ日記G', avatar:'https://placehold.co/80x80/FF69B4/000000?text=G', note:'応募あり / 調整中', badge:'調整中', badgeClass:'bg-blue-50 text-blue-600' }
        ]);

        // 成果チャート（例）
        renderPdChart({
            labels: ['7/22','7/27','8/1','8/6','8/11'],
            visits: [12, 18, 22, 26, 28],
            bookings:[3, 5, 7, 8, 9]
        });

        // 画面表示
        showProjectDetail();
    }

    // 「チャットへ」ボタン → チャット画面へ
    pdOpenChatBtn?.addEventListener('click', () => {
        hideProjectDetail();
        const chatScreen = document.getElementById('chat');
        if (chatScreen) {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            chatScreen.classList.add('active');
        }
    });

    /* =========================
       インフルエンサー詳細
       ========================= */
    const infScreen  = document.getElementById('influencer-detail');
    const infBack    = document.getElementById('infBack');
    const infTitle   = document.getElementById('inf-title');
    const infMatch   = document.getElementById('inf-match-badge');
    const infAvatar  = document.getElementById('inf-avatar');
    const infName    = document.getElementById('inf-name');
    const infFollowers = document.getElementById('inf-followers');
    const infLikes   = document.getElementById('inf-likes');
    const infER      = document.getElementById('inf-er');
    const infPosts   = document.getElementById('inf-posts');
    const infCurrentProject = document.getElementById('inf-current-project');
    const infScoutBtn = document.getElementById('infScoutBtn');

    let infAgeChartRef = null, infGenderChartRef = null;
    let currentInfluencerForDetail = null;

    // クリック：カード→詳細（スカウトボタンは除外）
    document.getElementById('influencer-search')?.addEventListener('click', (e) => {
        if (e.target.closest('button')) return; // 「スカウト」ボタンは既存処理へ
        const card = e.target.closest('.bg-white.rounded-lg.shadow');
        if (!card) return;

        const avatar = card.querySelector('img')?.src || '';
        const name   = card.querySelector('p.font-bold.text-sub-2')?.textContent?.trim() || 'インフルエンサー';
        const followersText = card.querySelector('.text-xs.text-gray-500')?.textContent?.replace('フォロワー:','').trim() || '';
        const matchText     = card.querySelector('.text-xs.font-bold.text-green-600')?.textContent?.replace('マッチ度:','').trim() || '';

        openInfluencerDetail({ avatar, name, followersText, matchText });
    });

    // 戻る
    infBack?.addEventListener('click', () => showScreen('influencer-search'));

    // 表示
    function openInfluencerDetail({ avatar, name, followersText, matchText }) {
        currentInfluencerForDetail = { avatar, name };

        // タイトル／バッジ
        infTitle.textContent = 'インフルエンサー詳細';
        const matchVal = (matchText || '').replace('%','').trim();
        infMatch.textContent = (matchVal ? matchVal : '—') + (matchVal ? '%' : '');
        infMatch.className = 'text-xs font-bold px-2 py-1 rounded-full ' + (
            Number(matchVal) >= 85 ? 'bg-green-100 text-green-600' :
            Number(matchVal) >= 70 ? 'bg-yellow-100 text-yellow-600' :
                                      'bg-gray-100 text-gray-600'
        );

        // サマリー
        infAvatar.src = avatar || '';
        infAvatar.alt = name || 'avatar';
        infName.textContent = name;

        // フォロワー数→数値化（「1.5万」「8,700」対応）
        const fNum = followersToNumber(followersText);
        infFollowers.textContent = formatFollowers(fNum);

        // 簡易メトリクス（例：ER=5%、平均いいね = followers * ER）
        const er = 5; // デモ用
        const likes = Math.max(1, Math.round(fNum * er / 100));
        infLikes.textContent = numberWithComma(likes);
        infER.textContent = er + '%';

        // 最近の投稿（ダミー）
        renderInfPosts(avatar);

        // オーディエンス（ダミーグラフ）
        renderInfCharts();

        // 現在の案件（直近の下書き・募集中を拾う簡易例）
        const firstCard = document.querySelector('#projects-list .bg-white.rounded-lg.shadow.p-4.space-y-3 h3');
        infCurrentProject.textContent = firstCard?.textContent?.trim() || '未選択';

        // 表示
        showScreen('influencer-detail');
    }

    // スカウトCTA → 既存のシートを起動
    infScoutBtn?.addEventListener('click', () => {
        if (!currentInfluencerForDetail) return;
        const { avatar, name } = currentInfluencerForDetail;
        openScoutSheet({
            avatar,
            name,
            followers: infFollowers.textContent,
            match: infMatch.textContent.replace('%','')
        });
    });

    // ユーティリティ
    function followersToNumber(text) {
        if (!text) return 0;
        const t = text.replace(/[, ]/g,'');
        if (t.includes('万')) {
            const n = parseFloat(t.replace('万','')) || 0;
            return Math.round(n * 10000);
        }
        return parseInt(t, 10) || 0;
    }
    function numberWithComma(n) {
        return (n || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    function formatFollowers(n) {
        if (n >= 10000) {
            const v = Math.round((n/10000)*10)/10;
            return v + '万';
        }
        return numberWithComma(n);
    }
    function renderInfPosts(seedImg) {
        infPosts.innerHTML = '';
        const colors = ['FFC0CB','ADD8E6','FFD700','90EE90','FFA07A','AFEEEE'];
        for (let i=0;i<6;i++){
            const img = document.createElement('img');
            img.src = `https://placehold.co/300x300/${colors[i%colors.length]}/000000?text=Post`;
            img.alt = 'post';
            img.className = 'w-full aspect-square object-cover rounded';
            infPosts.appendChild(img);
        }
    }
    function renderInfCharts() {
        const ageCtx = document.getElementById('infChartAge')?.getContext('2d');
        const genderCtx = document.getElementById('infChartGender')?.getContext('2d');
        if (infAgeChartRef) infAgeChartRef.destroy();
        if (infGenderChartRef) infGenderChartRef.destroy();

        if (ageCtx) {
            infAgeChartRef = new Chart(ageCtx, {
                type: 'bar',
                data: {
                    labels: ['18-24','25-34','35-44','45-54','55+'],
                    datasets: [{ label:'比率(%)', data:[25,40,22,9,4] }]
                },
                options: { responsive:true, plugins:{ legend:{ display:false } }, scales:{ y:{ beginAtZero:true, max:100 } } }
            });
        }
        if (genderCtx) {
            infGenderChartRef = new Chart(genderCtx, {
                type: 'doughnut',
                data: {
                    labels: ['男性','女性'],
                    datasets: [{ data:[68,32] }]
                },
                options: { responsive:true, plugins:{ legend:{ display:true, position:'bottom' } } }
            });
        }
    }
});