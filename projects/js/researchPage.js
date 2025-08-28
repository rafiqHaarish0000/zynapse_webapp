       // Add bookmark buttons to papers
const steps = document.querySelectorAll('.process-step');
        const description = document.getElementById('description');
        const formStep = steps[1]; // FORM is the second step (index 1)
        
        const defaultText = `A streamlined team of co-founders is brought together to<br>
            create and lead the company, empowering a new<br>
            generation of entrepreneurs.`;

        steps.forEach(step => {
            step.addEventListener('mouseenter', () => {
                // Reset FORM step to inactive when hovering over any step
                const formCircle = formStep.querySelector('.step-icon-circle');
                const formDot = formStep.querySelector('.step-dot');
                const formLabel = formStep.querySelector('.step-name');
                
                formCircle.style.background = 'rgba(15, 27, 42, 0.8)';
                formCircle.style.border = '2px solid rgba(255, 255, 255, 0.2)';
                formCircle.style.boxShadow = 'none';
                formDot.style.background = '#0d1b2a';
                formDot.style.border = '3px solid rgba(255, 255, 255, 0.3)';
                formDot.style.boxShadow = 'none';
                formLabel.style.color = 'rgba(5, 5, 5, 0.6)';
                
                const newText = step.getAttribute('data-description');
                description.innerHTML = newText;
                description.style.color = '#9b5de5';
            });

            step.addEventListener('mouseleave', () => {
                // Restore FORM step to active when not hovering
                const formCircle = formStep.querySelector('.step-icon-circle');
                const formDot = formStep.querySelector('.step-dot');
                const formLabel = formStep.querySelector('.step-name');
                
                formCircle.style.background = '#000000';
                formCircle.style.border = '2px solid #9b5de5';
                formCircle.style.boxShadow = '0 0 30px #9b5de5';
                formDot.style.background = '#9b5de5';
                formDot.style.border = '3px solid #9b5de5';
                formDot.style.boxShadow = '0 0 12px #9b5de5';
                formLabel.style.color = '#9b5de5';
                
                description.innerHTML = defaultText;
                description.style.color = '#9b5de5';
            });
        });

document.addEventListener("DOMContentLoaded", () => {
  const researchLink = document.getElementById("research-link");
  if (researchLink) {
    researchLink.classList.add("active");
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 300); // delay each item for "one by one" effect
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector(".methodology-stats");
  const numbers = statsSection.querySelectorAll(".stat-number");

  function animateNumber(element, target) {
    let start = 0;
    let end = parseFloat(target.replace(/[^0-9.]/g, "")); // handle %, M, etc.
    let suffix = target.replace(/[0-9.]/g, ""); // get % or M suffix
    let duration = 2000; // 2 seconds
    let stepTime = Math.abs(Math.floor(duration / end));
    
    let current = start;
    let timer = setInterval(() => {
      current++;
      if (current >= end) {
        clearInterval(timer);
        element.textContent = target; // final with suffix
      } else {
        element.textContent = current + suffix;
      }
    }, stepTime);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        numbers.forEach(num => {
          animateNumber(num, num.textContent);
        });
        observer.unobserve(statsSection); // Run only once
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);
});


document.addEventListener("DOMContentLoaded", () => {
  const progressContainer = document.querySelector(".progress-container");
  const circles = progressContainer.querySelectorAll(".progress-circle");

  function animateCounter(circle) {
    const valueElem = circle.querySelector(".progress-value");
    const finalValue = parseInt(circle.getAttribute("data-final"), 10);
    let current = 0;
    const duration = 1500; // total animation time (ms)
    const stepTime = 20; // update interval (ms)
    const steps = duration / stepTime;
    const increment = finalValue / steps;

    const interval = setInterval(() => {
      current += increment;
      if (current >= finalValue) {
        current = finalValue;
        clearInterval(interval);
      }
      valueElem.textContent = Math.round(current) + "%";
    }, stepTime);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        circles.forEach(circle => animateCounter(circle));
        observer.unobserve(progressContainer); // run only once
      }
    });
  }, { threshold: 0.3 }); // triggers when 30% visible

  observer.observe(progressContainer);
});


