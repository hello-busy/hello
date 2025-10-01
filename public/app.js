const API_URL = '/api';
let token = localStorage.getItem('token');
let currentUser = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (token) {
        showApp();
        loadData();
    } else {
        showAuth();
    }
    
    setupEventListeners();
});

function setupEventListeners() {
    // Auth
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    
    // Modals
    document.getElementById('create-post-btn').addEventListener('click', () => openModal('post-modal'));
    document.getElementById('create-community-btn').addEventListener('click', () => openModal('community-modal'));
    document.getElementById('create-challenge-btn').addEventListener('click', () => openModal('challenge-modal'));
    
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
        });
    });
    
    // Forms
    document.getElementById('post-form').addEventListener('submit', handleCreatePost);
    document.getElementById('community-form').addEventListener('submit', handleCreateCommunity);
    document.getElementById('challenge-form').addEventListener('submit', handleCreateChallenge);
    
    // Challenge tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            loadChallenges(e.target.dataset.type);
        });
    });
}

// Auth functions
async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });
        
        const data = await response.json();
        if (response.ok) {
            token = data.token;
            currentUser = data.user;
            localStorage.setItem('token', token);
            showApp();
            loadData();
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Registration failed');
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        
        const data = await response.json();
        if (response.ok) {
            token = data.token;
            currentUser = data.user;
            localStorage.setItem('token', token);
            showApp();
            loadData();
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Login failed');
    }
}

function handleLogout() {
    token = null;
    currentUser = null;
    localStorage.removeItem('token');
    showAuth();
}

// UI functions
function showAuth() {
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('app-section').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'none';
    document.getElementById('user-info').innerHTML = '';
}

function showApp() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('app-section').style.display = 'block';
    document.getElementById('logout-btn').style.display = 'block';
    updateUserInfo();
}

function updateUserInfo() {
    if (currentUser) {
        document.getElementById('user-info').innerHTML = `
            <div class="user-stats">
                <span class="level-badge">Level ${currentUser.level}</span>
                <span class="stat">⭐ ${currentUser.points} pts</span>
            </div>
        `;
    }
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Data loading functions
async function loadData() {
    await loadFeed();
    await loadCommunities();
    await loadChallenges('all');
}

async function loadFeed() {
    try {
        const response = await fetch(`${API_URL}/posts/feed`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        
        const data = await response.json();
        displayFeed(data.posts);
    } catch (error) {
        console.error('Failed to load feed:', error);
    }
}

function displayFeed(posts) {
    const container = document.getElementById('feed-container');
    if (!posts || posts.length === 0) {
        container.innerHTML = '<div class="card"><p>No posts yet. Create the first one!</p></div>';
        return;
    }
    
    container.innerHTML = posts.map(post => `
        <div class="post-card">
            <div class="post-header">
                <div class="author-info">
                    <strong>${post.author.username}</strong>
                    <span class="level-badge">Lv ${post.author.level}</span>
                </div>
                <small>${new Date(post.createdAt).toLocaleDateString()}</small>
            </div>
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <div class="post-actions">
                <button class="action-btn" onclick="likePost('${post._id}')">
                    👍 ${post.likes.length} Like
                </button>
                <button class="action-btn">
                    💬 ${post.comments.length} Comments
                </button>
            </div>
        </div>
    `).join('');
}

async function loadCommunities() {
    try {
        const response = await fetch(`${API_URL}/communities`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        
        const communities = await response.json();
        displayCommunities(communities);
    } catch (error) {
        console.error('Failed to load communities:', error);
    }
}

function displayCommunities(communities) {
    const container = document.getElementById('communities-container');
    if (!communities || communities.length === 0) {
        container.innerHTML = '<div class="card"><p>No communities yet. Create one!</p></div>';
        return;
    }
    
    container.innerHTML = communities.map(community => `
        <div class="community-card">
            <div class="card-header">
                <h3>${community.name}</h3>
                <span class="badge">${community.isPrivate ? '🔒 Private' : '🌍 Public'}</span>
            </div>
            <p>${community.description}</p>
            <div class="card-actions">
                <span>👥 ${community.members.length} members</span>
                ${!community.isPrivate ? `<button class="action-btn" onclick="joinCommunity('${community._id}')">Join</button>` : ''}
            </div>
        </div>
    `).join('');
}

async function loadChallenges(type) {
    try {
        const url = type === 'all' ? `${API_URL}/challenges` : `${API_URL}/challenges?type=${type}`;
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        
        const challenges = await response.json();
        displayChallenges(challenges);
    } catch (error) {
        console.error('Failed to load challenges:', error);
    }
}

function displayChallenges(challenges) {
    const container = document.getElementById('challenges-container');
    if (!challenges || challenges.length === 0) {
        container.innerHTML = '<div class="card"><p>No challenges yet. Create one!</p></div>';
        return;
    }
    
    container.innerHTML = challenges.map(challenge => `
        <div class="challenge-card">
            <div class="card-header">
                <h3>${challenge.title}</h3>
                <span class="level-badge">${challenge.type === 'compete' ? '⚔️ Compete' : '🤝 Collab'}</span>
            </div>
            <p>${challenge.description}</p>
            <div class="card-actions">
                <span>⭐ ${challenge.points} points</span>
                <span>👥 ${challenge.participants.length} participants</span>
                <span class="badge">${challenge.status}</span>
                <button class="action-btn" onclick="joinChallenge('${challenge._id}')">Join</button>
            </div>
        </div>
    `).join('');
}

// Action functions
async function handleCreatePost(e) {
    e.preventDefault();
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const isPublic = document.getElementById('post-public').checked;
    
    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content, isPublic }),
        });
        
        if (response.ok) {
            document.getElementById('post-modal').style.display = 'none';
            e.target.reset();
            await loadFeed();
        }
    } catch (error) {
        alert('Failed to create post');
    }
}

