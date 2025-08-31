// js/researchForm.js
import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Saved data storage (using JavaScript variables since localStorage isn't supported)
let savedData = {
    visitCount: 0,
    lastSaved: null,
    bookmarkedPapers: [],
    completedSections: []
};

// Show toast message function
function showToast(type, title, message, duration = 4000) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.custom-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `custom-toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">
                ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
            </div>
            <div class="toast-text">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        opacity: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
    
    // Style the content
    const content = toast.querySelector('.toast-content');
    content.style.cssText = `
        display: flex;
        align-items: flex-start;
        padding: 16px;
        gap: 12px;
    `;
    
    const icon = toast.querySelector('.toast-icon');
    icon.style.cssText = `
        font-size: 20px;
        flex-shrink: 0;
        margin-top: 2px;
    `;
    
    const textDiv = toast.querySelector('.toast-text');
    textDiv.style.cssText = `
        flex: 1;
        min-width: 0;
    `;
    
    const titleDiv = toast.querySelector('.toast-title');
    titleDiv.style.cssText = `
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 4px;
        line-height: 1.4;
    `;
    
    const messageDiv = toast.querySelector('.toast-message');
    messageDiv.style.cssText = `
        font-size: 13px;
        opacity: 0.95;
        line-height: 1.4;
        word-wrap: break-word;
    `;
    
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
        flex-shrink: 0;
    `;
    
    closeBtn.onmouseover = () => closeBtn.style.backgroundColor = 'rgba(255,255,255,0.2)';
    closeBtn.onmouseout = () => closeBtn.style.backgroundColor = 'transparent';
    
    // Add to page
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
        toast.style.opacity = '1';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 300);
    }, duration);
}

// Toggle collapsible problem statements
function toggleProblem(header) {
    const problemItem = header.parentElement;
    const isActive = problemItem.classList.contains('active');
    
    // Close all other problems
    document.querySelectorAll('.problem-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current problem
    if (!isActive) {
        problemItem.classList.add('active');
        
        // Track completed sections
        const problemTitle = header.querySelector('h3').textContent;
        if (!savedData.completedSections.includes(problemTitle)) {
            savedData.completedSections.push(problemTitle);
        }
    }
}

// Save progress functionality
function saveProgress() {
    savedData.visitCount++;
    savedData.lastSaved = new Date().toISOString();
    
    // Save innovation progress
    saveInnovationProgress();
    
    // Show notification
    const notification = document.getElementById('saveNotification');
    notification.classList.add('show');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
    
    console.log('All progress saved:', savedData);
}

// Open registration form (Comprehensive Form)
function openRegistration() {
    const modal = document.getElementById('registrationModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    const nav = document.querySelector('nav');
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
    const nav = document.querySelector('nav');
    if (nav) {
        nav.classList.remove('nav-hidden');
    }
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Handle form submission with Firebase integration
async function handleFormSubmission(event) {
    event.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    try {
        const formData = new FormData(event.target);
        const applicationData = {
            personal: {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone') || '',
                country: formData.get('country'),
                city: formData.get('city')
            },
            academic: {
                university: formData.get('university'),
                degree: formData.get('degree'),
                major: formData.get('major'),
                gpa: formData.get('gpa') || null,
                graduationDate: formData.get('graduationDate') || null
            },
            research: {
                areas: formData.getAll('researchAreas'),
                experience: formData.get('researchExperience') || ''
            },
            technical: {
                programming: formData.getAll('programmingSkills'),
                frameworks: formData.getAll('mlFrameworks'),
                otherSkills: formData.get('otherSkills') || ''
            },
            preferences: {
                duration: formData.get('duration'),
                startDate: formData.get('startDate') || null,
                motivation: formData.get('motivation'),
                contribution: formData.get('contribution')
            },
            documents: {
                portfolio: formData.get('portfolio') || '',
                newsletter: formData.get('newsletter') === 'on'
            },
            submissionDate: serverTimestamp(),
            status: 'submitted'
        };
        
        // Save to Firebase Firestore
        const docRef = await addDoc(collection(db, 'applications'), applicationData);
        console.log('Application saved with ID:', docRef.id);
        
        // Save application data locally
        savedData.applicationData = applicationData;
        savedData.applicationSubmitted = true;
        savedData.firebaseDocId = docRef.id;
        
        // Show success toast message
        showToast('success', 'Application Submitted Successfully!', `Dear ${applicationData.personal.firstName}, your application has been received. Application ID: ${docRef.id}`);
        
        // Close form after a brief delay to show the toast
        setTimeout(() => {
            closeRegistration();
            // Reset form
            document.getElementById('internshipForm').reset();
        }, 500);
        
        console.log('Application submitted:', applicationData);
        
    } catch (error) {
        console.error('Error saving application:', error);
        
        // Show error toast message
        showToast('error', 'Submission Failed', 'There was an error submitting your application. Please check your internet connection and try again.');
        
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
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
    
    // Validate email format
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        email.focus();
        alert('Please enter a valid email address.');
        return false;
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
        
        // Add drag and drop functionality
        uploadDiv.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = '#48bb78';
            this.style.background = '#f0fff4';
        });
        
        uploadDiv.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = '#cbd5e0';
            this.style.background = '#f8fafc';
        });
        
        uploadDiv.addEventListener('drop', function(e) {
            e.preventDefault();
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                input.files = files;
                const event = new Event('change', { bubbles: true });
                input.dispatchEvent(event);
            }
        });
    });
}