document.addEventListener("DOMContentLoaded", () => {
  const groups = document.querySelectorAll(".papers-grid .paper-group");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        groups.forEach((group, index) => {
          setTimeout(() => {
            group.classList.add("show");
          }, index * 400); // 400ms delay between each card
        });
        observer.unobserve(entry.target); // trigger only once
      }
    });
  }, { threshold: 0.2 });

  const section = document.querySelector(".container-latest");
  if (section) observer.observe(section);
});
       
       document.addEventListener('DOMContentLoaded', function() {
            const paperCards = document.querySelectorAll('.paper-card');
            
            paperCards.forEach(card => {
                const paperBody = card.querySelector('.paper-body');
                const paperTitle = card.querySelector('.paper-title').textContent;
                const paperLink = card.querySelector('.paper-link').href;
            
            });
            
            // Initialize visit count
            savedData.visitCount++;
            console.log('Page loaded. Visit count:', savedData.visitCount);
            
            // Initialize innovation progress animations
            initializeInnovationAnimations();
            
            // Setup form handlers
            setupFormHandlers();
            setupFileUploads();
        });

        // Setup form event handlers
        function setupFormHandlers() {
            const form = document.getElementById('internshipForm');
            if (form) {
                form.addEventListener('submit', handleFormSubmission);
            }
            
            // Close modal when clicking outside
            const modal = document.getElementById('registrationModal');
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeRegistration();
                }
            });
            
            // Close modal with Escape key
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && modal.classList.contains('show')) {
                    closeRegistration();
                }
            });
        }

        // Innovation progress animations
        function initializeInnovationAnimations() {
            const innovationItems = document.querySelectorAll('.innovation-item');
            
            // Animate progress bars when they come into view
            const animateProgressBars = () => {
                innovationItems.forEach((item, index) => {
                    const rect = item.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                    
                    if (isVisible) {
                        const progressFill = item.querySelector('.progress-fill');
                        const progress = item.dataset.progress;
                        
                        // Animate the progress bar
                        setTimeout(() => {
                            progressFill.style.width = progress + '%';
                        }, index * 200);
                        
                        // Add milestone information
                        if (!item.querySelector('.innovation-milestone')) {
                            const milestone = document.createElement('div');
                            milestone.className = 'innovation-milestone';
                            milestone.innerHTML = `
                                <span class="milestone-date">Q${Math.ceil(Math.random() * 4)} 2025</span>
                                <span>Next milestone: ${getNextMilestone(progress)}%</span>
                            `;
                            item.querySelector('.innovation-content').appendChild(milestone);
                        }
                    }
                });
            };
            
            // Run animation on load and scroll
            animateProgressBars();
            window.addEventListener('scroll', animateProgressBars);
            
            // Add click handlers for innovation items
            innovationItems.forEach(item => {
                item.addEventListener('click', function() {
                    const title = this.querySelector('h4').textContent;
                    const progress = this.dataset.progress;
                    
                    // Show detailed information (could integrate with modal)
                    alert(`Innovation Details:\n\n${title}\nCurrent Progress: ${progress}%\n\nClick "Join Us" to contribute to this research!`);
                    
                    // Save interaction
                    if (!savedData.viewedInnovations) savedData.viewedInnovations = [];
                    if (!savedData.viewedInnovations.includes(title)) {
                        savedData.viewedInnovations.push(title);
                    }
                });
                
                // Add hover effects for status badges
                const status = item.querySelector('.innovation-status');
                status.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.1)';
                    this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                });
                status.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                    this.style.boxShadow = this.className.includes('breakthrough') ? '0 4px 15px rgba(72, 187, 120, 0.3)' :
                                         this.className.includes('advanced') ? '0 4px 15px rgba(66, 153, 225, 0.3)' :
                                         this.className.includes('developing') ? '0 4px 15px rgba(237, 137, 54, 0.3)' :
                                         this.className.includes('research') ? '0 4px 15px rgba(159, 122, 234, 0.3)' :
                                         '0 4px 15px rgba(160, 174, 192, 0.3)';
                });
            });
        }

        // Helper function to calculate next milestone
        function getNextMilestone(currentProgress) {
            const milestones = [25, 50, 75, 90, 95, 100];
            const current = parseInt(currentProgress);
            return milestones.find(m => m > current) || 100;
        }

        // Enhanced save functionality for innovation tracking
        function saveInnovationProgress() {
            const innovationItems = document.querySelectorAll('.innovation-item');
            const innovationProgress = {};
            
            innovationItems.forEach(item => {
                const title = item.querySelector('h4').textContent;
                const progress = item.dataset.progress;
                const status = item.querySelector('.innovation-status').textContent;
                
                innovationProgress[title] = {
                    progress: progress,
                    status: status,
                    lastViewed: new Date().toISOString()
                };
            });
            
            savedData.innovationProgress = innovationProgress;
            console.log('Innovation progress saved:', innovationProgress);
        }

        // Animate words on right side
