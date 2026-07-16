// Initialize Supabase
const SUPABASE_URL = 'https://crgfgiojhfjabramgvmd.supabase.co'; // Extracted from your screenshot
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Replace this with your actual Anon key
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 1. Fetch Projects Dynamically
async function fetchProjects() {
    const container = document.getElementById('projects-container');
    
    // Check if Anon Key is set
    if (SUPABASE_ANON_KEY === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyZ2ZnaW9qaGZqYWJyYW1ndm1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxODIxNTIsImV4cCI6MjA5OTc1ODE1Mn0.kVLMpAdFcQiv-ge6vcyYb--OoItbt67vIfzSLTGHLUY') {
        container.innerHTML = '<p style="color: #f59e0b;">Please replace YOUR_SUPABASE_ANON_KEY in script.js to see your projects.</p>';
        return;
    }

    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        container.innerHTML = '<p style="color: red;">Failed to load projects.</p>';
        console.error('Supabase Error:', error);
        return;
    }

    if (data.length === 0) {
        container.innerHTML = '<p>No projects found.</p>';
        return;
    }

    // Clear container and inject data
    container.innerHTML = '';
    data.forEach(project => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <span class="tech">${project.tech_stack}</span>
        `;
        container.appendChild(card);
    });
}

// 2. Handle Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btn = document.getElementById('submit-btn');
    const statusMsg = document.getElementById('form-status');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
        statusMsg.textContent = 'Please replace YOUR_SUPABASE_ANON_KEY in script.js to send messages.';
        statusMsg.style.color = '#f59e0b';
        return;
    }

    btn.textContent = 'Sending...';
    btn.disabled = true;

    const { error } = await supabase
        .from('contact_messages')
        .insert([{ name, email, message }]);

    if (error) {
        statusMsg.textContent = 'Failed to send message. Try again later.';
        statusMsg.style.color = '#ef4444'; // Red
    } else {
        statusMsg.textContent = 'Message sent successfully!';
        statusMsg.style.color = '#22c55e'; // Green
        document.getElementById('contact-form').reset();
    }

    btn.textContent = 'Send Message';
    btn.disabled = false;
    
    // Clear status message after 5 seconds
    setTimeout(() => { statusMsg.textContent = ''; }, 5000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Load projects when the page loads
window.addEventListener('DOMContentLoaded', fetchProjects);