async function handleCreateCommunity(e) {
    e.preventDefault();
    const name = document.getElementById('community-name').value;
    const description = document.getElementById('community-description').value;
    const isPrivate = document.getElementById('community-private').checked;
    
    try {
        const response = await fetch(`${API_URL}/communities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ name, description, isPrivate }),
        });
        
        if (response.ok) {
            document.getElementById('community-modal').style.display = 'none';
            e.target.reset();
            await loadCommunities();
        }
    } catch (error) {
        alert('Failed to create community');
    }
}

async function handleCreateChallenge(e) {
    e.preventDefault();
    const title = document.getElementById('challenge-title').value;
    const description = document.getElementById('challenge-description').value;
    const type = document.getElementById('challenge-type').value;
    const points = document.getElementById('challenge-points').value;
    const startDate = document.getElementById('challenge-start').value;
    const endDate = document.getElementById('challenge-end').value;
    
    try {
        const response = await fetch(`${API_URL}/challenges`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ title, description, type, points, startDate, endDate }),
        });
        
        if (response.ok) {
            document.getElementById('challenge-modal').style.display = 'none';
            e.target.reset();
            await loadChallenges('all');
        }
    } catch (error) {
        alert('Failed to create challenge');
    }
}

async function likePost(postId) {
    try {
        await fetch(`${API_URL}/posts/${postId}/like`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
        });
        await loadFeed();
    } catch (error) {
        console.error('Failed to like post');
    }
}

async function joinCommunity(communityId) {
    try {
        const response = await fetch(`${API_URL}/communities/${communityId}/join`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
        });
        
        if (response.ok) {
            await loadCommunities();
            alert('Joined community successfully!');
        }
    } catch (error) {
        alert('Failed to join community');
    }
}

async function joinChallenge(challengeId) {
    try {
        const response = await fetch(`${API_URL}/challenges/${challengeId}/join`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
        });
        
        if (response.ok) {
            await loadChallenges('all');
            alert('Joined challenge successfully!');
        }
    } catch (error) {
        alert('Failed to join challenge');
    }
}