document.addEventListener("DOMContentLoaded", () => {
  const lines = ["Explore", "The", "Unkown", "Together"];
  const container = document.getElementById("animatedText");

  function animateText() {
    container.innerHTML = "";
    let index = 0;
    let lineEls = [];

    // build line divs with spans
    lines.forEach((lineText, li) => {
      const div = document.createElement("div");
      div.className = `line line${li+1}`;
      [...lineText].forEach((ch) => {
        const span = document.createElement("span");
        span.textContent = ch;
        span.style.animationDelay = `${index * 0.08}s`;
        div.appendChild(span);
        index++;
      });
      container.appendChild(div);
      lineEls.push(div);
    });

    // after render, align "unknown" under "h"
    requestAnimationFrame(() => {
      const theLine = lineEls[1]; // 2nd line = "the"
      const spans = theLine.querySelectorAll("span");
      const hSpan = spans[0]; // "h" is second char (0=t, 1=h, 2=e)
      if (hSpan) {
        const hRect = hSpan.getBoundingClientRect();
        const lineRect = theLine.getBoundingClientRect();
        const offset = hRect.right - lineRect.left;

        lineEls[2].style.marginLeft = offset + "px"; // move "unknown"
      }
    });

    const totalDuration = index * 60 + 6000;
    setTimeout(animateText, totalDuration);
  }

  animateText();
});
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach(counter => {
    const finalText = counter.textContent.trim();
    const isPercent = finalText.includes("%");
    const isMillion = finalText.toLowerCase().includes("m");

    // Extract numeric value only
    let finalNumber = parseFloat(finalText.replace(/[^0-9.]/g, ""));
    let suffix = "";

    if (isPercent) suffix = "%";
    if (isMillion) suffix = "M";

    // Fast random numbers first
    let fastInterval = setInterval(() => {
      let rand = Math.floor(Math.random() * (finalNumber * 2));
      counter.textContent = rand + suffix;
    }, 100);

    // After 2s, switch to slow count up
    setTimeout(() => {
      clearInterval(fastInterval);

      let step = 0;
      let steps = 30; // adjust for smoothness
      let slowInterval = setInterval(() => {
        step++;
        let progress = step / steps;
        let value = Math.floor(progress * finalNumber);

        // if decimal like 3.2M, keep one decimal
        if (finalText.includes(".")) {
          value = (progress * finalNumber).toFixed(1);
        }

        counter.textContent = value + suffix;

        if (step >= steps) {
          counter.textContent = finalText; // restore exact final
          clearInterval(slowInterval);
        }
      }, 120);
    }, 2000);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".progress-circle");

  circles.forEach(circle => {
    const valueEl = circle.querySelector(".progress-value");
    const finalValue = parseInt(circle.getAttribute("data-final"));
    let current = 0;

    const steps = 60; // smoothness
    let step = 0;

    const animate = setInterval(() => {
      step++;
      current = Math.round((finalValue / steps) * step);

      // update circle background
      const deg = (current / 100) * 360;
      circle.style.setProperty("--percentage", deg + "deg");

      // update text
      valueEl.textContent = current + "%";

      if (step >= steps) {
        valueEl.textContent = finalValue + "%";
        circle.style.setProperty("--percentage", (finalValue / 100) * 360 + "deg");
        clearInterval(animate);
      }
    }, 40); // speed
  });
});
// Research Problems Section JavaScript

// Toggle accordion functionality
function toggleProblem(header) {
    const problemItem = header.parentElement;
    const allItems = document.querySelectorAll('.problem-item');
    
    // Close all other items (accordion behavior)
    allItems.forEach(item => {
        if (item !== problemItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current item
    problemItem.classList.toggle('active');
    
    // Add smooth scroll to expanded item after a brief delay
    if (problemItem.classList.contains('active')) {
        setTimeout(() => {
            problemItem.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest'
            });
        }, 300);
    }
}

// Registration modal/action
function openRegistration() {
    // Replace this with your actual registration logic
    alert('Registration form would open here!\n\nThis could be:\n• A modal window\n• Redirect to registration page\n• Email contact form\n• External sign-up service');
    
    // Example of what you might implement:
    // window.open('/register', '_blank');
    // showRegistrationModal();
    // window.location.href = 'mailto:research@yourorganization.com';
}

// Scroll animation observer
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Add extra visual feedback when item comes into view
            setTimeout(() => {
                entry.target.style.transform = 'translateX(0) scale(1.01)';
                setTimeout(() => {
                    entry.target.style.transform = 'translateX(0) scale(1)';
                }, 200);
            }, parseInt(getComputedStyle(entry.target).transitionDelay) * 1000);
        }
    });
}, observerOptions);