// Bookmark paper functionality
function bookmarkPaper(paperTitle, paperUrl) {
    const bookmark = {
        title: paperTitle,
        url: paperUrl,
        timestamp: new Date().toISOString()
    };
    
    if (!savedData.bookmarkedPapers.find(p => p.url === paperUrl)) {
        savedData.bookmarkedPapers.push(bookmark);
        console.log('Paper bookmarked:', bookmark);
    }
}

// Setup form handlers
function setupFormHandlers() {
    const form = document.getElementById('internshipForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeRegistration();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.classList.contains('show')) {
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
                    if (progressFill) {
                        progressFill.style.width = progress + '%';
                    }
                }, index * 200);
                
                // Add milestone information
                if (!item.querySelector('.innovation-milestone')) {
                    const milestone = document.createElement('div');
                    milestone.className = 'innovation-milestone';
                    milestone.innerHTML = `
                        <span class="milestone-date">Q${Math.ceil(Math.random() * 4)} 2025</span>
                        <span>Next milestone: ${getNextMilestone(progress)}%</span>
                    `;
                    const innovationContent = item.querySelector('.innovation-content');
                    if (innovationContent) {
                        innovationContent.appendChild(milestone);
                    }
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
            const title = this.querySelector('h4')?.textContent || 'Unknown';
            const progress = this.dataset.progress || '0';
            
            // Show detailed information
            alert(`Innovation Details:\n\n${title}\nCurrent Progress: ${progress}%\n\nClick "Join Us" to contribute to this research!`);
            
            // Save interaction
            if (!savedData.viewedInnovations) savedData.viewedInnovations = [];
            if (!savedData.viewedInnovations.includes(title)) {
                savedData.viewedInnovations.push(title);
            }
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
        const title = item.querySelector('h4')?.textContent || 'Unknown';
        const progress = item.dataset.progress || '0';
        const status = item.querySelector('.innovation-status')?.textContent || 'Unknown';
        
        innovationProgress[title] = {
            progress: progress,
            status: status,
            lastViewed: new Date().toISOString()
        };
    });
    
    savedData.innovationProgress = innovationProgress;
    console.log('Innovation progress saved:', innovationProgress);
}

// Add bookmark buttons to papers
document.addEventListener('DOMContentLoaded', function() {
    const paperCards = document.querySelectorAll('.paper-card');
    
    paperCards.forEach(card => {
        const paperBody = card.querySelector('.paper-body');
        if (paperBody) {
            const paperTitle = card.querySelector('.paper-title')?.textContent || 'Unknown Paper';
            const paperLink = card.querySelector('.paper-link')?.href || '#';
            
            const bookmarkBtn = document.createElement('button');
            bookmarkBtn.textContent = '🔖 Bookmark';
            bookmarkBtn.style.cssText = `
                background: #48bb78;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 8px;
                margin-left: 10px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: background 0.3s ease;
            `;
            bookmarkBtn.onmouseover = () => bookmarkBtn.style.background = '#38a169';
            bookmarkBtn.onmouseout = () => bookmarkBtn.style.background = '#48bb78';
            bookmarkBtn.onclick = () => {
                bookmarkPaper(paperTitle, paperLink);
                bookmarkBtn.textContent = '✅ Bookmarked';
                bookmarkBtn.style.background = '#38a169';
            };
            
            paperBody.appendChild(bookmarkBtn);
        }
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

// Auto-save on page unload
window.addEventListener('beforeunload', function() {
    saveProgress();
});

// Make functions globally available
window.toggleProblem = toggleProblem;
window.openRegistration = openRegistration;
window.closeRegistration = closeRegistration;
window.saveProgress = saveProgress;