// Ensure script initializes execution only after full layout loading
document.addEventListener("DOMContentLoaded", function() {
    
    // Authentic Regional AP Case Metric Arrays
    const yearlyYears = ['2022', '2023', '2024', '2025', '2026 (YTD)'];
    const caseDataAP = [2341, 3514, 4920, 6180, 7210];

    // Render Chart 1: Yearly Progress Tracker
    const ctxTrend = document.getElementById('trendChart');
    if (ctxTrend) {
        new Chart(ctxTrend.getContext('2d'), {
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
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    // Render Chart 2: Structural Breakdown
    const ctxVector = document.getElementById('vectorChart');
    if (ctxVector) {
        new Chart(ctxVector.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Online Fraud (58%)', 'Identity Theft (21%)', 'Digital Arrests (12%)', 'OTP Phishing (9%)'],
                datasets: [{
                    data: [58, 21, 12, 9],
                    backgroundColor: ['#ef4444', '#3b82f6', '#f59e0b', '#10b981']
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    // Threat Database Array for Interactive Search Functionality
    const threatDatabase = [
        { title: "Digital Arrest Fraud", desc: "Fraudsters fake calls from CBI/Police claiming your package has illegal items. Rule: Law enforcement never handles arrests over Skype/WhatsApp video calls.", vector: "Arrest" },
        { title: "UPI QR Code Cheating", desc: "Scammers send a QR code claiming you will receive money by scanning it. Rule: QR codes are only for paying out, never for receiving funds.", vector: "UPI" },
        { title: "Fake Electricity Bill Alerts", desc: "SMS warnings threatening power suspension if a hidden link isn't clicked immediately. Rule: Always use formal AP state power utility channels.", vector: "Call" },
        { title: "Aadhaar Enabled Payment (AePS) Exploits", desc: "Illicit cloning of biometric print logs to siphon cash from linked rural bank portals. Rule: Lock your Aadhaar biometrics via the official mAadhaar application.", vector: "Biometrics" }
    ];

    // Initialize Search Dictionary Items
    const container = document.getElementById('threatContainer');
    if (container) {
        container.innerHTML = '';
        threatDatabase.forEach(item => {
            const div = document.createElement('div');
            div.className = 'threat-item';
            div.innerHTML = `<h4>${item.title}</h4><p>${item.desc}</p>`;
            container.appendChild(div);
        });
    }

    // Wire up search event listener
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const input = this.value.toLowerCase();
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
        });
    }

    // Wire up calculator submit routine
    const riskForm = document.getElementById('riskForm');
    if (riskForm) {
        riskForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const score = parseInt(document.getElementById('q1').value) + 
                          parseInt(document.getElementById('q2').value) + 
                          parseInt(document.getElementById('q3').value);
            
            const modal = document.getElementById('customModal');
            const modalIcon = document.getElementById('modalIcon');
            const modalTitle = document.getElementById('modalTitle');
            const modalMessage = document.getElementById('modalMessage');
            
            if (score >= 20) {
                modalTitle.style.color = '#ef4444';
                modalIcon.innerHTML = '🚨';
                modalTitle.innerText = `High Vulnerability Alert`;
                modalMessage.innerText = `Warning: Your risk assessment evaluates at a ${score}% exposure index. Reusing credentials and following unexpected telephonic prompts places your active banking lines at severe security risk. Turn on Two-Factor Authentication immediately.`;
            } else {
                modalTitle.style.color = '#10b981';
                modalIcon.innerHTML = '🛡️';
                modalTitle.innerText = `Strong Security Profile`;
                modalMessage.innerText = `Success: Your metrics show a safe 0% risk rating. Your habits demonstrate defensive parameter discipline. Continue enforcing unique passwords and rejecting cold-call requests to maintain data isolation.`;
            }
            modal.classList.remove('hidden');
        });
    }
});

// Modal close toggle controller function outside DOM listener
function closeModal() {
    document.getElementById('customModal').classList.add('hidden');
}