// Enhanced interaction features
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize scroll animations
    const problemItems = document.querySelectorAll('.problem-item');
    problemItems.forEach(item => {
        scrollAnimationObserver.observe(item);
    });
    
    // Add keyboard navigation support
    problemItems.forEach((item, index) => {
        const header = item.querySelector('.problem-header');
        
        // Make headers focusable
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
        
        // Keyboard event listeners
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleProblem(this);
                
                // Update aria-expanded
                const isActive = item.classList.contains('active');
                header.setAttribute('aria-expanded', isActive.toString());
            }
            
            // Arrow key navigation
            else if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextHeader = problemItems[index + 1]?.querySelector('.problem-header');
                if (nextHeader) nextHeader.focus();
            }
            else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevHeader = problemItems[index - 1]?.querySelector('.problem-header');
                if (prevHeader) prevHeader.focus();
            }
        });
        
        // Update aria-expanded when clicked
        header.addEventListener('click', function() {
            setTimeout(() => {
                const isActive = item.classList.contains('active');
                header.setAttribute('aria-expanded', isActive.toString());
            }, 0);
        });
    });
    
    // Add enhanced hover effects
    problemItems.forEach(item => {
        const header = item.querySelector('.problem-header');
        
        header.addEventListener('mouseenter', function() {
            // Subtle scale effect on hover
            this.style.transform = 'scale(1.01)';
        });
        
        header.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Smooth closing of items when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.problem-item')) {
            problemItems.forEach(item => {
                if (item.classList.contains('active')) {
                    // Optional: uncomment to close on outside click
                    // item.classList.remove('active');
                }
            });
        }
    });
    
    // Add loading states for join buttons
    const joinButtons = document.querySelectorAll('.join-btn');
    joinButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevent multiple rapid clicks
            if (this.classList.contains('loading')) {
                e.preventDefault();
                return;
            }
            
            // Add loading state
            this.classList.add('loading');
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.style.pointerEvents = 'none';
            
            // Reset after delay (simulating async operation)
            setTimeout(() => {
                this.classList.remove('loading');
                this.textContent = originalText;
                this.style.pointerEvents = 'auto';
            }, 1500);
        });
    });
    
    // Add smooth scroll behavior for the section
    const section = document.querySelector('problem-section');
    if (section) {
        section.style.scrollBehavior = 'smooth';
    }
    
    // Performance optimization: Pause animations when not in view
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const floatingShapes = entry.target.querySelectorAll('.floating-shape');
            if (entry.isIntersecting) {
                // Resume animations
                floatingShapes.forEach(shape => {
                    shape.style.animationPlayState = 'running';
                });
            } else {
                // Pause animations to save resources
                floatingShapes.forEach(shape => {
                    shape.style.animationPlayState = 'paused';
                });
            }
        });
    });
    
    if (section) {
        sectionObserver.observe(section);
    }
    
    console.log('🧪 Research Problems Section Loaded');
});

