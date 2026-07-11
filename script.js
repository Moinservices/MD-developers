// MDdevelopers Portfolio Script

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Mobile Navigation Drawer Toggle & Overlay
    const mobileToggle = document.getElementById("mobile-toggle");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    function closeSidebar() {
        if (sidebar) sidebar.classList.remove("open");
        if (overlay) overlay.classList.remove("active");
        if (mobileToggle) mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
        lucide.createIcons();
    }

    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener("click", () => {
            sidebar.classList.toggle("open");
            const isOpen = sidebar.classList.contains("open");
            
            if (isOpen) {
                mobileToggle.innerHTML = '<i data-lucide="x"></i>';
                if (overlay) overlay.classList.add("active");
            } else {
                mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
                if (overlay) overlay.classList.remove("active");
            }
            lucide.createIcons();
        });
    }

    if (overlay) {
        overlay.addEventListener("click", closeSidebar);
    }

    // Close sidebar drawer when clicking a navigation link (on mobile/tablet)
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", closeSidebar);
    });

    // 3. Calculator Tabs Navigation
    const tabAudit = document.getElementById("tab-audit");
    const tabRoi = document.getElementById("tab-roi");
    const contentAudit = document.getElementById("content-audit");
    const contentRoi = document.getElementById("content-roi");
    const resultsAuditView = document.getElementById("results-audit-view");
    const resultsRoiView = document.getElementById("results-roi-view");

    function setActiveTab(tab) {
        if (tab === "audit") {
            tabAudit.classList.add("active");
            tabRoi.classList.remove("active");
            contentAudit.classList.add("active");
            contentRoi.classList.remove("active");
            resultsAuditView.classList.add("active");
            resultsRoiView.classList.remove("active");
        } else {
            tabAudit.classList.remove("active");
            tabRoi.classList.add("active");
            contentAudit.classList.remove("active");
            contentRoi.classList.add("active");
            resultsAuditView.classList.remove("active");
            resultsRoiView.classList.add("active");
        }
    }

    if (tabAudit && tabRoi) {
        tabAudit.addEventListener("click", () => setActiveTab("audit"));
        tabRoi.addEventListener("click", () => setActiveTab("roi"));
    }

    // 4. Interactive SEO Audit Score Calculator
    const chkSsl = document.getElementById("chk-ssl");
    const chkMobile = document.getElementById("chk-mobile");
    const chkSpeed = document.getElementById("chk-speed");
    const chkMeta = document.getElementById("chk-meta");
    const chkContent = document.getElementById("chk-content");

    const scoreText = document.getElementById("score-text");
    const scoreLabel = document.getElementById("score-label");
    const scoreAdvice = document.getElementById("score-advice");
    const auditList = document.getElementById("audit-list");
    const progressCircle = document.querySelector(".progress-ring__circle");

    // Circumference of SVG Progress Ring (R = 70) => 2 * PI * 70 = 439.82
    const circumference = 2 * Math.PI * 70;
    if (progressCircle) {
        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        progressCircle.style.strokeDashoffset = circumference;
    }

    function setProgress(percent) {
        if (progressCircle) {
            const offset = circumference - (percent / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }
    }

    function calculateSEOScore() {
        if (!scoreText || !scoreLabel || !scoreAdvice || !auditList) return;

        let score = 0;
        const recommendations = [];

        if (chkSsl && chkSsl.checked) {
            score += 15;
        } else {
            recommendations.push("Install an SSL certificate to enable HTTPS and prevent browser warnings.");
        }

        if (chkMobile && chkMobile.checked) {
            score += 25;
        } else {
            recommendations.push("Optimize fluid grid layouts for mobile viewport sizes.");
        }

        if (chkSpeed && chkSpeed.checked) {
            score += 20;
        } else {
            recommendations.push("Compress high-resolution assets, defer script loading, and optimize load speeds under 2s.");
        }

        if (chkMeta && chkMeta.checked) {
            score += 15;
        } else {
            recommendations.push("Incorporate structured meta tags, header tags (H1-H3), and image alt tags.");
        }

        if (chkContent && chkContent.checked) {
            score += 25;
        } else {
            recommendations.push("Write fresh, high-quality content targeting your users' direct search intents.");
        }

        // Update radial progress circle & score number
        scoreText.innerText = `${score}%`;
        setProgress(score);

        // Classify health status & colors
        scoreLabel.className = "score-status";
        if (score <= 40) {
            scoreLabel.innerText = "Critical Optimizations Needed";
            scoreLabel.classList.add("red");
            scoreAdvice.innerText = "Your site is virtually invisible to search spiders and lacks basic mobile compliance. Critical engineering overhaul is needed.";
        } else if (score <= 75) {
            scoreLabel.innerText = "Needs Improvement";
            scoreLabel.classList.add("yellow");
            scoreAdvice.innerText = "You have basic foundations, but slow load times or suboptimal tags are holding back your organic growth potential.";
        } else {
            scoreLabel.innerText = "Excellent Technical Health";
            scoreLabel.classList.add("green");
            scoreAdvice.innerText = "Outstanding! Your site meets all modern technical SEO requirements. Continue publishing high-value client articles.";
        }

        // Build list elements
        auditList.innerHTML = "";
        if (recommendations.length === 0) {
            auditList.innerHTML = `<li><i data-lucide="check" style="color: var(--success); width: 14px; height: 14px; flex-shrink:0;"></i> Ready for high-end off-page campaigns!</li>`;
        } else {
            recommendations.forEach(rec => {
                const li = document.createElement("li");
                li.innerHTML = `<i data-lucide="alert-triangle" class="bullet-warning"></i> <span>${rec}</span>`;
                auditList.appendChild(li);
            });
        }
        lucide.createIcons();
    }

    // Bind checklist input events
    const checkboxes = [chkSsl, chkMobile, chkSpeed, chkMeta, chkContent];
    checkboxes.forEach(chk => {
        if (chk) {
            chk.addEventListener("change", calculateSEOScore);
        }
    });

    // Run initial SEO Audit calculation
    calculateSEOScore();


    // 5. Business Organic ROI Calculator
    const inputTraffic = document.getElementById("input-traffic");
    const inputConvRate = document.getElementById("input-conv-rate");
    const inputCustomerValue = document.getElementById("input-value");

    const outTraffic = document.getElementById("roi-traffic");
    const outConversions = document.getElementById("roi-conversions");
    const outRevenue = document.getElementById("roi-revenue");

    function calculateROI() {
        if (!inputTraffic || !inputConvRate || !inputCustomerValue || !outTraffic || !outConversions || !outRevenue) return;

        // Bugfix: Clamp inputs to guarantee non-negative logical computation values
        const traffic = Math.max(0, parseFloat(inputTraffic.value) || 0);
        const convRate = Math.max(0, Math.min(100, parseFloat(inputConvRate.value) || 0));
        const customerValue = Math.max(0, parseFloat(inputCustomerValue.value) || 0);

        // MDdevelopers core optimization yields an average +150% organic boost (1.5x additional traffic)
        const trafficIncrease = Math.round(traffic * 1.50);
        const additionalConversions = Math.round(trafficIncrease * (convRate / 100));
        const revenueLift = additionalConversions * customerValue;

        // Render formatted stats
        outTraffic.innerText = `+${trafficIncrease.toLocaleString()} visits`;
        outConversions.innerText = `+${additionalConversions.toLocaleString()} clients`;
        outRevenue.innerText = `+$${revenueLift.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    // Bind inputs event listeners
    const inputs = [inputTraffic, inputConvRate, inputCustomerValue];
    inputs.forEach(inp => {
        if (inp) {
            inp.addEventListener("input", calculateROI);
        }
    });

    // Run initial ROI projection
    calculateROI();


    // 6. Interactive Contact Form Mock
    const contactForm = document.getElementById("contact-form");
    const successAlert = document.getElementById("form-success");

    if (contactForm && successAlert) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Hide form controls
            contactForm.classList.add("hide");
            
            // Show custom success alert
            successAlert.classList.remove("hide");
            successAlert.scrollIntoView({ behavior: "smooth", block: "center" });
            
            // Reset fields
            contactForm.reset();
        });
    }


    // 7. Scroll-Linked Navigation Highlighting
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener("scroll", () => {
            let currentSectionId = "";
            const scrollPosition = window.scrollY + 150; // offset for triggers

            // Bugfix: Lock scroll highlight to contact section if reached document bottom
            const isBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60);

            if (isBottom) {
                currentSectionId = "contact";
            } else {
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;

                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        currentSectionId = section.getAttribute("id");
                    }
                });
            }

            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${currentSectionId}`) {
                    link.classList.add("active");
                }
            });
        });
    }
});
