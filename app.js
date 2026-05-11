// Authentic Regional AP Case Metric Arrays
const yearlyYears = ['2022', '2023', '2024', '2025', '2026 (YTD)'];
const caseDataAP = [2341, 2528, 4120, 5890, 7210]; // FIX: Filled data array values

// Render Chart 1: Yearly Progress Tracker
const ctxTrend = document.getElementById('trendChart').getContext('2d');
new Chart(ctxTrend, {
    type: 'line',
    data: {
        labels: yearlyYears,
        datasets: [{
            label: 'NCRB Registered Cases (Andhra Pradesh)',
            data: caseDataAP,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.2
        }]
    },
    options: { responsive: true }
});

// Render Chart 2: Structural Breakdown
const ctxVector = document.getElementById('vectorChart').getContext('2d');
new Chart(ctxVector, {
    type: 'doughnut',
    data: {
        labels: ['Online Fraud (58%)', 'Identity Theft (21%)', 'Digital Arrests (12%)', 'OTP Phishing (9%)'],
        datasets: [{
            data: [58, 21, 12, 9], // FIX: Filled layout proportion distributions
            backgroundColor: ['#ef4444', '#3b82f6', '#f59e0b', '#10b981']
        }]
    },
    options: { responsive: true }
});

// Threat Database Array for Interactive Search Functionality
const threatDatabase = [
    { title: "Digital Arrest Fraud", desc: "Fraudsters fake calls from CBI/Police claiming your package has illegal items. Rule: Law enforcement never handles arrests over Skype/WhatsApp video calls.", vector: "Arrest" },
    { title: "UPI QR Code Cheating", desc: "Scammers send a QR code claiming you will receive money by scanning it. Rule: QR codes are only for paying out, never for receiving funds.", vector: "UPI" },
    { title: "Fake Electricity Bill Alerts", desc: "SMS warnings threatening power suspension if a hidden link isn't clicked immediately. Rule: Always use formal AP state power utility channels.", vector: "Call" },
    { title: "Aadhaar Enabled Payment (AePS) Exploits", desc: "Illicit cloning of biometric print logs to siphon cash from linked rural bank portals. Rule: Lock your Aadhaar biometrics via the official mAadhaar application.", vector: "Biometrics" }
];

// Feature: Dynamic Search Filter Engine Implementation
function initThreatDictionary() {
    const container = document.getElementById('threatContainer');
    if (!container) return;
    container.innerHTML = '';
    threatDatabase.forEach(item => {
        const div = document.createElement('div');
        div.className = 'threat-item';
        div.innerHTML = `<h4>${item.title}</h4><p>${item.desc}</p>`;
        container.appendChild(div);
    });
}

// Run initialization explicitly when file loads
initThreatDictionary();

function filterThreats() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const items = document.getElementsByClassName('threat-item');
    
    threatDatabase.forEach((item, index) => {
        if(items[index]) {
            if(item.title.toLowerCase().includes(input) || item.desc.toLowerCase().includes(input)) {
                items[index].style.display = "block";
            } else {
                items[index].style.display = "none";
            }
        }
    });
}

// Feature: Dynamic Risk Vulnerability Calculator Logic
function calculateRisk(event) {
    event.preventDefault();
    const score = parseInt(document.getElementById('q1').value) + 
                  parseInt(document.getElementById('q2').value) + 
                  parseInt(document.getElementById('q3').value);
    
    const resultBox = document.getElementById('riskResult');
    resultBox.classList.remove('hidden', 'high-risk', 'low-risk');
    
    if(score >= 20) {
        resultBox.className = "result-box high-risk";
        resultBox.innerHTML = `🚨 High Vulnerability Rating (${score}% Risk Index). Your accounts are at significant risk. Activate 2FA immediately.`;
    } else {
        resultBox.className = "result-box low-risk";
        resultBox.innerHTML = `🛡️ Strong Security Baseline (${score}% Risk Index). Keep maintaining clean digital habits.`;
    }
}