// Utility function to check if user prefers reduced motion
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Respect user's motion preferences
if (prefersReducedMotion()) {
    // Disable complex animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        .problem-item,
        .floating-shape,
        .join-btn::before {
            animation: none !important;
            transition-duration: 0.2s !important;
        }
        
        .problem-item {
            transform: translateX(0) !important;
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);
}

  // Open registration form (Comprehensive Form)
        function openRegistration() {
            const modal = document.getElementById('registrationModal');
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
if (nav) {
    nav.classList.add('nav-hidden');
}

            // Save application attempt
            savedData.applicationStarted = new Date().toISOString();
            savedData.registrationPlatform = 'Internal Form';
            console.log('Registration form opened:', savedData);
        }

        // Close registration form
        function closeRegistration() {
            const modal = document.getElementById('registrationModal');
            modal.classList.remove('show');
            if (nav) {
    nav.classList.remove('nav-hidden');
}
            document.body.style.overflow = 'auto'; // Restore scrolling
        }

        // Handle form submission
        function handleFormSubmission(event) {
            event.preventDefault();
            
            // Validate form before submission
            if (!validateForm()) {
                return;
            }
            
            const formData = new FormData(event.target);
            const applicationData = {
                personal: {
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    country: formData.get('country'),
                    city: formData.get('city')
                },
                academic: {
                    university: formData.get('university'),
                    degree: formData.get('degree'),
                    major: formData.get('major'),
                    gpa: formData.get('gpa'),
                    graduationDate: formData.get('graduationDate')
                },
                research: {
                    areas: formData.getAll('researchAreas'),
                    experience: formData.get('researchExperience')
                },
                technical: {
                    programming: formData.getAll('programmingSkills'),
                    frameworks: formData.getAll('mlFrameworks'),
                    otherSkills: formData.get('otherSkills')
                },
                preferences: {
                    duration: formData.get('duration'),
                    startDate: formData.get('startDate'),
                    motivation: formData.get('motivation'),
                    contribution: formData.get('contribution')
                },
                documents: {
                    portfolio: formData.get('portfolio'),
                    newsletter: formData.get('newsletter') === 'on'
                },
                submissionDate: new Date().toISOString()
            };
            
            // Save application data
            savedData.applicationData = applicationData;
            savedData.applicationSubmitted = true;
            
            // Show success message
            const notification = document.getElementById('saveNotification');
            notification.innerHTML = '🎉 Application submitted successfully! We\'ll contact you soon.';
            notification.style.background = '#48bb78';
            notification.classList.add('show');
            
            // Close form
            closeRegistration();
            
            // Reset form
            document.getElementById('internshipForm').reset();
            
            // Hide notification after 5 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.innerHTML = '✅ Research progress saved successfully!';
                    notification.style.background = '#48bb78';
                }, 300);
            }, 5000);
            
            console.log('Application submitted:', applicationData);
            
            // Show detailed confirmation
            setTimeout(() => {
                alert(
                    'Application Submitted Successfully! 🎉\n\n' +
                    `Dear ${applicationData.personal.firstName},\n\n` +
                    'Thank you for your interest in joining our AI Research Institute!\n\n' +
                    'Next Steps:\n' +
                    '• You will receive a confirmation email within 24 hours\n' +
                    '• Our team will review your application within 5-7 business days\n' +
                    '• Qualified candidates will be contacted for interviews\n' +
                    '• We will notify all applicants of the final decision\n\n' +
                    'Questions? Contact us at research@aiinstitute.org'
                );
            }, 1000);
        }

        // Form validation helpers
        function validateForm() {
            const requiredFields = ['firstName', 'lastName', 'email', 'country', 'city', 'university', 'degree', 'major', 'duration', 'motivation', 'contribution'];
            const researchAreas = document.querySelectorAll('input[name="researchAreas"]:checked');
            const programmingSkills = document.querySelectorAll('input[name="programmingSkills"]:checked');
            const agreement = document.getElementById('agreement');
            
            // Check required fields
            for (const field of requiredFields) {
                const element = document.getElementById(field);
                if (!element.value.trim()) {
                    element.focus();
                    alert(`Please fill in the ${element.previousElementSibling.textContent.replace(' *', '')} field.`);
                    return false;
                }
            }
            
            // Check research areas
            if (researchAreas.length === 0) {
                alert('Please select at least one research area of interest.');
                return false;
            }
            
            // Check programming skills
            if (programmingSkills.length === 0) {
                alert('Please select at least one programming language.');
                return false;
            }
            
            // Check agreement
            if (!agreement.checked) {
                alert('Please agree to the terms and conditions.');
                return false;
            }
            
            return true;
        }

        // File upload handlers
        function setupFileUploads() {
            const fileInputs = document.querySelectorAll('input[type="file"]');
            
            fileInputs.forEach(input => {
                const uploadDiv = input.parentElement;
                const textSpan = uploadDiv.querySelector('.file-upload-text');
                
                input.addEventListener('change', function() {
                    const files = this.files;
                    if (files.length > 0) {
                        if (files.length === 1) {
                            textSpan.textContent = files[0].name;
                        } else {
                            textSpan.textContent = `${files.length} files selected`;
                        }
                        uploadDiv.style.borderColor = '#48bb78';
                        uploadDiv.style.background = '#f0fff4';
                    } else {
                        textSpan.textContent = 'Choose file or drag here';
                        uploadDiv.style.borderColor = '#cbd5e0';
                        uploadDiv.style.background = '#f8fafc';
                    }
                });
            });
        }


// Export functions for external use (if needed)
window.ResearchProblems = {
    toggleProblem,
    openRegistration
};

 // Auto-save on page unload
        window.addEventListener('beforeunload', function() {
            saveProgress();
        });
