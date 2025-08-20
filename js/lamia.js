        // Loading animation
        window.addEventListener('load', function() {
            const loader = document.querySelector('.loader');
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 1500);
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');

        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });

        // Back to top button
        const backToTop = document.getElementById('backToTop');

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Form submission
        const contactForm = document.getElementById('contactForm');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just log it and show an alert
            console.log({ name, email, subject, message });
            
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        });

        // Create particles
        const particlesContainer = document.getElementById('particles');

        function createParticles() {
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random position
                const posX = Math.random() * 100;
                const posY = Math.random() * 100 + 100; // Start below the viewport
                
                // Random size
                const size = Math.random() * 3 + 1;
                
                // Random animation duration
                const duration = Math.random() * 10 + 5;
                
                // Random delay
                const delay = Math.random() * 5;
                
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.animationDuration = `${duration}s`;
                particle.style.animationDelay = `${delay}s`;
                
                particlesContainer.appendChild(particle);
            }
        }

        createParticles();

        // Animate elements when scrolling
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.skill-category, .project-card, .timeline-item');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };

        // Set initial state for animated elements
        document.querySelectorAll('.skill-category, .project-card, .timeline-item').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Run once on page load

        // Terminal typing effect
        const terminalLines = [
            { prompt: "$>", command: "npm init lamia-portfolio", output: "Initializing premium portfolio project..." },
            { prompt: "$>", command: "git add .", output: "Added all sections: about, skills, projects, contact" },
            { prompt: "$>", command: "git commit -m 'Final version'", output: "[main 3a8b7d2] Final version\n 12 files changed, 2500+ insertions(+)" },
            { prompt: "$>", command: "npm run deploy", output: "Success! Portfolio deployed to production." },
            { prompt: "$>", command: "", output: "" }
        ];

        function typeTerminalText() {
            const terminalBody = document.querySelector('.terminal-body');
            terminalBody.innerHTML = '';
            
            let lineIndex = 0;
            let charIndex = 0;
            let currentLine = '';
            let isPrompt = true;
            let isCommand = false;
            let isOutput = false;
            
            function type() {
                if (lineIndex >= terminalLines.length) return;
                
                const line = terminalLines[lineIndex];
                
                if (isPrompt) {
                    if (charIndex < line.prompt.length) {
                        currentLine += line.prompt.charAt(charIndex);
                        charIndex++;
                    } else {
                        isPrompt = false;
                        isCommand = true;
                        charIndex = 0;
                        currentLine += ' ';
                    }
                } else if (isCommand) {
                    if (charIndex < line.command.length) {
                        currentLine += line.command.charAt(charIndex);
                        charIndex++;
                    } else {
                        isCommand = false;
                        if (line.output) {
                            isOutput = true;
                            charIndex = 0;
                            currentLine = `<div class="terminal-line"><span class="terminal-prompt">${line.prompt}</span> <span class="terminal-command">${line.command}</span></div>`;
                            terminalBody.innerHTML += currentLine;
                            currentLine = `<div class="terminal-output">`;
                        } else {
                            currentLine = `<div class="terminal-line"><span class="terminal-prompt">${line.prompt}</span> <span class="terminal-command">${line.command}</span></div>`;
                            terminalBody.innerHTML += currentLine;
                            currentLine = '';
                            lineIndex++;
                            charIndex = 0;
                            isPrompt = true;
                        }
                    }
                } else if (isOutput) {
                    if (charIndex < line.output.length) {
                        currentLine += line.output.charAt(charIndex);
                        charIndex++;
                    } else {
                        isOutput = false;
                        currentLine += `</div>`;
                        terminalBody.innerHTML += currentLine;
                        currentLine = '';
                        lineIndex++;
                        charIndex = 0;
                        isPrompt = true;
                    }
                }
                
                if (isPrompt || isCommand || isOutput) {
                    if (!isOutput) {
                        terminalBody.innerHTML = terminalBody.innerHTML.replace(/<div class="terminal-line">.*<\/div>$/, `<div class="terminal-line">${currentLine}</div>`);
                    }
                    setTimeout(type, isOutput ? 10 : Math.random() * 50 + 30);
                } else {
                    setTimeout(type, 500);
                }
            }
            
            type();
        }

        // Start typing effect after page loads
        setTimeout(typeTerminalText, 2000);